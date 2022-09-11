import React from 'react';
import { SocialList } from '../../utils';

const Footer = () => {
  return (
    <footer className='fixed bottom-0 z-50 w-full px-12 bg-primary text-white'>
      <div className='container mx-auto flex justify-between items-center h-14 '>
      <p>©2022 Digital Booking</p>
      <SocialList />
      </div>
    </footer>
  );
};

export default Footer;
