import React from "react";
import SecurityIcon from "@mui/icons-material/SecurityOutlined";
import TuneIcon from "@mui/icons-material/Tune";
import CreditCardIcon from "@mui/icons-material/CreditCardOutlined";

export default function Settings() {
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
          Control Center
        </h4>
        <span className="text-muted small" style={{ fontSize: "0.825rem" }}>
          Configure system behaviors and global transactional properties
        </span>
      </div>

      <div className="row g-4">
        {/* Core Properties Group */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 rounded-4 shadow-sm bg-white p-4 h-100 d-flex flex-column gap-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <TuneIcon className="text-primary" sx={{ fontSize: 20 }} />
              <h5 className="fw-bold text-dark mb-0">General Configurations</h5>
            </div>

            <div className="form-check form-switch d-flex justify-content-between align-items-center ps-0 mb-2">
              <div>
                <label
                  className="fw-semibold text-dark d-block small mb-0"
                  style={{ cursor: "pointer" }}
                >
                  Maintenance Lockout Mode
                </label>
                <span
                  className="text-muted extra-small"
                  style={{ fontSize: "0.75rem" }}
                >
                  Redirect storefront entry paths to a holding page pattern.
                </span>
              </div>
              <input
                className="form-check-input shadow-none cursor-pointer ms-auto"
                type="checkbox"
                style={{ width: "42px", height: "22px" }}
              />
            </div>

            <div className="form-check form-switch d-flex justify-content-between align-items-center ps-0 mb-2">
              <div>
                <label
                  className="fw-semibold text-dark d-block small mb-0"
                  style={{ cursor: "pointer" }}
                >
                  User Registration Allowances
                </label>
                <span
                  className="text-muted extra-small"
                  style={{ fontSize: "0.75rem" }}
                >
                  Permit non-authenticated traffic groups to register new
                  identities.
                </span>
              </div>
              <input
                className="form-check-input shadow-none cursor-pointer ms-auto"
                type="checkbox"
                defaultChecked
                style={{ width: "42px", height: "22px" }}
              />
            </div>
          </div>
        </div>

        {/* Security and Processing Panels */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 rounded-4 shadow-sm bg-white p-4 h-100 d-flex flex-column gap-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <SecurityIcon className="text-danger" sx={{ fontSize: 20 }} />
              <h5 className="fw-bold text-dark mb-0">Security Protocols</h5>
            </div>

            <div className="form-check form-switch d-flex justify-content-between align-items-center ps-0 mb-2">
              <div>
                <label
                  className="fw-semibold text-dark d-block small mb-0"
                  style={{ cursor: "pointer" }}
                >
                  Force Multi-factor Validation (MFA)
                </label>
                <span
                  className="text-muted extra-small"
                  style={{ fontSize: "0.75rem" }}
                >
                  Require secondary OTP handshakes for managers and personnel.
                </span>
              </div>
              <input
                className="form-check-input shadow-none cursor-pointer ms-auto"
                type="checkbox"
                defaultChecked
                style={{ width: "42px", height: "22px" }}
              />
            </div>

            <div className="form-check form-switch d-flex justify-content-between align-items-center ps-0 mb-2">
              <div>
                <label
                  className="fw-semibold text-dark d-block small mb-0"
                  style={{ cursor: "pointer" }}
                >
                  Webhook Transaction Call Logs
                </label>
                <span
                  className="text-muted extra-small"
                  style={{ fontSize: "0.75rem" }}
                >
                  Keep verbose debugging console metrics for API route tracking.
                </span>
              </div>
              <input
                className="form-check-input shadow-none cursor-pointer ms-auto"
                type="checkbox"
                style={{ width: "42px", height: "22px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
