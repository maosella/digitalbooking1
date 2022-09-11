import React from 'react';
import './clientData.css';

const ClientData = ({ formValues, setFormValues }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className='drop-shadow-xl rounded-md'>
      <h2 className='text-2xl font-bold py-3'>Completá tus datos</h2>
      <div className='bg-white px-4 py-8 rounded-md'>
        <div className='flex'>
          <div className='flex flex-col px-2.5 md:w-1/2 sm:w-full'>
            <label htmlFor='name'>Nombre</label>
            <input
              className='opacity-70 pointer-events-none h-12 px-2 bg-neutral'
              type='text'
              id='name'
              name='name'
              value={formValues.name}
              readOnly
            />
          </div>
          <div className='flex flex-col px-2.5 md:w-1/2 sm:w-full'>
            <label htmlFor='surname'>Apellido</label>
            <input
              className='opacity-70 pointer-events-none h-12 px-2 bg-neutral'
              type='text'
              id='surname'
              name='surname'
              value={formValues.surname}
              readOnly
            />
          </div>
        </div>
        <div className='flex'>
          <div className='flex flex-col px-2.5 md:w-1/2 sm:w-full'>
            <label htmlFor='email'>Correo electrónico</label>
            <input
              className='opacity-70 pointer-events-none h-12 px-2 bg-neutral'
              type='text'
              id='email'
              name='email'
              value={formValues.email}
              readOnly
            />
          </div>
          <div className='flex flex-col px-2.5 md:w-1/2 sm:w-full'>
            <label htmlFor='city'>Ciudad</label>
            <input
              className='bg-white shadow-md border border-gray-100 h-12 px-2 '
              type='text'
              id='city'
              name='city'
              value={formValues.city}
              autoFocus
              required
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientData;
