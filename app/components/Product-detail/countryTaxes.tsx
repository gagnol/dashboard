"use client"
import React from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { SlLocationPin } from 'react-icons/sl'
import { useSelector } from 'react-redux';

const CountryTaxes = ({ discountPrice }: any) => {
    const { countryData } = useSelector((state: any) => state.next);
    const importFees = (discountPrice * (countryData[0].importFees / 100))
    const importTotalFees = importFees + countryData[0].shipping
    const totalPrice = discountPrice + countryData[0].shipping + importFees

    return (
        <>
                 
            <div className="group border border-transparent flex hover:cursor-pointer ">
            <h4 className="text-neutral-300 text-[14px] my-2 flex ">
                ${importTotalFees.toFixed(2)} Shipping & Import Fees Deposit to {countryData[0].country}
            </h4>
            <span className="py-3 text-primary flex ">Details <FaCaretDown/></span>
                <span className="absolute w-[300px] h-[170px] rounded-sm hidden
                        bg-neutral-600 border-[1px] text-neutral top-[220px] right-11
                        border-[#777] z-[1]  group-hover:block ">
                    <div className='p-2'>
                        <ul className='m-0 p-0 '>
                            <h4 className='text-[18px] font-bold p-2 border-b text-neutral-200'>
                                Shipping & Fee Details
                            </h4>
                            <li className="nav_text">Price
                                <span className='float-right'>${discountPrice.toFixed(2)}</span></li>
                            <li className="nav_text">Amazon Global Shipping
                                <span className='float-right'>${countryData[0].shipping.toFixed(2)}</span></li>
                            <li className="nav_text border-b" >Estimated Import Fees Deposit
                                <span className='float-right'>${importFees.toFixed(2)}</span></li>
                            <h4 className='font-bold text-[14px] pt-2 text-neutral-200'>Total
                                <span className='float-right'>${(totalPrice).toFixed(2)}</span>
                            </h4>
                        </ul>
                    </div>
                </span>
                         <br/>
                    </div>
                    <h4 className="flex text-[14px] text-primary my-1 ">
                    <SlLocationPin color='#949494' fontSize={16} />
                    &thinsp;Deliver to {countryData[0].country}
                </h4>
        </>
    )
}

export default CountryTaxes
