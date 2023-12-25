
"use client"
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux';

function FavoriteList() {
    
  const { favoriteData, } = useSelector(
    (state:any) => state.next
  );
  return (
    <div>
     {/* fovorite */}
     <Link
          href={"/favorite"}
          className="text-xs text-gray-100 flex 
          flex-col justify-center p-3 border border-transparent
           hover:border-white cursor-pointer duration-300 h-[70%] relative"
        >
          <p>Marked</p>
          <p className="text-white font-bold flex items-center">& Favorite</p>
          {favoriteData.length > 0 && (
            <span className="absolute right-2 top-2 w-4 h-4 border-[1px]
             border-gray-400 flex items-center justify-center text-xs text-amazon_yellow">
              {favoriteData.length}
            </span>
          )}
        </Link>   
    </div>
  )
}

export default FavoriteList
