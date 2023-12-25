'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface Prop {
  item: any;
  i: number;
}

const TabsComponent = ({product,setIndex,index}:any) => {

  const [selectedTab, setSelectedTab] = useState(0);
  const firstBtnRef = useRef<any>();

  useEffect(() => {
    firstBtnRef.current.focus();
  }, []);

  return (
    <div className='bg-base-200 flex py-2 w-[1400px]'>
      <div className=' flex flex-col gap-y-2 w-full'>
        <div className='bg-base-300 p-1 rounded-xl flex justify-between 
        items-center gap-x-2 font-bold text-primary'>
          {items.map((item, i) => (
            <button
              ref={i === 0 ? firstBtnRef : null}
              key={i}
              onClick={() => setSelectedTab(i)}
              className={`outline-none w-full p-2 hover:bg-[#999]  text-cneter 
              focus:ring-2  focus:bg-white focus:text-primary ${selectedTab === i ?
                 'ring-2 bg-white text-primary' : ''
                } `}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className='bg-base-300 p-5 rounded-xl'>
          {items.map((item, i) => (
            <div key={item.content} className={`${selectedTab === i ? '' : 'hidden'}`}>
              {item.content===1?(
              <>
          <div className=' p-4 w-full'>
        <h1 className='text-3xl text-blue-600'>VIDEOS</h1>
        <div>
          {product.video?.map((item:any, i:number)  => (
            <div className="inline-flex justify-between mx-4" key={i}>
              <video width={300} height={300} className="max-h-[300px] min-h-[300px]" muted={false}
                controls={true} playsInline preload="auto" id="miVideo">
                <source
                  key={i}
                  src={(item)}
                  type="video/mp4"
                  onMouseEnter={() => setIndex(i)}
                />
              </video>
            </div>
          ))}
        </div>
      </div>      
              
              </>
              ):(
              <>
        <div className=' p-4'>
        <h1 className='text-3xl text-blue-600'>IMAGES</h1>
        <div className="flex flex-wrap justify-start mx-5">
          <Image
            src={product.image[index]}
            alt={product.name}
            width={483}
            height={483}
            sizes="100vw"
            className="max-h-[483px] min-h-[483px] min-w-[483px]"
          />
          <div className="flex flex-wrap justify-start mx-5">
            {product.image?.map((item:any, i:number) => (
              <div className='inline-flex justify-between mt-4 border-transparent border-[3px]
              max-h-[100px]
                  hover:border-[#c45500] cursor-pointer'
                key={i}>
                <Image
                  width={100}
                  height={100}
                  className="max-h-[100px] min-h-[100px]"
                  alt=""
                  key={i}
                  src={(item)}
                  onMouseEnter={() => setIndex(i)}
                  loading='lazy'
                />
              </div>
            ))}
         
          </div>
        </div>
      </div>
              </>) }

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabsComponent;

const items = [
  {
    title: 'VIDEOS',
    content:1
  },
 
  {
    title: 'IMAGES',
    content:2 
  },

];