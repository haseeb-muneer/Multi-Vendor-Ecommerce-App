import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProductDetail from "../components/Product/ProductDetail"
import SuggestedProduct from "../components/Product/SuggestedProduct";
import { useState , useEffect } from 'react'
import { productData } from '../static/data'
import { useParams } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux';
import { getAllProductShop } from '../redux/actions/product';
function ProductDetailsPage() {
const { allProducts } = useSelector((state) => state.products);
// console.log(`prodducts included ${products}`);
// console.log(products);
    const [data,setData]=useState(null);
        const {id}=useParams();
        // const productName=name.replace(/-/g," ");
       useEffect(() => {
    if (allProducts && allProducts.length > 0) {
        const data = allProducts.find((i) => i._id===id);
        
        setData(data);
    }
}, [data , allProducts]);
  return (
    <div>
    <Header/>
    <ProductDetail data={data}/>
    {data && <SuggestedProduct data={data}/>}
    <Footer/>
  </div>
  )
}

export default ProductDetailsPage