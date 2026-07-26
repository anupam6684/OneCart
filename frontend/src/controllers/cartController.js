import api from "../services/api";

export const cartService = {
  addToCart: async (data) => {
    return await api.post("/api/cart/add", data);
  },

  getCart: async () => {
    return await api.get("/api/cart/");
  },

  updateCart: async (data) => {
    return await api.post("/api/cart/update", data);
  },

  removeFromCart: async (data) => {
    return await api.delete(`/api/cart/remove/${id}`, {
      data,
    });
  },
};
