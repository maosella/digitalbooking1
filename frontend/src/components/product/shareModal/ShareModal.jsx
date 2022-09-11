import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

const ShareModal = ({ productId, setShowShareModal }) => {
  return (
    <div className='bg-secondary/95 w-screen h-screen fixed z-50 flex justify-center '>
      <div className='bg-primary flex-col-center h-40 mt-[10%] p-6 rounded-lg text-white relative'>
        <button
          className='text-xl absolute top-2 right-4 hover:scale-125'
          onClick={() => setShowShareModal(false)}
        >
          X
        </button>
        <h3 className=' my-3'>
          Comparte esta publicación en tus redes sociales
        </h3>
        <div className='flex gap-3'>
          <FacebookShareButton
            url={`http://ec2-3-15-29-50.us-east-2.compute.amazonaws.com/product/${productId}`}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <LinkedinShareButton
            url={`http://ec2-3-15-29-50.us-east-2.compute.amazonaws.com/product/${productId}`}
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <TwitterShareButton
            url={`http://ec2-3-15-29-50.us-east-2.compute.amazonaws.com/product/${productId}`}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton
            url={`http://ec2-3-15-29-50.us-east-2.compute.amazonaws.com/product/${productId}`}
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
