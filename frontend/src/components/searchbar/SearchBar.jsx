import React from "react";
import { useState, useEffect } from "react";
import CalendarInput from "../calendars/dropCalendar/CalendarInput";
import LocationSelect from "./locationSelect/LocationSelect";

const SearchBar = ({ filterCity }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    filterCity(selectedLocation);
  };

  return (
    <div className="flex-col-center w-full p-6 md:p-10 bg-tertiary">
      <h2 className="pb-10 font-bold text-3xl text-white text-center">
        Busca ofertas en hoteles, casas y mucho más
      </h2>
      <form
        action="#"
        className="lg:w-2/3 2xl:w-1/2 flex-col-center md:flex-row gap-2 container"
      >
        <LocationSelect
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
        <CalendarInput />
        <button
          className="btn-primary w-full md:w-1/4 lg:w-1/3 h-[43px] flex-center"
          onClick={handleClick}
        >
          Buscar
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
