const app = require("./app");
const cloudinary = require("cloudinary");

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

// Load env variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/.env" });
}

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Only start local server outside Vercel
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down due to unhandled promise rejection");

    server.close(() => {
      process.exit(1);
    });
  });
}
