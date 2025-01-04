// filepath: /d:/Rupp_ITE_A1-B/New folder (2)/BookingTour-senghorng/BookingTour-senghorng/frontend/app/admin/location/edit/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocationStore } from "@/store/locationStore";

const EditLocation = () => {
  const { locations, updateLocation } = useLocationStore();
  const [location, setLocation] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id && locations.length > 0) {
      const existingLocation = locations.find((loc) => loc._id === id); // Ensure using _id for MongoDB
      if (existingLocation) {
        setLocation(existingLocation);
      } else {
        console.error("Location not found.");
      }
    } else if (!id) {
      console.error("Location ID is not provided in query parameters.");
    }
  }, [id, locations]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (location) {
      updateLocation(location._id, location); // Ensure using _id for MongoDB
      router.push("/admin/location");
    } else {
      console.error("No location to update.");
    }
  };

  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="w-full bg-white mt-32 rounded-xl shadow-md p-4">
        <h1 className="text-xl font-bold mb-4">Edit Location</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Location Name</label>
          <Input
            name="nameLocation"
            value={location.nameLocation}
            onChange={handleInputChange}
            className="mt-1 block w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <Input
            name="status"
            value={location.status}
            onChange={handleInputChange}
            className="mt-1 block w-full"
          />
        </div>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default EditLocation;