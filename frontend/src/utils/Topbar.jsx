import React from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';

const Topbar = ({title}) => {
  return (
      <div className='bg-tertiary pr-10 py-2 pl-10'>
        <div className='container mx-auto flex justify-between'>
          <div className='w-full'>
            <h2 className='text-white text-3xl font-bold py-4'>
              {title}
            </h2>
          </div>
          <Link to='/' className='flex-center'>
            <MdArrowBackIosNew className='text-xl text-white' />
          </Link>
        </div>
      </div>
  );
};

export default Topbar;
