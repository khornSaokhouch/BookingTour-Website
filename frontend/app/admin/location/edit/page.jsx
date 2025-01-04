"use client"

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLocationStore } from "../../../../store/locationStore";

const EditLocation = () => {
  const { fetchLocations, updateLocation, isLoading, error, locations } =
    useLocationStore();
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Retrieve the "id" query parameter
  const [location, setLocation] = useState({ nameLocation: "", status: "" });
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  // Fetch locations and populate the state with the selected location
  useEffect(() => {
    fetchLocations(); // Load locations when the component mounts
  }, [fetchLocations]);

  useEffect(() => {
    // Find the location from the fetched locations by ID and update the state
    if (id && locations.length > 0) {
      const foundLocation = locations.find((loc) => loc.id === id);
      if (foundLocation) {
        setLocation({
          nameLocation: foundLocation.nameLocation,
          status: foundLocation.status,
        });
      }
    }
  }, [id, locations]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      console.error("Location ID is not available.");
      return;
    }
    try {
      const locationWithId = { ...location, id }; // Ensure `id` is set
      await updateLocation(locationWithId); // Pass the updated location
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        router.push("/admin/location"); // Redirect after success
      }, 3000);
    } catch (err) {
      console.error("Error updating location:", err);
    }
  };

  const resetForm = () => {
    setLocation({ nameLocation: "", status: "" });
  };

  return (
    <section className="w-full mt-28 flex flex-col gap-12">
      <div className="bg-white rounded-2xl">
        <section className="flex justify-between p-4">
          <div className="border-b-4 border-indigo-500">
            <p>Edit Location</p>
          </div>
          <div>
            <Link href="/admin/location">Back</Link>
          </div>
        </section>
      </div>
      {isSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Location updated successfully! Redirecting...
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div>
        <div className="bg-white flex items-center h-[144px] rounded-2xl p-3">
          <div className="flex items-center gap-x-32">
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
              <label
                htmlFor="name-category"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Location Name
              </label>
              <div className="relative">
                <input
                  value={location.nameLocation}
                  onChange={handleInputChange}
                  name="nameLocation"
                  type="text"
                  id="name-category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] ps-10 p-2.5"
                  placeholder="Enter location name"
                  required
                />
              </div>
              <div className="mx-auto">
                <label
                  htmlFor="status-select"
                  className="block mt-4 mb-2 text-sm font-medium text-gray-900"
                >
                  Status
                </label>
                <select
                  name="status"
                  value={location.status}
                  onChange={handleInputChange}
                  id="status-select"
                  className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Location"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditLocation;
