import React from "react";
import { useNavigate } from "react-router-dom";

// Material UI Icons for error layout
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light px-3"
      style={{ minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}
    >
      <div
        className="card border-0 rounded-4 shadow-sm text-center p-5 bg-white"
        style={{ maxWidth: "480px" }}
      >
        {/* Animated Accent Circle Badge Frame */}
        <div
          className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#fef2f2",
            color: "#ef4444",
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 44 }} />
        </div>

        {/* Informative Error Copy Header Block */}
        <h2
          className="fw-bold text-dark mb-2"
          style={{ letterSpacing: "-0.02em" }}
        >
          Page Not Found
        </h2>
        <p
          className="text-muted mb-4"
          style={{ fontSize: "0.95rem", lineHeight: "1.5" }}
        >
          The requested URL destination does not exist, has been restricted, or
          was relocated into another workspace partition directory.
        </p>

        {/* Primary Call-to-action return link frame */}
        <button
          className="btn btn-primary w-100 rounded-3 fw-medium d-flex align-items-center justify-content-center gap-2 shadow-none"
          onClick={() => navigate("/")}
          style={{ height: "46px", fontSize: "0.9rem" }}
        >
          <ArrowBackIcon sx={{ fontSize: 18 }} />
          <span>Back to Dashboard</span>
        </button>
      </div>
    </div>
  );
}
