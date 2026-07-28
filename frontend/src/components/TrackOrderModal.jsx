import React from "react";
import PropTypes from "prop-types";

// Material UI Icons
import CloseIcon from "@mui/icons-material/Close";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

export default function TrackOrderModal({ show, item, handleClose }) {
  if (!show || !item) return null;

  // Standard tracking stages matching orderStatus enum
  const trackingStages = [
    { key: "PENDING", label: "Order Placed" },
    { key: "CONFIRMED", label: "Confirmed" },
    { key: "PACKED", label: "Packed" },
    { key: "SHIPPED", label: "Shipped" },
    { key: "OUT_FOR_DELIVERY", label: "Out for Delivery" },
    { key: "DELIVERED", label: "Delivered" },
  ];

  const orderStatus = item.orderStatus?.toUpperCase();
  const isCancelled = orderStatus === "CANCELLED";

  // Determine active tracking step
  const currentStep = isCancelled
    ? -1
    : trackingStages.findIndex((s) => s.key === orderStatus);

  // Date Formatter
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return isNaN(d.getTime())
      ? "N/A"
      : d.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(15, 23, 42, 0.55)", zIndex: 1055 }}
      onClick={handleClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
          {/* 1. MODAL HEADER */}
          <div className="modal-header border-bottom p-4 bg-light align-items-start">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <LocalShippingOutlinedIcon
                  className="text-primary"
                  sx={{ fontSize: 22 }}
                />
                <h5 className="modal-title fw-bold text-dark mb-0">
                  Shipment Tracking
                </h5>
                <span
                  className={`badge rounded-2 px-2 py-1 ms-2 ${
                    isCancelled
                      ? "bg-danger-subtle text-danger"
                      : "bg-primary-subtle text-primary"
                  }`}
                  style={{ fontSize: "0.75rem" }}
                >
                  {orderStatus?.replace(/_/g, " ")}
                </span>
              </div>
              <p className="text-muted small mb-0">
                Order ID:{" "}
                <strong className="text-dark">
                  #{item.orderId || item._id}
                </strong>{" "}
                &bull; Placed on {formatDate(item.createdAt)}
              </p>
            </div>
            <button
              type="button"
              className="btn-close shadow-none"
              onClick={handleClose}
            ></button>
          </div>

          {/* 2. MODAL BODY */}
          <div
            className="modal-body p-4"
            style={{ backgroundColor: "#f8fafc" }}
          >
            {/* ITEM PREVIEW CARD */}
            <div className="card border-0 rounded-3 p-3 bg-white shadow-sm mb-4">
              <div className="d-flex align-items-center gap-3">
                <img
                  src={
                    Array.isArray(item.image)
                      ? item.image[0]
                      : item.image || "https://via.placeholder.com/64"
                  }
                  alt={item.name}
                  className="rounded-2 object-fit-cover flex-shrink-0"
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: "#f1f5f9",
                  }}
                />
                <div className="flex-grow-1">
                  <h6 className="mb-1 fw-semibold text-dark">{item.name}</h6>
                  <div className="d-flex flex-wrap align-items-center gap-3 text-secondary small">
                    <span>
                      Size:{" "}
                      <strong className="text-dark">
                        {item.size || "Free"}
                      </strong>
                    </span>
                    <span>
                      Quantity:{" "}
                      <strong className="text-dark">{item.quantity}</strong>
                    </span>
                    <span>
                      Item Price:{" "}
                      <strong className="text-dark">₹{item.price}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* TRACKING STEPPER TIMELINE */}
            <div className="card border-0 rounded-3 p-4 bg-white shadow-sm mb-4">
              <h6 className="fw-bold text-dark mb-3">Delivery Timeline</h6>

              {isCancelled ? (
                <div className="alert alert-danger mb-0 rounded-3 text-center border-0 bg-danger-subtle text-danger">
                  <strong>
                    This order was cancelled on {formatDate(item.updatedAt)}.
                  </strong>
                </div>
              ) : (
                <div className="position-relative py-2">
                  <div className="d-flex flex-column gap-3">
                    {trackingStages.map((stage, idx) => {
                      const isCompleted = idx <= currentStep;
                      const isCurrent = idx === currentStep;

                      return (
                        <div
                          key={stage.key}
                          className="d-flex align-items-center gap-3"
                        >
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                            style={{
                              width: "26px",
                              height: "26px",
                              backgroundColor: isCompleted
                                ? "#10b981"
                                : "#cbd5e1",
                              fontSize: "12px",
                            }}
                          >
                            {isCompleted ? "✓" : idx + 1}
                          </div>
                          <div>
                            <span
                              className={`d-block small ${
                                isCurrent
                                  ? "fw-bold text-dark fs-6"
                                  : isCompleted
                                    ? "fw-semibold text-dark"
                                    : "text-muted"
                              }`}
                            >
                              {stage.label}
                            </span>
                            {isCurrent && (
                              <span
                                className="text-success small fw-medium"
                                style={{ fontSize: "0.75rem" }}
                              >
                                In Progress {formatDate(item.updatedAt)}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* LOGISTICS DETAILS GRID: ADDRESS & PAYMENT & BREAKDOWN */}
            <div className="row g-3">
              {/* SHIPPING ADDRESS CARD */}
              <div className="col-12 col-md-6">
                <div className="card border-0 rounded-3 p-3 bg-white shadow-sm h-100">
                  <div className="d-flex align-items-center gap-2 mb-2 text-danger">
                    <HomeOutlinedIcon sx={{ fontSize: 20 }} />
                    <h6
                      className="fw-bold mb-0 text-dark"
                      style={{ fontSize: "0.875rem" }}
                    >
                      Delivery Location
                    </h6>
                  </div>

                  {item.shippingAddress ? (
                    <div
                      style={{ fontSize: "0.825rem" }}
                      className="text-secondary"
                    >
                      <p className="fw-semibold text-dark mb-1">
                        {item.shippingAddress.fullname}
                      </p>
                      <p className="mb-1">{item.shippingAddress.address}</p>
                      <p className="mb-1">
                        {[
                          item.shippingAddress.city,
                          item.shippingAddress.state,
                          item.shippingAddress.pincode,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                      <p className="mb-0 text-dark mt-2">
                        <strong>Phone:</strong>{" "}
                        {item.shippingAddress.phone || "N/A"}
                      </p>
                    </div>
                  ) : (
                    <span className="text-muted small">
                      No address metadata available.
                    </span>
                  )}
                </div>
              </div>

              {/* PAYMENT & FINANCIAL SUMMARY CARD */}
              <div className="col-12 col-md-6">
                <div className="card border-0 rounded-3 p-3 bg-white shadow-sm h-100">
                  <div className="d-flex align-items-center gap-2 mb-2 text-success">
                    <CreditCardOutlinedIcon sx={{ fontSize: 20 }} />
                    <h6
                      className="fw-bold mb-0 text-dark"
                      style={{ fontSize: "0.875rem" }}
                    >
                      Payment Breakdown
                    </h6>
                  </div>

                  <div
                    className="mb-2 pb-2 border-bottom"
                    style={{ fontSize: "0.825rem" }}
                  >
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted">Payment Method:</span>
                      <span className="fw-bold text-dark">
                        {item.paymentMethod || "COD"}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted">Payment Status:</span>
                      <span
                        className={`badge rounded-1 px-2 py-1 ${
                          item.paymentStatus === "PAID"
                            ? "bg-success-subtle text-success"
                            : "bg-warning-subtle text-warning"
                        }`}
                        style={{ fontSize: "0.7rem" }}
                      >
                        {item.paymentStatus || "PENDING"}
                      </span>
                    </div>
                  </div>

                  {/* PRICING BREAKDOWN */}
                  <div style={{ fontSize: "0.825rem" }}>
                    <div className="d-flex justify-content-between text-muted mb-1">
                      <span>Subtotal</span>
                      <span>
                        ₹{item.subTotal || item.price * item.quantity}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between text-muted mb-1">
                      <span>Shipping Charge</span>
                      <span>₹{item.shippingCharge ?? 40}</span>
                    </div>
                    {item.discount > 0 && (
                      <div className="d-flex justify-content-between text-danger mb-1">
                        <span>Discount</span>
                        <span>-₹{item.discount}</span>
                      </div>
                    )}
                    <div className="d-flex justify-content-between fw-bold text-dark mt-2 pt-2 border-top">
                      <span>Total Amount Paid</span>
                      <span className="text-primary fs-6">
                        ₹{item.totalAmount || item.total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. MODAL FOOTER */}
          <div className="modal-footer border-top p-3 bg-light">
            <button
              type="button"
              className="btn btn-secondary btn-sm px-4 rounded-3"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

TrackOrderModal.propTypes = {
  show: PropTypes.bool.isRequired,
  item: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
};
