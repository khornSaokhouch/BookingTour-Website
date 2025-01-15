// ProfilePage Component
"use client";

import { useState, useEffect } from "react";
import ProfileUser from "../../../components/Profile";
import { useParams } from "next/navigation";
import { useAuthStore } from "../../../store/authStore";

const ProfilePage = () => {
  const { id } = useParams();
  const {
    user,
    image,
    isLoading,
    error,
    fetchImage,
    fetchCompanyById,
    fetchUserById,
  } = useAuthStore();

  useEffect(() => {
    fetchUserById(id).catch((err) =>
      console.error("Error in fetchCompanyById:", err)
    );
  }, [id, fetchUserById]);

  useEffect(() => {
    if (user?._id) {
      fetchImage(user._id).catch((err) =>
        console.error("Error in fetchImage:", err)
      );
    }
  }, [user, fetchImage]);



  return (
    <div>
      <ProfileUser id={id} />
    </div>
  );
};

export default ProfilePage;
