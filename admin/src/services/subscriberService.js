import api from "./api";

export const subscriberService = {
  getAll: async () => {
    return await api.get("/api/subscriber/all");
  },

  deleteOne: async (id) => {
    return await api.delete(`/api/subscriber/delete/${id}`);
  },
};
