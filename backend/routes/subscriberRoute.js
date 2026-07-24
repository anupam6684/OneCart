import { Router } from "express";
import {
  createSubscriber,
  getAllSubscribers,
  deleteSubscriber,
} from "../controllers/subscriberController.js";
import adminAuth from "../middleware/adminAuth.js";

const subscriberRoute = Router();

subscriberRoute.post("/create", createSubscriber);
subscriberRoute.get("/all", adminAuth, getAllSubscribers);
subscriberRoute.delete("/delete/:id", adminAuth, deleteSubscriber);

export default subscriberRoute;
