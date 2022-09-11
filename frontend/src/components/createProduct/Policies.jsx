import React from 'react';
import CheckoutSelect from './CheckoutSelect';

const Policies = ({
  policies,
  handleCheckboxes,
  handleChangeSelect,
  formValues,
  handleChangeInputs,
}) => {
  const POLICIES_DATA = [
    'Normas de la casa',
    'Salud y seguridad',
    // 'Política de cancelación',
  ];

  return (
    <div className='flex flex-col w-full px-2.5'>
      <h2 className='font-bold text-xl mt-10 mb-3'>Politicas del producto</h2>
      <div className='flex flex-col md:flex-row md:border border-gray-100 pt-5 pb-10 px-5 rounded-md w-full'>
        {POLICIES_DATA.map((pol) => {
          return (
            <div
              key={pol}
              className='flex flex-col pl-2.5 pr-10 w-full md:w-1/3'
            >
              <h4 className='font-bold font-lg pb-3'>{pol}</h4>
              <label className='text-base'>Descripción</label>
              {policies?.map((policy) => {
                if (policy.type === pol) {
                  return (
                    <div key={policy.id}>
                      <input
                        type='checkbox'
                        name='policies'
                        id={policy.id}
                        className='accent-primary cursor-pointer'
                        onChange={handleCheckboxes}
                      />
                      <label
                        htmlFor={policy.name}
                        className='cursor-pointer ml-2 '
                      >
                        {policy.name.charAt(0).toUpperCase() +
                          policy.name.slice(1)}
                      </label>
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
        <div className='md:w-1/3 pl-8 pr-5 flex-col-center gap-5 mt-10 md:mt-0'>
          <CheckoutSelect handleChangeSelect={handleChangeSelect} />
          <div className='w-full'>
            <label className='cursor-pointer md:ml-2'>
              Políticas de cancelación
            </label>
            <textarea
              name='cancellation'
              value={formValues.cancellation}
              onChange={handleChangeInputs}
              className='bg-white border border-gray-100 shadow-md h-48 rounded-md px-4 py-2 resize-none outline-primary w-full'
              placeholder='Escribir aquí'
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Policies;
