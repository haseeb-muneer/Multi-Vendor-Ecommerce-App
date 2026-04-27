const express=require('express');
const path=require("path");
const router=express.Router();
const {upload}=require("../multer");
const ErrorHandler=require("../utils/ErrorHandler");
const User=require("../model/UserModel");
const jwt=require("jsonwebtoken");
const fs = require('fs');
const sendMail=require("../utils/sendMail");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken=require("../utils/sendToken");
const { isAuthenticated } = require('../middleware/auth');
router.post("/create-user" , upload.single("file") , async (req,res , next)=>{
    console.log(req.body);
    console.log(req.file);
    console.log(process.env.ACTIVATION_SECRET);
    const {name , email , password}=req.body;
    const userEmail=await User.findOne({email});
    console.log(userEmail);
    if(userEmail){
        const filename=req.file.filename;
        const filePath=`uploads/${filename}`;
        fs.unlink(filePath , (err)=>{
            if(err){
                console.log(err);
                res.status(500).json({message:"Error deleting file"});
            }
        })
        return next(new ErrorHandler("User already exist" , 400));
        
    }
    const filename=req.file.filename;
    const fileurl=path.join(filename);
    console.log(fileurl);
    const user={
        fullName:name,
        email:email,
        password:password,
        avatar:fileurl,
    }
     const createActivationToken=(user)=>{  //create activation token
   return jwt.sign(user , process.env.ACTIVATION_SECRET,{
        expiresIn:"5m",
    })
}
  const activationToken=createActivationToken(user);
  const activationurl=`http://localhost:3000/activation/${activationToken}`;
  try{
    await sendMail({
        email:user.email,
        subject:"Activate your account",
        message:`Hello ${user.fullName}.please click on the link to activate your account: ${activationurl}`,
    })
    res.status(201).json({
        success:true,
        message:`please check your email ${user.email} to activate your account`,
    })
  }catch(err){
    next(new ErrorHandler(err.message , 500));
  }
  
})
router.post("/activation",catchAsyncErrors(async (req,res,next)=>{
 try{
  const {activation_token}=req.body;
  console.log(`token received = ${activation_token}`);
  const newUser=jwt.verify(activation_token , process.env.ACTIVATION_SECRET);
  if(!newUser){
      return next(new ErrorHandler("Invalid token" , 400));
  }
  const {fullName , email , password , avatar}=newUser;
  console.log(newUser);
  const existedUser=await User.findOne({email});
  console.log(`user existed : ${existedUser}`);
  if(existedUser){
    
    return next(new ErrorHandler("User already exist" , 400));
  }
  try{
  const user=await User.create({
      fullName , 
      email , 
      password , 
      avatar,
  })
  console.log(`user is created in adatabase :${user}`);
  sendToken(user , 201 , res);
}catch(error){
    console.log(error);
}
 }catch(error){
   return next(new ErrorHandler(error.message , 500));
 }
}))
router.post("/login-user",catchAsyncErrors(async(req,res,next)=>{
    try{
    const {email , password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler("please provide the all fields!" , 400));
    }
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("User does not exist!" , 400));
    }
    const isPasswordValid=await user.comparePassword(password);
    if(!isPasswordValid){
        return next(new ErrorHandler("please provide the correct information!" , 400));
    }
    sendToken(user , 201 , res)
    }catch(error){
        return next(new ErrorHandler(error.message , 500));
    }
}))
router.get("/getuser" , isAuthenticated , catchAsyncErrors(async (req,res ,next)=>{
    try{
        console.log(req.user);
        const user=await User.findById(req.user.id);
        console.log(user);
    if(!user){
        return next(new ErrorHandler("User does not exist" , 400));
    }
    return res.status(200).json({
        success:true , 
        user,
    })
    }catch(error){
        return next(new ErrorHandler(error.message , 500));
    }
}))
router.get("/logout" , isAuthenticated , catchAsyncErrors(async (req,res,next)=>{
    try{
    res.cookie("token" , null , {
        expires:new Date(Date.now()),
        httpOnly:true,
    })
    res.status(201).json({
        success:true,
        message:"Log out successfull!",
    })
    }catch(error){
        return next(new ErrorHandler(error.message , 500))
    }
}));
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, fullName } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
        // console.log("user does not exist");
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next( new ErrorHandler("Please provide the correct information", 400) );
        // console.log("password is not correct");
      }

      user.fullName = fullName;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
     return next(new ErrorHandler(error.message, 500));
//    console.log(error);
    }
  })
);
router.put("/update-avatar", isAuthenticated , upload.single("image"), catchAsyncErrors(async (req,res , next)=>{
    try{
      const existUser=await User.findById(req.user.id);
      const existAvatarPath=`uploads/${existUser.avatar}`;
      fs.unlinkSync(existAvatarPath);
      const fileUrl=path.join(req.file.filename);
      const user=await User.findByIdAndUpdate(req.user.id , {avatar:fileUrl});
      res.status(200).json({
        success:true,
        user,
      })
    }catch(error){
        return next(new ErrorHandler(error.message, 500));
    }
}))
module.exports=router;