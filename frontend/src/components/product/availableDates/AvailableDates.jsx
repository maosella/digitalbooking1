import React from "react";
import DoubleCalendar from "../../calendars/doubleCalendar/DoubleCalendar";
import ReserveButton from "./reserveButton/ReserveButton";

const AvailableDates = ({ reservations, productId }) => {
  return (
    <div className="bg-neutral px-3 md:px-8 py-2 ">
      <div className='container mx-auto'>
      <h2 className="text-2xl font-bold">Fechas disponibles</h2>
      <div className="lg:flex-center w-full p-6">
        <DoubleCalendar reservations={reservations} selectable={false} />
        <ReserveButton title="Agregá tus fechas de viaje para obtener precios exactos" productId={productId}/>
      </div>
      </div>
    </div>
  );
};

export default AvailableDates;
