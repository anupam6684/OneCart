import React from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LocalMallIcon from "@mui/icons-material/LocalMallOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircleOutlined";

export default function Reports() {
  return (
    <div
      className="container-fluid p-0"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="mb-4">
        <h4
          className="fw-bold text-dark mb-1"
          style={{ letterSpacing: "-0.02em" }}
        >
          Reports & Insights
        </h4>
        <span className="text-muted small" style={{ fontSize: "0.825rem" }}>
          Review continuous warehouse transactions analytics and sales curves
        </span>
      </div>

      {/* Grid Highlights */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-4">
          <div className="card border-0 p-4 rounded-4 shadow-sm bg-white">
            <div className="d-flex align-items-center gap-3 mb-2">
              <TrendingUpIcon className="text-primary" />
              <h6 className="mb-0 text-muted fw-semibold">
                Gross Conversion Rate
              </h6>
            </div>
            <h2 className="fw-bold text-dark tracking-tight mb-0">3.42%</h2>
            <span className="text-success small fw-medium mt-2 d-block">
              ↑ 0.5% optimization metrics
            </span>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card border-0 p-4 rounded-4 shadow-sm bg-white">
            <div className="d-flex align-items-center gap-3 mb-2">
              <LocalMallIcon className="text-success" />
              <h6 className="mb-0 text-muted fw-semibold">
                Average Basket Size
              </h6>
            </div>
            <h2 className="fw-bold text-dark tracking-tight mb-0">₹3,240</h2>
            <span className="text-success small fw-medium mt-2 d-block">
              ↑ 12% value increase
            </span>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card border-0 p-4 rounded-4 shadow-sm bg-white">
            <div className="d-flex align-items-center gap-3 mb-2">
              <AccountCircleIcon
                className="text-purple"
                style={{ color: "#8b5cf6" }}
              />
              <h6 className="mb-0 text-muted fw-semibold">
                Customer Retention Index
              </h6>
            </div>
            <h2 className="fw-bold text-dark tracking-tight mb-0">68.2%</h2>
            <span className="text-muted small mt-2 d-block">
              Stable user recurrence bounds
            </span>
          </div>
        </div>
      </div>

      {/* Visual Placeholder Core Blocks */}
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="card border-0 rounded-4 shadow-sm bg-white p-4">
            <h5 className="fw-bold text-dark mb-4">
              Earnings Multi-axis Timeframe Matrix
            </h5>
            <div
              className="rounded-4 d-flex align-items-center justify-content-center text-muted border-2 border-dashed"
              style={{
                height: "300px",
                borderColor: "#cbd5e1",
                background: "#f8fafc",
              }}
            >
              [ Graphical Matrix Curve Rendering Engine Block Placeholder ]
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card border-0 rounded-4 shadow-sm bg-white p-4">
            <h5 className="fw-bold text-dark mb-4">Sales By Category Share</h5>
            <div
              className="rounded-4 d-flex align-items-center justify-content-center text-muted border-2 border-dashed"
              style={{
                height: "300px",
                borderColor: "#cbd5e1",
                background: "#f8fafc",
              }}
            >
              [ Circular Share Donut Render Placeholder ]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
