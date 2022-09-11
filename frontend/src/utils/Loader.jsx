import React from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

const Loader = () => {
  return (
    <div className='w-screen h-[55vh]'>
      <div className='flex-center mt-[40vh]'>
        <SyncLoader color={'#F0572D'} size={15} />
      </div>
    </div>
  );
};

export default Loader;
