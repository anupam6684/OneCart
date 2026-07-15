import axios from "axios";
import api from "./api";

export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/api/user/admin`, {
      email,
      password,
    });

    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  verifyToken: async () => {
    try {
      const response = await api.get("/api/user/verify");
      return response.data.success;
    } catch {
      return false;
    }
  },
};
