import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";

const CheckIn = ({ formValues, setFormValues }) => {
  const createOptions = (time) => {
    let opts = [];
    for (let i = 1; i <= 12; i++) {
      opts.push(
        <option
          key={i}
          value={`${i < 10 ? "0" : ""}${i}:00`}
          className="text-lg font-bold"
        >{`${i < 10 ? "0" : ""}${i}:00 ${time}`}</option>
      );
    }
    return opts;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold py-3">Tu horario de llegada</h2>
      <div className="drop-shadow-xl rounded-md bg-white py-6 px-7">
        <div className="flex items-center py-3">
          <FaRegCheckCircle className="text-2xl" />
          <p className="text-lg font-semibold pl-2">
            Tu habitación va a estar lista para el check-in entre las 10:00 AM y
            las 11:00 PM
          </p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="checkIn">Indicá tu horario estimado de llegada</label>
          <select
            name="checkIn"
            id="checkIn"
            defaultValue="default"
            className="md:w-1/2 sm:w-full focus:outline-transparent py-3 pl-2 rounded-md drop-shadow-xl cursor-pointer"
            required
            onChange={handleChange}
          >
            <option value="default" disabled className="hidden">
              Seleccionar hora de llegada
            </option>
            {createOptions("AM")}
            {createOptions("PM")}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
