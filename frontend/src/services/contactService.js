import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const contactService = {
  createContact: async (data) => {
    const response = await axios.post(`${API_BASE_URL}/api/contact/send`, data);
    return response.data;
  },
};
