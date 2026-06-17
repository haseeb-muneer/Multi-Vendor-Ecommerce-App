const app=require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./db/Database");
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server for handling uncaiught exception");
})
// if(process.env.NODE_ENV!=="PRODUCTION"){
//     require("dotenv").config({path:'config/.env'});
// }
connectDatabase();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server=app.listen(`${process.env.PORT}`,()=>{
    console.log(`server is listening on port http://localhost:${process.env.PORT}`);
})
process.on("unhandledRejection",(err)=>{
    console.log(`shutting down the server for handling ${err.message}`);
    console.log(`shutting down the server for handling unhandled promise rejection`);
    server.close(()=>{
        process.exit(1);
    })

})