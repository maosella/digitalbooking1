import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MdVerified } from 'react-icons/md';
import { backendUrl, helpHttp } from '../helpers/helpHttp';

const Validate = () => {
  const api = helpHttp();
  const navigate = useNavigate();
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');

  const validateAccount = async () => {
    const response = await api.post(`${backendUrl}/auth/confirmation`, {
      body: {
        id: id,
      },
    });
    await response.json();
    navigate('/');
  };

  return (
    <div className='w-full min-h-[80vh] bg-gray-50 flex items-center justify-center font-medium text-lg'>
      <div className='bg-white py-10 px-48 shadow-xl rounded-lg flex flex-col items-center gap-3'>
        <MdVerified className='text-8xl text-primary'></MdVerified>
        <p className='text-2xl text-primary font-bold'>
          ¡Gracias por registrarse!
        </p>
        <p className='pb-5 text-secondary'>
          Por favor haga click en el boton para validar su cuenta
        </p>
        <Link
          onClick={validateAccount}
          to='/login'
          className='px-20 py-2 rounded-lg bg-primary text-white font-bold'
        >
          ok
        </Link>
      </div>
    </div>
  );
};

export default Validate;
