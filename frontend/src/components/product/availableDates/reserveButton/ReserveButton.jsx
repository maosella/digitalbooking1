import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../context';

const ReserveButton = ({ title, productId }) => {
  const { currentUser, setBookingError } = useAuth();

  const [linkPath, setLinkPath] = useState('/');
  
  useEffect(() => {
    if (currentUser?.token) {
      setLinkPath(`/products/reservation/${productId}`);
    } else {
      setBookingError(true);
      setLinkPath(`/login`);
    }
  }, []);

  return (
    <div
      className='w-full lg:bg-white md:flex-center lg:flex-col-center
      lg:w-1/3 h-fit p-4 rounded-[5px] drop-shadow-xl'
    >
      <p className='font-bold pb-5 md:pb-0 lg:pb-5 md:w-full'>{title}</p>
      <Link
        to={linkPath}
        className='text-base rounded-[5px] btn-primary w-full whitespace-nowrap flex-center'
      >
        Iniciar reserva
      </Link>
    </div>
  );
};

export default ReserveButton;
