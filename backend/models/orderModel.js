import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // User
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    customer: { type: String, require: true },
    email: { type: String, require: true },

    // Ordered Products
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        image: {
          type: String,
          required: true,
        },

        size: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        total: {
          type: Number,
          required: true,
        },
      },
    ],

    // Shipping Address Snapshot
    shippingAddress: {
      fullname: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
    },

    // Payment
    paymentMethod: {
      type: String,
      enum: ["COD", "RAZORPAY", "STRIPE", "PAYTM"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },

    // Order Status
    orderStatus: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "PACKED",
        "SHIPPED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PENDING",
    },

    // Pricing
    subTotal: {
      type: Number,
      required: true,
    },

    shippingCharge: {
      type: Number,
      default: 40,
    },

    discount: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
