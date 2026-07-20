import axios from "axios";
import api from "./api";

export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/api/user/login`, {
      email,
      password,
    });

    return response.data;
  },
  register: async (username, email, password) => {
    const response = await axios.post(`${API_BASE_URL}/api/user/register`, {
      email,
      username,
      password,
    });

    return response.data;
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
