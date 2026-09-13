import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import sendOrderStatusEmail from "../services/emailService.js";

/* ===========================================
   Place Order (Customer)
=========================================== */
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { addressId, paymentMethod } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const address = user.address.id(addressId);
    if (!address) {
      return res.json({ success: false, message: "Address not found" });
    }

    const cartData = user.cartData;
    if (!cartData || Object.keys(cartData).length === 0) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    let items = [];
    let subTotal = 0;
    const shippingCharge = 40;
    const discount = 0;

    for (const productId in cartData) {
      const product = await productModel.findById(productId);
      if (!product) continue;

      for (const size in cartData[productId]) {
        const quantity = cartData[productId][size];
        if (quantity <= 0) continue;

        if (quantity > product.stock) {
          return res.json({
            success: false,
            message: `${product.name} (Size: ${size}) is out of stock`,
          });
        }

        const total = product.newPrice * quantity;

        items.push({
          productId: product._id,
          name: product.name,
          image: Array.isArray(product.image)
            ? product.image[0]
            : product.image,
          size,
          quantity,
          price: product.newPrice,
          total,
        });

        subTotal += total;

        product.stock -= quantity;
        await product.save();
      }
    }

    if (items.length === 0) {
      return res.json({ success: false, message: "No valid items in cart" });
    }

    const totalAmount = subTotal + shippingCharge - discount;

    const order = new orderModel({
      customer: address.fullname || user.username || "Customer",
      email: user.email,
      userId,
      items,
      shippingAddress: address,
      paymentMethod: paymentMethod || "COD",
      paymentStatus: paymentMethod === "COD" ? "PENDING" : "PAID",
      orderStatus: "PENDING",
      subTotal,
      shippingCharge,
      discount,
      totalAmount,
    });

    await order.save();

    // Clear cart
    user.cartData = {};
    await user.save();

    // Asynchronously dispatch receipt email
    if (user.email) {
      sendOrderStatusEmail("PENDING", order, user.email).catch((err) =>
        console.error("Order Placed Email Error:", err.message),
      );
    }

    res.json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Place Order Error:", error);
    res.json({ success: false, message: error.message });
  }
};

/* ===========================================
   Update Order Status (Admin Trigger)
=========================================== */
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const validStatuses = [
      "PENDING",
      "CONFIRMED",
      "SHIPPED",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "CANCELLED",
    ];

    if (!validStatuses.includes(orderStatus)) {
      return res.json({
        success: false,
        message: "Invalid status value provided.",
      });
    }

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    order.orderStatus = orderStatus;

    // Automatic COD payment reconciliation on delivery
    if (orderStatus === "DELIVERED" && order.paymentMethod === "COD") {
      order.paymentStatus = "PAID";
    }

    await order.save();

    const recipient = order.email || order.shippingAddress?.email;
    if (recipient) {
      sendOrderStatusEmail(orderStatus, order, recipient).catch((err) =>
        console.error(`Lifecycle Email Error [${orderStatus}]:`, err.message),
      );
    }

    res.json({
      success: true,
      message: `Order status updated to ${orderStatus}`,
      order,
    });
  } catch (error) {
    console.error("Update Order Status Error:", error);
    res.json({ success: false, message: error.message });
  }
};

/* ===========================================
   Get Current User Orders
=========================================== */
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ===========================================
   Get Single Order
=========================================== */
export const getSingleOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;

    const order = await orderModel.findOne({ _id: orderId, userId });
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ===========================================
   Cancel Order
=========================================== */
export const cancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;

    const order = await orderModel.findOne({ _id: orderId, userId });
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    if (
      order.orderStatus === "SHIPPED" ||
      order.orderStatus === "OUT_FOR_DELIVERY" ||
      order.orderStatus === "DELIVERED"
    ) {
      return res.json({
        success: false,
        message: "Order cannot be cancelled once dispatched or delivered.",
      });
    }

    if (order.orderStatus === "CANCELLED") {
      return res.json({
        success: false,
        message: "Order is already cancelled.",
      });
    }

    order.orderStatus = "CANCELLED";
    await order.save();

    // Restock items
    for (const item of order.items) {
      await productModel.findByIdAndUpdate(item.productId, {
        $inc: { stock: item.quantity },
      });
    }

    const recipient = order.email;

    if (recipient) {
      sendOrderStatusEmail("CANCELLED", order, recipient).catch((err) =>
        console.error("Cancel Email Error:", err.message),
      );
    }

    res.json({
      success: true,
      message: "Order cancelled successfully.",
      order,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
