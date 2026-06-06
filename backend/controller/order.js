const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const Order = require("../model/order");
const Shop = require("../model/ShopModel");
const Product = require("../model/ProductModel");

// create new order
router.post(
  "/create-order",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      //   group cart items by shopId
      const shopItemsMap = new Map();
       // check of the map contain the item with shopid if contain then push item against that shopid and if not contain
       //shopid then create shopid and then set item against that shopid
      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      // create an order for each shop
      const orders = [];

      for (const [shopId, items] of shopItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
router.get("/get-all-orders/:userId" , catchAsyncErrors(async(req,res,next)=>{
  try{
  const orders=(await Order.find({"user._id":req.params.userId})).toSorted({
    createdAt:-1,
  })
  res.status(200).json({
    success:true,
    orders,
  })
  }catch(error){
    return next(new ErrorHandler(error.message, 500));
  }
}))
module.exports = router;