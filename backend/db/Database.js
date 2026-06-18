const mongoose=require("mongoose");
const connectDatabase = () => {
  mongoose.connect(process.env.DB_URL).then((data) => {
    console.log(
      `Mongo db connected with server:${data.connection.host} successfully `
    );
  });
};
module.exports = connectDatabase;
