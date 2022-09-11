import React from 'react';
import Select from 'react-select';

const CheckoutSelect = ({ handleChangeSelect }) => {
  const CHECKOUT = ['9:00', '10:00', '11:00', '12:00', '13:00'];
  const options = CHECKOUT.map((time, idx) => {
    return {
      value: time,
      label: (
        <div
          className={`flex gap-2 border-b-2 border-primary py-4 cursor-pointer
          ${idx === CHECKOUT.length - 1 && 'border-none'}
          }`}
        >
          <h5>
            {time}
          </h5>
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
        name='checkOut'
        id='checkOut'
        className='bg-white border border-gray-100 shadow-md rounded-md h-[54px] pt-2 px-2 cursor-pointer'
        placeholder='Check out'
        options={options}
        styles={colourStyles}
        onChange={(e) => handleChangeSelect(e, 'checkOut')}
      />
    </div>
  );
};

export default CheckoutSelect;
