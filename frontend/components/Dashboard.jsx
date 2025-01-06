"use client";
import React, { useState } from "react";
import { Home, Calendar, Plus, User, Star, LogOut, Bell } from "lucide-react";

const Dashboard = ({ children }) => {
  const [activeLink, setActiveLink] = useState("dashboard");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="flex flex-col items-center py-6">
          <div className="flex flex-col items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-[70px] w-auto mb-2 object-cover"
            />
          </div>
        </div>
        <nav className="mt-4 space-y-1">
          {[
            { name: "Dashboard", icon: Home },
            { name: "Booking", icon: Calendar },
            { name: "Add Package", icon: Plus },
            { name: "Users", icon: User },
            { name: "Reviews", icon: Star },
            { name: "Logout", icon: LogOut },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => handleLinkClick(item.name.toLowerCase())}
              className={`flex items-center w-full px-4 py-3 rounded-lg gap-4 text-sm font-medium ${
                activeLink === item.name.toLowerCase()
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
          <div className="flex items-center">
            <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          <div className="flex-grow mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-10 py-2 text-sm bg-gray-100 border rounded-full focus:ring focus:ring-blue-300 focus:outline-none"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute w-5 h-5 text-gray-400 top-2.5 left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
                9
              </span>
            </button>

            <div className="flex items-center space-x-8">
              <img
                src="https://i.pinimg.com/236x/cd/b9/46/cdb946122557049c84ecc2794b7dcd37.jpg"
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover object-center"
              />
              <div>
                <p className="text-lg font-medium">Moni Roy</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              <button className="focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Placeholder */}
        <div className="flex-1 p-6 bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;