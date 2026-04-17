const express = require("express");
const ErrorHnadler = require("./middleware/error");
const cookieParser=require("cookie-parser");
const bodyParser=require("body-parser");
const user=require("./controller/User");
const shop=require("./controller/Shop");
const cors=require("cors");
const app = express();
const path =require("path");
app.use("/",express.static("uploads"));
app.use(cors({
  origin: "http://localhost:3000", // Allow ONLY your frontend
  credentials: true,                // MANDATORY: Allows the browser to accept cookies
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});
app.use(bodyParser.urlencoded({ extended: true , limit:"50mb" }));
app.use(cookieParser());
app.use("/api/v2/user",user);
app.use("/api/v2/shop",shop);

// config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({path:"config/.env"});
  // require("dotenv").config({ path: path.join(__dirname, "config/.env") });
}
console.log(process.env.DB_URL);
app.use(ErrorHnadler);
module.exports=app;