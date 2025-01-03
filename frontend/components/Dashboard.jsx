"use client";

import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  ChevronDown,
  Download,
  Filter,
  LogOut,
  MoreHorizontal,
  Search,
  Share2,
  Users,
  MessageCircle,
  LocateIcon,
  ListCheckIcon,
} from "lucide-react";
// import p1 from "@/app/image/image.png";
// import useProfileStore from "@/store/profileStore"; // Correct import
// import { useEffect, useState } from "react"; // Added useState import
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  return (
    <aside className="w-64 bg-white border-r">
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        <div className="text-xl font-bold text-blue-600">Booking</div>
      </div>
      <nav className="p-4 space-y-2">
        <Link
          href="#"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
        >
          <CalendarDays className="w-4 h-4" />
          Dashboard
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <ListCheckIcon className="w-4 h-4" />
          Category
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <LocateIcon className="w-4 h-4" />
          Location
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <MessageCircle className="w-4 h-4" />
          Feedback
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Link>
        {/* Add more navigation items */}
      </nav>
    </aside>
  );
};

export default Dashboard;
