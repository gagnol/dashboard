"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import useSWR from 'swr';

const fetcher = (url:any) => fetch(url).then((res) => res.json());
const All = () => {
// SUB-CATEGORIES 
const router = useRouter();
const onSelectChange = (e:any) => {
  const subcategory = e.target.value;
  router.push(`/search?subcategory=${subcategory}`)
}
const { data, error } = useSWR('/api/products/subcategories', fetcher)



    return (

        <select id='select' name='select'
            className="w-12 h-full bg-gray-200 text-black text-[13px]
            flex items-center justify-center right-0 rounded-tl-md 
            rounded-bl-md hover:cursor-pointer" onChange={onSelectChange}>
            <option value='all'>All</option>
            {data
                ? data.subcategories.map((item:any) => {
                    return <option key={item}>{item}</option>;
                })
                : null}
        </select>

    )
}

export default All
