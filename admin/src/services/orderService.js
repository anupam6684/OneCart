const API_BASE_URL = import.meta.env.VITE_API_URL;

export const orderService = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/orders`);
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    return response.json();
  },

  create: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    return response.json();
  },

  update: async (id, orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    return response.json();
  },
};
