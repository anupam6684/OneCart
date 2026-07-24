import { Router } from "express";

import {
  createContactMessage,
  deleteContactMessage,
  getAllContactMessages,
  updateContactStatus,
} from "../controllers/contactController.js";
import adminAuth from "../middleware/adminAuth.js";

const contactRoute = Router();

contactRoute.post("/send", createContactMessage);
contactRoute.get("/list", adminAuth, getAllContactMessages);
contactRoute.put("/status/:id", adminAuth, updateContactStatus);
contactRoute.delete("/delete/:id", adminAuth, deleteContactMessage);

export default contactRoute;
