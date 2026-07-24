import api from "./api";

export const contactService = {
  // Get all contact messages
  getAll: async () => {
    return await api.get("/api/contact/list");
  },

  // Update Read/Unread status
  updateStatus: async (id) => {
    return await api.put(`/api/contact/status/${id}`);
  },

  // Delete contact message
  deleteOne: async (id) => {
    return await api.delete(`/api/contact/delete/${id}`);
  },
};
