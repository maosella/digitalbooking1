
import React, { useState } from 'react';
import { MdLocationOn } from 'react-icons/md';
import Select from 'react-select';
import { useEffect } from 'react';
import { helpHttp, backendUrl } from '../../helpers/helpHttp';
// import "../locationSelect/locationSelect.css";

const CitySelect = ({handleChangeSelect}) => {
  let api = helpHttp();
  const [cities, setCities] = useState([]);

  const getCities = async () => {
    const response = await api.get(`${backendUrl}/cities`);
    setCities(await response.json());
  };
  useEffect(() => {
    getCities();
  }, []);

  const options = cities.map((city, idx) => {
    return {
      value: city.id,
      label: (
        <div
          className={`flex gap-2 border-b-2 border-primary py-4 cursor-pointer
          ${idx === cities.length - 1 && 'border-none'}
          }`}
        >
          <h5> {city.name}, {city.country}</h5>
        </div>
      ),
    };
  });

  const colourStyles = {
    option: (styles, { isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor:
          (isFocused && '#f0572d4f') || (isSelected && '#f0572dc0'),
        color: '#333333',
        paddingBottom: '0',
        paddingTop: '0',
      };
    },
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: 'none',
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: '#a9a9a9',
        fontWeight: '600',
      };
    },
  };

  return (
    <div className='w-full'>
      <Select
        name='categories'
        id='categories'
        className='bg-white border border-gray-100 shadow-md rounded-md h-[54px] pt-2 px-2'
        placeholder='Ciudad'
        options={options}
        styles={colourStyles}
        onChange={(e) => handleChangeSelect(e, 'city_id')}
      />
    </div>
  );
};

export default CitySelect;
