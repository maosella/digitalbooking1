import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context';

const User = () => {
  const { logout, currentUser } = useAuth();
  let navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='flex flex-col items-end md:flex-row md:items-center gap-2 md:gap-4 w-fit p-4 md:p-0'>
      <div
        className={`flex-center rounded-full w-9 h-9 
          bg-white text-secondary md:text-white md:bg-secondary`}
      >
        <h2>
          {currentUser?.name?.slice(0, 1)}{currentUser?.surname?.slice(0, 1)}
        </h2>
      </div>
      <div className='font-bold text-right md:text-left'>
        <div className='md:flex md:justify-between'>
          <p className='opacity-50'>Hola,</p>
          <button
            className='cursor-pointer hover:scale-105 hidden md:block'
            onClick={handleLogOut}
          >
            X
          </button>
        </div>
        <span className={`block text-secondary md:text-primary`}>
          {currentUser?.name} {currentUser?.surname}
        </span>
      </div>
    </div>
  );
};

export default User;
