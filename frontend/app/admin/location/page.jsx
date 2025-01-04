// filepath: /d:/Rupp_ITE_A1-B/New folder (2)/BookingTour-senghorng/BookingTour-senghorng/frontend/app/admin/location/page.jsx
"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Edit, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocationStore } from "../../../store/locationStore";

const LocationList = () => {
  const { locations, fetchLocations, deleteLocation } = useLocationStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchLocations(); // Load locations when the component mounts
  }, [fetchLocations]);

  const handleEdit = (location) => {
    router.push(`/admin/location/edit?id=${location._id}`);
  };

  const handleDelete = () => {
    if (selectedLocation) {
      console.log("Deleting location:", selectedLocation); // For debugging
      deleteLocation(selectedLocation._id); // Ensure using _id for MongoDB
      setSelectedLocation(null); // Clear selected location after delete
    } else {
      console.error("Error: No location selected for deletion.");
    }
  };

  const filteredLocations = locations.filter((location) =>
    (location.nameLocation || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <div className="w-full bg-white mt-32 rounded-xl shadow-md">
        {/* Filter Section */}
        <div className="flex justify-between items-center gap-7 p-4">
          <div className="flex items-center gap-5">
            <p>All</p>
            <div className="rounded-3xl flex bg-gray-200 items-center justify-center gap-1 px-3">
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent rounded text-sm border-none focus:outline-none w-full px-2"
                aria-label="Search input"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Link
              href="/admin/location/create-location"
              className="flex items-center text-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span className="text-sm font-medium">Add Location</span>
            </Link>
          </div>
        </div>

        {/* Table Section */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLocations.map((location, index) => (
              <TableRow key={location._id || index}>
                <TableCell>
                  <div className="font-medium">{index + 1}</div>
                </TableCell>
                <TableCell>{location.nameLocation}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      location.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : location.status === "Inactive"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {location.status}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {/* Edit Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(location)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    {/* Delete Button */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedLocation(location)}
                        >
                          <Trash className="w-4 h-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this item? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LocationList;