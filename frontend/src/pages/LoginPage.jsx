import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context";
import { BiErrorCircle } from "react-icons/bi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Loader } from "../utils";
import SyncLoader from "react-spinners/SyncLoader";

const LoginPage = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const {
    login,
    authError,
    setAuthError,
    bookingError,
    isBtnLoading,
    lastPage,
  } = useAuth();

  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  let err;

  const handleSubmit = async (e) => {
    e.preventDefault();
    err = validate(formValues);
    setFormErrors(err);
    if (Object.keys(err).length === 0) {
      await login(formValues.email, formValues.password);
    }
  };

  useEffect(() => {
    setFormErrors(err);
  }, [err]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!values.email) {
      errors.email = "Introduzca su email!";
    } else if (!regex.test(values.email)) {
      errors.email = "Introduzca un email valido!";
    }
    if (!values.password) {
      errors.password = "Introduzca su contraseña!";
    } else if (values.password.length < 6) {
      errors.password = "La contraseña debe tener mas de 6 caracteres!";
    }
    return errors;
  };

  useEffect(() => {
    if (lastPage === "/signup") {
      setAuthError(false);
    }
  }, []);

  return (
    <>
      <div className="w-full relative min-h-[80vh] bg-gray-50 flex-col-center">
        <Link
          to="/"
          className="absolute top-4 right-4 hover:scale-110 font-bold"
        >
          X
        </Link>
        {(authError || bookingError) && (
          <div className="bg-red-300/60 text-red-900 text-bold flex-center gap-3 px-6 py-4 rounded-lg mb-4">
            <BiErrorCircle className="text-5xl" />
            <div>
              {authError && (
                <>
                  <p>Lamentablemente no ha podido iniciar sesión.</p>
                  <p>Por favor intente más tarde.</p>
                </>
              )}
              {bookingError && (
                <>
                  <p>Para realizar una reserva necesitas estar logueado.</p>
                </>
              )}
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <h1 className="flex flex-center text-3xl font-semibold text-primary">
              Iniciar sesión
            </h1>
            <div className="mt-8 flex flex-col gap-3">
              <div>
                <label className=" font-medium">Correo electrónico</label>
                <input
                  className="w-full shadow-md rounded-md px-4 py-2 mt-1 bg-white"
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                />
                <p className="text-red-500">{formErrors?.email}</p>
              </div>
              <div>
                <label className=" font-medium">Contraseña</label>
                <div className="relative">
                <input
                  className="w-full shadow-md rounded-md px-4 py-2 mt-1 bg-white"
                  type={passwordType}
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                ></input>
                <div
                  className="absolute inset-y-1/4 right-4"
                  onClick={togglePassword}
                >
                  {passwordType === "password" ? (
                    <AiFillEyeInvisible className="text-3xl text-gray-300 cursor-pointer"/>
                  ) : (
                    <AiFillEye className="text-3xl text-gray-300"/>
                  )}
                </div> 
                </div>
                <p className="text-red-500">{formErrors?.password}</p>
              </div>
              <div className="mt-8 flex flex-center gap-y-4">
                <button
                  className="w-full btn-primary bg-primary disabled:bg-neutral "
                  type="submit"
                  disabled={isBtnLoading}
                >
                  {isBtnLoading ? (
                    <SyncLoader color={"#ffffff"} size={10} />
                  ) : (
                    "Ingresar"
                  )}
                </button>
              </div>
              <div className="mt-2 flex justify-center items-center">
                <p className="font-medium">¿Aún no tenes cuenta?</p>
                <Link to="/signup">
                  <button className="text-sky-600 font-medium ml-2">
                    Registrate
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
