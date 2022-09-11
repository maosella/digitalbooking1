import React, { useState } from 'react';
import { BsPlusSquareFill } from 'react-icons/bs';
import { helpHttp, backendUrl } from '../../helpers/helpHttp';

const NewIcon = ({ getCharacteristics }) => {
  const api = helpHttp();
  const [icon, setIcon] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIcon({ ...icon, [name]: value });
  };
  const addNewIcon = async () => {
    const response = await api.post(`${backendUrl}/characteristics`, {
      body: {
        name: icon.name,
        icon_url: icon.url,
      },
    });
    await response.json()
    getCharacteristics()
    setIcon(null)
  };

  return (
    <div className='flex mt-4'>
      <div className='w-full lg:flex '>
        <div className='flex flex-col px-2.5 w-full lg:w-2/3'>
          <label>Nombre</label>
          <input
            name='name'
            onChange={handleChange}
            value={icon?.name || ''}
            type='text'
            className='bg-white border border-gray-100 shadow-md h-[52px] px-5'
            placeholder='Wifi'
          />
        </div>
        <div className='flex flex-col px-2.5 w-full lg:w-1/3 mt-6 lg:mt-0'>
          <label>Ícono</label>
          <div className='flex gap-5'>
            <input
              name='url'
              onChange={handleChange}
              value={icon?.url || ''}
              type='text'
              className='bg-white border border-gray-100 shadow-md w-full h-[52px] px-5'
              placeholder='fa-Wifi'
            />
          </div>
        </div>
      </div>
      <div className='flex-center'>
        <BsPlusSquareFill
          className='bg-white rounded-md text-5xl text-primary mt-9 cursor-pointer hover:scale-105'
          onClick={addNewIcon}
        />
      </div>
    </div>
  );
};

export default NewIcon;
