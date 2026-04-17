import {Navigate} from "react-router-dom";
const SellerProtectedRoute=({isSeller , children})=>{
    console.log(`this is isSeller from SellerProtecedRoute ${isSeller}`);
    if(!isSeller){
        return <Navigate to="/" replace />
    }
    return children
}
export default SellerProtectedRoute