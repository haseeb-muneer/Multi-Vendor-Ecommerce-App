import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  
  isLoading: true,
 
};

export const productReducers = createReducer(initialState, (builder) => {
  builder
    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("productCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase("productCreateFail", (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
    })
// is these two states aredifferennt
// state.products are for stroign trhe all products and responsible for get all Shop products
    // get all products reducers
     .addCase("getAllProductsShopRequest", (state) => {
      state.isLoading = true;
    
    })
     .addCase("getAllProductsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.products=action.payload;
    
    })
     .addCase("getAllProductsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error=action.payload;
    
    })
    //delete product of shop reducers
    .addCase("deleteProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteProductSuccess", (state , action) => {
      state.isLoading = false;
      state.message=action.payload;
    })
    .addCase("deleteProductFailed", (state , action) => {
      state.isLoading = false;
      state.message=action.payload;
    })
    .addCase("clearError", (state) => {
      state.error = null;
    });
});
