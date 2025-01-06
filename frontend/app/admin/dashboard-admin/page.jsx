"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "../../../store/authStore";
import {
  CalendarDays,
  ChevronDown,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  Share2,
  Users,
} from "lucide-react";
const bookings = [
  {
    id: 1,
    user: {
      name: "Jenny Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    location: "Street 123, Daun Penh, Phnom Penh",
    checkIn: "22 Dec 2023",
    checkOut: "24 Dec 2023",
    contantInfo: "090909090",
    status: "Confirmed",
  },

  // Add more booking data as needed
];

const page = () => {
  const fetchUsers = useAuthStore((state) => state.fetchUsers);
  const getUserCounts = useAuthStore((state) => state.getUserCounts);

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, [fetchUsers]);

  const { total, subAdmins } = getUserCounts(); 
  return (
    <main className=" flex-1 p-8">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{total}</div>
              <div className="text-sm text-gray-500">Total User</div>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <CalendarDays className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{subAdmins}</div>
              <div className="text-sm text-gray-500">Total Campany</div>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Share2 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">189</div>
              <div className="text-sm text-gray-500">Total Shares</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Bookings Table */}
      <Card>
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">New Owner Request</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search"
                  className="w-64"
                  //   startIcon={<Search className="w-4 h-4 text-gray-400" />}
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

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Contact info</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
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
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
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
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-6 py-4 border-t">
          <div className="text-sm text-gray-500">
            Showing 1 to 10 of 100 entries
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </main>
  );
};

export default page;
