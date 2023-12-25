"use client"
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { addCart, resetFavorite } from "@/store/nextSlice";

const FavoriteProduct = ({ item }:any) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-gray-100 rounded-lg flex flex-col md:flex-row py-2 items-center gap-4 mb-2">
      <Image src={item.image} alt="Product image" width={150} height={150}
        className="max-h-[150px] min-h-[150px]	" />
      <div className="flex items-center px-2 gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold text-amazon_blue">{item.title}</p>
          <p className="text-sm text-gray-500">{item.description}</p>
          <p className="text-sm text-gray-600">
            Unit price:{" "}
            <span className="font-semibold text-amazon_blue">
              {item.price}
            </span>
          </p>
          <button  className="w-44 h-10 font-medium bg-amazon_blue text-white rounded-md hover:bg-amazon_yellow duration-300 hover:text-black mt-2"
          >
            add to cart
          </button>
        </div>
        <div className="text-lg font-semibold text-amazon_blue">
          {item.price * item.quantity}
        </div>
      </div>
    </div>
  );
};

export default FavoriteProduct;