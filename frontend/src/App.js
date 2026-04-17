import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, Bounce } from 'react-toastify'; // Added Bounce here
import 'react-toastify/dist/ReactToastify.css'; // Added the CSS import
import axios from "axios";
import { LoginPage, SignupPage, ActivationPage , HomePage , ProductPage , BestSellingPage , EventPage , FAQPage , ProductDetailsPage  , ProfilePage , ShopCreatePage , SellerActivationPage  , ShopLoginPage} from "./Routes";
import { ShopHomePage } from "./ShopRoutes";
import { server } from "./server";
import { toast } from 'react-toastify';
import store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import {useSelector} from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import SellerProtectedRoute from "./SellerProtectedRoute"
function App() {
  const { loading , isAuthenticated} = useSelector((state) => state.user);//user is the reducer name of userReducer
  const { seller , isSeller , isLoading} = useSelector((state) => state.seller);//seller is the reducer name of sellerReducer
  axios.defaults.withCredentials = true;
  useEffect(()=>{
    store.dispatch(loadUser());
    store.dispatch(loadSeller());
    if(isSeller===true){
      return <Navigate to="/shop" replace/>
    }
  },[])
  console.log( "seller is", isSeller , seller);
  return (
   <>
   {
    loading || isLoading ? (null):(
       <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route path="/products" element={<ProductPage/>}/>
        <Route path="/product/:name" element={<ProductDetailsPage/>}/>
        <Route path="/best-selling" element={<BestSellingPage/>}/>
        <Route path="/events" element={<EventPage/>}/>
        <Route path="/faq" element={<FAQPage/>}/>
        <Route path="/profile" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ProfilePage/>
          </ProtectedRoute>
        }/>
        <Route path="/shop-create" element={<ShopCreatePage/>}/>
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route path="/shop/:id" element={
          <SellerProtectedRoute isSeller={isSeller}>
            <ShopHomePage/>
          </SellerProtectedRoute>
        } />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </BrowserRouter>
    )
   }</>
  );
}

export default App;
