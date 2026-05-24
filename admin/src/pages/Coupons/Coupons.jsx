import React, { useState } from "react";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PercentIcon from "@mui/icons-material/Percent";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate } from "react-router-dom";

export default function Coupons() {
  const navigate = useNavigate();
  const mockCoupons = [
    {
      id: 1,
      code: "ONECART20",
      type: "Percentage",
      value: "20%",
      expiry: "Jun 30, 2026",
      status: "Active",
    },
    {
      id: 2,
      code: "WELCOME500",
      type: "Fixed Amount",
      value: "₹500",
      expiry: "Dec 31, 2026",
      status: "Active",
    },
    {
      id: 3,
      code: "FREESHIP",
      type: "Free Shipping",
      value: "100%",
      expiry: "May 31, 2026",
      status: "Inactive",
    },
  ];

  return (
    <div
      className="container-fluid p-0"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4
            className="fw-bold text-dark mb-1"
            style={{ letterSpacing: "-0.02em" }}
          >
            Discount Vouchers
          </h4>
          <span className="text-muted small" style={{ fontSize: "0.825rem" }}>
            Manage sales promotion metrics and discount coupons
          </span>
        </div>
        <button
          className="btn btn-primary d-flex align-items-center gap-2 px-3 rounded-3 fw-medium shadow-none"
          style={{ height: "40px", fontSize: "0.875rem" }}
          onClick={() => navigate("/coupon/new")}
        >
          <AddIcon sx={{ fontSize: 18 }} /> Create Coupon
        </button>
      </div>

      <div className="row g-4">
        {mockCoupons.map((coupon) => (
          <div className="col-12 col-md-6 col-xl-4" key={coupon.id}>
            <div className="card border-0 rounded-4 shadow-sm bg-white p-4 position-relative overflow-hidden">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center text-primary"
                  style={{
                    width: "45px",
                    height: "45px",
                    backgroundColor: "#eff6ff",
                  }}
                >
                  {coupon.type === "Percentage" ? (
                    <PercentIcon sx={{ fontSize: 20 }} />
                  ) : (
                    <MonetizationOnOutlinedIcon sx={{ fontSize: 20 }} />
                  )}
                </div>
                <div>
                  <h5 className="font-monospace fw-bold mb-0 text-dark tracking-wider">
                    {coupon.code}
                  </h5>
                  <span
                    className="text-muted extra-small"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {coupon.type} Campaign
                  </span>
                </div>
              </div>

              <div className="border-top pt-3 mt-2 d-flex justify-content-between align-items-center">
                <div>
                  <span
                    className="text-muted d-block small"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Benefit Value
                  </span>
                  <span
                    className="fw-bold text-success"
                    style={{ fontSize: "1.1rem" }}
                  >
                    {coupon.value} OFF
                  </span>
                </div>
                <div className="text-end">
                  <span
                    className="text-muted d-block small"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Expires On
                  </span>
                  <span
                    className="fw-medium text-dark"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {coupon.expiry}
                  </span>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-light">
                <span
                  className="badge rounded-2 px-2 py-1"
                  style={{
                    fontSize: "0.725rem",
                    backgroundColor:
                      coupon.status === "Active" ? "#ecfdf5" : "#fef2f2",
                    color: coupon.status === "Active" ? "#10b981" : "#ef4444",
                  }}
                >
                  {coupon.status}
                </span>
                <button className="btn btn-link text-danger p-0 shadow-none">
                  <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
