"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


export default function Dealcard({deals}:any) {

  function truncate(string:string, n:number) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  return (
    <div className="card_container">
      <div >
        <h2 className="card_headline">Top Deal</h2>
      </div>
      <div className="grow mb-[44px] max-h-[400px] relative py-0 px-5 ">
        <div className="relative bg-white">
          <div className="justify-center cursor-pointer w-[340] h-[280]" >
            <Link href={`/products/${deals.slug}`} >
              <Image alt="Essentials" src={deals.image[0]} 
              width={340} height={280} priority 
              className='max-h-[280px] min-h-[280px]  pb-1'
              />
            </Link>
          </div>
        </div>
        <div className=" flex mt-2 ">
          <span className="bg-[#CC0C39] realtive text-white px-[4px] py-[6px] text-sm ">
            Up to {deals.discount}  % off
          </span>
          <span className="text-[#CC0C39] ml-1 p-1"><b>Top deal</b></span>
        </div>
        <div className=" text-xs pt-1">
   
        {truncate(deals.name, 90)}
        </div>
        <div className="w-full text-[17px] absolute block px-0 pt-2 ">
          <a className="cursor-pointer text-[14px] text-primary font-semibold " >
            See all deals
          </a>
        </div>
      </div>
    </div>
  );
}
