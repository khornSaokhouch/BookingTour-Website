import { create } from "zustand";

const useTourStore = create((set) => ({
  tours: [],
  currentTour: null,
  loading: false,
  error: null,

  // Fetch all tours
  fetchTours: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/tours"); // Adjust the API endpoint
      const data = await response.json();
      if (response.ok) {
        set({ tours: data.data, loading: false });
      } else {
        throw new Error(data.error || "Failed to fetch tours");
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch a single tour by ID
  fetchTourById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/tours/${id}`); // Adjust the API endpoint
      const data = await response.json();
      if (response.ok) {
        set({ currentTour: data.data, loading: false });
      } else {
        throw new Error(data.error || "Failed to fetch tour");
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Create a new tour
  createTour: async (tourData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/tours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tourData),
      });
      const data = await response.json();
      if (response.ok) {
        set((state) => ({
          tours: [...state.tours, data.data],
          loading: false,
        }));
      } else {
        throw new Error(data.error || "Failed to create tour");
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Update a tour
  updateTour: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/tours/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      if (response.ok) {
        set((state) => ({
          tours: state.tours.map((tour) =>
            tour._id === id ? data.data : tour
          ),
          loading: false,
        }));
      } else {
        throw new Error(data.error || "Failed to update tour");
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Delete a tour
  deleteTour: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/tours/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        set((state) => ({
          tours: state.tours.filter((tour) => tour._id !== id),
          loading: false,
        }));
      } else {
        throw new Error("Failed to delete tour");
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Edit main image of a tour
  editMainImage: async (id, newImageUrl) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/tours/${id}/edit-main-image`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mainImage: newImageUrl }),
      });
      const data = await response.json();
      if (response.ok) {
        set((state) => ({
          tours: state.tours.map((tour) =>
            tour._id === id ? { ...tour, mainImage: newImageUrl } : tour
          ),
          loading: false,
        }));
      } else {
        throw new Error(data.error || "Failed to update main image");
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Delete an image from galleryImages
  deleteGalleryImage: async (id, imageUrl) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/tours/${id}/delete-gallery-image`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      });
      const data = await response.json();
      if (response.ok) {
        set((state) => ({
          tours: state.tours.map((tour) =>
            tour._id === id
              ? {
                  ...tour,
                  galleryImages: tour.galleryImages.filter(
                    (img) => img !== imageUrl
                  ),
                }
              : tour
          ),
          loading: false,
        }));
      } else {
        throw new Error(data.error || "Failed to delete gallery image");
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useTourStore;
