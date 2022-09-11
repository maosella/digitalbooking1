import React, { useState, useEffect } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl, helpHttp } from "../helpers/helpHttp";
import { Loader } from "../utils";
import { BookingDetails, ReservationForm } from "../components/booking";
import { Policies } from "../components/policies";
import { useAuth, useDates } from "../context";
import { BiErrorCircle } from "react-icons/bi";

const Booking = () => {
  const { currentUser } = useAuth();
  const { startDate, endDate, formatDate, resetDates } = useDates();

  const navigate = useNavigate();
  const api = helpHttp();
  const pathname = window.location.pathname;

  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formValues, setFormValues] = useState({});
  const [bookingError, setBookingError] = useState(false);

  const fallback = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setBookingError(true);
  };

  const getProduct = async () => {
    const response = await api.get(`${backendUrl}${pathname}`);
    if (!response.ok) {
      navigate("/404");
    } else {
      setProduct(await response.json());
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const bookProduct = async () => {
    setIsLoading(true);
    try {
      if (
        startDate &&
        endDate &&
        currentUser.id &&
        product.id &&
        formValues.checkIn &&
        formValues.city
      ) {
        const response = await api.post(`${backendUrl}/reservations`, {
          headers: { Authorization: "Bearer " + currentUser.token },
          body: {
            start_date: formatDate(startDate),
            end_date: formatDate(endDate),
            user: currentUser.id,
            product: product.id,
            checkIn: formValues.checkIn,
            city: formValues.city,
          },
        });
        await response.ok
        navigate("/reservationsuccess");
      } else {
        fallback();
      }
    } catch (error) {
      fallback();
    }
    resetDates();
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentUser?.token) {
      setFormValues({
        name: currentUser?.name,
        surname: currentUser?.surname,
        email: currentUser?.email,
        city: currentUser?.city || "",
      });
    }
  }, [currentUser]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-white text-secondary font-medium pb-10 text-lg">
          <div className="bg-tertiary pr-10 py-2 pl-10">
            <div className="container mx-auto flex justify-between">
              <div className="w-full">
                <h2 className="text-white text-lg font-normal">
                  {product?.category}
                </h2>
                <h2 className="text-white text-xl font-bold">
                  {product?.title}
                </h2>
              </div>
              <Link to="/" className="flex-center">
                <MdArrowBackIosNew className="text-xl text-white" />
              </Link>
            </div>
          </div>
          <div className="bg-neutral px-10 py-10">
            {bookingError && (
              <div className="bg-red-300/60 text-red-900 text-bold flex-center gap-3 px-6 py-4 rounded-lg mb-4 w-fit mx-auto">
                <BiErrorCircle className="text-5xl" />
                <div>
                  <>
                    <p>Lamentablemente la reserva no ha podido realizarse.</p>
                    <p>Por favor intente más tarde.</p>
                  </>
                </div>
              </div>
            )}
            <div className="container mx-auto lg:flex gap-10">
              <ReservationForm
                reservations={product?.reservations}
                formValues={formValues}
                setFormValues={setFormValues}
              />
              <div className="mt-[55px] w-full">
                <BookingDetails
                  title={product.title}
                  category={product.category}
                  city={product.city}
                  address={product.address}
                  img={product?.images.name}
                  bookProduct={bookProduct}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
          <Policies
            policies={product.policies}
            checkOut={product?.checkOut}
            cancellation={product?.cancellation}
          />
        </div>
      )}
    </>
  );
};
export default Booking;
