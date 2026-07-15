import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  loginUser,
  registerUser,
  adminLogin,
} from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.post("/admin", adminLogin);

userRoute.get("/verify", adminAuth, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Token Verified",
  });
});

export default userRoute;
