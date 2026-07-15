import api from "./api";

export const productService = {
  getAll: async () => {
    return await api.get("/api/product/list");
  },

  getById: async (id) => {
    return await api.get(`/api/product/single/${id}`);
  },

  create: async (productData) => {
    return await api.post("/api/product/add", productData);
  },

  update: async (id, productData) => {
    return await api.put(`/api/product/${id}/edit`, productData);
  },

  delete: async (id) => {
    return await api.delete(`/api/product/remove/${id}`);
  },
};
