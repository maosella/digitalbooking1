import React from "react";
import CitiesMap from "../map/CitiesMap";
import CategorySelect from "./CategorySelect";
import CitySelect from "./CitySelect";
import PropertyInput from "./PropertyInput";

const PropertyInfo = ({
  formValues,
  handleChangeInputs,
  handleChangeSelect,
  setFormValues,
}) => {
  return (
    <>
      <div className="md:grid md:grid-cols-2 gap-x-5 gap-y-10 pt-5 pb-12">
        <PropertyInput
          titleES="Nombre de la propiedad"
          titleEN="title"
          placeholder="Hotel Cuestablanca"
          formValues={formValues}
          handleChangeInputs={handleChangeInputs}
        />
        <div className="flex flex-col px-2.5 w-full mt-5 md:mt-0">
          <label>Categoría</label>
          <CategorySelect
            handleChangeSelect={handleChangeSelect}
            formValues={formValues}
          />
        </div>
        <PropertyInput
          titleES="Dirección"
          titleEN="address"
          placeholder="Alvear 233"
          formValues={formValues}
          handleChangeInputs={handleChangeInputs}
        />
        <div className="flex flex-col px-2.5 w-full mt-5 md:mt-0">
          <label>Ciudad</label>
          <CitySelect handleChangeSelect={handleChangeSelect} />
        </div>
      </div>
      <CitiesMap formValues={formValues} setFormValues={setFormValues} />
      <div className="flex flex-col px-2.5 w-full">
        <label>Descripción</label>
        <textarea
          name="description"
          value={formValues.description}
          onChange={handleChangeInputs}
          className="bg-white border border-gray-100 shadow-md h-48 rounded-md px-4 py-2 resize-none outline-primary"
          placeholder="Escribir aquí"
        />
      </div>
    </>
  );
};

export default PropertyInfo;
