// ProfilePage Component
"use client";

import { useState, useEffect } from "react";

const ProfilePage = ({ isAuthenticated }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/profile`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch profile");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data available</div>;

  const userArray = Array.isArray(user) ? user : [user];

  return (
    <div>
      {userArray.map((userData, index) => (
        <div key={index}>
          <h2>{userData.name}</h2>
          {userData.image ? (
            <img src={userData.image} alt={userData.name} />
          ) : (
            <div>No image available</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfilePage;
