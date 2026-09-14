import api from "./api";

export const userService = {
  getUser: async () => {
    return await api.get(`/api/user/profile`);
  },

  // Update Profile (Handles both JSON and FormData for image uploads)
  updateProfile: async (userId, data) => {
    const isFormData = data instanceof FormData;
    return await api.put(`/api/user/profile/${userId}`, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
    });
  },

  // Change Password
  changePassword: async (data) => {
    return await api.put(`/api/user/changepassword`, data);
  },

  // Password Reset via OTP
  sendResetOtp: async (email) => {
    return await api.post("/api/user/send-reset-otp", { email });
  },

  resetPasswordOtp: async (data) => {
    return await api.post("/api/user/reset-password-otp", data);
  },

  // Passwordless OTP Login Endpoints
  sendLoginOtp: async (email) => {
    const res = await api.post("/api/user/login-otp", { email });
    return res.data; // Directly unwrap response.data
  },

  verifyLoginOtp: async (email, otp) => {
    const res = await api.post("/api/user/verify-login-otp", { email, otp });
    return res.data; // Directly unwrap response.data
  },
};
