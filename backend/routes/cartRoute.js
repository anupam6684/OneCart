import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../controllers/cartController.js";

const cartRoute = express.Router();

cartRoute.get("/", userAuth, getCart);
cartRoute.post("/add", userAuth, addToCart);
cartRoute.post("/update", userAuth, updateCart);
cartRoute.delete("/remove/:productId", userAuth, removeFromCart);

export default cartRoute;
