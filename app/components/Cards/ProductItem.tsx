import React from "react";
import Link from "next/link";
import Rating from "../rating";
import Image from "next/image";

const ProductItem = ({ product }:any) => {
  return (
    <article className="border border-gray-200 overflow-hidden bg-white shadow-sm rounded mb-5">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 flex p-3">
          <div className="w-[80%] h-[70%] relative"  >
            <Image
              src={ product.image[0] }
              alt="product anme"
              height="240"
              width="240"
              className="min-h-[240px] max-h-[240px]"
            />
          </div>
        </div>
        <div className="md:w-2/4">
          <div className="p-4">
            <Link href={`/product/${product.slug}`} className="hover:text-blue-600" >
              {product.name}
            </Link>
            <div className="flex flex-wrap items-center space-x-2 mb-2">
              <div className="ratings">
                <div className="my-1">
                <Rating value={product.rating} />
                </div>
              </div>
              <b className="text-gray-300">•</b>
              <span className="ml-1 text-yellow-500">{product?.rating}</span>
            </div>
            <p className="text-gray-500 mb-2">
              {product?.description.substring(0, 150)}...
            </p>
          </div>
        </div>
        <div className="md:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-200">
          <div className="p-5">
          {product.discount > 0 ?
                  <>
                    <div className="flex items-start ">
                      <h5 className="text-[28px] text-[#CC0C39] ">-{product.discount}%</h5>
                      &nbsp;
                      <h4 className="text-[28px] pl-2">
                        <span className="text-[13px] align-middle">$</span>
                        {(product.price - (product.price * (product.discount / 100))).toFixed(2)}
                      </h4>
                    </div>
                    <div >
                      <h6>List price :</h6>
                      &nbsp; <h6 > ${(product.price)}</h6>
                    </div>
                  </>
                  :
                  <div className="flex">
                    <h5>Price:</h5> <span className="text-[13px] align-middle">$</span>
                    <h4 className="text-[28px] pl-2">{product.price}</h4>
                  </div>
                }
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductItem;