"use client"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative ">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={4000}
      >
        <div>
          <Image priority src="/slide_15.jpg" alt="sliderImg" width={1500} height={600} />
        </div>
        <div>
        <Link href={`/product/512`} >
          <Image  priority src="/slide_11.jpg" alt="sliderImg" width={1500} height={600} 
            className="hover:cursor-pointer"/>
          </Link>
        </div>
        <div>
        <Image  priority src="/slide_12.jpg" alt="sliderImg" width={1500} height={600} />
        </div>
        <div>
        <Image  priority src="/slide_13.jpg" alt="sliderImg" width={1500} height={600} />
        </div>
        <div>
        <Image  priority src="/slide_14.jpg" alt="sliderImg" width={1500} height={600} />
        </div>
      </Carousel>
      <div className="w-full h-40 bg-gradient-to-t from-gray-100 to-transparent absolute bottom-0 z-20"></div>
    </div>
  );
};

export default Banner;
