import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const userService = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/users`);
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    return response.json();
  },

  create: async (userData) => {
    const response = await axios;
    // const response = await fetch(`${API_BASE_URL}/users`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(userData),
    // });
    return response.json();
  },

  update: async (id, userData) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },
};
