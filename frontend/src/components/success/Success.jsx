import React from 'react';
import { Link } from 'react-router-dom';
import { MdVerified } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';

const Success = ({ title, message, validation = false }) => {
  return (
    <div className='w-full min-h-[85vh] bg-gray-50 flex-center font-medium text-lg'>
      <div className='bg-white py-20 px-10 w-1/2 text-center shadow-xl rounded-lg flex flex-col items-center gap-3'>
        {validation ? (
          <HiOutlineMail className='text-8xl text-primary' />
        ) : (
          <MdVerified className='text-8xl text-primary' />
        )}
        <p className='text-2xl text-primary font-bold'>{title}</p>
        <p className='pb-5 text-secondary'>{message}</p>
        <Link
          to={validation ? '/login' : '/'}
          className='px-20 py-2 rounded-lg bg-primary text-white font-bold'
        >
          ok
        </Link>
      </div>
    </div>
  );
};
export default Success;
