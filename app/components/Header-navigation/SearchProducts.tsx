"use client"
import React from "react";

import Image from "next/image";



const SearchProducts = ({ item }:any) => {
  return (
    <div className="flex items-center gap-4 z-30 bg-neutral-content p-2">
      <Image className="w-24 max-h-[100px] min-h-[100px]" src={item.image[0]} alt="productImage" width={100} height={100} />
      <div>
        <p className="text-xs -mb-1">
          {item.brand}_{item.category}
        </p>
        <p className="text-lg font-medium">{item.name}</p>
        <p className="text-xs">{item.description.substring(0, 100)}</p>
        <p className="text-sm flex items-center gap-1">
          price:{" "}
          <span className="font-semibold">
        {item.price}
          </span>
      
        </p>
      </div>
     
    </div>
  );
};

export default SearchProducts;