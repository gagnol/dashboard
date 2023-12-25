
import ProductModel from "@/lib/product-model";
import Image from "next/image";
import Link from "next/link";
import { SlLocationPin } from "react-icons/sl";
import SearchInput from "./SearchInput";
import SigninTool from "./SigninTool";
import FavoriteList from "./FavoriteList";
import CartTool from "./CartTool";
import All from "./All";
import CountryLocation from "./CountryLocation";


const Navbar = async () => {

  const productDocs = (await ProductModel.find())
  const product = JSON.parse(JSON.stringify(productDocs));


  return (
    <div className="w-full h-20 bg-[#131921] text-light top-0 z-50">
      <div className="h-full w-full mx-auto inline-flex items-center justify-between 
             gap-1 mdl:gap-3 px-4">
        <Link
          href={"/"}
          className="px-2 border border-transparent hover:border-white cursor-pointer
                    duration-300 flex items-center justify-center h-[70%]">
          <Image className="w-28 object-cover h-[auto] mt-1"
            src="/logo.png" alt="logo" width={174} height={34}
            style={{ width: 100, height: "auto" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </Link>
       <CountryLocation id={0} country={""} shipping={0} importFees={0}/>
        {/*  */}
        {/* search */}
        <div className="flex-1 h-10 hidden md:inline-flex items-center justify-between relative">
          <All />
          {/*  Searchfield  */}
          <SearchInput placeholder={" search product ..."} product={product} />
        </div>
        <SigninTool />
        <FavoriteList />
        <CartTool />
        {/* Theme */}
        <div className="flex gap-2">
          <label className="flex cursor-pointer gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
            <input type="checkbox" value="luxury" className="toggle theme-controller" name="luxury" />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          </label>
        </div>
      </div>
    </div>
  )

}

export default Navbar;