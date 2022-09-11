import React, { useState, useEffect, useRef, useMemo } from "react";
import { helpHttp, backendUrl } from "../../helpers/helpHttp";
import { MapContainer, TileLayer, Marker, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import "../map/citiesMap.css";
import { customRegIcon, customCityIcon } from "../../utils/Markers";
import MapSearch from "./MapSearch";

const CitiesMap = ({ setFormValues, formValues }) => {
  let api = helpHttp();
  const [cities, setCities] = useState([]);
  const [position, setPosition] = useState(null);
  const markerRef = useRef(null);

  const PosMarker = () => {
    const map = useMapEvent("dblclick", (ev) => {
      const lat = ev.latlng.lat;
      const lng = ev.latlng.lng;
      setPosition({ lat, lng });
      map.flyTo(ev.latlng, 8 > map.getZoom() ? 8 : map.getZoom());
    });
    const eventHandlers = useMemo(() => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          map.flyTo(marker.getLatLng(), 8 > map.getZoom() ? 8 : map.getZoom());
        }
      },
    }));
    return position === null ? null : (
      <Marker
        position={position}
        eventHandlers={eventHandlers}
        draggable={true}
        icon={customRegIcon}
        ref={markerRef}
      ></Marker>
    );
  };

  const getCities = async () => {
    const response = await api.get(`${backendUrl}/cities`);
    setCities(await response.json());
  };

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    if (position) {
      setFormValues({
        ...formValues,
        ["latitude"]: position?.lat,
        ["longitude"]: position?.lng,
      });
    }
  }, [position]);

  const MarkerList = cities?.map((city, idx) => {
    return (
      <Marker
        key={idx}
        position={[city.latitude, city.longitude]}
        icon={customCityIcon}
      ></Marker>
    );
  });

  return (
    <div className="w-full px-3 mb-6">
      <h2 className="font-semibold pb-1">Ubicación</h2>
      <MapContainer
        center={[-35.003996761179266, -64.92956961915675]}
        zoom={5}
        scrollWheelZoom={true}
        doubleClickZoom={false}
      >
        <MapSearch />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {MarkerList}
        <PosMarker />
      </MapContainer>
    </div>
  );
};

export default CitiesMap;
