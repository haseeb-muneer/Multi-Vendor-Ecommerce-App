const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    console.log("connectDatabase called");
    console.log("DB_URL exists:", !!process.env.DB_URL);

    const data = await mongoose.connect(process.env.DB_URL);

    console.log(
      `MongoDB connected successfully: ${data.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error);
  }
};

module.exports = connectDatabase;
