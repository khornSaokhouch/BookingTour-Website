import { create } from "zustand";

const API_LOCATION_URL = "http://localhost:3500/api/locations";

export const useLocationStore = create((set, get) => ({
  locations: [],
  lastId: 0, // Initialize lastId with 0; it'll be updated after fetching from the backend.

  // Fetch all locations from the backend
  locations: [],
  isLoading: false,
  error: null,

  fetchLocations: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_LOCATION_URL}`);
      const data = await response.json();
      if (response.ok) {
        set({ locations: data.locations });
      } else {
        set({ error: data.message });
      }
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // Create a new location
  addLocation: async (location) => {
    try {
      const response = await fetch(`${API_LOCATION_URL}/createlocation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(location),
      });
      const data = await response.json();
      if (response.ok) {
        set((state) => ({
          locations: [...state.locations, data.location],
          lastId: state.lastId + 1,
        }));
      } else {
        console.error("Error creating location:", data.message);
      }
    } catch (error) {
      console.error("Error creating location:", error);
    }
  },

  // Update an existing location
  updateLocation: async (location) => {
    try {
      const response = await fetch(`${API_LOCATION_URL}/${location.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(location),
      });
      const data = await response.json();
      if (response.ok) {
        set((state) => ({
          locations: state.locations.map((loc) =>
            loc.id === location.id ? data.location : loc
          ),
        }));
      } else {
        console.error("Error updating location:", data.message);
      }
    } catch (error) {
      console.error("Error updating location:", error);
    }
  },

  // Delete a location
  deleteLocation: async (id) => {
    try {
      const response = await fetch(`${API_LOCATION_URL}/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        set((state) => ({
          locations: state.locations.filter((loc) => loc.id !== id),
        }));
      } else {
        console.error("Error deleting location:", data.message);
      }
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  },
}));