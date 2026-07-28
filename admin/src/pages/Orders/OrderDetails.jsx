import React from "react";
import PropTypes from "prop-types";

// Material UI Icons
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

export default function OrderDetails({
  showModal,
  selectedOrder,
  handleCloseModal,
  handleStatusChange,
  getStatusStyle,
  formatStatusLabel,
  formatDate,
}) {
  if (!showModal || !selectedOrder) return null;

  // Fallback defaults for formatting helpers
  const getStyle =
    getStatusStyle || (() => ({ bg: "#f8fafc", color: "#64748b" }));

  const formatStatus =
    formatStatusLabel ||
    ((status) =>
      status
        ?.toLowerCase()
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ") || "");

  const formatDateTime = (dateString, includeTime = true) => {
    if (formatDate) return formatDate(dateString, includeTime);
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";

    if (includeTime) {
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const statusStyle = getStyle(selectedOrder.orderStatus);

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(15, 23, 42, 0.45)", zIndex: 1055 }}
      onClick={handleCloseModal}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
          {/* Modal Header */}
          <div className="modal-header border-bottom p-4 bg-light">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <h5 className="modal-title fw-bold text-dark mb-0">
                  Order Details
                </h5>

                {/* Editable Status Select (Arrow Removed) */}
                <select
                  value={selectedOrder.orderStatus}
                  onChange={(e) =>
                    handleStatusChange &&
                    handleStatusChange(selectedOrder._id, e.target.value)
                  }
                  className="form-select form-select-sm border-0 fw-semibold cursor-pointer shadow-none text-center ms-2 px-3 py-1"
                  style={{
                    fontSize: "0.75rem",
                    width: "auto",
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.color,
                    borderRadius: "20px",
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    backgroundImage: "none",
                  }}
                >
                  <option
                    value="PENDING"
                    style={{ backgroundColor: "#fff", color: "#333" }}
                  >
                    Pending
                  </option>
                  <option
                    value="CONFIRMED"
                    style={{ backgroundColor: "#fff", color: "#333" }}
                  >
                    Confirmed
                  </option>
                  <option
                    value="PACKED"
                    style={{ backgroundColor: "#fff", color: "#333" }}
                  >
                    Packed
                  </option>
                  <option
                    value="SHIPPED"
                    style={{ backgroundColor: "#fff", color: "#333" }}
                  >
                    Shipped
                  </option>
                  <option
                    value="OUT_FOR_DELIVERY"
                    style={{ backgroundColor: "#fff", color: "#333" }}
                  >
                    Out for Delivery
                  </option>
                  <option
                    value="DELIVERED"
                    style={{ backgroundColor: "#fff", color: "#333" }}
                  >
                    Delivered
                  </option>
                  <option
                    value="CANCELLED"
                    style={{ backgroundColor: "#fff", color: "#333" }}
                  >
                    Cancelled
                  </option>
                </select>
              </div>
              <span className="text-muted small" style={{ fontSize: "0.8rem" }}>
                ID: {selectedOrder._id} &bull; Placed on{" "}
                {formatDateTime(selectedOrder.createdAt, true)}
              </span>
            </div>
            <button
              type="button"
              className="btn-close shadow-none"
              onClick={handleCloseModal}
            ></button>
          </div>

          {/* Modal Body */}
          <div
            className="modal-body p-4"
            style={{ backgroundColor: "#fafafa" }}
          >
            <div className="row g-3">
              {/* 1. Customer Details Box */}
              <div className="col-12 col-md-4">
                <div className="card border-0 rounded-3 p-3 h-100 bg-white shadow-sm">
                  <div className="d-flex align-items-center gap-2 mb-2 text-primary">
                    <PersonOutlinedIcon sx={{ fontSize: 20 }} />
                    <h6
                      className="fw-bold mb-0 text-dark"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Customer
                    </h6>
                  </div>
                  <p
                    className="mb-1 fw-semibold text-dark text-capitalize"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {selectedOrder.customer || "N/A"}
                  </p>
                  <p
                    className="mb-0 text-muted small"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {selectedOrder.email || "No email provided"}
                  </p>
                </div>
              </div>

              {/* 2. Shipping Address Box */}
              <div className="col-12 col-md-4">
                <div className="card border-0 rounded-3 p-3 h-100 bg-white shadow-sm">
                  <div className="d-flex align-items-center gap-2 mb-2 text-danger">
                    <HomeOutlinedIcon sx={{ fontSize: 20 }} />
                    <h6
                      className="fw-bold mb-0 text-dark"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Shipping Address
                    </h6>
                  </div>

                  {selectedOrder.shippingAddress ? (
                    <div
                      style={{ fontSize: "0.825rem", lineHeight: "1.4" }}
                      className="text-dark"
                    >
                      {selectedOrder.shippingAddress.fullname && (
                        <p className="fw-semibold mb-1">
                          {selectedOrder.shippingAddress.fullname}
                        </p>
                      )}
                      <p className="mb-1 text-secondary">
                        {selectedOrder.shippingAddress.address || "N/A"}
                      </p>
                      <p className="mb-1 text-secondary">
                        {[
                          selectedOrder.shippingAddress.city,
                          selectedOrder.shippingAddress.state,
                          selectedOrder.shippingAddress.pincode ||
                            selectedOrder.shippingAddress.zipCode,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                      {selectedOrder.shippingAddress.phone && (
                        <p className="mb-0 text-muted small mt-1">
                          <strong>Phone:</strong>{" "}
                          {selectedOrder.shippingAddress.phone}
                        </p>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted small">
                      No shipping address recorded.
                    </span>
                  )}
                </div>
              </div>

              {/* 3. Payment Details Box */}
              <div className="col-12 col-md-4">
                <div className="card border-0 rounded-3 p-3 h-100 bg-white shadow-sm">
                  <div className="d-flex align-items-center gap-2 mb-2 text-success">
                    <CreditCardOutlinedIcon sx={{ fontSize: 20 }} />
                    <h6
                      className="fw-bold mb-0 text-dark"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Payment Info
                    </h6>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted small">Method:</span>
                    <span className="fw-semibold small text-dark">
                      {selectedOrder.paymentMethod || "N/A"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="text-muted small">Status:</span>
                    <span
                      className={`badge rounded-1 px-2 py-1 ${
                        selectedOrder.paymentStatus === "PAID"
                          ? "bg-success-subtle text-success"
                          : "bg-warning-subtle text-warning"
                      }`}
                      style={{ fontSize: "0.7rem" }}
                    >
                      {selectedOrder.paymentStatus || "PENDING"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Purchased Items List Table */}
              <div className="col-12 mt-3">
                <div className="card border-0 rounded-3 p-3 bg-white shadow-sm">
                  <div className="d-flex align-items-center gap-2 mb-3 text-secondary">
                    <LocalMallOutlinedIcon sx={{ fontSize: 20 }} />
                    <h6 className="fw-bold mb-0 text-dark">Order Items</h6>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-middle table-borderless mb-0">
                      <thead className="border-bottom">
                        <tr
                          className="text-muted small"
                          style={{ fontSize: "0.75rem" }}
                        >
                          <th>Product</th>
                          <th>Size</th>
                          <th>Price</th>
                          <th className="text-center">Qty</th>
                          <th className="text-end">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.items?.map((item) => (
                          <tr
                            key={item._id || item.productId}
                            className="border-bottom"
                          >
                            <td className="py-2">
                              <div className="d-flex align-items-center gap-3">
                                <img
                                  src={
                                    item.image ||
                                    "https://via.placeholder.com/48"
                                  }
                                  alt={item.name}
                                  className="rounded-2 object-fit-cover"
                                  style={{
                                    width: "48px",
                                    height: "48px",
                                    backgroundColor: "#f8fafc",
                                  }}
                                />
                                <div>
                                  <h6
                                    className="mb-0 fw-medium text-dark"
                                    style={{ fontSize: "0.85rem" }}
                                  >
                                    {item.name}
                                  </h6>
                                  <span
                                    className="text-muted"
                                    style={{ fontSize: "0.7rem" }}
                                  >
                                    ID: {item.productId}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge bg-light text-dark border">
                                {item.size || "Free"}
                              </span>
                            </td>
                            <td>₹{item.price}</td>
                            <td className="text-center fw-semibold">
                              {item.quantity}
                            </td>
                            <td className="text-end fw-bold text-dark">
                              ₹{item.total || item.price * item.quantity}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pricing Breakdown Footer */}
                  <div className="border-top pt-3 mt-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted small">Subtotal</span>
                      <span className="fw-medium small">
                        ₹
                        {selectedOrder.subTotal ||
                          selectedOrder.totalAmount ||
                          0}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted small">Shipping Charge</span>
                      <span className="fw-medium small">
                        ₹{selectedOrder.shippingCharge || 0}
                      </span>
                    </div>
                    {selectedOrder.discount > 0 && (
                      <div className="d-flex justify-content-between mb-1 text-danger">
                        <span className="small">Discount</span>
                        <span className="fw-medium small">
                          -₹{selectedOrder.discount}
                        </span>
                      </div>
                    )}
                    <hr className="my-2" />
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-dark">Total Amount</span>
                      <span className="fw-bold fs-5 text-primary">
                        ₹{selectedOrder.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer border-top p-3 bg-light">
            <button
              type="button"
              className="btn btn-secondary btn-sm px-4 rounded-3"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

OrderDetails.propTypes = {
  showModal: PropTypes.bool.isRequired,
  selectedOrder: PropTypes.object,
  handleCloseModal: PropTypes.func.isRequired,
  handleStatusChange: PropTypes.func,
  getStatusStyle: PropTypes.func,
  formatStatusLabel: PropTypes.func,
  formatDate: PropTypes.func,
};
