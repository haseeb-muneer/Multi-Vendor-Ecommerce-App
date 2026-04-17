const express=require('express');
const path=require("path");
const router=express.Router();
const jwt=require("jsonwebtoken");
const fs = require('fs');
const sendMail=require("../utils/sendMail");
const sendToken=require("../utils/sendToken");
const { isAuthenticated, isSeller } = require('../middleware/auth');
const ErrorHandler = require('../utils/ErrorHandler');
const {upload}=require("../multer");
const Shop =require("../model/ShopModel");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const shopToken = require('../utils/sendShopToken');
router.post("/create-shop" , upload.single("file") , async (req,res,next)=>{
   try{
   const { email}=req.body;
       const ShopEmail=await Shop.findOne({email});
      
       if(ShopEmail){
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
       const seller={
           name:req.body.name,
           email:email,
           password:req.body.password,
           avatar:fileurl,
           address:req.body.address,
           phoneNumber:req.body.phoneNumber,
           zipCode:req.body.zipCode,
       }
         const createActivationToken=(seller)=>{  //create activation token
          return jwt.sign(seller , process.env.ACTIVATION_SECRET,{
               expiresIn:"5m",
           })
       }
         const activationToken=createActivationToken(seller);
         const activationurl=`http://localhost:3000/seller/activation/${activationToken}`;
           try{
    await sendMail({
        email:seller.email,
        subject:"Activate your Shop",
        message:`Hello ${seller.name}.please click on the link to activate your shop: ${activationurl}`,
    })
    res.status(201).json({
        success:true,
        message:`please check your email ${seller.email} to activate your shop`,
    })
  }catch(error){
    return next(new ErrorHandler(error.message , 500));
   }
   }catch(error){
    return next(new ErrorHandler(error.message , 400));
   }
})
router.post("/activation",catchAsyncErrors(async (req,res,next)=>{
 try{
  const {activation_token}=req.body;
  console.log(`token received = ${activation_token}`);
  const newSeller=jwt.verify(activation_token , process.env.ACTIVATION_SECRET);
  console.log(newSeller);
  if(!newSeller){
      return next(new ErrorHandler("Invalid token" , 400));
  }
  const {name , email , password , avatar , zipCode , address , phoneNumber}=newSeller;

  const existedSeller=await Shop.findOne({email});
  console.log(`user existed : ${existedSeller}`);
  if(existedSeller){
    
    return next(new ErrorHandler("Seller already exist" , 400));
  }
  try{
  const seller=await Shop.create({
      name , 
      email , 
      password , 
      avatar,
      zipCode,
      address,
      phoneNumber,
  })
  console.log(`seller is created in adatabase :${seller}`);
  shopToken(seller , 201 , res);
//          try{
//     await sendMail({
//         email:seller.email,
//         subject:"Your Shop is Live — Congratulations! 🎉",
//         message:`Dear ${seller.name},

// Congratulations! 🎉 Your shop is now live and ready for customers.

// We're so happy to have you with us — wishing you amazing sales and great success ahead!

// Warm regards,
// Shopo`,
//     })
    
//   }catch(error){
//     return next(new ErrorHandler(error.message , 500));
//    }

}catch(error){
    console.log(error);
}
 }catch(error){
   return next(new ErrorHandler(error.message , 500));
 }
}))
router.post("/login-shop",catchAsyncErrors(async(req,res,next)=>{
    try{
    const {email , password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler("please provide the all fields!" , 400));
    }
    const user=await Shop.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("User does not exist!" , 400));
    }
    const isPasswordValid=await user.comparePassword(password);
    if(!isPasswordValid){
        return next(new ErrorHandler("please provide the correct information!" , 400));
    }
    shopToken(user , 201 , res)
    }catch(error){
        return next(new ErrorHandler(error.message , 500));
    }
}))
router.get("/getSeller" , isSeller , catchAsyncErrors(async (req,res ,next)=>{
    try{
        console.log(req.seller);
        const seller=await Shop.findById(req.seller._id);
        console.log(`seller is : ${seller}`);
    if(!seller){
        return next(new ErrorHandler("User does not exist" , 400));
    }
    return res.status(200).json({
        success:true , 
        seller,
    })
    }catch(error){
        return next(new ErrorHandler(error.message , 500));
    }
}))
module.exports=router;