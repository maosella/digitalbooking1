import React from "react";
import ReservationItem from "./ReservationItem";
import { nanoid } from "nanoid";
import { AiOutlineCloseSquare } from "react-icons/ai";

const Reservation = ({ reservations }) => {
  const ReservationList = reservations?.map((reservation) => {
    return <ReservationItem key={nanoid()} reservation={reservation} />;
  });

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mt-10 mb-10 container mx-auto">
      <div className="flex-col-center gap-5 md:flex-row flex-wrap pb-10">
        {ReservationList}
      </div>
    </div>
  );
};

export default Reservation;
