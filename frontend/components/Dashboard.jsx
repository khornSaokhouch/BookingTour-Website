"use client";

import Link from "next/link";
import {
  CalendarDays,
  ListCheckIcon,
  LocateIcon,
  MessageCircle,
  LogOut,
  User,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [activeLink, setActiveLink] = useState("dashboard");
  const router = useRouter();

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <aside className="w-64 bg-white border-r">
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        <div className="text-xl font-bold text-blue-600">Booking</div>
      </div>
      <nav className="p-4 space-y-2">
        <Link
          href="#"
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg ${
            activeLink === "dashboard"
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleLinkClick("dashboard")}
        >
          <CalendarDays className="w-4 h-4" />
          Dashboard
        </Link>
        <Link
          href="#"
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg ${
            activeLink === "category"
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleLinkClick("category")}
        >
          <ListCheckIcon className="w-4 h-4" />
          Category
        </Link>
        <Link
          href="#"
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg ${
            activeLink === "location"
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleLinkClick("location")}
        >
          <LocateIcon className="w-4 h-4" />
          Location
        </Link>
        <Link
          href="#"
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg ${
            activeLink === "user"
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleLinkClick("user")}
        >
          <User className="w-4 h-4" />
          User
        </Link>
        <Link
          href="#"
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg ${
            activeLink === "feedback"
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleLinkClick("feedback")}
        >
          <MessageCircle className="w-4 h-4" />
          Feedback
        </Link>
        <Link
          href="#"
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg ${
            activeLink === "logout"
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleLinkClick("logout")}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Link>
      </nav>
    </aside>
  );
};

export default Dashboard;
