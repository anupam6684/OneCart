import api from "./api";

export const addressService = {
  addAddress: async (data) => {
    console.log(data);
    return await api.post("/api/user/address", data);
  },

  getAddresses: async () => {
    return await api.get("/api/user/address");
  },

  updateAddress: async (id, data) => {
    return await api.put(`/api/user/address/${id}`, data);
  },

  deleteAddress: async (id) => {
    return await api.delete(`/api/user/address/${id}`);
  },
};
