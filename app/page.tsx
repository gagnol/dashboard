import Banner from "@/app/components/Banner";
import ProductModel from '@/lib/product-model'
import Imagecard from "@/app/components/Cards/Imagecard";
import Dealcard from "@/app/components/Cards/Dealcard";
import Image from "next/image";
import Link from "next/link";
import {
  singleImage1,
  singleImage2,
  singleImage3,
  singleImage4,
  singleImage5,
  singleImage6,
  singleImage7,
  singleImage8,
  singleImage9,
  singleImage10,
  singleImage11,
  singleImage12,
  singleImage13,
  singleImage14,
  singleImage15,
} from "@/constant";
import Cuadcard from "@/app/components/Cards/quadrantcard";
import Slider from '@/app/components/Slider'
import dbConnect from "@/lib/db-connect";

export default async function Home() {
  await dbConnect();
  const singleDealDoc = (await ProductModel.find({ slug: 512 }, "-reviews").lean());
  const singleDealDoc2 = (await ProductModel.find({ slug: 546 }, "-reviews").lean());
  const bestSellerDoc = (await ProductModel.find({ bestSeller: true }, "-reviews").lean());

  const singleDeal = await JSON.parse(JSON.stringify(singleDealDoc));
  const singleDeal2 = await JSON.parse(JSON.stringify(singleDealDoc2));
  const bestSeller = await JSON.parse(JSON.stringify(bestSellerDoc));


  return (
    <main>
      <div className="max-w-screen-2xl mx-auto">
         <Banner /> 
        <div className="relative md:-mt020 lgl:-mt-32 xl:-mt-[350px] z-20 mb-10">
          <div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            <Cuadcard
              headline="Gaming Accessories"
              singleImage={[singleImage8, singleImage9, singleImage10, singleImage11]}
              subcategory={["Headsets", "Keyboard", "Computer mice", "Chair"]} />
               {singleDeal.map((deals:any) => (
                <Dealcard
                deals={deals}
                key={deals.slug} />
                ))}
            <Imagecard
              headline="Health & personal care"
              singleImage={singleImage2}
              subcategory="Personal Care"
            />
            <div className="block">
              <div className="card_container">
                <h2 className="card_headline">Sign in for the best experience</h2>
                <Link href="/signin">
                  <button className="w-full my-4 p-2 text-black bg-[#F7CA00] cursor-pointer rounded-lg 
                    hover:bg-[#e2bb0c]">
                    Sign In Securely
                  </button>
                </Link>
              </div>
              <div className='bg-transparent w-[350px] justify-center cursor-pointer relative mx-auto'>
                <Link href={`/products/557`} >
                  <Image src="/amazon1.webp" alt="" width={350} height={250} style={{ width:350, height: "auto" }}/>
                </Link>
              </div>
              <div>
                <span className=" text-[11px] text-[#888] float-right" > Sponsored </span>
              </div>
            </div>
            <Imagecard
              headline="Shop Pet supplies"
              singleImage={singleImage1}
              subcategory="Pet Supplies" />
            <Imagecard
              headline="Dresses"
              singleImage={singleImage3}
              subcategory="Dresses" />
            <Imagecard
              headline="New arrivals in toys"
              singleImage={singleImage4}
              subcategory="Toys & Games" />
            <Cuadcard
              headline="Shop by Categories"
              singleImage={[singleImage12, singleImage13, singleImage14, singleImage15]}
              subcategory={["Computers", " Video Games", "Baby", "Toys & Games"]} />
          </div>
          <div className="relative bg-neutral mb-4 pb-2 max-w-screen-2xl mx-6">
            <h2 className="text-[21px] pl-9 font-semibold pt-1">
              Best sellers
            </h2>
            <Slider products={bestSeller} />
          </div>
          <div className="justify-center items-center px-60 py-1 mb-5">
            <Link href={`/products/557`} >
              <Image src="/amazon2.webp" alt="" width={980} height={250} priority style={{ width: 980, height: "auto" }}/>
            </Link>
            <div>
              <span className="text-[11px] text-[#888] float-right pr-[80px]">Sponsored</span>
            </div>
          </div>
          <div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {singleDeal2.map((deals:any) => (
              <Dealcard
                deals={deals}
                key={deals.slug} />
            ))}
            {/* ********************************************************** */}
            <Imagecard
              headline="For your fitness needs"
              singleImage={singleImage5}
              subcategory="Fitness"
            />
            {/* ********************************************************** */}
            <Imagecard
              headline="Kindle E readers"
              singleImage={singleImage6}
              subcategory="Kindle"
            />
            {/* ********************************************************** */}
            <Imagecard
              headline="Create with strip ligths"
              singleImage={singleImage7}
              subcategory="Strip Lights"
            />
            {/* ********************************************************** */}
          </div>
        </div>
      </div>

      <div className="w-[100%] bg-neutral p-4 h-[150px] " >
        <div className="text-center text-[14px] my-[19px] px-5 mx-auto" >
          <div className=" my-2 block justify-center" >
            <Link href="/signin" >
              <button className="h-[29px] w-[220px] px-5 py-1 font-medium text-black
                 border-[#a88734]  rounded-sm bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] 
                 hover:cursor-pointer hover:opacity-75" >
                Sign in
              </button>
            </Link>
          </div>
          <div >New customer?&nbsp;
            <Link href="/register" ><span className="text-primary">Start here.</span></Link>
          </div>

        </div>
      </div>
    </main>
  );
}

