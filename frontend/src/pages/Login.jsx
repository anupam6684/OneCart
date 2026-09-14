import React, { useState, useContext, useEffect, useRef } from "react";
import Title from "../components/Title";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { registerUser, loginUser } from "../controllers/userController";
import { userService } from "../services/userService";

// Material UI Icons
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Login() {
  const { setToken } = useContext(ShopContext);
  const navigate = useNavigate();

  // Mode: "login" | "signup" | "otp-request" | "otp-verify"
  const [currentState, setCurrentState] = useState("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // OTP State
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const otpInputRefs = useRef([]);

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval = null;
    if (currentState === "otp-verify" && resendTimer > 0) {
      interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [currentState, resendTimer]);

  // Handle segmented OTP changes
  const handleOtpBoxChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const nextOtp = [...otpValues];
    nextOtp[index] = value.slice(-1);
    setOtpValues(nextOtp);

    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
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
    otpInputRefs.current[5]?.focus();
  };

  // Dispatch OTP to user email
  const handleSendLoginOtp = async (targetEmail) => {
    const emailToUse = targetEmail || email;
    if (!emailToUse) {
      toast.error("Please provide your email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await userService.sendLoginOtp(emailToUse);
      console.log(data);
      if (data?.success) {
        toast.success("Login OTP sent to your email!");
        setCurrentState("otp-verify");
        setResendTimer(60);
        setCanResend(false);
        setOtpValues(["", "", "", "", "", ""]);
      } else {
        toast.error(data?.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Service unavailable",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Verify OTP and complete authentication
  const handleVerifyLoginOtp = async (e) => {
    e.preventDefault();
    const fullOtp = otpValues.join("");

    if (fullOtp.length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await userService.verifyLoginOtp(email, fullOtp);
      if (data?.success && data?.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Welcome back! Login Successful");
        navigate("/");
      } else {
        toast.error(data?.message || "Invalid or expired OTP");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Verification failed",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Standard Password Login & Registration handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (currentState === "login") {
        const data = await loginUser(email, password);
        if (data?.success && data?.token) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Login Successful");
          navigate("/");
        } else {
          toast.error(data?.message || "Login failed");
        }
      } else if (currentState === "signup") {
        const data = await registerUser(username, email, password);
        if (data?.success && data?.token) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Account created successfully!");
          navigate("/");
        } else {
          toast.error(data?.message || "Registration failed");
        }
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-vh-100 py-5 d-flex justify-content-center align-items-center px-3"
      style={{
        backgroundColor: "#f0f9ff",
        backgroundImage: "radial-gradient(#bae6fd 0.75px, transparent 0.75px)",
        backgroundSize: "22px 22px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        .sky-auth-card {
          background: #ffffff;
          border: 1px solid #bae6fd;
          box-shadow: 0 18px 45px -10px rgba(14, 165, 233, 0.15);
        }
        .sky-input-box {
          background-color: #f8fafc;
          border: 1.5px solid #e2e8f0;
          transition: all 0.2s ease;
        }
        .sky-input-box:focus-within {
          background-color: #ffffff;
          border-color: #0284c7 !important;
          box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.14) !important;
        }
        .otp-sky-cell {
          width: 44px;
          height: 52px;
          font-size: 1.4rem;
          font-weight: 700;
          text-align: center;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background-color: #f8fafc;
          color: #0369a1;
          outline: none;
          transition: all 0.2s ease;
        }
        .otp-sky-cell:focus {
          border-color: #0284c7;
          background-color: #ffffff;
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.16);
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
        .btn-outline-sky {
          background-color: #ffffff;
          border: 1.5px solid #bae6fd;
          color: #0284c7;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .btn-outline-sky:hover {
          background-color: #f0f9ff;
          border-color: #0284c7;
          color: #0369a1;
        }
      `}</style>

      <div
        className="card sky-auth-card rounded-4 border-0 overflow-hidden"
        style={{ maxWidth: "880px", width: "100%" }}
      >
        <div className="row g-0">
          {/* Left Decorative Image / Banner */}
          <div className="col-md-5 d-none d-md-block position-relative">
            <img
              src="/signup.png"
              alt="login brand"
              className="img-fluid h-100 w-100"
              style={{ objectFit: "cover" }}
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80";
              }}
            />
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-between p-4"
              style={{
                background:
                  "linear-gradient(180deg, rgba(2, 132, 199, 0.25) 0%, rgba(15, 23, 42, 0.75) 100%)",
              }}
            >
              <span className="badge bg-white text-primary rounded-pill px-3 py-1.5 fw-semibold small align-self-start shadow-sm">
                OneCart Official
              </span>
              <div className="text-white">
                <h4 className="fw-bold mb-1">Fast, Safe & Seamless</h4>
                <p className="extra-small text-light opacity-75 mb-0">
                  Access your cart, track orders, and secure your account
                  credentials.
                </p>
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="col-12 col-md-7 p-4 p-lg-5">
            {/* Header Titles */}
            <div className="mb-4">
              {currentState === "login" && (
                <Title text1="Welcome" text2="Back" />
              )}
              {currentState === "signup" && (
                <Title text1="Create" text2="Account" />
              )}
              {currentState === "otp-request" && (
                <Title text1="Instant" text2="OTP Login" />
              )}
              {currentState === "otp-verify" && (
                <Title text1="Verify" text2="Security Code" />
              )}

              <p className="text-muted small mt-1 mb-0">
                {currentState === "login" &&
                  "Enter your email and password to access your profile."}
                {currentState === "signup" &&
                  "Join OneCart today for seamless shopping."}
                {currentState === "otp-request" &&
                  "Password-free authentication using a 6-digit code."}
                {currentState === "otp-verify" &&
                  `Enter the 6-digit code dispatched to ${email}`}
              </p>
            </div>

            {/* VIEW 1: OTP VERIFICATION VIEW */}
            {currentState === "otp-verify" ? (
              <form onSubmit={handleVerifyLoginOtp}>
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="form-label text-dark fw-semibold small mb-0">
                      6-Digit Security OTP
                    </label>
                    <button
                      type="button"
                      onClick={() => setCurrentState("otp-request")}
                      className="btn btn-link p-0 text-decoration-none extra-small fw-semibold"
                      style={{ color: "#0284c7" }}
                    >
                      Change Email
                    </button>
                  </div>

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
                        className="otp-sky-cell"
                        autoFocus={idx === 0}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-sky w-100 rounded-3 py-2 fw-semibold small shadow-sm mb-3"
                  style={{ height: "46px" }}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      />
                      Authenticating...
                    </>
                  ) : (
                    "Verify Code & Sign In"
                  )}
                </button>

                {/* Resend & Return to Password */}
                <div className="d-flex justify-content-between align-items-center pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentState("login")}
                    className="btn btn-link p-0 text-decoration-none text-muted small d-inline-flex align-items-center gap-1"
                  >
                    <ArrowBackIcon sx={{ fontSize: 16 }} /> Back to Password
                  </button>

                  {canResend ? (
                    <button
                      type="button"
                      onClick={() => handleSendLoginOtp(email)}
                      className="btn btn-link p-0 text-decoration-none small fw-semibold d-inline-flex align-items-center gap-1"
                      style={{ color: "#0284c7" }}
                    >
                      <RefreshRoundedIcon sx={{ fontSize: 16 }} /> Resend Code
                    </button>
                  ) : (
                    <span className="text-muted extra-small">
                      Resend in{" "}
                      <strong className="text-dark">{resendTimer}s</strong>
                    </span>
                  )}
                </div>
              </form>
            ) : currentState === "otp-request" ? (
              /* VIEW 2: OTP REQUEST VIEW */
              <div>
                <div className="mb-4">
                  <label className="form-label text-dark fw-semibold small mb-1.5">
                    Registered Email <span className="text-danger">*</span>
                  </label>
                  <div
                    className="input-group sky-input-box rounded-3 px-3 align-items-center"
                    style={{ height: "48px" }}
                  >
                    <MailOutlineRoundedIcon
                      sx={{ fontSize: 20, color: "#64748b" }}
                      className="me-2"
                    />
                    <input
                      type="email"
                      className="form-control border-0 p-0 shadow-none bg-transparent fw-medium text-dark"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSendLoginOtp()}
                  disabled={isSubmitting || !email}
                  className="btn btn-sky w-100 rounded-3 py-2 fw-semibold small shadow-sm mb-3"
                  style={{ height: "46px" }}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      />
                      Dispatching Code...
                    </>
                  ) : (
                    "Send 6-Digit Login Code"
                  )}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentState("login")}
                    className="btn btn-link p-0 text-decoration-none text-muted small d-inline-flex align-items-center gap-1"
                  >
                    <ArrowBackIcon sx={{ fontSize: 16 }} /> Use Regular Password
                    Instead
                  </button>
                </div>
              </div>
            ) : (
              /* VIEW 3: PASSWORD LOGIN & SIGNUP */
              <form onSubmit={handleSubmit}>
                {currentState === "signup" && (
                  <div className="mb-3">
                    <label className="form-label text-dark fw-semibold small mb-1.5">
                      Username <span className="text-danger">*</span>
                    </label>
                    <div
                      className="input-group sky-input-box rounded-3 px-3 align-items-center"
                      style={{ height: "48px" }}
                    >
                      <PersonOutlineIcon
                        sx={{ fontSize: 20, color: "#64748b" }}
                        className="me-2"
                      />
                      <input
                        type="text"
                        className="form-control border-0 p-0 shadow-none bg-transparent fw-medium text-dark"
                        placeholder="Choose username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label text-dark fw-semibold small mb-1.5">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <div
                    className="input-group sky-input-box rounded-3 px-3 align-items-center"
                    style={{ height: "48px" }}
                  >
                    <MailOutlineRoundedIcon
                      sx={{ fontSize: 20, color: "#64748b" }}
                      className="me-2"
                    />
                    <input
                      type="email"
                      className="form-control border-0 p-0 shadow-none bg-transparent fw-medium text-dark"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1.5">
                    <label className="form-label text-dark fw-semibold small mb-0">
                      Password <span className="text-danger">*</span>
                    </label>
                    {currentState === "login" && (
                      <Link
                        to="/forgot-password"
                        className="text-decoration-none small fw-semibold"
                        style={{ color: "#0284c7", fontSize: "0.82rem" }}
                      >
                        Forgot password?
                      </Link>
                    )}
                  </div>

                  <div
                    className="input-group sky-input-box rounded-3 px-3 align-items-center"
                    style={{ height: "48px" }}
                  >
                    <LockOutlinedIcon
                      sx={{ fontSize: 20, color: "#64748b" }}
                      className="me-2"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control border-0 p-0 shadow-none bg-transparent fw-medium text-dark"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
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
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-sky w-100 rounded-3 py-2 fw-semibold small shadow-sm mt-2 mb-3"
                  style={{ height: "46px" }}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      />
                      Authenticating...
                    </>
                  ) : currentState === "login" ? (
                    "Sign In with Password"
                  ) : (
                    "Create Account"
                  )}
                </button>

                {/* Switch to OTP Login Option */}
                {currentState === "login" && (
                  <button
                    type="button"
                    onClick={() => setCurrentState("otp-request")}
                    className="btn btn-outline-sky w-100 rounded-3 py-2 extra-small fw-semibold d-flex align-items-center justify-content-center gap-1.5 mb-3"
                    style={{ height: "44px" }}
                  >
                    <KeyRoundedIcon sx={{ fontSize: 17 }} />
                    Sign In with One-Time Code (OTP)
                  </button>
                )}

                {/* State toggle */}
                <div className="text-center pt-2 border-top">
                  {currentState === "login" ? (
                    <p className="text-muted small mb-0">
                      Don’t have an account?{" "}
                      <span
                        className="fw-bold cursor-pointer"
                        style={{ color: "#0284c7", cursor: "pointer" }}
                        onClick={() => setCurrentState("signup")}
                      >
                        Sign up
                      </span>
                    </p>
                  ) : (
                    <p className="text-muted small mb-0">
                      Already have an account?{" "}
                      <span
                        className="fw-bold cursor-pointer"
                        style={{ color: "#0284c7", cursor: "pointer" }}
                        onClick={() => setCurrentState("login")}
                      >
                        Sign in
                      </span>
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
