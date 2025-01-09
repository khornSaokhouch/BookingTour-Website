"use client";

import Dashboard from "@/components/Dashboard";
import { useAuthStore } from "../../store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProtectedRoute from "@/components/ProtectRoute";

const ProtectRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !user) {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user) {
    return null; // or a loading spinner
  }

  return children;
};

const Layout = ({ children }) => {
  const { isAuthenticated, checkAuth, user, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(); // Check authentication status when the component mounts
  }, [checkAuth]);

  // // Show a loading spinner while checking authentication
  // if (isCheckingAuth) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-screen bg-gray-50 space-y-4">
  //       <span className="loading loading-spinner loading-xs text-blue-500"></span>
  //       <span className="loading loading-spinner loading-sm text-green-500"></span>
  //       <span className="loading loading-spinner loading-md text-red-500"></span>
  //       <span className="loading loading-spinner loading-lg text-purple-500"></span>
  //     </div>
  //   );
  // }

  // Render the protected content
  return (
    <ProtectRoute>
      <Dashboard>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </Dashboard>
    </ProtectRoute>
  );
};

export default Layout;
