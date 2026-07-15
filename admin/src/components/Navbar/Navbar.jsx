import React, { useContext, useState } from "react";
import { Links } from "react-router-dom";
import { useMatches } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// import { useAdmin } from "../../context/AdminContext";

// Material UI Icons matching the design layout perfectly
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToAppOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { AdminContext } from "../../context/AdminContext";
import { useLocation } from "react-router-dom";

// Change your function definition line to accept the prop:
export default function Navbar({ toggleSidebar }) {
  const { logOut } = useContext(AdminContext);
  const navigate = useNavigate();
  // const { adminUser, logout } = useAdmin();
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const pageTitles = {
    "/": "Dashboard",
    "/products": "Products",
    "/products/add": "Add Product",
    "/categories": "Categories",
    "/orders": "Orders",
    "/users": "Users",
    "/coupons": "Coupons",
    "/coupon/new": "Create Coupon",
    "/reports": "Reports",
    "/profile": "Profile",
    "/settings": "Settings",
    "/FAQs": "FAQs",
  };

  const pageTitle = pageTitles[location.pathname] || "OneCart Admin";

  return (
    <nav
      className="navbar navbar-expand bg-white px-4 border-bottom w-100"
      style={{
        height: "70px",
        zIndex: 1020,
        borderColor: "rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="container-fluid p-0 d-flex justify-content-between align-items-center">
        {/* LEFT COMPONENT */}
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-link text-dark p-0 border-0 d-flex align-items-center text-decoration-none shadow-none"
            type="button"
            onClick={toggleSidebar} // <-- This directly triggers the layout update
            style={{ cursor: "pointer" }}
          >
            <MenuIcon sx={{ fontSize: 22, color: "#1e293b" }} />
          </button>

          <h5 className="mb-0 fw-bold text-dark" style={{ fontSize: "1.5rem" }}>
            {pageTitle}
          </h5>
        </div>

        {/* RIGHT COMPONENT: Actions Panel Interface */}
        <div className="d-flex align-items-center gap-4">
          {/* Dark Mode Icon Trigger Button & notification*/}
          <button
            className="btn btn-link text-secondary p-0 border-0 d-flex align-items-center text-decoration-none shadow-none"
            type="button"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/FAQs")}
          >
            <NotificationsNoneIcon sx={{ fontSize: 22, color: "#64748b" }} />
          </button>
          <button
            className="btn btn-link text-secondary p-0 border-0 d-flex align-items-center text-decoration-none shadow-none"
            type="button"
            style={{ cursor: "pointer" }}
          >
            <DarkModeOutlinedIcon sx={{ fontSize: 22, color: "#64748b" }} />
          </button>

          {/* Admin Context Menu Wrapper Dropdown */}
          <div className="position-relative">
            <div
              className="d-flex align-items-center gap-2"
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ cursor: "pointer", userSelect: "none" }}
            >
              {/* Profile Avatar Image */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                alt="Admin Avatar"
                className="rounded-circle object-fit-cover"
                style={{
                  width: "36px",
                  height: "36px",
                  border: "1px solid #e2e8f0",
                }}
              />

              {/* Profile Name Matrix Text */}
              <div className="d-none d-sm-block">
                <span
                  className="fw-medium text-dark d-flex align-items-center gap-1"
                  style={{ fontSize: "0.9rem" }}
                >
                  Admin
                  <KeyboardArrowDownIcon
                    sx={{ fontSize: 16, color: "#64748b" }}
                  />
                </span>
              </div>
            </div>

            {/* Dropdown Card Matrix */}
            {showDropdown && (
              <>
                {/* Backdrop overlay to close when clicking outside */}
                <div
                  className="position-fixed top-0 start-0 w-100 h-100"
                  style={{ zIndex: 999 }}
                  onClick={() => setShowDropdown(false)}
                />

                <ul
                  className="dropdown-menu dropdown-menu-end show border-0 shadow-sm p-2 mt-2 position-absolute end-0 bg-white rounded-3"
                  style={{
                    zIndex: 1000,
                    minWidth: "180px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  }}
                >
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center gap-2 rounded-2 py-2 text-dark"
                      href="/profile"
                      style={{ fontSize: "0.875rem" }}
                    >
                      <PersonOutlineIcon
                        sx={{ fontSize: 18, color: "#64748b" }}
                      />
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center gap-2 rounded-2 py-2 text-dark"
                      href="/settings"
                      style={{ fontSize: "0.875rem" }}
                    >
                      <SettingsOutlinedIcon
                        sx={{ fontSize: 18, color: "#64748b" }}
                      />
                      Settings
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider my-1 opacity-25" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2 rounded-2 py-2 text-danger border-0 bg-transparent w-100"
                      onClick={logOut}
                      style={{ fontSize: "0.875rem" }}
                    >
                      <ExitToAppIcon sx={{ fontSize: 18 }} />
                      Logout
                    </button>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
