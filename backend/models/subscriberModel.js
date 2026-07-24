import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    discountClaimed: {
      type: String,
      default: "20% OFF",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

const subscriberModel =
  mongoose.models.subscriber || mongoose.model("subscriber", subscriberSchema);

export default subscriberModel;
