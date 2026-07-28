import orderModel from "../models/orderModel.js";

import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { addressId, paymentMethod } = req.body;

    // Get User
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Get Selected Address
    const address = user.address.id(addressId);

    if (!address) {
      return res.json({
        success: false,
        message: "Address not found",
      });
    }

    // Cart Data
    const cartData = user.cartData;

    if (!cartData || Object.keys(cartData).length === 0) {
      return res.json({
        success: false,
        message: "Cart is empty",
      });
    }
    let items = [];
    let subTotal = 0;

    for (const productId in cartData) {
      const product = await productModel.findById(productId);

      if (!product) continue;

      for (const size in cartData[productId]) {
        const quantity = cartData[productId][size];

        if (quantity > product.stock) {
          return res.json({
            success: false,
            message: `${product.name} is out of stock`,
          });
        }

        const total = product.newPrice * quantity;

        items.push({
          productId: product._id,
          name: product.name,
          image: product.image[0],
          size,
          quantity,
          price: product.newPrice,
          total,
        });

        subTotal += total;
      }
    }

    // Create Order
    const order = new orderModel({
      customer: user.username,
      email: user.email,
      userId,
      items,
      shippingAddress: address,
      paymentMethod,
      paymentStatus: "PENDING",
      orderStatus: "PENDING",
      subTotal,
      shippingCharge: 40,
      discount: 0,
      totalAmount: subTotal,
    });

    await order.save();

    // Clear Cart
    user.cartData = {};
    await user.save();

    res.json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================================
   Get Logged-in User Orders
=========================================== */
const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================================
   Get Single Order
=========================================== */
const getSingleOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;

    const order = await orderModel.findOne({
      _id: orderId,
      userId,
    });

    if (!order) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================================
   Cancel Order
=========================================== */
const cancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;

    const order = await orderModel.findOne({
      _id: orderId,
      userId,
    });

    if (!order) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    // Prevent cancelling shipped/delivered orders
    if (
      order.orderStatus === "SHIPPED" ||
      order.orderStatus === "OUT_FOR_DELIVERY" ||
      order.orderStatus === "DELIVERED"
    ) {
      return res.json({
        success: false,
        message: "Order cannot be cancelled.",
      });
    }

    // Already cancelled
    if (order.orderStatus === "CANCELLED") {
      return res.json({
        success: false,
        message: "Order already cancelled.",
      });
    }

    order.orderStatus = "CANCELLED";

    await order.save();

    res.json({
      success: true,
      message: "Order cancelled successfully.",
      order,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { placeOrder, getMyOrders, getSingleOrder, cancelOrder };
