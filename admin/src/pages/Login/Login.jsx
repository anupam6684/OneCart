import React, { useState, useContext } from "react";
// import { useAdmin } from '../../context/AdminContext';
import { useNavigate } from "react-router-dom";

// Material UI Icons
import StorefrontIcon from "@mui/icons-material/Storefront";
import BarChartIcon from "@mui/icons-material/BarChart";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

// notification
import { toast } from "react-toastify";

import { authService } from "../../services/authService";
import { AdminContext } from "../../context/AdminContext";

const Login = () => {
  const { setToken } = useContext(AdminContext);
  const navigate = useNavigate();

  // State Management
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await authService.login(email, password);

      if (data.success && data.token) {
        localStorage.setItem("token", data.token);

        setToken(data.token);

        toast.success("Login Successful");

        navigate("/", { replace: true }); // 👈 Missing
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div
      className="container-fluid p-0 d-flex vh-100 overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* LEFT SIDEBAR: Branding and Features */}
      <div
        className="col-md-5 d-none d-md-flex flex-column justify-content-between p-5 text-white position-relative"
        style={{ backgroundColor: "#0A1128" }}
      >
        {/* Decorative Grid Top Right */}
        <div
          className="position-absolute opacity-10"
          style={{
            top: "40px",
            right: "40px",
            width: "60px",
            height: "60px",
            backgroundImage:
              "radial-gradient(circle, white 2px, transparent 2px)",
            backgroundSize: "12px 12px",
          }}
        />

        {/* Brand Header */}
        <div className="d-flex align-items-center">
          <img
            src="/OneCartLogo.png"
            alt="logo"
            style={{
              width: "40px",
              height: "40px",
              objectFit: "contain",
            }}
          />

          <span className="fs-4 fw-bold">
            OneCart <span className="text-primary fs-5 fw-medium">Admin</span>
          </span>
        </div>

        {/* Feature Value Propositions */}
        <div className="my-auto py-5" style={{ maxWidth: "400px" }}>
          <h1 className="fw-bold mb-3 display-6 lh-base">
            Welcome Back,
            <br />
            Admin! 👋
          </h1>
          <p className=" mb-5" style={{ fontSize: "0.95rem" }}>
            Sign in to your OneCart admin account and manage your store
            effortlessly.
          </p>

          {/* Feature List Matrix */}
          <div className="d-flex flex-column gap-4">
            <div className="d-flex align-items-start gap-3">
              <div
                className="rounded-3 p-2 d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "#131F3D",
                  width: "40px",
                  height: "40px",
                }}
              >
                <BarChartIcon className="text-primary" sx={{ fontSize: 20 }} />
              </div>
              <div>
                <h6 className="mb-1 fw-semibold text-white small">
                  Dashboard Overview
                </h6>
                <p className="mb-0  extra-small" style={{ fontSize: "0.8rem" }}>
                  Get real-time insights into your store performance and
                  analytics.
                </p>
              </div>
            </div>

            <div className="d-flex align-items-start gap-3">
              <div
                className="rounded-3 p-2 d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "#131F3D",
                  width: "40px",
                  height: "40px",
                }}
              >
                <InventoryIcon className="text-primary" sx={{ fontSize: 20 }} />
              </div>
              <div>
                <h6 className="mb-1 fw-semibold text-white small">
                  Manage Products
                </h6>
                <p className="mb-0  extra-small" style={{ fontSize: "0.8rem" }}>
                  Add, edit and manage your products with ease.
                </p>
              </div>
            </div>

            <div className="d-flex align-items-start gap-3">
              <div
                className="rounded-3 p-2 d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "#131F3D",
                  width: "40px",
                  height: "40px",
                }}
              >
                <ShoppingCartIcon
                  className="text-primary"
                  sx={{ fontSize: 20 }}
                />
              </div>
              <div>
                <h6 className="mb-1 fw-semibold text-white small">
                  Track Orders
                </h6>
                <p className="mb-0  extra-small" style={{ fontSize: "0.8rem" }}>
                  View and manage customer orders and deliveries.
                </p>
              </div>
            </div>

            <div className="d-flex align-items-start gap-3">
              <div
                className="rounded-3 p-2 d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "#131F3D",
                  width: "40px",
                  height: "40px",
                }}
              >
                <PeopleIcon className="text-primary" sx={{ fontSize: 20 }} />
              </div>
              <div>
                <h6 className="mb-1 fw-semibold text-white small">
                  Manage Users
                </h6>
                <p className="mb-0  extra-small" style={{ fontSize: "0.8rem" }}>
                  View and manage customer accounts and permissions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Abstract Graphic Background Hook */}
        <div
          className="position-absolute bottom-0 start-50 translate-middle-x opacity-25"
          style={{ width: "80%", zIndex: 0 }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#0d6efd"
              d="M44.7,-76.1C58.1,-69.3,69.2,-57.4,76.5,-43.5C83.8,-29.6,87.3,-13.8,86.2,1.8C85.1,17.4,79.5,32.8,70.9,45.3C62.3,57.7,50.7,67.2,37.3,73.1C23.9,79,8.7,81.4,-5.9,79.7C-20.5,78,-34.5,72.2,-46.9,64C-59.3,55.8,-70.1,45.2,-76.4,32.2C-82.7,19.2,-84.5,3.7,-81.9,-11.1C-79.3,-25.9,-72.3,-40.1,-61.7,-48.5C-51.2,-56.9,-37.1,-59.6,-24.3,-66.8C-11.5,-74,0,-85.7,12.7,-87.3C25.4,-88.9,31.3,-82.9,44.7,-76.1Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        {/* Footer Copy */}
        <div
          className="position-absolute bottom-0 end-0 m-4 opacity-20"
          style={{ zIndex: 1, height: "300px", width: "300px" }}
        >
          <img
            src="/login-cart.png"
            alt="Cart Illustration"
            className="img-fluid"
            style={{
              maxHeight: "50%",
              objectFit: "contain",
              transform: "translateY(20px)",
            }}
          />
        </div>
        <div
          className=" extra-small"
          style={{ fontSize: "0.75rem", zIndex: 1 }}
        >
          © 2024 OneCart Admin. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDEBAR: Content Entry Interface */}
      <div className="col-12 col-md-7 d-flex flex-column justify-content-between align-items-center p-4 bg-light position-relative">
        <div className="my-auto w-100 d-flex justify-content-center">
          {/* Main Container Card */}
          <div
            className="card border-0 p-5 rounded-4 bg-white"
            style={{
              width: "100%",
              maxWidth: "480px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
            }}
          >
            {/* Padlock Decorative Icon Context Box */}
            <div className="d-flex justify-content-center mb-4">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "#EEF4FF",
                  width: "64px",
                  height: "64px",
                }}
              >
                <LockOutlinedIcon
                  className="text-primary"
                  sx={{ fontSize: 28 }}
                />
              </div>
            </div>

            {/* Header Titles */}
            <h3
              className="text-center fw-bold mb-1 text-dark"
              style={{ letterSpacing: "-0.03em" }}
            >
              Admin Login
            </h3>
            <p className="text-center  mb-4 small">
              Enter your credentials to access dashboard
            </p>

            {/* Standard Action Processing Form */}
            <form onSubmit={handleSubmit}>
              {/* Email Control */}
              <div className="mb-3">
                <label className="form-label small fw-semibold text-dark mb-2">
                  Email Address
                </label>
                <div
                  className="input-group border rounded-3 px-2 bg-white align-items-center"
                  style={{ height: "48px" }}
                >
                  <MailOutlineIcon className=" me-2" sx={{ fontSize: 20 }} />
                  <input
                    type="email"
                    className="form-control border-0 p-0 shadow-none bg-transparent"
                    placeholder="admin@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ fontSize: "0.925rem" }}
                  />
                </div>
              </div>

              {/* Password Control */}
              <div className="mb-3">
                <label className="form-label small fw-semibold text-dark mb-2">
                  Password
                </label>
                <div
                  className="input-group border rounded-3 px-2 bg-white align-items-center"
                  style={{ height: "48px" }}
                >
                  <LockOutlinedIcon className=" me-2" sx={{ fontSize: 20 }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control border-0 p-0 shadow-none bg-transparent"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ fontSize: "0.925rem" }}
                  />
                  <button
                    type="button"
                    className="btn border-0 p-0  shadow-none d-flex align-items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <VisibilityOffIcon sx={{ fontSize: 20 }} />
                    ) : (
                      <VisibilityIcon sx={{ fontSize: 20 }} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Context Panel Matrix */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input mt-0 rounded border-secondary"
                    id="rememberCheck"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ cursor: "pointer", width: "16px", height: "16px" }}
                  />
                  <label
                    className="form-check-label small  user-select-none"
                    htmlFor="rememberCheck"
                    style={{ cursor: "pointer" }}
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#forgot"
                  className="text-primary text-decoration-none small fw-medium"
                >
                  Forgot password?
                </a>
              </div>

              {/* Primary Form CTA Submission Handle */}
              <button
                type="submit"
                className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 rounded-3 fw-medium"
                style={{
                  height: "48px",
                  backgroundColor: "#0d6efd",
                  border: "none",
                }}
              >
                <LockOpenIcon sx={{ fontSize: 18 }} />
                <span>Login</span>
              </button>

              {/* Decorative Partition Split */}
              <div className="position-relative text-center my-4">
                <hr className=" opacity-25" />
                <span
                  className="position-absolute top-50 start-50 translate-middle bg-white px-3  extra-small"
                  style={{ fontSize: "0.75rem" }}
                >
                  or
                </span>
              </div>

              {/* Secure Footprint Access Seal */}
              <div className="d-flex align-items-center justify-content-center text-success gap-2 small">
                <VerifiedUserIcon sx={{ fontSize: 18 }} />
                <span className="fw-medium" style={{ fontSize: "0.825rem" }}>
                  Secure admin access only
                </span>
              </div>
            </form>
          </div>
        </div>

        {/* Tablet / Mobile View Footer Copy Anchor */}
        <div
          className=" extra-small d-block d-md-none mt-4"
          style={{ fontSize: "0.75rem" }}
        >
          © 2024 OneCart Admin. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
