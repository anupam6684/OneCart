import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import sendOrderStatusEmail from "../services/emailService.js";

/* ===========================================
   Get All Orders (Admin)
=========================================== */
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

/* ===========================================
   Update Order Status (Admin Quick Dropdown)
=========================================== */
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const status = req.body.orderStatus?.toUpperCase();

    // 1. Validate Input Status
    const validStatuses = [
      "PENDING",
      "CONFIRMED",
      "PACKED",
      "SHIPPED",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "CANCELLED",
    ];

    if (!validStatuses.includes(status)) {
      return res.json({
        success: false,
        message: "Invalid status value provided.",
      });
    }

    // 2. Fetch Order
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    const previousStatus = order.orderStatus;

    // No action needed if status is unchanged
    if (previousStatus === status) {
      return res.json({
        success: true,
        message: `Order is already ${status}`,
        order,
      });
    }

    // 3. Prevent Modifying Terminal States
    if (previousStatus === "CANCELLED") {
      return res.json({
        success: false,
        message: "Cannot modify an order that has already been cancelled.",
      });
    }

    if (previousStatus === "DELIVERED" && status !== "CANCELLED") {
      return res.json({
        success: false,
        message: "Cannot alter a completed and delivered order.",
      });
    }

    // 4. Handle Inventory Rollback if Admin Cancels
    if (status === "CANCELLED" && previousStatus !== "CANCELLED") {
      for (const item of order.items) {
        if (item.productId && item.quantity) {
          await productModel.findByIdAndUpdate(item.productId, {
            $inc: { stock: item.quantity },
          });
        }
      }
    }

    // 5. Apply Status Update
    order.orderStatus = status;

    // 6. Payment Auto-Reconciliation on Delivery
    if (status === "DELIVERED" && order.paymentMethod === "COD") {
      order.paymentStatus = "PAID";
    }

    await order.save();

    // 7. Dispatch Email Notification Directly to Customer
    const recipientEmail = order.email || order.shippingAddress?.email;
    if (recipientEmail) {
      sendOrderStatusEmail(status, order, recipientEmail).catch((err) =>
        console.error(
          `[Email Error] Status [${status}] to [${recipientEmail}]:`,
          err.message,
        ),
      );
    }

    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      order,
    });
  } catch (error) {
    console.error("Update Order Status Error:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================================
   Delete Order (Admin)
=========================================== */
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

/* ===========================================
   Full Order Update (Admin Edit Modal)
=========================================== */
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

    const previousStatus = order.orderStatus;
    const nextStatus = orderStatus ? orderStatus.toUpperCase() : previousStatus;

    // 1. Assign base fields first
    if (customer !== undefined) order.customer = customer;
    if (email !== undefined) order.email = email;
    if (orderStatus !== undefined) order.orderStatus = nextStatus;
    if (paymentMethod !== undefined) order.paymentMethod = paymentMethod;
    if (paymentStatus !== undefined) order.paymentStatus = paymentStatus;

    // 2. FORCE PAID ON DELIVERED
    // If the status is DELIVERED, automatically flip paymentStatus to PAID
    if (nextStatus === "DELIVERED") {
      order.paymentStatus = "PAID";
    }

    // 3. Update shipping address
    if (shippingAddress) {
      order.shippingAddress = {
        ...order.shippingAddress,
        ...shippingAddress,
      };
    }

    // 4. Recalculate totals if items, shipping, or discount are updated
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

    // 5. Trigger lifecycle email if status changed during full update
    if (orderStatus !== undefined && previousStatus !== nextStatus) {
      const recipientEmail =
        updatedOrder.email || updatedOrder.shippingAddress?.email;
      if (recipientEmail) {
        sendOrderStatusEmail(nextStatus, updatedOrder, recipientEmail).catch(
          (err) =>
            console.error(
              `Email delivery error for status [${nextStatus}]:`,
              err.message,
            ),
        );
      }
    }

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
export default updateOrderStatus;
