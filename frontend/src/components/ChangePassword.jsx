import React, { useState, useContext, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ShopContext } from "../context/ShopContext";
import { userService } from "../services/userService";

// Material UI Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export default function ChangePassword() {
  const { userAllData } = useContext(ShopContext);
  const navigate = useNavigate();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPasswordValue = watch("newPassword", "");

  // Real-time password requirement checklist
  const criteria = useMemo(
    () => ({
      length: newPasswordValue.length >= 8,
      uppercase: /[A-Z]/.test(newPasswordValue),
      number: /[0-9]/.test(newPasswordValue),
    }),
    [newPasswordValue],
  );

  // Compute password strength metric
  const strength = useMemo(() => {
    const passed = Object.values(criteria).filter(Boolean).length;
    if (passed === 0)
      return { width: "0%", color: "bg-secondary", label: "Empty" };
    if (passed === 1)
      return { width: "33%", color: "bg-danger", label: "Weak" };
    if (passed === 2)
      return { width: "66%", color: "bg-warning", label: "Medium" };
    return { width: "100%", color: "bg-success", label: "Strong" };
  }, [criteria]);

  const onSubmit = async (values) => {
    if (!userAllData?._id) {
      toast.error("User session not found");
      return;
    }

    try {
      const response = await userService.changePassword(userAllData._id, {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      if (response.data?.success) {
        toast.success("Password changed successfully!");
        reset();
        navigate("/profile");
      } else {
        toast.error(response.data?.message || "Failed to change password");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <div
      className="min-vh-100 bg-light py-5"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="container" style={{ maxWidth: "560px" }}>
        {/* Top Return Navigation */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-white bg-white border rounded-3 px-3.5 py-2 d-inline-flex align-items-center gap-2 text-secondary fw-semibold shadow-xs"
          >
            <ArrowBackIcon sx={{ fontSize: 18 }} />
            <span>Return</span>
          </button>

          <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle rounded-pill px-3 py-1.5 fw-medium small d-inline-flex align-items-center gap-1">
            <ShieldOutlinedIcon sx={{ fontSize: 14 }} />
            Security Center
          </span>
        </div>

        {/* Main Password Card */}
        <div className="card border-0 shadow-sm rounded-4 bg-white p-4 p-md-5">
          {/* Header */}
          <div className="d-flex align-items-center gap-3 pb-3 border-bottom mb-4">
            <div
              className="rounded-3 bg-dark text-white d-flex align-items-center justify-content-center shadow-sm"
              style={{ width: "48px", height: "48px" }}
            >
              <VpnKeyOutlinedIcon sx={{ fontSize: 22 }} />
            </div>
            <div>
              <h5 className="fw-bold text-dark mb-0">Change Password</h5>
              <p className="text-muted small mb-0">
                Keep your account guarded with a strong password
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Current Password Field + Forgot Password Link */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-1.5">
                <label className="form-label text-dark fw-semibold small mb-0">
                  Current Password <span className="text-danger">*</span>
                </label>

                {/* Inline Forgot Password Link */}
                <Link
                  to="/forgot-password"
                  className="text-decoration-none text-muted small fw-medium d-inline-flex align-items-center gap-1"
                  style={{ fontSize: "0.82rem" }}
                >
                  <HelpOutlineIcon sx={{ fontSize: 14 }} />
                  <span>Forgot password?</span>
                </Link>
              </div>

              <div
                className={`input-group border rounded-3 bg-white px-3 align-items-center transition-all ${
                  errors.currentPassword
                    ? "border-danger ring-danger"
                    : "border-light-subtle"
                }`}
                style={{ height: "48px" }}
              >
                <LockOutlinedIcon
                  className="text-muted me-2"
                  sx={{ fontSize: 19 }}
                />
                <input
                  type={showCurrent ? "text" : "password"}
                  {...register("currentPassword")}
                  className="form-control border-0 p-0 shadow-none bg-transparent"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="btn p-0 text-muted shadow-none ms-2"
                >
                  {showCurrent ? (
                    <VisibilityOffOutlinedIcon sx={{ fontSize: 19 }} />
                  ) : (
                    <VisibilityOutlinedIcon sx={{ fontSize: 19 }} />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-danger extra-small mt-1 mb-0">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            {/* New Password Field */}
            <div className="mb-3">
              <label className="form-label text-dark fw-semibold small mb-1.5">
                New Password <span className="text-danger">*</span>
              </label>
              <div
                className={`input-group border rounded-3 bg-white px-3 align-items-center transition-all ${
                  errors.newPassword
                    ? "border-danger ring-danger"
                    : "border-light-subtle"
                }`}
                style={{ height: "48px" }}
              >
                <LockOutlinedIcon
                  className="text-muted me-2"
                  sx={{ fontSize: 19 }}
                />
                <input
                  type={showNew ? "text" : "password"}
                  {...register("newPassword")}
                  className="form-control border-0 p-0 shadow-none bg-transparent"
                  placeholder="Create new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="btn p-0 text-muted shadow-none ms-2"
                >
                  {showNew ? (
                    <VisibilityOffOutlinedIcon sx={{ fontSize: 19 }} />
                  ) : (
                    <VisibilityOutlinedIcon sx={{ fontSize: 19 }} />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-danger extra-small mt-1 mb-0">
                  {errors.newPassword.message}
                </p>
              )}

              {/* Password Strength Progress Bar */}
              {newPasswordValue && (
                <div className="mt-2.5">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="text-muted extra-small">
                      Password Strength
                    </span>
                    <span className="fw-semibold extra-small text-dark">
                      {strength.label}
                    </span>
                  </div>
                  <div
                    className="progress"
                    style={{ height: "4px", backgroundColor: "#eef1f4" }}
                  >
                    <div
                      className={`progress-bar ${strength.color} rounded-pill transition-all`}
                      style={{
                        width: strength.width,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Live Requirement Pills */}
            <div className="p-3 bg-light rounded-3 mb-4 border border-light-subtle">
              <p className="extra-small text-muted fw-bold text-uppercase tracking-wider mb-2">
                Requirements
              </p>
              <div className="d-flex flex-column gap-1.5">
                <div
                  className={`d-flex align-items-center gap-1.5 extra-small ${
                    criteria.length ? "text-success fw-semibold" : "text-muted"
                  }`}
                >
                  {criteria.length ? (
                    <CheckCircleRoundedIcon sx={{ fontSize: 14 }} />
                  ) : (
                    <RadioButtonUncheckedRoundedIcon sx={{ fontSize: 14 }} />
                  )}
                  <span>At least 8 characters in length</span>
                </div>

                <div
                  className={`d-flex align-items-center gap-1.5 extra-small ${
                    criteria.uppercase
                      ? "text-success fw-semibold"
                      : "text-muted"
                  }`}
                >
                  {criteria.uppercase ? (
                    <CheckCircleRoundedIcon sx={{ fontSize: 14 }} />
                  ) : (
                    <RadioButtonUncheckedRoundedIcon sx={{ fontSize: 14 }} />
                  )}
                  <span>At least 1 uppercase letter (A-Z)</span>
                </div>

                <div
                  className={`d-flex align-items-center gap-1.5 extra-small ${
                    criteria.number ? "text-success fw-semibold" : "text-muted"
                  }`}
                >
                  {criteria.number ? (
                    <CheckCircleRoundedIcon sx={{ fontSize: 14 }} />
                  ) : (
                    <RadioButtonUncheckedRoundedIcon sx={{ fontSize: 14 }} />
                  )}
                  <span>At least 1 numeric digit (0-9)</span>
                </div>
              </div>
            </div>

            {/* Confirm New Password Field */}
            <div className="mb-4">
              <label className="form-label text-dark fw-semibold small mb-1.5">
                Confirm New Password <span className="text-danger">*</span>
              </label>
              <div
                className={`input-group border rounded-3 bg-white px-3 align-items-center transition-all ${
                  errors.confirmPassword
                    ? "border-danger ring-danger"
                    : "border-light-subtle"
                }`}
                style={{ height: "48px" }}
              >
                <LockOutlinedIcon
                  className="text-muted me-2"
                  sx={{ fontSize: 19 }}
                />
                <input
                  type={showConfirm ? "text" : "password"}
                  {...register("confirmPassword")}
                  className="form-control border-0 p-0 shadow-none bg-transparent"
                  placeholder="Re-enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="btn p-0 text-muted shadow-none ms-2"
                >
                  {showConfirm ? (
                    <VisibilityOffOutlinedIcon sx={{ fontSize: 19 }} />
                  ) : (
                    <VisibilityOutlinedIcon sx={{ fontSize: 19 }} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-danger extra-small mt-1 mb-0">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="d-flex justify-content-end gap-2.5 pt-3 border-top">
              <button
                type="button"
                onClick={() => reset()}
                disabled={!isDirty || isSubmitting}
                className="btn btn-outline-secondary rounded-3 px-4 py-2 fw-semibold extra-small"
                style={{ height: "44px" }}
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={!isDirty || isSubmitting}
                className="btn btn-dark rounded-3 px-4 py-2 fw-semibold extra-small d-inline-flex align-items-center gap-2 shadow-sm"
                style={{ height: "44px" }}
              >
                <span>{isSubmitting ? "Updating..." : "Update Password"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
