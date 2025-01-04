import React from "react";
import Link from "next/link";
import Image from "next/image";

// Updated sample data to include profile images
const userData = [
  {
    id: 1,
    name: "John Doe",
    role: "User",
    location: "New York",
    totalBooking: 5,
    date: "2023-05-15",
    contactInfo: "john@example.com",
    status: "Approved",
    profileImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Sub Admin",
    location: "Los Angeles",
    totalBooking: 12,
    date: "2023-05-14",
    contactInfo: "jane@example.com",
    status: "Pending",
    profileImage: "/placeholder.svg?height=40&width=40",
  },
  // Add more sample data as needed
];

const UserAdminTable = () => {
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            User and Sub Admin Table
          </h2>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Booking
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <Image
                          className="w-full h-full rounded-full"
                          src={user.profileImage}
                          alt={`${user.name}'s profile`}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.name}
                        </p>
                        <p className="text-gray-600 whitespace-no-wrap">
                          {user.role}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {user.location}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {user.totalBooking}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {user.date}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {user.contactInfo}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                      className={`relative inline-block px-3 py-1 font-semibold text-${
                        user.status === "Approved" ? "green" : "orange"
                      }-900 leading-tight`}
                    >
                      <span
                        aria-hidden
                        className={`absolute inset-0 bg-${
                          user.status === "Approved" ? "green" : "orange"
                        }-200 opacity-50 rounded-full`}
                      ></span>
                      <span className="relative">{user.status}</span>
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <Link
                      href={`/profile/${user.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserAdminTable;
