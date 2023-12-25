"use client"
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

const Imagecard = (props: { headline: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; subcategory: any; singleImage: string | StaticImport }) => {

  return (

    <div className="card_container" >
      <div className="card_headline">
        {props.headline}
      </div>
      <div className=" grow mb-[44px] max-h-[400px] relative py-0 px-5 ">
        <div className="relative bg-white">
      <div className="justify-center  cursor-pointer">
        <Link href={`/search?subcategory=${props.subcategory}`} >
          <Image
            width={340}
            height={340}
            alt=""
            src={props.singleImage}
            priority
            className='max-h-[340px] min-h-[340px] pb-1'
          />
        </Link>
        <div className="w-full text-[17px] absolute block px-0 pt-4">
          <a className="cursor-pointer  text-[14px] text-primary font-semibold" >
            See more
          </a>
        </div>
        </div>
        </div>
      </div>
    </div>

  );
}

export default Imagecard
