import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, require: true },
  brand: { type: String, require: true },
  category: { type: String, require: true },
  oldPrice: { type: Number, require: true },
  newPrice: { type: Number, require: true },
  rating: { type: Number, require: true },
  stock: { type: Number, require: true },
  isBestSeller: { type: Boolean, require: true },
  isNewArrival: { type: Boolean, require: true },
  description: { type: String, require: true },
  sizes: { type: Array, require: true },
  image: { type: Array, require: true },
  date: { type: Number, require: true },
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
