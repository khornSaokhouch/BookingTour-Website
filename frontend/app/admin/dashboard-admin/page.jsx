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

const Dashboard = () => {
  const { users, fetchUsers, isLoading, deleteUser, editUser } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTable, setActiveTable] = useState("");
  const [regularUsers, setRegularUsers] = useState(0);
  const [subAdmins, setSubAdmins] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const filteredData = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedData = activeTable
      ? filteredData.filter(
          (user) => user.role.toLowerCase() === activeTable.toLowerCase()
        )
      : filteredData;

    let regularUsersCount = 0;
    let subAdminsCount = 0;

    displayedData.forEach((user) => {
      if (user.role === "User") {
        regularUsersCount++;
      } else if (user.role === "SubAdmin") {
        subAdminsCount++;
      }
    });

    setRegularUsers(regularUsersCount);
    setSubAdmins(subAdminsCount);
  }, [users, searchTerm, activeTable]);

  const total = users.length;

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{total}</div>
              <div className="text-sm text-gray-500">Total Users</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{subAdmins}</div>
              <div className="text-sm text-gray-500">Company user</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{regularUsers}</div>
              <div className="text-sm text-gray-500">Tour Booking</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Bookings Table */}
      <Card>
        <div className="p-4 md:p-6 border-b">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">New Owner Request</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search"
                  className="w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
              <Button className="w-full md:w-auto">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
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
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-4 border-t">
          <div className="text-sm text-gray-500 mb-4 md:mb-0">
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
    </>
  );
};

export default Dashboard;
