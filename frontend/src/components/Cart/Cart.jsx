import React from 'react'
import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx'
import styles from '../../styles/styles'
import {IoBagHandleOutline} from "react-icons/io5";
import {HiPlus , HiOutlineMinus} from "react-icons/hi";
import {Link} from "react-router-dom";
function Cart({setOpenCart}) {
    const cartData=[
        {
            name:"Iphone 14 pro max 256gb 8gb ram",
            description:"test",
            price:999
        },
        {
            name:"Iphone 14 pro max 256gb 8gb ram",
            description:"test",
            price:999
        },
        {
            name:"Iphone 14 pro max 256gb 8gb ram",
            description:"test",
            price:999
        }
    ]
  return (
    <div className='fixed w-full top-0 left-0 bg-[#0000004b] h-screen z-10'>
    <div className='fixed top-0 right-0 w-[25%] bg-white min-h-full flex flex-col justify-between'>
        <div>
            <div className='flex justify-end w-full pt-5 pr-5'>
                <RxCross1 size={25} className='cursor-pointer' onClick={()=>setOpenCart(false)}/>
            </div>
            <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25}/>
                <h5 className='text-[20px] font-[500] pl-2'>3 items</h5>
            </div>
           {/* {single cart item} */}
           <br/>
           <div className='w-full border-t'>
            {
                cartData && cartData.map((i,index)=>(
                    <CartSingle data={i} key={index}/>
                ))
            }
           </div>
         </div> 
         <div className='px-5 mb-3'>
            <Link to="/checkout">
            <div className={`h-[45px] w-[100%] flex items-center justify-center bg-[#e44343] rounded-[5px]`}>
              <h1 className='text-[#fff] text-[18px] font-[600]'>Checkout Now (USD$1080)
              </h1>
            </div>
            </Link>
            </div>   
        </div>
    </div>
  )
}
const CartSingle=({data})=>{
    const [value,setValue]=useState(1);
    const totalPrice=value*data.price;
    return (
        <div className='border-b p-4'>
            <div className='w-full flex items-center'>
                <div>
                    <div className={`${styles.noramlFlex} bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] justify-center cursor-pointer`} onClick={()=>setValue(value + 1)}>
                       <HiPlus size={18} color="#fff" />
                    </div>
                    <span className='pl-[10px]'>{value}</span>
                    <div className='bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer' onClick={()=>setValue(value===1? 1 : value -1)}>
                      <HiOutlineMinus size={16} color="#7d879c"/>
                    </div>
                </div>
                <img src='https://bonik-react.vercel.app/assets/images/products/Fashion?Clothes/1.SilverHighNeckSweater.png' alt='' className='w-[80px] h-[80px] ml-2'/>
                <div className='pl-[5px]'>
                    <h1>{data.name}</h1>
                    <h4 className='font-[400] text-[15px] text-[#00000082]'>${data.price} * {value}</h4>
                    <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>
                        US${totalPrice}
                    </h4>
                </div>
                <RxCross1 className='cursor-pointer'/>
            </div>

        </div>
    )
}

export default Cart