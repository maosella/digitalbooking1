import React from "react";
import Calendar from "react-calendar";
import { isWithinInterval, isBefore } from "date-fns";
import "react-calendar/dist/Calendar.css";
import "./doubleCalendar.css";
import useDevice from "../../../hooks/useDevice";
import { useDates } from "../../../context";

const DoubleCalendar = ({ reservations, selectable }) => {
  const [isMobile, isDesktop] = useDevice();
  const { setStartDate, setEndDate } = useDates();
  const reservedBetween = reservations;
  const today = new Date();

  const format = (date, type, format) => {
    switch (type) {
      case "weekday":
        return new Intl.DateTimeFormat("es", { weekday: format }).format(date);
      case "month":
        return new Intl.DateTimeFormat("es", { month: format }).format(date);
    }
  };

  const handleSelection = (dates) => {
    setStartDate(dates[0]);
    setEndDate(dates[1]);
  };

  const isAvailable = (date) => {
    let available = true;
    reservedBetween?.forEach((range) => {
      if (isBefore(date, today)) {
        available = false;
      } else if (
        isWithinInterval(date, {
          start: new Date(range.start_date),
          end: new Date(range.end_date),
        })
      ) {
        available = false;
      }
    });
    return available;
  };

  return (
    <div
      className={`mb-5 w-full lg:mr-7 ${
        !isDesktop && !isMobile && "two-thirds-width"
      }`}
    >
      <Calendar
        calendarType="US"
        formatShortWeekday={(_, date) => format(date, "weekday", "narrow")}
        formatMonthYear={(_, date) => format(date, "month", "long")}
        nextLabel=">"
        next2Label={null}
        prevLabel="<"
        prev2Label={null}
        showDoubleView={isMobile ? false : true}
        showFixedNumberOfWeeks={false}
        showNeighboringMonth={false}
        tileClassName={({ date }) =>
          isAvailable(date) ? "text-black" : "not-available"
        }
        tileDisabled={({ date }) => !selectable || !isAvailable(date)}
        view="month"
        minDate={today}
        returnValue="range"
        selectRange={true}
        onChange={(value) => handleSelection(value)}
      />
    </div>
  );
};
export default DoubleCalendar;
