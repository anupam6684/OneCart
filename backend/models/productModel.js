import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },

  brand: { type: String, required: true },

  category: { type: String, required: true },

  subcategory: { type: String, required: true },

  oldPrice: { type: Number, required: true },

  newPrice: { type: Number, required: true },

  rating: { type: Number, default: 0 },

  stock: { type: Number, required: true },

  isBestSeller: { type: Boolean, default: false },

  isNewArrival: { type: Boolean, default: true },

  description: { type: String, required: true },

  colors: { type: Array },

  sizes: { type: Array, required: true },

  image: { type: Array, required: true },

  date: { type: Number, required: true },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
