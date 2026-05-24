import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "../config/mongodb.js";

import productModel from "../models/productModel.js";

import products from "./product_data.js";

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();

    // DELETE OLD PRODUCTS
    await productModel.deleteMany();
    // ADD DATE TO ALL PRODUCTS
    const updatedProducts = products.map((item) => {
      return {
        ...item,
        date: Date.now(),
      };
    });

    // INSERT NEW PRODUCTS
    await productModel.insertMany(updatedProducts);

    console.log("Products Seeded");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedProducts();
