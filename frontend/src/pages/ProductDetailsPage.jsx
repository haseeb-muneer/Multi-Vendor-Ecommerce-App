import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProductDetail from "../components/Product/ProductDetail"
import SuggestedProduct from "../components/Product/SuggestedProduct";
import { useState , useEffect } from 'react'
import { productData } from '../static/data'
import { useParams } from 'react-router-dom'
function ProductDetailsPage() {
    const [data,setData]=useState(null);
        const {name}=useParams();
        const productName=name.replace(/-/g," ");
        useEffect(()=>{
            const data=productData.find((i)=>i.name===productName);
            setData(data);
          
        })
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