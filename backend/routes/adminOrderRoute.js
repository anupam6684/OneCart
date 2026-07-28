import { Router } from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  updateOrder,
} from "../controllers/adminorderController.js";

const adminOrderRoute = Router();

// All Orders
adminOrderRoute.get("/", adminAuth, getAllOrders);

// Update Order Status
adminOrderRoute.put("/status/:orderId", adminAuth, updateOrderStatus);

//
adminOrderRoute.put("/edit/:orderId", adminAuth, updateOrder);

// Delete Order (Optional)
adminOrderRoute.delete("/:orderId", adminAuth, deleteOrder);

export default adminOrderRoute;
