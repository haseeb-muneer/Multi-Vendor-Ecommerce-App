const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    console.log("DB_URL exists:", !!process.env.DB_URL);

    const data = await mongoose.connect(process.env.DB_URL);

    console.log(
      `Mongo db connected with server: ${data.connection.host} successfully`
    );
  } catch (error) {
    console.error("MongoDB Connection Error:");
    console.error(error);
  }
};

module.exports = connectDatabase;
