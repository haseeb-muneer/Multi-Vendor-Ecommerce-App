console.log("APP.JS LOADED");

const express = require("express");
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDatabase = require("./db/Database");

const app = express();

// Load env variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/.env" });
}

// Connect MongoDB
connectDatabase();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Static files
app.use("/", express.static("uploads"));

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.FRONTEND_URL,
      "https://multi-vendor-ecommerce-app-q7yj.vercel.app"
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Routes
const user = require("./controller/User");
const event = require("./controller/Event");
const shop = require("./controller/Shop");
const product = require("./controller/Product");
const coupounCode = require("./controller/CoupounCode");
const Payment = require("./controller/Payment");
const order = require("./controller/order");
const conversation = require("./controller/Conversation");
const message = require("./controller/Message");

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupoun", coupounCode);
app.use("/api/v2/payment", Payment);
app.use("/api/v2/order", order);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);

// Error middleware
app.use(ErrorHandler);

module.exports = app;
