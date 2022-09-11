import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import "./map.css";
import { customCityIcon, customHotelIcon } from "../../utils/Markers";

const Map = ({
  city,
  country,
  centerLat,
  centerLong,
  prodLat,
  prodLong,
  title,
}) => {
  return (
    <div className="container mx-auto">
      <div className="px-10 pt-8">
        <h2 className="text-2xl font-bold">¿Dónde vas a estar?</h2>
      </div>
      <hr className="bg-primary border-none h-px mt-3 mb-4" />
      <div className="px-10 pb-3">
        <p className="text-md font-semibold pl-2 pb-4">
          {city}, {country}
        </p>
        <MapContainer
          center={[prodLat, prodLong]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[prodLat, prodLong]} icon={customHotelIcon}>
            <Popup>
              <p className="font-bold">{title}</p>
            </Popup>
          </Marker>
          <Marker
            position={[centerLat, centerLong]}
            icon={customCityIcon}
          ></Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
