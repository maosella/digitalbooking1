import React from 'react';

const ReadMore = ({ children, isReadMore, setIsReadMore }) => {
  const text = children;

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className='text'>
      {isReadMore ? text.slice(0, 100) : text}
      <span onClick={toggleReadMore} className='text-primary cursor-pointer'>
        {isReadMore ? ' más...' : ' menos...'}
      </span>
    </p>
  );
};

export default ReadMore;
