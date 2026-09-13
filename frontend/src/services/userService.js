import api from "./api";

export const userService = {
  getUser: async () => {
    return await api.get(`/api/user/profile`);
  },
  // Update Profile (Handles both JSON and FormData for image uploads)
  updateProfile: async (userId, data) => {
    console.log(userId, data);
    const isFormData = data instanceof FormData;
    return await api.put(`/api/user/profile/${userId}`, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
    });
  },

  // change password
  changePassword: async (data) => {
    return await api.put(`/api/user/changepassword`, data);
  },

  // otp reset
  sendResetOtp: async (email) => {
    return await api.post("/api/user/send-reset-otp", { email });
  },

  resetPasswordOtp: async (data) => {
    return await api.post("/api/user/reset-password-otp", data);
  },
};
