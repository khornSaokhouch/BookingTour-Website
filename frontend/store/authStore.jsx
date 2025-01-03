import { create } from "zustand";

const API_URL = "http://localhost:3500/api/auth";

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  image: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  message: null,

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
  // Fetch profile function
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
