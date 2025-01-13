"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Filter, Download, MoreHorizontal } from "lucide-react";
import { useParams } from "next/navigation";
import { useAdminStore } from "@/store/adminStore";

const Dashboard = ({ adminId }) => {
   const { id } = useParams();
  const { fetchAdminUsers, users, counts, loading, error } = useAdminStore();

  const [searchTerm, setSearchTerm] = useState("");
  // const id = "67824394c37fb65437da2bd6";
  useEffect(() => {
    if (id) fetchAdminUsers(id);
  }, [id, fetchAdminUsers]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { count: counts.users, label: "Total Users", color: "text-blue-600" },
          {
            count: counts.subAdmins,
            label: "Company Users",
            color: "text-green-600",
          },
          {
            count: counts.bookings,
            label: "Tour Bookings",
            color: "text-purple-600",
          },
        ].map((stat, index) => (
          <Card className="p-4" key={index}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.count}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bookings Table */}
      <Card>
        <div className="p-4 md:p-6 border-b">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">New Owner Requests</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={user.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>{user.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{user.location}</TableCell>
                    <TableCell>{user.requestDate}</TableCell>
                    <TableCell>{user.contactInfo}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Card>
    </>
  );
};

export default Dashboard;

{
  /* <TableBody>
  {bookings.map((booking, index) => (
    <TableRow key={booking.id || index}>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={booking.user.avatar} />
            <AvatarFallback>{booking.user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="font-medium">{booking.user.name}</div>
        </div>
      </TableCell>
      <TableCell>{booking.location}</TableCell>
      <TableCell>
        <div className="text-sm">
          <div>{booking.checkIn}</div>
          <div>{booking.checkOut}</div>
        </div>
      </TableCell>
      <TableCell>{booking.contantInfo}</TableCell>
      <TableCell>
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            booking.status === "Confirmed"
              ? "bg-green-100 text-green-800"
              : booking.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {booking.status}
        </div>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>; */
}
