import React, { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import Select from "react-select";
import { useEffect } from "react";
import "../locationSelect/locationSelect.css";
import { helpHttp, backendUrl } from "../../../helpers/helpHttp";

const LocationSelect = ({ selectedLocation, setSelectedLocation }) => {
  let api = helpHttp();
  const [cities, setCities] = useState([]);

  const getCities = async () => {
    const response = await api.get(`${backendUrl}/cities`);
    setCities(await response.json());
  };
  useEffect(() => {
    getCities();
  }, []);

  const handleChange = (e) => {
    setSelectedLocation(e.value);
  };
  useEffect(() => {
    setSelectedLocation(selectedLocation);
  }, [selectedLocation]);

  const options = cities.map((city, idx) => {
    return {
      value: city.name,
      label: (
        <div
          className={`flex items-center gap-2 border-b-2 border-primary py-4 cursor-pointer
          ${idx === cities.length - 1 && "border-none"}
          }`}
        >
          <MdLocationOn className="text-3xl" />
          <div>
            <h4>{city.name},</h4>
            <h5> {city.country}</h5>
          </div>
        </div>
      ),
    };
  });

  const colourStyles = {
    option: (styles, { isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor:
          (isFocused && "#f0572d4f") || (isSelected && "#f0572dc0"),
        color: "#333333",
        paddingBottom: "0",
        paddingTop: "0",
      };
    },
  };

  return (
    <div className="w-full">
      <Select
        name="cities"
        id="cities"
        className="rounded-md outline-none font-medium relative z-30 caret-transparent cursor-pointer"
        placeholder={
          <div className="flex items-center h-9 font-medium text-gray-500 ">
            <MdLocationOn className="text-3xl" />
            ¿A dónde vamos?
          </div>
        }
        options={options}
        styles={colourStyles}
        onChange={handleChange}
      />
    </div>
  );
};

export default LocationSelect;
