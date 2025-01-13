"use client";

import { useEffect, useState } from "react";
import useCategoryStore from "../../../../store/categoryStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation"; // Import useParams
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
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Edit, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const CategoryList = () => {
  const { id } = useParams(); // Get the company ID from the URL
  const {
    categories,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    loading,
    error,
  } = useCategoryStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryData, setCategoryData] = useState({
    name: "",
    status: "",
  });
  const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false); // State for alert dialog
  const [categoryToDelete, setCategoryToDelete] = useState(null); // Category to delete

  // Fetch categories on component mount
  useEffect(() => {
    if (id) {
      fetchCategories(id); // Pass the `id` to fetch categories
    }
  }, [id]);

  // Handle adding a category
  const handleAddCategory = async () => {
    if (id) {
      await addCategory({
        categoryname: categoryData.name,
        status: categoryData.status,
        companyId: id, // Include the `id` in the request
      });
      setAddModalOpen(false);
      setCategoryData({ name: "", status: "" });
    }
  };

  // Handle editing a category
  const handleEditCategory = async () => {
    if (currentCategory && id) {
      await updateCategory(currentCategory._id, {
        categoryname: categoryData.name,
        status: categoryData.status,
        companyId: id, // Include the `id` in the request
      });
      setEditModalOpen(false);
      setCurrentCategory(null);
      setCategoryData({ name: "", status: "" });
    }
  };

  // Handle opening the delete confirmation dialog
  const handleDeleteCategory = (category) => {
    setCategoryToDelete(category); // Set the category to delete
    setDeleteAlertOpen(true); // Open the confirmation dialog
  };

  // Confirm deletion
  const confirmDeleteCategory = async () => {
    if (categoryToDelete && id) {
      await deleteCategory(categoryToDelete._id, id); // Pass the `id` to deleteCategory
      setDeleteAlertOpen(false); // Close the dialog
      setCategoryToDelete(null); // Clear category to delete
    }
  };

  // Handle opening the edit modal
  const handleEditClick = (category) => {
    setCurrentCategory(category);
    setCategoryData({
      name: category.categoryname,
      status: category.status,
    });
    setEditModalOpen(true);
  };

  // Safe way to filter categories (ensure categories is always an array)
  const filteredCategories = (categories || []).filter((cat) =>
    (cat.categoryname || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <div className="w-full bg-white mt-32 rounded-xl shadow-md">
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
            <Button
              onClick={() => setAddModalOpen(true)}
              className="text-blue-400"
            >
              Add Category
            </Button>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category, index) => (
                <TableRow key={category._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{category.categoryname}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        category.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : category.status === "Inactive"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {category.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(category)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCategory(category)}
                      >
                        <Trash className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <Dialog open={isAddModalOpen} onOpenChange={setAddModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Category Name"
                value={categoryData.name}
                onChange={(e) =>
                  setCategoryData({ ...categoryData, name: e.target.value })
                }
              />
              <div>
                <label htmlFor="status" className="block mb-2">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={categoryData.status}
                  onChange={(e) =>
                    setCategoryData({ ...categoryData, status: e.target.value })
                  }
                  className="bg-gray-50 border rounded-lg px-2 py-1 w-full"
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddCategory}>Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Category Modal */}
      {isEditModalOpen && (
        <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Category Name"
                value={categoryData.name}
                onChange={(e) =>
                  setCategoryData({ ...categoryData, name: e.target.value })
                }
              />
              <div>
                <label htmlFor="status" className="block mb-2">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={categoryData.status}
                  onChange={(e) =>
                    setCategoryData({ ...categoryData, status: e.target.value })
                  }
                  className="bg-gray-50 border rounded-lg px-2 py-1 w-full"
                >
                  <option value="Active">Active</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleEditCategory}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Alert */}
      {isDeleteAlertOpen && (
        <AlertDialog open={isDeleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this category? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeleteAlertOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteCategory}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default CategoryList;
