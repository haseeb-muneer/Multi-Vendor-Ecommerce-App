console.log("APP.JS LOADED");

const express = require("express");
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDatabase = require("./db/Database");

// Handling uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server for handling uncaught exception");
});


// config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

// Connect MongoDB
connectDatabase();

const app = express();
// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));


const isProd = process.env.NODE_ENV === "production";
const defaultOrigins = isProd
  ? [
      "https://multi-vendor-ecommerce-app-q7yj.vercel.app",
      
    ]
  : ["http://localhost:8000"];
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim())
  : defaultOrigins;


// Static files
app.use("/", express.static("uploads"));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
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
// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down for unhandled promise rejection");
});

module.exports = app;
