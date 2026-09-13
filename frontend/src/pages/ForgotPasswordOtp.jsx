import React, { useState, useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { userService } from "../services/userService";

// Material UI Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

/* ================= ZOD SCHEMAS ================= */
const emailStepSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const resetStepSchema = z
  .object({
    otp: z
      .string()
      .length(6, "Code must be exactly 6 digits")
      .regex(/^\d+$/, "Digits only"),
    newPassword: z
      .string()
      .min(8, "Minimum 8 characters required")
      .regex(/[A-Z]/, "Requires at least 1 uppercase letter")
      .regex(/[0-9]/, "Requires at least 1 number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ForgotPasswordOtp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = useRef([]);

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors, isSubmitting: isSendingOtp },
  } = useForm({ resolver: zodResolver(emailStepSchema) });

  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    setValue: setResetValue,
    watch,
    formState: { errors: resetErrors, isSubmitting: isResetting },
  } = useForm({
    resolver: zodResolver(resetStepSchema),
    defaultValues: { otp: "", newPassword: "", confirmPassword: "" },
  });

  const newPasswordValue = watch("newPassword", "");

  const criteria = useMemo(
    () => ({
      length: newPasswordValue.length >= 8,
      uppercase: /[A-Z]/.test(newPasswordValue),
      number: /[0-9]/.test(newPasswordValue),
    }),
    [newPasswordValue],
  );

  const strength = useMemo(() => {
    const count = Object.values(criteria).filter(Boolean).length;
    if (!newPasswordValue)
      return { width: "0%", bg: "#e2e8f0", label: "Empty" };
    if (count === 1) return { width: "33%", bg: "#f43f5e", label: "Weak" };
    if (count === 2) return { width: "66%", bg: "#38bdf8", label: "Moderate" };
    return { width: "100%", bg: "#0284c7", label: "Secure" };
  }, [criteria, newPasswordValue]);

  useEffect(() => {
    let interval = null;
    if (step === 2 && resendTimer > 0) {
      interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  const handleOtpBoxChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const nextOtp = [...otpValues];
    nextOtp[index] = value.slice(-1);
    setOtpValues(nextOtp);

    const fullOtp = nextOtp.join("");
    setResetValue("otp", fullOtp, { shouldValidate: fullOtp.length === 6 });

    if (value && index < 5) otpInputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pasted)) return;
    setOtpValues(pasted.split(""));
    setResetValue("otp", pasted, { shouldValidate: true });
    otpInputRefs.current[5]?.focus();
  };

  const onSendOtp = async (values) => {
    try {
      const response = await userService.sendResetOtp(values.email);
      if (response.data?.success) {
        setUserEmail(values.email);
        setStep(2);
        setResendTimer(60);
        setCanResend(false);
        toast.success("Verification code dispatched to your inbox");
      } else {
        toast.error(response.data?.message || "Failed to dispatch code");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Service unavailable");
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    try {
      const response = await userService.sendResetOtp(userEmail);
      if (response.data?.success) {
        toast.success("Fresh code sent!");
        setResendTimer(60);
        setCanResend(false);
        setOtpValues(["", "", "", "", "", ""]);
        setResetValue("otp", "");
      }
    } catch (error) {
      toast.error("Resend operation failed");
    }
  };

  const onResetPassword = async (values) => {
    try {
      const response = await userService.resetPasswordOtp({
        email: userEmail,
        otp: values.otp,
        newPassword: values.newPassword,
      });

      if (response.data?.success) {
        toast.success("Password updated successfully!");
        navigate("/login");
      } else {
        toast.error(response.data?.message || "Verification failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid or expired code");
    }
  };

  return (
    <div
      className="min-vh-100 py-5 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "#f0f9ff",
        backgroundImage: "radial-gradient(#bae6fd 0.75px, transparent 0.75px)",
        backgroundSize: "22px 22px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        .sky-card {
          background: #ffffff;
          border: 1px solid #bae6fd;
          box-shadow: 0 16px 40px -10px rgba(14, 165, 233, 0.12);
        }
        .sky-input {
          background-color: #f8fafc;
          border: 1.5px solid #e2e8f0;
          transition: all 0.2s ease;
        }
        .sky-input:focus-within {
          background-color: #ffffff;
          border-color: #0284c7 !important;
          box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.14) !important;
        }
        .sky-input.has-error {
          border-color: #f43f5e !important;
          background-color: #fff1f2;
        }
        .otp-sky-box {
          width: 48px;
          height: 56px;
          font-size: 1.5rem;
          font-weight: 800;
          text-align: center;
          border-radius: 12px;
          border: 2px solid #e0f2fe;
          background-color: #f8fafc;
          color: #0369a1;
          outline: none;
          transition: all 0.2s ease;
        }
        .otp-sky-box:focus {
          border-color: #0284c7;
          background-color: #ffffff;
          box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.16);
          transform: translateY(-2px);
        }
        .btn-sky {
          background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%);
          border: none;
          color: #ffffff;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .btn-sky:hover:not(:disabled) {
          background: linear-gradient(135deg, #0369a1 0%, #0284c7 100%);
          box-shadow: 0 8px 20px -4px rgba(2, 132, 199, 0.35);
          transform: translateY(-1px);
          color: #ffffff;
        }
        .btn-sky:disabled {
          background: #bae6fd;
          color: #ffffff;
          cursor: not-allowed;
        }
      `}</style>

      <div className="container px-3" style={{ maxWidth: "490px" }}>
        {/* Navigation / Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <Link
            to="/login"
            className="btn btn-white bg-white border rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 text-secondary fw-semibold small shadow-sm text-decoration-none"
            style={{ borderColor: "#bae6fd" }}
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            <span>Sign In</span>
          </Link>

          <span
            className="badge rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-1.5"
            style={{
              backgroundColor: "#e0f2fe",
              color: "#0369a1",
              border: "1px solid #bae6fd",
            }}
          >
            <ShieldOutlinedIcon sx={{ fontSize: 15 }} />
            OneCart Guard
          </span>
        </div>

        {/* Main Card */}
        <div className="sky-card rounded-4 p-4 p-sm-5">
          {step === 1 ? (
            /* STEP 1: REQUEST OTP */
            <div>
              <div className="text-center mb-4">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow-sm"
                  style={{
                    width: "62px",
                    height: "62px",
                    backgroundColor: "#e0f2fe",
                    color: "#0284c7",
                  }}
                >
                  <MailOutlineRoundedIcon sx={{ fontSize: 30 }} />
                </div>
                <h4 className="fw-bold text-dark mb-1">Forgot Password?</h4>
                <p className="text-muted small mb-0 px-2">
                  Enter your email address and we will generate a 6-digit
                  verification code.
                </p>
              </div>

              <form onSubmit={handleEmailSubmit(onSendOtp)}>
                <div className="mb-4">
                  <label className="form-label text-dark fw-semibold small mb-1.5">
                    Account Email <span className="text-danger">*</span>
                  </label>
                  <div
                    className={`input-group rounded-3 px-3 align-items-center sky-input ${
                      emailErrors.email ? "has-error" : ""
                    }`}
                    style={{ height: "48px" }}
                  >
                    <MailOutlineRoundedIcon
                      sx={{ fontSize: 20, color: "#64748b" }}
                      className="me-2"
                    />
                    <input
                      type="email"
                      {...registerEmail("email")}
                      className="form-control border-0 p-0 shadow-none bg-transparent fw-medium text-dark"
                      placeholder="name@example.com"
                    />
                  </div>
                  {emailErrors.email && (
                    <span className="text-danger extra-small mt-1.5 fw-medium d-block">
                      {emailErrors.email.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSendingOtp}
                  className="btn btn-sky w-100 rounded-3 py-2.5 small mb-3"
                  style={{ height: "48px" }}
                >
                  {isSendingOtp
                    ? "Dispatching Code..."
                    : "Send Verification Code"}
                </button>
              </form>
            </div>
          ) : (
            /* STEP 2: VERIFY CODE & SET NEW PASSWORD */
            <div>
              <div className="text-center mb-4">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow-sm"
                  style={{
                    width: "62px",
                    height: "62px",
                    backgroundColor: "#e0f2fe",
                    color: "#0284c7",
                  }}
                >
                  <KeyRoundedIcon sx={{ fontSize: 28 }} />
                </div>
                <h4 className="fw-bold text-dark mb-1">Verify Code</h4>
                <p className="text-muted small mb-0">
                  Verification sent to{" "}
                  <strong className="text-dark">{userEmail}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-link p-0 extra-small fw-semibold mt-1 text-decoration-none"
                  style={{ color: "#0284c7" }}
                >
                  Change Email Address
                </button>
              </div>

              <form onSubmit={handleResetSubmit(onResetPassword)}>
                {/* Segmented OTP Input */}
                <div className="mb-4">
                  <label className="form-label text-dark fw-semibold small mb-2 d-block">
                    6-Digit Security Code <span className="text-danger">*</span>
                  </label>
                  <div
                    className="d-flex justify-content-between gap-1 gap-sm-2"
                    onPaste={handleOtpPaste}
                  >
                    {otpValues.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (otpInputRefs.current[idx] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleOtpBoxChange(idx, e.target.value)
                        }
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="otp-sky-box"
                      />
                    ))}
                  </div>
                  {resetErrors.otp && (
                    <span className="text-danger extra-small mt-1.5 fw-medium d-block">
                      {resetErrors.otp.message}
                    </span>
                  )}
                </div>

                {/* New Password Field */}
                <div className="mb-3">
                  <label className="form-label text-dark fw-semibold small mb-1.5">
                    New Password <span className="text-danger">*</span>
                  </label>
                  <div
                    className={`input-group rounded-3 px-3 align-items-center sky-input ${
                      resetErrors.newPassword ? "has-error" : ""
                    }`}
                    style={{ height: "48px" }}
                  >
                    <LockOutlinedIcon
                      sx={{ fontSize: 20, color: "#64748b" }}
                      className="me-2"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      {...registerReset("newPassword")}
                      className="form-control border-0 p-0 shadow-none bg-transparent fw-medium text-dark"
                      placeholder="Set fresh password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="btn p-0 text-muted shadow-none ms-2"
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon sx={{ fontSize: 19 }} />
                      ) : (
                        <VisibilityOutlinedIcon sx={{ fontSize: 19 }} />
                      )}
                    </button>
                  </div>
                  {resetErrors.newPassword && (
                    <span className="text-danger extra-small mt-1.5 fw-medium d-block">
                      {resetErrors.newPassword.message}
                    </span>
                  )}

                  {/* Password Strength Indicator */}
                  {newPasswordValue && (
                    <div className="mt-2 p-2 bg-white rounded-2 border">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="text-muted extra-small">
                          Security Rating:
                        </span>
                        <span className="fw-bold extra-small text-dark">
                          {strength.label}
                        </span>
                      </div>
                      <div
                        className="progress"
                        style={{ height: "4px", backgroundColor: "#e2e8f0" }}
                      >
                        <div
                          className="progress-bar rounded-pill"
                          style={{
                            width: strength.width,
                            backgroundColor: strength.bg,
                            transition: "all 0.3s ease",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Requirements Checklist */}
                <div
                  className="p-3 rounded-3 mb-3"
                  style={{
                    backgroundColor: "#f0f9ff",
                    border: "1px solid #e0f2fe",
                  }}
                >
                  <div className="d-flex flex-column gap-1.5 extra-small">
                    <div
                      className={`d-flex align-items-center gap-1.5 ${criteria.length ? "text-primary fw-semibold" : "text-muted"}`}
                    >
                      {criteria.length ? (
                        <CheckCircleRoundedIcon
                          sx={{ fontSize: 15, color: "#0284c7" }}
                        />
                      ) : (
                        <RadioButtonUncheckedRoundedIcon
                          sx={{ fontSize: 15 }}
                        />
                      )}
                      <span>At least 8 characters</span>
                    </div>
                    <div
                      className={`d-flex align-items-center gap-1.5 ${criteria.uppercase ? "text-primary fw-semibold" : "text-muted"}`}
                    >
                      {criteria.uppercase ? (
                        <CheckCircleRoundedIcon
                          sx={{ fontSize: 15, color: "#0284c7" }}
                        />
                      ) : (
                        <RadioButtonUncheckedRoundedIcon
                          sx={{ fontSize: 15 }}
                        />
                      )}
                      <span>At least 1 uppercase letter (A-Z)</span>
                    </div>
                    <div
                      className={`d-flex align-items-center gap-1.5 ${criteria.number ? "text-primary fw-semibold" : "text-muted"}`}
                    >
                      {criteria.number ? (
                        <CheckCircleRoundedIcon
                          sx={{ fontSize: 15, color: "#0284c7" }}
                        />
                      ) : (
                        <RadioButtonUncheckedRoundedIcon
                          sx={{ fontSize: 15 }}
                        />
                      )}
                      <span>At least 1 numeric digit (0-9)</span>
                    </div>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="mb-4">
                  <label className="form-label text-dark fw-semibold small mb-1.5">
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <div
                    className={`input-group rounded-3 px-3 align-items-center sky-input ${
                      resetErrors.confirmPassword ? "has-error" : ""
                    }`}
                    style={{ height: "48px" }}
                  >
                    <LockOutlinedIcon
                      sx={{ fontSize: 20, color: "#64748b" }}
                      className="me-2"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      {...registerReset("confirmPassword")}
                      className="form-control border-0 p-0 shadow-none bg-transparent fw-medium text-dark"
                      placeholder="Repeat new password"
                    />
                  </div>
                  {resetErrors.confirmPassword && (
                    <span className="text-danger extra-small mt-1.5 fw-medium d-block">
                      {resetErrors.confirmPassword.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isResetting}
                  className="btn btn-sky w-100 rounded-3 py-2.5 small mb-3"
                  style={{ height: "48px" }}
                >
                  {isResetting ? "Updating Password..." : "Update Password"}
                </button>

                {/* Resend Action */}
                <div className="text-center">
                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="btn btn-link p-0 text-decoration-none small fw-bold d-inline-flex align-items-center gap-1"
                      style={{ color: "#0284c7" }}
                    >
                      <RefreshRoundedIcon sx={{ fontSize: 16 }} />
                      <span>Resend Verification Code</span>
                    </button>
                  ) : (
                    <span className="text-muted small">
                      Resend code available in{" "}
                      <strong className="text-dark">{resendTimer}s</strong>
                    </span>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
