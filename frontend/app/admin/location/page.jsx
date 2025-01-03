"use client";

import { useEffect } from "react";
import { useLocationStore } from "../../../store/locationStore";

const LocationList = () => {
  const { locations, fetchLocations } = useLocationStore();

  useEffect(() => {
    fetchLocations(); // Load locations when the component mounts
  }, []);

  return (
    <ul>
      {locations.map((location) => (
        <li key={location._id}>
          {location.state}, {location.nameLocation}
        </li>
      ))}
    </ul>
  );
};

export default LocationList;
