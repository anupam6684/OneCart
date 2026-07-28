import api from "./api";

export const orderService = {
  // Get All Orders (Admin Dashboard)
  getAllOrders: async () => {
    return await api.get("/api/admin/order");
  },

  // Get Single Order Details By ID (Admin View Modal)
  getOrderById: async (orderId) => {
    return await api.get(`/api/admin/order/${orderId}`);
  },

  // Update Full Order (Admin Edit Popup Modal)
  updateOrder: async (orderId, updateData) => {
    return await api.put(`/api/admin/order/edit/${orderId}`, updateData);
  },

  // Quick Update Order Status (Admin Header / Status Pill Dropdown)
  updateOrderStatus: async (orderId, orderStatus) => {
    return await api.put(`/api/admin/order/status/${orderId}`, {
      orderStatus,
    });
  },

  // Delete Order (Admin Action)
  deleteOrder: async (orderId) => {
    return await api.delete(`/api/admin/order/${orderId}`);
  },
};
