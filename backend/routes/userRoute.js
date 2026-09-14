import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  loginUser,
  registerUser,
  adminLogin,
  profile,
  getAllUser,
  addAddress,
  updateProfile,
  changePassword,
  sendLoginOtp,
  verifyLoginOtp,
} from "../controllers/userController.js";

import { sendPasswordResetOtp } from "../controllers/sendOtpController.js";
import { resetPasswordWithOtp } from "../controllers/verifyOtpAndResetController.js";

import userAuth from "../middleware/userAuth.js";

import upload from "../middleware/multer.js";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.post("/admin", adminLogin);
userRoute.get("/profile", userAuth, profile);
userRoute.put("/profile/:userId", upload.single("image"), updateProfile);
userRoute.put("/changepassword", userAuth, changePassword);
userRoute.post("/address", userAuth, addAddress); // add new address
userRoute.get("/address", userAuth, addAddress); // get all address form user

//OTP

userRoute.post("/send-reset-otp", sendPasswordResetOtp);
userRoute.post("/reset-password-otp", resetPasswordWithOtp);
// otp log in

userRoute.post("/login-otp", sendLoginOtp);
userRoute.post("/verify-login-otp", verifyLoginOtp);

userRoute.get("/alluser", adminAuth, getAllUser);

userRoute.get("/verify", adminAuth, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Token Verified",
  });
});

export default userRoute;
