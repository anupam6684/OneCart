import { Router } from "express";
import userAuth from "../middleware/userAuth.js";
import {
  placeOrder,
  getMyOrders,
  getSingleOrder,
  cancelOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";

const orderRoute = Router();

// Place Order
orderRoute.post("/place", userAuth, placeOrder);

// Get Logged-in User Orders
orderRoute.get("/my-orders", userAuth, getMyOrders);

// Update Order Status (Admin / Quick Dropdown & Resend lifecycle trigger)
orderRoute.put("/status/:orderId", updateOrderStatus);

// Cancel Order
orderRoute.put("/cancel/:orderId", userAuth, cancelOrder);

// Get Single Order (Place parameterized routes at the end to prevent greedy matching)
orderRoute.get("/:orderId", userAuth, getSingleOrder);

export default orderRoute;
