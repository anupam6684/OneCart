import { authService } from "../services/authService";
import { userService } from "../services/userService";

// Register
export const registerUser = async (username, email, password) => {
  try {
    const response = await authService.register(username, email, password);

    return response;
  } catch (error) {
    console.log("Register Error:", error);
    return error;
  }
};

// Customer Login
export const loginUser = async (email, password) => {
  try {
    const response = await authService.login(email, password);

    return response;
  } catch (error) {
    console.log("Login Error:", error);
    return error;
  }
};

// Admin Login
export const adminLogin = async (email, password) => {};

// Auto Login
export const autoLogin = async () => {};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  return true;
};

// Get Profile
export const fetchProfile = async () => {
  try {
    const response = await userService.getUser();
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Update Profile
export const updateProfile = async () => {};

// Change Password
export const changePassword = async () => {};

// Forgot Password
export const forgotPassword = async () => {};

// Reset Password
export const resetPassword = async () => {};
