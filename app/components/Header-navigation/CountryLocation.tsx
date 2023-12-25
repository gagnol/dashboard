"use client"
import React, { useEffect, useState } from 'react';
import { SlLocationPin } from 'react-icons/sl';
import Modal from '../Modal';
import { useDispatch, useSelector } from 'react-redux';
import { countryLocation } from '@/constant/index';
import { addCountry } from '@/store/nextSlice';

interface CountryLocationProps {
  id:number,
  country:string,
  shipping: number,
  importFees:number,
}

const CountryLocation: React.FC<CountryLocationProps> = () => {
  
  const { countryData } = useSelector((state: any) => state.next);
  
  const dispatch = useDispatch();

  const [country, setCountry] = useState<string>('');

  useEffect(() => {
    if (country ) {
      const taxRates = countryLocation.filter((item) => item.country === country);
      console.log(taxRates)
      const data = {
        country,
        shipping: taxRates[0].shipping,
        importFees: taxRates[0].importFees,
      };
      dispatch(addCountry( [data] ));
    }
  }, [country,dispatch]);

  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    /* Country location */
    <>
      {countryData[0]?.country !== '' ? (
        <>
          <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 items-center justify-center h-[70%] hidden xl:inline-flex gap-1">
            <SlLocationPin />
            <div className="text-xs" onClick={openModalHandler}>
              <p>Deliver to</p>
              <p className="text-white font-bold uppercase">{countryData[0]?.country}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 items-center justify-center h-[70%] hidden xl:inline-flex gap-1">
            <SlLocationPin />
            <div className="text-xs" onClick={openModalHandler}>
              <p>Hello</p>
              <p className="text-white font-bold uppercase">Select your address</p>
            </div>
          </div>
        </>
      )}

      <Modal isOpen={showModal} onDismiss={closeModalHandler} title="Choose your location">
        <div className="flex rounded-[8px] w-[375px] h-[375px] bg-base ">
                     
            <div className="relative w-full text-neutral-300 text-center justify-center pt-10">
              <span className="text-[11px]">
                Delivery options and delivery speeds may vary for different locations
              </span>
              <h3 aria-hidden="true">Sign in to see your addresses</h3>
              
              <div className='pt-10'>
                <h5 className='py-5'>_____________ or _____________</h5>
                <select

                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  className="select select-primary w-full max-w-xs"
                >
                  <option disabled selected value="Choose your location">Ship outside the US</option>
                  {countryLocation.map((countries) => (
                    <option key={countries.id} value={countries.country}>
                      {countries.country}
                    </option>
                  ))}
                </select>
                <button
                  className="w-auto btn btn-primary btn-outline rounded-[8px] mt-5 cursor-pointer float-right"
                  type="button"
                  onClick={closeModalHandler}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        
      </Modal>
    </>
  );
};

export default CountryLocation;
