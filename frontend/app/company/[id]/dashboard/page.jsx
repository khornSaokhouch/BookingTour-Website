"use client";

import { useParams } from "next/navigation";
import { useAuthStore } from "../../../../store/authStore";
import { useEffect } from "react";

const DashboardPage = () => {
  const { id } = useParams(); // Get the company ID from the URL
  const { user, image, isLoading, error, fetchImage, fetchCompanyById } =
    useAuthStore(); // Destructure Zustand store

  // Fetch company details when the component mounts or when the ID changes
  useEffect(() => {
    fetchCompanyById(id).catch((err) =>
      console.error("Error in fetchCompanyById:", err)
    );
  }, [id, fetchCompanyById]);

  // Fetch image when the user object is available
  useEffect(() => {
    if (user?._id) {
      fetchImage(user._id).catch((err) =>
        console.error("Error in fetchImage:", err)
      );
    }
  }, [user, fetchImage]);

  if (isLoading) {
    return <p>Loading company details...</p>; // Show loading state
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>; // Show error message
  }

  return (
    <div>
      <h1>Company Dashboard</h1>
      <p>Company ID: {id}</p>

      {/* Display user name and role */}
      {user && (
        <div>
          <p>User Name: {user.name}</p>
          <p>User Role: {user.role}</p>
          {image && (
            <div>
              <h3>Profile Image:</h3>
              <img
                src={image}
                alt="Profile"
                style={{ width: "200px", height: "auto" }}
              />
            </div>
          )}
        </div>
      )}

      {/* Add your dashboard components here */}
    </div>
  );
};

export default DashboardPage;