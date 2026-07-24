import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const subscriberService = {
  createContact: async (data) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/subscriber/create`,
      data,
    );
    return response;
  },
};
