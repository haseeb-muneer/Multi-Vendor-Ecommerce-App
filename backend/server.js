const app=require("./app");
const connectDatabase = require("./db/Database");
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server for handling uncaiught exception");
})
// if(process.env.NODE_ENV!=="PRODUCTION"){
//     require("dotenv").config({path:'config/.env'});
// }
connectDatabase();
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