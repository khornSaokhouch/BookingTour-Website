"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocationStore } from "../../../../store/locationStore";

const CreateLocation = () => {
  const { addLocation, updateLocation } = useLocationStore();
  const router = useRouter(); // Hook for navigation

  // State for form data
  const [location, setLocation] = useState({
    id: "",
    nameLocation: "",
    status: "",
  });

  // State for success message
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!location.nameLocation) {
      alert("Please enter a location name.");
      return;
    }

    if (location.id) {
      updateLocation(location); // Update existing location
    } else {
      addLocation(location); // Add new location
    }

    // Reset form fields and show success message
    setLocation({ id: "", nameLocation: "", status: "" });
    setIsSuccess(true);

    // Hide success message and redirect after 2 seconds
    setTimeout(() => {
      setIsSuccess(false);
      router.push("/admin/location"); // Navigate to location list
    }, 2000);
  };

  return (
    <section className="w-full mt-28 flex flex-col gap-12">
      {/* Page Header */}
      <div className="bg-white rounded-2xl">
        <section className="flex justify-between p-4">
          <div className="border-b-4 border-indigo-500">
            <p>Create Location</p>
          </div>
          <div>
            <Link href="/admin/location">Back</Link>
          </div>
        </section>
      </div>

      {/* Success Message */}
      {isSuccess && (
        <div className=" bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Location successfully {location.id ? "updated" : "created"}!
          Redirecting...
        </div>
      )}

      {/* Form Section */}
      <div className="bg-white flex items-center h-[144px] rounded-2xl p-3">
        <form className="flex gap-x-8">
          {/* Location Name Input */}
          <div>
            <label htmlFor="nameLocation" className="block mb-2">
              Location Name
            </label>
            <input
              type="text"
              id="nameLocation"
              name="nameLocation"
              value={location.nameLocation}
              onChange={handleInputChange}
              className="bg-gray-50 border rounded-lg px-2 py-1"
              placeholder="Enter location name"
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <label htmlFor="status" className="block mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={location.status}
              onChange={handleInputChange}
              className="bg-gray-50 border rounded-lg px-2 py-1"
            >
              <option value="">Select status</option>
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="text-blue-700 border border-blue-700 px-4 py-2 rounded-lg"
          >
            {location.id ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateLocation;
