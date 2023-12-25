
"use client"
import React from 'react'
import { useDispatch } from 'react-redux';
import { addFavorite } from '@/store/nextSlice';
import toast from "react-hot-toast";

interface AddToFavoriteProps {
    product:any;
  }
  
const AddToFavorite: React.FC<AddToFavoriteProps> = ({product}) => {
    const dispatch = useDispatch();
  return (
    <>
        <button className="btn btn-outline btn-primary w-full my-4 p-1 cursor-pointer rounded-sm
                hover:bg-[#666]"
                  onClick={() =>
                    dispatch(
                      addFavorite({
                        _id: product._id,
                        brand: product.brand,
                        category: product.category,
                        description: product.description,
                        image: product.image[0],
                        price: product.price,
                        name: product.name,
                        quantity: 1,
                        video: [""],
                        slug: "",
                        subcategory: "",
                        rating: 0,
                        numReviews: 0,
                        countInStock: 0,
                        isFeature: "",
                        discount: 0,
                        topDeal: "",
                        bestSeller: "",
                        colors: [""]
                   
                      }),
                      toast.success('Product add to your wishlist', { duration: 4000, position: "top-center", })
                    )
                    
                    } >
                  Add to List
                </button>
    </>
  )
}
 
export default AddToFavorite