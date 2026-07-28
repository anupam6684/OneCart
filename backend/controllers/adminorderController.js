import orderModel from "../models/orderModel.js";

// Get All Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("userId", "username email")
      .sort({ createdAt: -1 });

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

// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const status = req.body.orderStatus;

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = status;

    await order.save();

    res.json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Order (Optional)
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    await orderModel.findByIdAndDelete(orderId);

    res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const {
      customer,
      email,
      orderStatus,
      paymentMethod,
      paymentStatus,
      shippingAddress,
      items,
      shippingCharge,
      discount,
    } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Update basic details
    if (customer !== undefined) order.customer = customer;
    if (email !== undefined) order.email = email;
    if (orderStatus !== undefined) order.orderStatus = orderStatus;
    if (paymentMethod !== undefined) order.paymentMethod = paymentMethod;
    if (paymentStatus !== undefined) order.paymentStatus = paymentStatus;

    // Update shipping address
    if (shippingAddress) {
      order.shippingAddress = {
        ...order.shippingAddress,
        ...shippingAddress,
      };
    }

    // Recalculate totals if items, shipping, or discount are updated
    if (items || shippingCharge !== undefined || discount !== undefined) {
      if (items) {
        order.items = items.map((item) => ({
          ...item,
          total: (Number(item.price) || 0) * (Number(item.quantity) || 1),
        }));
      }

      const subTotal = order.items.reduce(
        (sum, item) => sum + (item.total || 0),
        0,
      );

      const finalShipping =
        shippingCharge !== undefined
          ? Number(shippingCharge)
          : order.shippingCharge || 0;

      const finalDiscount =
        discount !== undefined ? Number(discount) : order.discount || 0;

      order.subTotal = subTotal;
      order.shippingCharge = finalShipping;
      order.discount = finalDiscount;
      order.totalAmount = Math.max(0, subTotal + finalShipping - finalDiscount);
    }

    const updatedOrder = await order.save();

    res.json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export { getAllOrders, updateOrderStatus, deleteOrder, updateOrder };
