import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { RiLinkedinFill } from 'react-icons/ri';

const SocialList = ({ isMobile }) => {
  return (
    <ul
      className={`${
        !isMobile && 'hidden md:flex'
      }  flex justify-between gap-4 text-2xl`}
    >
      <li>
        <FaFacebook />
      </li>
      <li>
        <RiLinkedinFill />
      </li>
      <li>
        <FaTwitter />
      </li>
      <li>
        <FaInstagram />
      </li>
    </ul>
  );
};

export default SocialList;
