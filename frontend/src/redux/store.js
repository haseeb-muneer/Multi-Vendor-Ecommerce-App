import {configureStore} from "@reduxjs/toolkit";
import { userReducers } from "./reducers/user";
import { sellerReducers } from "./reducers/seller";
const store=configureStore({
    reducer:{
          user:userReducers,
          seller:sellerReducers,
    }
})
export default store