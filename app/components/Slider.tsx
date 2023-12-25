"use client"
import Image from "next/image";
import Link from "next/link";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Rating from "./rating";


function Slider({ products }:any) {

    const slideLeft = () => {
        var slider = (document.getElementById('slider')as any);
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = () => {
        var slider =( document.getElementById('slider')as any);
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    return (
        <>
            <div className='flex items-center bg-base-100 mx-10 py-5'>
                <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
                <div
                    id='slider'
                    className='flex w-full h-full overflow-x-scroll scroll whitespace-nowrap 
                      scroll-smooth scrollbar-hide'>
                    {products?.map((item:any) => (
                        <div className=" inline-block mx-1 rounded-lg border border-gray-200
                            shadow-md max-w-[200px] h-[300px]" key={item.slug}>
                                <Link href={`/products/${item.slug}`}  >
                                    <Image
                                        className="max-h-[200px] min-h-[200px] max-w-[200px] p-2 
                                         hover:cursor-pointer "
                                        width={200}
                                        height={200} alt="i"
                                        src={item.image[0]}
                                        
                                    />
                                </Link>
                                <div className="flex flex-col justify-start p-2 overflow-hidden
                                text-[14px] text-neutral-content ">
                                    <p className="font-semibold">{item.name.substring(0, 20)}...</p>
                                    <Rating value={item.rating} />
                                    <p className="text-neutral-content">${item.price}</p>
                                </div>
                            </div>
                    ))}
                </div>
                <MdChevronRight className='opacity-50 cursor-pointer 
                hover:opacity-100' onClick={slideRight} size={40} />
            </div>
        </>
    );
}

export default Slider;