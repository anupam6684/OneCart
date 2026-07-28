import { Router } from "express";
import userAuth from "../middleware/userAuth.js";
import {
  placeOrder,
  getMyOrders,
  getSingleOrder,
  cancelOrder,
} from "../controllers/orderController.js";

const orderRoute = Router();

// Place Order
orderRoute.post("/place", userAuth, placeOrder);

// Get Logged-in User Orders
orderRoute.get("/my-orders", userAuth, getMyOrders);

// Get Single Order
orderRoute.get("/:orderId", userAuth, getSingleOrder);

// Cancel Order
orderRoute.put("/cancel/:orderId", userAuth, cancelOrder);

export default orderRoute;
