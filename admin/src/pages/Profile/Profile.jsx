import React from "react";
import CameraAltIcon from "@mui/icons-material/CameraAltOutlined";
import SaveIcon from "@mui/icons-material/SaveOutlined";

export default function Profile() {
  return (
    <div
      className="container-fluid p-0"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="card border-0 rounded-4 shadow-sm bg-white p-4 mb-4">
        <h4
          className="fw-bold text-dark mb-4"
          style={{ letterSpacing: "-0.02em" }}
        >
          My Profile Settings
        </h4>

        {/* Avatar Profile Layout Section */}
        <div className="d-flex align-items-center gap-4 flex-wrap mb-4 pb-3 border-bottom">
          <div
            className="position-relative"
            style={{ width: "100px", height: "100px" }}
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
              alt="Admin Avatar"
              className="w-100 h-100 rounded-circle object-fit-cover border"
            />
            <button
              className="btn btn-primary btn-sm position-absolute bottom-0 end-0 rounded-circle p-2 d-flex align-items-center justify-content-center shadow"
              style={{ width: "32px", height: "32px" }}
            >
              <CameraAltIcon sx={{ fontSize: 16 }} />
            </button>
          </div>
          <div>
            <h5 className="fw-bold text-dark mb-1">Anupam Jana</h5>
            <span
              className="badge bg-primary rounded-2 fw-medium mb-2"
              style={{ fontSize: "0.75rem" }}
            >
              System Administrator
            </span>
            <p className="text-muted mb-0 small" style={{ fontSize: "0.8rem" }}>
              Avatar update limits: PNG or JPG files under 2MB.
            </p>
          </div>
        </div>

        {/* Form Inputs Grid Framework */}
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="form-label text-muted small fw-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              className="form-control rounded-3 px-3 shadow-none bg-light border-0"
              style={{ height: "44px", fontSize: "0.9rem" }}
              defaultValue="Anupam"
            />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label text-muted small fw-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              className="form-control rounded-3 px-3 shadow-none bg-light border-0"
              style={{ height: "44px", fontSize: "0.9rem" }}
              defaultValue="Jana"
            />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label text-muted small fw-medium mb-2">
              Contact Email Identity
            </label>
            <input
              type="email"
              className="form-control rounded-3 px-3 shadow-none bg-light border-0"
              style={{ height: "44px", fontSize: "0.9rem" }}
              defaultValue="admin@example.com"
            />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label text-muted small fw-medium mb-2">
              Assigned Access Permissions
            </label>
            <input
              type="text"
              className="form-control rounded-3 px-3 shadow-none bg-light border-0"
              style={{ height: "44px", fontSize: "0.9rem" }}
              value="Full Read-Write Access (Root)"
              disabled
            />
          </div>
        </div>

        <button
          className="btn btn-primary d-flex align-items-center gap-2 px-4 rounded-3 fw-medium shadow-none mt-4 ms-auto"
          style={{ height: "44px" }}
        >
          <SaveIcon sx={{ fontSize: 18 }} /> Save Specifications
        </button>
      </div>
    </div>
  );
}
