import api from "./api";

export const orderService = {
  // Place Order
  placeOrder: async (data) => {
    return await api.post("/api/order/place", data);
  },

  // Get Logged-in User Orders
  getMyOrders: async () => {
    return await api.get("/api/order/my-orders");
  },

  // Get Single Order Details
  getOrderById: async (orderId) => {
    return await api.get(`/api/order/${orderId}`);
  },

  // Cancel Order (User)
  cancelOrder: async (orderId) => {
    return await api.put(`/api/order/cancel/${orderId}`);
  },

  // =====================
  // Admin APIs
  // =====================

  // Get All Orders
  getAllOrders: async () => {
    return await api.get("/api/order");
  },

  // Update Order Status
  updateOrderStatus: async (orderId, status) => {
    return await api.put(`/api/order/status/${orderId}`, {
      status,
    });
  },

  // Delete Order (Optional)
  deleteOrder: async (orderId) => {
    return await api.delete(`/api/order/${orderId}`);
  },
};
