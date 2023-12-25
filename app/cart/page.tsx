"use client"
import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "@/app/components/Cart/CartProduct";
import ResetCart from "@/app/components/Cart/ResetCart";
import Link from "next/link";
import CartPayment from "@/app/components/Cart/CartPayment";

const CartPage = () => {
  const { productData } = useSelector((state:any) => state.next);


  return (
    <div className="max-w-screen-2xl mx-auto px-6 grid md:grid-cols-2 xl:grid-cols-5 gap-2 py-4">
      {productData.length > 0 ? (
        <>
          <div className="bg-neutral col-span-4 p-4 rounded-lg">
            <div className="flex items-center justify-between border-b-[1px] border-b-white pb-1">
              <p className="text-2xl font-semibold text-amazon_blue">
                Shopping Cart
              </p>
            </div>
            <div className="p-2 flex flex-col gap-2  bg-neutral">
              {productData.map((item:any) => (
                <div key={item._id}>
                  <CartProduct item={item} />
                </div>
              ))}
              <ResetCart/>
            </div>
          </div>
          <div className="bg-neutral h-65 col-span-1 p-4 rounded-lg flex items-center justify-center">
            <CartPayment/>
          </div>
          <div className="xl:w-[1000px] md:w-[300px] md:m-1 border-[1px] p-4 m-10 bg-neutral">
             <p>
             The price and availability of items at Amazon.com are subject to change.
             The Cart is a temporary place to store a list of your items and reflects each item&apos;s most recent price.
             <a className="text-primary" >
             Learn more
             </a>
             </p>
             <p>Do you have a gift card or promotional code? We&apos;ll ask you to enter your claim code when it&apos;s time to pay.
             </p>
          </div>
        </>
      ) : (
        <div className=" h-64 col-span-5 flex flex-col items-center 
        justify-center py-5 rounded-lg shadow-lg bg-neutral">
          <h1 className="text-lg font-medium">Your cart is empty!</h1>
          <Link href={"/"}>
            <button className="w-52 h-10 bg-amazon_blue text-white rounded-lg text-sm font-semibold hover:bg-amazon_yellow hover:text-black">
              go to shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
