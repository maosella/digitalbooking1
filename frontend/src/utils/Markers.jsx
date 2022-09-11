import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
import { FaMapMarkerAlt, FaCity, FaBed } from "react-icons/fa";

const regMarkup = renderToStaticMarkup(
  <FaMapMarkerAlt className="border-none text-3xl -translate-y-1/4 -translate-x-1/3 color-primary text-secondary" />
);
const customRegIcon = divIcon({
  html: regMarkup,
});
const cityMarkup = renderToStaticMarkup(
  <FaCity className="border-none text-3xl -translate-y-1/4 -translate-x-1/3 color-primary text-secondary" />
);
const customCityIcon = divIcon({
  html: cityMarkup,
});
const hotelMarkup = renderToStaticMarkup(
  <FaBed className="border-none text-3xl -translate-y-1/4 -translate-x-1/3 color-primary text-secondary" />
);
const customHotelIcon = divIcon({
  html: hotelMarkup,
});

export { customRegIcon, customCityIcon, customHotelIcon };
