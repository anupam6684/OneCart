import mongoose from "mongoose";
import { type } from "node:os";

const addressSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      trim: true,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true, // Generates an _id for each address
  },
);

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,

    cartData: {
      type: Object,
      default: {},
    },

    address: { type: [addressSchema], default: [] }, // ✅ Array of address documents

    role: {
      type: String,
      default: "CUSTOMER",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "PENDING", "SUSPENDED", "BLOCKED"],
      default: "ACTIVE",
    },

    phone: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    minimize: false,
  },
);

export default mongoose.models.user || mongoose.model("user", userSchema);
