// src/store/categoryStore.js
import { create } from "zustand";
const API_CATEGORY_URL = "http://localhost:3500/api/categories";
const useCategoryStore = create((set) => ({
  categories: [],
  loading: false,
  error: null,

  // Fetch all categories from the API
  fetchCategories: async () => {
    set({ loading: true });
    try {
      const response = await fetch(`${API_CATEGORY_URL}`);
      const data = await response.json();
      set({ categories: data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Add a new category
  addCategory: async (newCategory) => {
    try {
      const response = await fetch(`${API_CATEGORY_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });
      const data = await response.json();
      if (data.data) {
        set((state) => ({
          categories: [...state.categories, data.data],
        }));
      }
    } catch (error) {
      console.error("Failed to add category:", error.message);
    }
  },

  // Update an existing category
  updateCategory: async (id, updatedCategory) => {
    try {
      const response = await fetch(`${API_CATEGORY_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategory),
      });
      const data = await response.json();
      if (data.data) {
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat._id === id ? data.data : cat
          ),
        }));
      }
    } catch (error) {
      console.error("Failed to update category:", error.message);
    }
  },

  // Delete a category
  deleteCategory: async (id) => {
    try {
      const response = await fetch(`${API_CATEGORY_URL}/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.message === "Category deleted successfully.") {
        set((state) => ({
          categories: state.categories.filter((cat) => cat._id !== id),
        }));
      }
    } catch (error) {
      console.error("Failed to delete category:", error.message);
    }
  },
}));

export default useCategoryStore;
