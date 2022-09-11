import React, { useEffect } from 'react';
import { AvailableDates, ShareModal } from '../components/product';
import { nanoid } from 'nanoid';
import { MdArrowBackIosNew, MdLocationOn } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import { getDistance } from 'geolib';
import { BsShare } from 'react-icons/bs';
import CustomCarousel from '../components/product/carousel/CustomCarousel';
import { useState } from 'react';
import { backendUrl, helpHttp } from '../helpers/helpHttp';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from '../utils';
import { Carousel } from 'react-responsive-carousel';
import useDevice from '../hooks/useDevice';
import Policies from '../components/policies/Policies';
import useScore from '../hooks/useScore';
import Map from '../components/map/Map';

const ProductItem = () => {
  const [showCarousel, setShowCarousel] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [getStars, getWrittenScore] = useScore();
  const [isLoading, setisLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [, , isDesktop] = useDevice();
  const navigate = useNavigate();
  const api = helpHttp();
  const pathname = window.location.pathname;

  const getProduct = async () => {
    const response = await api.get(`${backendUrl}${pathname}`);
    if (!response.ok) {
      navigate('/404');
    } else {
      setProduct(await response.json());
      setisLoading(false);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {showCarousel && isDesktop && (
        <CustomCarousel
          setShowCarousel={setShowCarousel}
          productImages={product?.images}
        />
      )}
      {showShareModal && (
        <ShareModal
          productId={product.id}
          setShowShareModal={setShowShareModal}
        />
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <div className='bg-white text-secondary font-medium pb-10'>
          <div className='bg-tertiary pr-10 py-2 pl-10 '>
            <div className='container mx-auto flex justify-between '>
              <div className='w-full'>
                <h2 className='text-white text-lg font-normal'>Hotel</h2>
                <h2 className='text-white text-xl font-bold'>
                  {product?.title}
                </h2>
              </div>
              <Link to='/' className='flex-center'>
                <MdArrowBackIosNew className='text-xl text-white' />
              </Link>
            </div>
          </div>
          <div className='w-full p-5 pr-10 pl-10 bg-neutral'>
            <div className='container mx-auto flex justify-between '>
              <div className='flex items-center gap-3'>
                <MdLocationOn className='text-xl' />
                <div>
                  <h3 className='text-lg font-bold'>
                    {product?.city.name}, {product?.city.country}
                  </h3>
                  <h3 className='font-semibold'>
                    A&nbsp;
                    {(
                      getDistance(
                        {
                          latitude: product.latitude,
                          longitude: product.longitude,
                        },
                        {
                          latitude: product.city.latitude,
                          longitude: product.city.longitude,
                        }
                      ) / 1000
                    ).toFixed(2)}
                    &nbsp;km del centro
                  </h3>
                  {/* <h3 className='font-semibold'>A 940m del centro</h3> */}
                </div>
              </div>
              {product?.scores > 0 ? (
                <div className='flex items-center gap-2 '>
                  <div className='flex flex-col items-center'>
                    <p className='font-semibold text-sm'>
                      {getWrittenScore(product?.scores * 2)}
                    </p>
                    <span className='flex text-primary text-lg'>
                      {getStars(product?.scores)}
                    </span>
                  </div>
                  <h2 className='bg-secondary px-[14px] py-3 rounded-xl text-xl leading-none text-white font-semibold'>
                    {product?.scores * 2}
                  </h2>
                </div>
              ) : (
                <p className='font-bold mt-3'>Nuevo</p>
              )}
            </div>
          </div>
          <div className='container mx-auto'>
            <div className='flex w-fit'>
              <button
                className='p-5 pl-10 container mx-auto'
                onClick={() => setShowShareModal(true)}
              >
                <BsShare className='text-xl hover:scale-125 cursor-pointer' />
              </button>
              <button>
                <AiOutlineHeart className='text-2xl hover:scale-125 cursor-pointer' />
              </button>
            </div>
          </div>
          {isDesktop ? (
            <div className='lg:grid grid-cols-4 px-10 pt-0 gap-3 pb-5 relative container mx-auto'>
              {product &&
                product?.images.slice(0, 5).map((img) => {
                  return (
                    <div
                      className='overflow-hidden first-of-type:col-span-2 first-of-type:row-span-2 h-60 max-h-[31rem] first-of-type:h-full hover:scale-[102%] duration-300 cursor-pointer ease-in-out'
                      key={nanoid()}
                      onClick={() => setShowCarousel(true)}
                    >
                      <img
                        src={img.name}
                        alt=''
                        className='w-full h-full object-cover rounded-lg'
                      />
                    </div>
                  );
                })}
              <button
                className='absolute bottom-8 right-16 underline text-white font-bold hover:scale-110 '
                onClick={() => setShowCarousel(true)}
              >
                Ver más
              </button>
            </div>
          ) : (
            <div>
              <Carousel
                autoPlay
                infiniteLoop
                interval={3000}
                showIndicators={false}
                // showStatus={false}
                showThumbs={false}
                showArrows={false}
                statusFormatter={(currentItem, total) =>
                  `${currentItem} / ${total}`
                }
              >
                {product?.images.map((img) => {
                  return (
                    <img
                      src={img.name}
                      key={nanoid()}
                      className='rounded-lg h-[500px] w-full object-cover'
                    />
                  );
                })}
              </Carousel>
            </div>
          )}
          <div className='container mx-auto'>
            <div className='pt-5 pl-10 pb-0 text-2xl font-bold '>
              <h2>Alojate en el corazón de {product?.city.name}</h2>
            </div>
            <div className='p-5 pl-10 pr-10 text-tertiary'>
              <p className='whitespace-pre-line'>{product?.description}</p>
            </div>
            <div className='p-5 pl-10 pr-10 pb-5 border-2 border-white border-b-primary'>
              <h2 className='text-2xl font-bold'>¿Qué ofrece este lugar?</h2>
            </div>
            <div>
              <ul className='grid grid-cols-2 lg:grid-cols-4 p-10 gap-5'>
                {product &&
                  product?.characteristics.map((caract) => {
                    return (
                      <div
                        key={caract.name}
                        className='flex items-center gap-2'
                      >
                        <i
                          className={`text-primary px-1 fas ${caract.icon_url}`}
                        />
                        <p>{caract.name}</p>
                      </div>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className='pl-3 pt-7 font-bold border-b-primary bg-neutral'>
            <AvailableDates
              reservations={product.reservations}
              productId={product.id}
            />
          </div>
          {/* <div className='p-10 pb-5 text-2xl font-bold border-2 border-white border-b-primary'>
          <h2>¿Dónde vas a estar?</h2>
        </div> */}
          {/* <div className='text-tertiary p-10'>{location}</div> */}
          <Map
            title={product?.title}
            city={product?.city.name}
            country={product?.city.country}
            centerLat={product?.city.latitude}
            centerLong={product?.city.longitude}
            prodLat={product?.latitude}
            prodLong={product?.longitude}
          />
          <Policies
            policies={product?.policies}
            checkOut={product?.checkOut}
            cancellation={product?.cancellation}
          />
        </div>
      )}
    </>
  );
};
export default ProductItem;
