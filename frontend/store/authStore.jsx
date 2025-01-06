import { create } from "zustand";

const API_URL = "http://localhost:3500/api/auth";

export const useAuthStore = create((set,get) => ({
  user: null,
  isLoading: false,
  error: null,
  image: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  message: null,
  users: [],

  // Use `get` to access the current state
  getUserCounts: () => {
    const users = get().users; // Use `get` to access the current state
    const total = users.length;
    const subAdmins = users.filter((u) => u.role === "sub-admin").length;
    return { total, subAdmins };
  },

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch users");
      set({ users: data.users, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  // Edit user profile
  editUser: async (userId, name, email, role, status) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, role, status }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update user");

      // Update user in the state
      set({
        users: get().users.map((user) =>
          user._id === userId ? { ...user, name, email, role, status } : user
        ),
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Delete user
  deleteUser: async (userId) => {
    if (!userId) {
      console.error("Invalid userId:", userId);
      return;
    }
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        console.error(
          "Failed to delete user:",
          data.message || "Unknown error"
        );
        throw new Error(data.message || "Failed to delete user");
      }

      // Use `get` to access the current state
      set({
        users: get().users.filter((user) => user._id !== userId),
        isLoading: false,
      });
      console.log("User deleted successfully:", userId);
    } catch (error) {
      console.error("Delete user error:", error.message);
      set({ error: error.message, isLoading: false });
    }
  },

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password, name }),
      });
      const data = await response.json();
      console.log(data);

      set({ isLoading: false, isAuthenticated: true, user: data.user });
    } catch (error) {
      set({ isLoading: false, error: error.message });
      console.log(error);

      throw error;
    }
  },
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      set({ isLoading: false, isAuthenticated: true, user: data.user });
    } catch (error) {
      set({ isLoading: false, error: error.message });
      console.log(error);
    }
  },
  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is successful
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Debugging logs to verify the API response
      console.log("API Response:", data);

      // Save user and set authentication state
      set({
        isLoading: false,
        isAuthenticated: true,
        user: data.user, // This should now include the role and image
      });

      return data.user; // Return user object for further processing
    } catch (error) {
      set({ isLoading: false, error: error.message });
      console.error("Login Error:", error);
      throw error;
    }
  },
  // Fetch user profile
  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch profile");
      }
      const data = await response.json();
      set({ user: data.user, isAuthenticated: true, isLoading: false });
    } catch (err) {
      set({ error: err.message, isAuthenticated: false, isLoading: false });
    }
  },

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password, name }),
      });
      const data = await response.json();
      console.log(data);

      set({ isLoading: false, isAuthenticated: true, user: data.user });
    } catch (error) {
      set({ isLoading: false, error: error.message });
      console.log(error);

      throw error;
    }
  },

  // checkAuth: async () => {
  //   set({ isCheckingAuth: true, error: null });
  //   try {
  //     const response = await fetch(`${API_URL}/check-auth`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //     const data = await response.json();
  //     if (data.user) {
  //       set({ isAuthenticated: true, user: data.user, isCheckingAuth: false });
  //     } else {
  //       set({ isAuthenticated: false, user: null, isCheckingAuth: false });
  //     }
  //   } catch (error) {
  //     set({ isCheckingAuth: false, isAuthenticated: false, user: null });
  //     console.log(error);
  //   }
  // },
  // logout: async () => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await fetch(`${API_URL}/logout`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //     set({ isLoading: false, isAuthenticated: false, user: null });
  //   } catch (error) {
  //     set({ isLoading: false, error: error.message });
  //     throw error;
  //   }
  // },
  // forgotPassword: async (email) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await fetch(`${API_URL}/forgot-password`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({ email }),
  //     });
  //     const data = await response.json();
  //     console.log(data.message);
  //     set({ isLoading: false, message: data.message });
  //   } catch (error) {
  //     set({ isLoading: false, error: error.message });
  //     console.log(error);
  //   }
  // },
  // resetPassword: async (token, password) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await fetch(`${API_URL}/reset-password/${token}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({ password }),
  //     });
  //     const data = await response.json();
  //     set({ isLoading: false, message: data.message });
  //   } catch (error) {
  //     set({ isLoading: false, error: error.message });
  //     console.log(error);
  //     throw error;
  //   }
  // },
}));
