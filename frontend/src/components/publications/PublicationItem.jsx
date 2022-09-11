import React, { useState } from 'react';
import { MdLocationOn } from 'react-icons/md';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ReadMore from '../../utils/ReadMore';
import useScore from '../../hooks/useScore';
import '@fortawesome/fontawesome-free/js/all.js';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useAuth } from '../../context';
import { helpHttp, backendUrl } from '../../helpers/helpHttp';

const PublicationItem = ({
  id,
  img,
  title,
  description,
  distance,
  category,
  caracteristics,
  score,
  latitude,
  longitude,
  favourite,
  getPublications,
  isFavourite,
}) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const [getStars, getWrittenScore] = useScore();
  const { currentUser } = useAuth();
  const api = helpHttp();
  const navigate = useNavigate()
  const [newFav, setNewFav] = useState(false);

  const toggleFavourite = async (method) => {
    const body = {
      user: currentUser.id,
      product: id,
    };
    let response = null;
    if (method === 'add') {
      response = await api.post(`${backendUrl}/favourites`, {
        body: body,
      });
      setNewFav(true);
    }
    if (method === 'delete') {
      response = await api.del(`${backendUrl}/favourites`, {
        body: body,
      });
      setNewFav(false);
      getPublications();
    }

    await response.json();
  };

  const heartClick = (method) => {
    if (currentUser) {
      toggleFavourite(method);
    }else{
      navigate("/login")
    }
  };

  return (
    <div className='w-11/12 lg:w-[47%] md:h-96 py-1 bg-white md:flex-center rounded-lg shadow-first relative'>
      <div className='relative w-auto md:w-full h-96 mx-1 md:mr-1 md:ml-0'>
        <img
          src={img}
          alt=''
          className='w-full h-full object-cover rounded-lg'
        />
        {favourite || newFav ? (
          <AiFillHeart
            className='absolute top-3 right-3 text-white text-2xl hover:scale-125 cursor-pointer'
            onClick={() => heartClick('delete')}
          />
        ) : (
          <AiOutlineHeart
            className='absolute top-3 right-3 text-white text-2xl hover:scale-125 cursor-pointer'
            onClick={() => heartClick('add')}
          />
        )}
      </div>

      <div className='w-full px-6 lg:px-3'>
        <div className='flex justify-between'>
          <div>
            <p className='uppercase text-sm mt-3 font-bold flex items-center gap-1'>
              <span className='opacity-60'>{category} </span>
              <span className='flex text-primary text-lg'>
                {score > 0 && getStars(score)}
              </span>
            </p>
            <h2
              className={`text-secondary text-2xl font-bold pb-3 h-16 w-full flex overflow-y-hidden ${
                title.length < 20 && 'items-center'
              }`}
            >
              {title}
            </h2>
          </div>
          {score > 0 ? (
            <div className='flex flex-col items-end pt-3'>
              <h2 className='bg-secondary px-[14px] py-1 rounded-xl text-2xl leading-none text-white font-semibold'>
                {score * 2}
              </h2>
              <p
                className={`font-semibold text-sm whitespace-nowrap ${
                  getWrittenScore(score * 2).length < 6 && 'pr-1'
                }`}
              >
                {getWrittenScore(score * 2)}
              </p>
            </div>
          ) : (
            <p className='font-bold pr-2'>Nuevo!</p>
          )}
        </div>
        <div className='flex items-center gap-2 text-tertiary mt-2'>
          <MdLocationOn className='text-secondary' />
          <p>
            {distance} km del centro
            <a
              href={`https://maps.google.com/?q=${latitude},${longitude}`}
              className='text-primary uppercase text-sm'
              target='_blank'
            >
              {' - mostrar en mapa'}
            </a>
          </p>
        </div>
        <div className='flex text-secondary text-xl my-3 md:my-1'>
          {caracteristics.map((caract, idx) => {
            return (
              <i
                key={idx}
                className={`text-primary px-1 fa-solid ${caract.icon_url}`}
              />
            );
          })}
        </div>

        <div className='mt-4 h-24 w-full overflow-y-scroll whitespace-pre-line'>
          <ReadMore isReadMore={isReadMore} setIsReadMore={setIsReadMore}>
            {description}
          </ReadMore>
        </div>
        <Link to={`/products/${id}`}>
          <button className='btn-primary w-full my-3'>Ver más</button>
        </Link>
      </div>
    </div>
  );
};

export default PublicationItem;
