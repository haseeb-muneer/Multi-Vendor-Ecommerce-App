const app = require("./app");
const cloudinary = require("cloudinary");

process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server for handling uncaught exception");
});

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/.env" });
}

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`shutting down the server for handling ${err.message}`);

  server.close(() => {
    process.exit(1);
  });
});
