import React, { useState } from 'react';
import { MdLocationOn } from 'react-icons/md';
import Select from 'react-select';
import { useEffect } from 'react';
import { helpHttp, backendUrl } from '../../helpers/helpHttp';
// import "../locationSelect/locationSelect.css";

const CategorySelect = ({ handleChangeSelect }) => {
  let api = helpHttp();
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const response = await api.get(`${backendUrl}/categories`);
    setCategories(await response.json());
  };
  useEffect(() => {
    getCategories();
  }, []);

  const options = categories.map((categ, idx) => {
    return {
      value: categ.id,
      label: (
        <div
          className={`flex gap-2 border-b-2 border-primary py-4 cursor-pointer
          ${idx === categories.length - 1 && 'border-none'}
          }`}
        >
          <h5> {categ.title}</h5>
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
        placeholder='Hotel'
        options={options}
        styles={colourStyles}
        onChange={(e) => handleChangeSelect(e, 'category_id')}
      />
    </div>
  );
};

export default CategorySelect;
