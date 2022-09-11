import React from "react";
import { Success } from "../components/success";

const CheckEmail = ({ title }) => {
  return (
    <Success
      title={title}
      message={
        "Por favor valide su registro a través del enlace que enviamos a su correo electrónico."
      }
      validation
    />
  );
};
export default CheckEmail;
