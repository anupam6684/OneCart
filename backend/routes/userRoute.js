import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  loginUser,
  registerUser,
  adminLogin,
  profile,
  getAllUser,
} from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.post("/admin", adminLogin);
userRoute.get("/profile", userAuth, profile);
userRoute.get("/alluser", adminAuth, getAllUser);

userRoute.get("/verify", adminAuth, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Token Verified",
  });
});

export default userRoute;
