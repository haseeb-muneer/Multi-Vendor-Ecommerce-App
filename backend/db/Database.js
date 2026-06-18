const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

   const data = await mongoose.connect(process.env.DB_URL);

console.log("Connected DB:", data.connection.name);
console.log("Connected Host:", data.connection.host);
  } catch (error) {
    console.log("MongoDB Error:", error);
  }
};

module.exports = connectDatabase;
