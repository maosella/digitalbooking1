import React from "react";

const PropertyInput = ({
  titleES,
  titleEN,
  placeholder,
  formValues,
  handleChangeInputs,
}) => {
  return (
    <div className="flex flex-col px-2.5 w-full mt-5 md:mt-0">
      <label>{titleES}</label>
      <input
        type="text"
        name={titleEN}
        value={formValues.titleEN}
        onChange={handleChangeInputs}
        className="bg-white border border-gray-100 shadow-md h-[54px] px-4"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default PropertyInput;
