import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoMdCalendar } from "react-icons/io";
import useDevice from "../../../hooks/useDevice";
import "./calendarInput.css";
import { useDates } from "../../../context";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

const CalendarInput = () => {
  const [isMobile, ,] = useDevice();
  const { startDate, endDate, setStartDate, setEndDate, formatDate } =
    useDates();
  const today = new Date();

  const handleSelection = (dates) => {
    setStartDate(dates[0]);
    setEndDate(dates[1]);
  };
  return (
    <>
      <div className="date-search-bar h-9 relative flex-center w-full font-medium cursor-pointer bg-white">
        <div className="w-full relative">
          <IoMdCalendar className="absolute z-10 left-3 top-[6px] text-gray-500 text-3xl" />
          <DatePicker
            locale="es"
            className="calendar-datepicker w-full h-[42px] pl-12 border border-gray-300 hover:border-gray-400
            focus:outline focus:outline-2 focus:outline-blue-500 cursor-pointer caret-transparent"
            placeholderText="Check in - Check out"
            selected={startDate}
            selectsRange={true}
            monthsShown={isMobile ? 1 : 2}
            dateFormat="dd 'de' MMM."
            closeOnScroll={true}
            minDate={today}
            onChange={(dates) => handleSelection(dates)}
            startDate={startDate}
            endDate={endDate}
            popperModifiers={{
              preventOverflow: {
                enabled: true,
                escapeWithReference: false,
                boundariesElement: "viewport",
              },
            }}
          />
        </div>
      </div>
    </>
  );
};
export default CalendarInput;
