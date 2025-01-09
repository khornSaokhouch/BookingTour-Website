'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from 'lucide-react'
import { useState } from "react"

export default function AddPackageForm() {
  const [files, setFiles] = useState([])
  const [totalPayment, setTotalPayment] = useState(35)

  const handleFileDrop = (e) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(droppedFiles)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Add New Package</h1>
        <Button variant="outline" size="sm" className="text-green-500">
          Save
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="packageName">Package name</Label>
              <Input id="packageName" placeholder="Package name" />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Location" />
            </div>

            <div>
              <Label>Drop image here</Label>
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
              >
                <div className="flex flex-col items-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Browse Files</p>
                  <input type="file" className="hidden" />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter description" className="h-32" />
            </div>

            <div>
              <Label htmlFor="packageDescription">Package Description</Label>
              <Input id="packageDescription" placeholder="Package description" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="category1">Category 1</SelectItem>
                  <SelectItem value="category2">Category 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="type1">Type 1</SelectItem>
                  <SelectItem value="type2">Type 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="days">Days</Label>
              <div className="flex items-center gap-2">
                <Input type="number" id="days" placeholder="0" />
                <span className="text-sm text-gray-500">d</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input type="date" id="startDate" />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input type="date" id="endDate" />
              </div>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="transportation">Transportation</Label>
              <Select defaultValue="bus">
                <SelectTrigger>
                  <SelectValue placeholder="Select transportation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bus">Bus</SelectItem>
                  <SelectItem value="train">Train</SelectItem>
                  <SelectItem value="plane">Plane</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <Input id="type" placeholder="Semi Reg Tour" />
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input type="number" id="quantity" placeholder="1" />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input type="number" id="price" placeholder="35" />
              </div>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Payment</span>
                  <span className="font-semibold">${totalPayment}</span>
                </div>
              </CardContent>
            </Card>

            <div>
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="wifi" />
                  <label htmlFor="wifi" className="text-sm">Wi-fi</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="breakfast" />
                  <label htmlFor="breakfast" className="text-sm">Breakfast</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="washroom" />
                  <label htmlFor="washroom" className="text-sm">Washroom</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="taxiboat" />
                  <label htmlFor="taxiboat" className="text-sm">Taxiboat</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="security" />
                  <label htmlFor="security" className="text-sm">Security</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="insurance" />
                  <label htmlFor="insurance" className="text-sm">Insurance</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="documented" />
                  <label htmlFor="documented" className="text-sm">Documented</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="healing" />
                  <label htmlFor="healing" className="text-sm">Healing</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <Button variant="outline">Cancel</Button>
        <Button>Next</Button>
      </div>
    </div>
  )
}

