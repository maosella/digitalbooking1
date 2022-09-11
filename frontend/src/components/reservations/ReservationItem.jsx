import React from "react";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import { getDistance } from "geolib";
import useScore from "../../hooks/useScore";
import "@fortawesome/fontawesome-free/js/all.js";

const ReservationItem = ({ reservation }) => {
  const [getStars] = useScore();

  return (
    <div
      className={`w-11/12 lg:w-[47%] md:h-96 py-1 bg-white md:flex-center rounded-lg shadow-first `}
    >
      <div className="relative w-auto md:w-full h-96 mx-1 md:mr-1 md:ml-0">
        <img
          src={reservation?.product.images.name}
          alt=""
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="w-full px-6 lg:px-3">
        <div className="flex justify-between">
          <div>
            <p className="uppercase text-sm mt-3 font-bold flex items-center gap-1">
              <span className="opacity-60">
                {reservation?.product.category.title}{" "}
              </span>
              <span className="flex text-primary text-lg">
                {reservation?.product.score > 0 &&
                  getStars(reservation?.product.score)}
              </span>
            </p>
            <h2
              className={`text-secondary text-2xl font-bold h-16 w-full flex overflow-y-hidden ${
                reservation?.product.title.length < 20 && "items-center"
              }`}
            >
              {reservation?.product.title}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2 text-tertiary">
          <MdLocationOn className="text-secondary" />
          <p>
            {(
              getDistance(
                {
                  latitude: reservation?.product.latitude,
                  longitude: reservation?.product.longitude,
                },
                {
                  latitude: reservation?.product.city.latitude,
                  longitude: reservation?.product.city.longitude,
                }
              ) / 1000
            ).toFixed(2)}{" "}
            km del centro
            <a
              href={`https://maps.google.com/?q=${reservation?.product.latitude},${reservation?.product.longitude}`}
              className="text-primary uppercase text-sm"
              target="_blank"
            >
              {" - mostrar en mapa"}
            </a>
          </p>
        </div>
        <div className="py-3 pr-1">
          <h3 className="font-semibold text-lg">Fecha</h3>
          <div className="flex flex-column md:justify-between">
            <p>{reservation?.start_date}</p>
            <p className="pl-10 md:pl-0">{reservation?.end_date}</p>
          </div>
        </div>
        <div className="flex flex-column md:justify-between">
          <div>
            <h3 className="font-semibold text-lg">Check-In</h3>
            <p>
              {reservation?.checkIn}
              {reservation?.checkIn < "12" ? "am" : "pm"}
            </p>
          </div>
          <div className="text-right pr-1">
            <h3 className="font-semibold text-lg pl-10 md:pl-0">Check-out</h3>
            <p>10:00am</p>
          </div>
        </div>
        <Link to={`/products/${reservation?.product.id}`}>
          <button className="btn-primary w-full my-3">Ver más</button>
        </Link>
      </div>
    </div>
  );
};

export default ReservationItem;
