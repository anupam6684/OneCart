import express from "express";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";

const productRoute = express.Router();

productRoute.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  adminAuth,
  addProduct,
);
productRoute.get("/single/:id", singleProduct);
productRoute.delete("/remove/:id", removeProduct);
productRoute.get("/list", listProduct);

export default productRoute;
