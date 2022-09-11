import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import { useDates } from '../../context';
import SyncLoader from 'react-spinners/SyncLoader';

const BookingDetails = ({
  title,
  category,
  city,
  address,
  img,
  bookProduct,
  isLoading,
}) => {
  const { startDate, endDate } = useDates();

  return (
    <div className='w-full h-full object-cover'>
      <div>
        <div className='bg-white py-5 rounded-lg flex flex-col drop-shadow-lg gap-5'>
          <p className='text-2xl font-bold px-5'>Detalle de la reserva</p>
          <img className='pb-5' src={img} alt='' />
          <div className='px-5'>
            <p className='font-normal'>{category}</p>
            <p className='text-2xl font-bold pb-3'>{title}</p>
            <div className='flex gap-2 pb-3'>
              <MdLocationOn />
              <p>
                {address}, {city}
              </p>
            </div>
            <div className='px-3 mt-10 flex py-5 justify-between border-b border-t border-neutral'>
              <p>Check in</p>
              <p>
                {startDate != null
                  ? `${startDate.getDate()}/${
                      startDate.getMonth() + 1
                    }/${startDate.getFullYear()}`
                  : '_/_/_'}
              </p>
            </div>
            <div className='px-3 flex py-5 justify-between border-b border-neutral'>
              <p>Check out</p>
              <p>
                {endDate != null
                  ? `${endDate.getDate()}/${
                      endDate.getMonth() + 1
                    }/${endDate.getFullYear()}`
                  : '_/_/_'}
              </p>
            </div>
            <div className='flex-center pt-5'>
              <button
                className='btn-primary bg-primary w-96 disabled:bg-neutral'
                type='submit'
                disabled={isLoading}
                onClick={bookProduct}
              >
                {isLoading ? (
                  <SyncLoader color={'#ffffff'} size={10} />
                ) : (
                  'Confirmar reserva'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
