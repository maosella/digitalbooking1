import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import { SearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

const MapSearch = () => {
  const provider = new OpenStreetMapProvider();
  const map = useMap();

  useEffect(() => {
    map.addControl(
      new SearchControl({
        style: "bar",
        provider,
        showMarker: false,
      })
    );
  }, []);
};

export default MapSearch;
