import {configureStore} from "@reduxjs/toolkit";
import { userReducers } from "./reducers/user";
import { sellerReducers } from "./reducers/seller";
import { productReducers } from "./reducers/product";
import { eventReducers } from "./reducers/event";
import { cartReducers } from "./reducers/cart";
import { wishlistReducers } from "./reducers/wishlist";
const store=configureStore({
    reducer:{
          user:userReducers,
          seller:sellerReducers,
          products:productReducers,
          events:eventReducers,
          cart:cartReducers,
          wishlist:wishlistReducers,
    }
})
export default store