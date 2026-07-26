import mongoose from "mongoose";
import { type } from "node:os";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "CUSTOMER",
    },

    cartData: {
      type: Object,
      default: {},
    },

    address: {
      type: Array,
      default: [],
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
    lastLogin: {
      type: Date,
      default: null,
    },

    image: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
  },
  {
    timestamps: true,
    minimize: false,
  },
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
