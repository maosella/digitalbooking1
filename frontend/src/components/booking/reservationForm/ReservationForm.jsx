import React from "react";
import { DoubleCalendar } from "../../calendars/";
import { CheckIn, ClientData } from "..";

const ReservationForm = ({ reservations, formValues, setFormValues }) => {
  return (
    <div>
      <ClientData formValues={formValues} setFormValues={setFormValues} />
      <h2 className="text-2xl font-bold py-3">
        Seleccioná tu fecha de reserva
      </h2>
      <DoubleCalendar reservations={reservations} selectable={true} />
      <CheckIn setFormValues={setFormValues} formValues={formValues} />
    </div>
  );
};

export default ReservationForm;
