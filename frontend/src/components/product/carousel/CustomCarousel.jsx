import { nanoid } from "nanoid";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./customCarousel.css";

const CustomCarousel = ({ setShowCarousel, productImages }) => {
  return (
    <div className="bg-secondary/95 w-screen h-screen fixed z-10 flex-center -mt-24">
      <div className="w-[50vw] max-w-[800px] h-fit bg-white relative rounded-lg mt-5 container mx-auto">
        <div
          className="text-white text-2xl absolute right-5 top-3 z-50 hover:scale-125 cursor-pointer"
          onClick={() => setShowCarousel(false)}
        >
          X
        </div>
        {/* <h5 className='absolute z-10 inset-x-0 flex-center top-[68%] font-medium'>{productImages}/{productImages.length}</h5> */}
        <Carousel
          autoPlay
          infiniteLoop
          interval={2000}
          showIndicators={false}
          showStatus={false}
        >
          {productImages.map((img) => {
            return <img src={img.name} key={nanoid()} />;
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default CustomCarousel;
