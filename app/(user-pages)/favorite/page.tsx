"use client"
import React from "react";
import { useSelector } from "react-redux";
import FavoriteProduct from "@/app/components/FavoriteProduct";
import ResetFavoriteItems from "@/app/components/ResetFavoriteItems";
import Link from "next/link";

const FavoritePage: React.FC = () => {
  const { favoriteData } = useSelector((state:any) => state.next);

  return (
    <div className="max-w-screen-xl mx-auto px-6 gap-10 py-4">
      {favoriteData.length > 0 ? (
        <div className="bg-neutral p-4 rounded-lg">
          <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1">
            <p className="text-2xl font-semibold text-amazon_blue">
              Favorite Items
            </p>
            <p className="text-lg font-semibold text-amazon_blue">Action</p>
          </div>
          <div>
            {favoriteData.map((item:any) => (
              <div key={item._id} className="mt-2">
                <FavoriteProduct item={item} />
              </div>
            ))}
            <ResetFavoriteItems />
          </div>
        </div>
      ) : (
        <div className="bg-white h-96 flex flex-col items-center 
        justify-center py-5 rounded-lg shadow-lg">
          <h1>Nothing is available in the Favorite list</h1>
          <Link href="/">
            <button className="w-52 h-10 btn btn-alert text-white rounded-lg 
            text-sm font-semibold hover:bg-[#f7cba00] hover:text-black duration-300 mt-2">
              go to shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritePage;