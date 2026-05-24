import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Material UI Icons for fields
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

export default function CreateCoupon() {
  const navigate = useNavigate();

  // Controlled Coupon State Framework
  const [couponData, setCouponData] = useState({
    code: "",
    type: "Percentage",
    value: "",
    minAmount: "",
    startDate: "",
    endDate: "",
    usageLimit: "",
    status: "Active",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCouponData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving New Coupon Configuration:", couponData);
    // Return back to index listings log after pipeline submission hook
    navigate("/coupons");
  };

  return (
    <div
      className="container-fluid p-0"
      style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#f8fafc" }}
    >
      {/* 1. TOP HEADER NAVIGATION TOOLBAR */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <button
          className="btn border bg-white p-2 rounded-3 d-flex align-items-center justify-content-center shadow-none"
          onClick={() => navigate("/coupons")}
          style={{ borderColor: "#e2e8f0", width: "40px", height: "40px" }}
        >
          <ArrowBackIcon sx={{ fontSize: 18, color: "#64748b" }} />
        </button>
        <div>
          <h4
            className="fw-bold text-dark mb-0"
            style={{ letterSpacing: "-0.02em" }}
          >
            Create New Coupon
          </h4>
          <span className="text-muted small" style={{ fontSize: "0.825rem" }}>
            Configure specialized discounts tokens and checkout campaigns
          </span>
        </div>
      </div>

      {/* 2. MAIN HUB ACCENT FORM SYSTEM */}
      <form onSubmit={handleSubmit} className="row g-4">
        {/* LEFT COLUMN: CORE PRICING RULES PROFILE */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 rounded-4 shadow-sm bg-white p-4 d-flex flex-column gap-4">
            <h5
              className="fw-bold text-dark mb-1"
              style={{ fontSize: "1.05rem" }}
            >
              Coupon Configurations
            </h5>

            <div className="row g-3">
              {/* Input Code Parameter */}
              <div className="col-12 col-md-6">
                <label className="form-label fw-medium text-dark small mb-2">
                  Voucher Code <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="code"
                  className="form-control rounded-3 px-3 shadow-none bg-light border-0 font-monospace text-uppercase fw-bold"
                  style={{
                    height: "44px",
                    fontSize: "0.95rem",
                    letterSpacing: "0.05em",
                  }}
                  placeholder="e.g. SUMMER50"
                  value={couponData.code}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Discount Value Category Select option box */}
              <div className="col-12 col-md-6">
                <label className="form-label fw-medium text-dark small mb-2">
                  Discount Type <span className="text-danger">*</span>
                </label>
                <select
                  name="type"
                  className="form-select rounded-3 px-3 shadow-none bg-light border-0"
                  style={{
                    height: "44px",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                  value={couponData.type}
                  onChange={handleInputChange}
                >
                  <option value="Percentage">Percentage (%)</option>
                  <option value="Fixed">Fixed Currency Amount (₹)</option>
                  <option value="FreeShipping">Free Shipping (100%)</option>
                </select>
              </div>

              {/* Amount value input form control */}
              <div className="col-12 col-md-6">
                <label className="form-label fw-medium text-dark small mb-2">
                  Discount Value{" "}
                  {couponData.type === "Percentage" ? "(%)" : "(INR)"}{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  name="value"
                  className="form-control rounded-3 px-3 shadow-none bg-light border-0"
                  style={{ height: "44px", fontSize: "0.9rem" }}
                  placeholder={
                    couponData.type === "Percentage" ? "e.g. 20" : "e.g. 500"
                  }
                  value={couponData.value}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Minimum Purchase bounds constraints metric */}
              <div className="col-12 col-md-6">
                <label className="form-label fw-medium text-dark small mb-2">
                  Minimum Basket Amount (INR)
                </label>
                <input
                  type="number"
                  name="minAmount"
                  className="form-control rounded-3 px-3 shadow-none bg-light border-0"
                  style={{ height: "44px", fontSize: "0.9rem" }}
                  placeholder="e.g. 999 (0 for no limit)"
                  value={couponData.minAmount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LIMITATION SCHEDULER CONTROLS */}
        <div className="col-12 col-lg-4">
          <div className="d-flex flex-column gap-4">
            {/* CARD COMPONENT: LIMITATIONS & VISIBILITY CONFIG */}
            <div className="card border-0 rounded-4 shadow-sm bg-white p-4 d-flex flex-column gap-3">
              <h5
                className="fw-bold text-dark mb-1"
                style={{ fontSize: "1.05rem" }}
              >
                Fulfillment Scope
              </h5>

              {/* Usage Threshold metrics levels constraint input box */}
              <div>
                <label className="form-label fw-medium text-dark small mb-2">
                  Global Maximum Usage Limit
                </label>
                <input
                  type="number"
                  name="usageLimit"
                  className="form-control rounded-3 px-3 shadow-none bg-light border-0"
                  style={{ height: "44px", fontSize: "0.9rem" }}
                  placeholder="e.g. 100 times usable"
                  value={couponData.usageLimit}
                  onChange={handleInputChange}
                />
              </div>

              {/* Availability Status Visibility Toggles Drop Selector option list */}
              <div>
                <label className="form-label fw-medium text-dark small mb-2">
                  Campaign Activation Status
                </label>
                <select
                  name="status"
                  className="form-select rounded-3 px-3 shadow-none bg-light border-0"
                  style={{
                    height: "44px",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                  value={couponData.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active / Usable</option>
                  <option value="Inactive">Disabled / Hold</option>
                </select>
              </div>
            </div>

            {/* CARD COMPONENT: VALIDITY CHRONOLOGY TIMESTAMPS BOX */}
            <div className="card border-0 rounded-4 shadow-sm bg-white p-4 d-flex flex-column gap-3">
              <h5
                className="fw-bold text-dark mb-1"
                style={{ fontSize: "1.05rem" }}
              >
                Validity Timeframe
              </h5>

              {/* Chronology: Start Point Timestamp selection tool box */}
              <div>
                <label className="form-label fw-medium text-dark small mb-2">
                  Campaign Activation Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  className="form-control rounded-3 px-3 shadow-none bg-light border-0 text-muted"
                  style={{
                    height: "44px",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                  value={couponData.startDate}
                  onChange={handleInputChange}
                />
              </div>

              {/* Chronology: End Point Expiry selection tool box */}
              <div>
                <label className="form-label fw-medium text-dark small mb-2">
                  Campaign Expiration Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  className="form-control rounded-3 px-3 shadow-none bg-light border-0 text-muted"
                  style={{
                    height: "44px",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                  value={couponData.endDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= STICKY ACTION LOWER SUBMISSION FOOTER CONTAINER BUTTON CARD LAYER ================= */}
        <div className="col-12">
          <div className="card border-0 rounded-4 shadow-sm bg-white p-3 d-flex flex-row align-items-center justify-content-end gap-3">
            <button
              type="button"
              className="btn border text-secondary bg-white rounded-3 shadow-none fw-medium"
              onClick={() => navigate("/coupons")}
              style={{
                height: "42px",
                borderColor: "#cbd5e1",
                fontSize: "0.875rem",
                px: "24px",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary rounded-3 shadow-none fw-medium d-flex align-items-center justify-content-center gap-2"
              style={{ height: "42px", fontSize: "0.875rem", px: "24px" }}
            >
              <SaveOutlinedIcon sx={{ fontSize: 18 }} />
              <span>Save Coupon</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
