"use client";

import React, { useEffect, useState } from "react";
import { Home, Calendar, Plus, User, Star, LogOut, Bell } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DashboardCompany = ({ children, id }) => {
  const { logout, user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(false);

  // Check authentication and role
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.replace("/login");
    } else if (user?.role !== "subadmin") {
      // Redirect unauthorized users
      router.replace("/unauthorized");
    }
  }, [isAuthenticated, user, router]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
    router.replace("/login"); // Redirect to login after logout
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="flex flex-col items-center py-6">
          <img src="/logo.png" alt="Logo" className="h-[70px] w-auto mb-2" />
        </div>

        <nav className="mt-4 space-y-1">
          {[
            { name: "Dashboard", icon: Home, href: `/company/dashboard/${id}` },
            {
              name: "Category",
              icon: Calendar,
              href: `/company/category/${id}`,
            },
            { name: "Location", icon: Plus, href: `/company/location/${id}` },
            { name: "Users", icon: User, href: `/company/users/${id}` },
            { name: "Reviews", icon: Star, href: `/company/reviews/${id}` },
            { name: "Logout", icon: LogOut },
          ].map((item) => (
            <div key={item.name}>
              {item.name === "Logout" ? (
                <button
                  onClick={handleLogout}
                  className={`flex items-center w-full px-4 py-3 rounded-lg gap-4 text-sm font-medium ${
                    activeLink === item.name.toLowerCase()
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  disabled={isLoading}
                >
                  <item.icon className="w-5 h-5" />
                  {isLoading ? "Logging out..." : item.name}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center w-full px-4 py-3 rounded-lg gap-4 text-sm font-medium ${
                    activeLink === item.name.toLowerCase()
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => handleLinkClick(item.name.toLowerCase())}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
          <p className="text-lg font-medium">{user?.name}</p>
        </header>
        <div className="flex-1 p-6 bg-gray-50">{children}</div>
      </div>
    </div>
  );
};

export default DashboardCompany;
