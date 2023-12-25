"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux';

const CartTool = () => {

    const { productData} = useSelector(
        (state:any) => state.next
      );
  return (
    <>
       <Link
          href={"/cart"}
          className="flex items-center px-2 border border-transparent
           hover:border-white cursor-pointer duration-300 h-[70%] relative"
        >
          <Image
            className="w-auto object-cover h-8"
            src="/cartIcon.png"
            alt="cartImg"
            width={100}
            height={50}
          />
          <p className="text-xs text-white font-bold mt-3">Cart</p>
          <span className="absolute text-amazon_yellow text-sm top-2 left-[29px] font-semibold">
            {productData ? productData.length : 0}
          </span>
        </Link>
    </>
  )
}

export default CartTool
