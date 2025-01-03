// filepath: /d:/Rupp_ITE_A1-B/New folder (2)/BookingTour-senghorng/BookingTour-senghorng/frontend/app/admin/layout.jsx
"use client";

import Dashboard from "@/components/Dashboard";
import { UserNav } from "@/components/user-navbar";

const Layout = ({ children }) => {
  return (
    <div className="">
      <div className="flex   min-h-screen bg-gray-50/50">
        <Dashboard />
        {children}
      </div>
    </div>
  );
};

export default Layout;
