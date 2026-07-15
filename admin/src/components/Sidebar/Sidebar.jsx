import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

// Material UI Icons matching the design mockups perfectly
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory2Outlined"; // Products
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined"; // Orders
import PeopleIcon from "@mui/icons-material/PeopleOutlined"; // Users
import ClassIcon from "@mui/icons-material/ClassOutlined"; // Categories
import SettingsIcon from "@mui/icons-material/SettingsOutlined"; // Settings
import AccountCircleIcon from "@mui/icons-material/AccountCircleOutlined"; // Profile
import ExitToAppIcon from "@mui/icons-material/ExitToAppOutlined"; // Logout
import LocalMallIcon from "@mui/icons-material/LocalMall"; // Brand Bag Icon
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined"; // Coupons Icon
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined"; // Reports Icon
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined"; // Notifications Icon
import { AdminContext } from "../../context/AdminContext";

import SideMainNav from "./SideMainNav";

// Change your function definition line to accept the prop:
export default function Sidebar({ isOpen }) {
  const { logOut } = useContext(AdminContext);

  // Navigation Matrix Array

  // 2. Control, FAQs, and Identity Profiling Section
  const settingsNav = [
    {
      to: "/FAQs",
      label: "FAQs",
      icon: <NotificationsActiveOutlinedIcon sx={{ fontSize: 20 }} />,
    }, // <-- ADDED
    {
      to: "/profile",
      label: "Profile",
      icon: <AccountCircleIcon sx={{ fontSize: 20 }} />,
    },
    {
      to: "/settings",
      label: "Settings",
      icon: <SettingsIcon sx={{ fontSize: 20 }} />,
    },
    {
      onClick: logOut,
      label: "Logout",
      icon: <ExitToAppIcon sx={{ fontSize: 20 }} />,
    },
  ];

  // Combined Style Handler for Active vs Inactive Route States
  const navStyleHandler = ({ isActive }) => ({
    backgroundColor: isActive ? "#0d6efd" : "transparent",
    opacity: isActive ? 1 : 0.75,
    borderRadius: "8px",
    padding: "10px 16px",
    transition: "all 0.2s ease-in-out",
    fontSize: "0.925rem",
    fontWeight: "500",
  });

  return (
    <aside
      className="d-flex flex-column text-white p-3 vh-100 position-sticky top-0 shadow shadow-lg"
      style={{
        width: isOpen ? "260px" : "0px",
        minWidth: isOpen ? "260px" : "0px",
        marginLeft: isOpen ? "0px" : "-260px",
        opacity: isOpen ? 1 : 0,
        background: "#0A1128",
        borderRight: "1px solid rgba(255, 255, 255, 0.05)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        overflowX: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      {/* BRAND LOGO CONTEXT LAYER */}
      <div className="d-flex align-items-center gap-2 px-2 mt-2 mb-4">
        <div
          className=" rounded-3 d-flex align-items-center justify-content-center text-white shadow-sm"
          style={{ width: "38px", height: "38px" }}
        >
          <img
            src="/OneCartLogo.png"
            alt="logo"
            style={{
              width: "40px",
              height: "40px",
              objectFit: "contain",
            }}
          />
        </div>
        <h3
          className="fw-bold mb-0 tracking-tight"
          style={{ fontSize: "1.35rem", letterSpacing: "-0.02em" }}
        >
          OneCart
        </h3>
      </div>

      <hr
        className="mt-0 mb-3"
        style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
      />

      {/* CORE HUB: MAIN PANEL NAVIGATION */}
      <div className="mb-4">
        <h6
          className="text-uppercase px-2 mb-2  fw-bold"
          style={{ fontSize: "0.725rem", letterSpacing: "0.06em" }}
        >
          Main
        </h6>

        <SideMainNav />
      </div>

      {/* CORE HUB: SYSTEM SETTINGS OPTIONS */}
      <div className="mb-4">
        <h6
          className="text-uppercase px-2 mb-2  fw-bold"
          style={{ fontSize: "0.725rem", letterSpacing: "0.06em" }}
        >
          Settings
        </h6>
        <ul className="nav nav-pills flex-column gap-1">
          {settingsNav.map((item) => (
            <li className="nav-item" key={item.label}>
              {item.to ? (
                <NavLink
                  to={item.to}
                  style={navStyleHandler}
                  className="nav-link text-white d-flex align-items-center gap-3"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ) : (
                <div
                  onClick={item.onClick}
                  className="nav-link text-white d-flex align-items-center gap-3"
                  style={{ cursor: "pointer" }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* FOOTER PERSISTENT UTILITY MARKETING CARD */}
      <div
        className="mt-auto p-3 rounded-4 d-flex align-items-center justify-content-between"
        style={{
          background: "#111c3a",
          width: "100%", // Forces it to take up the full sidebar width
          minHeight: "95px", // Prevents the card size from becoming too small
          boxSizing: "border-box",
        }}
      >
        {/* Text Container - Flex Grow forces it to use all available space */}
        <div className="flex-grow-1 me-2" style={{ minWidth: 0 }}>
          <h6
            className="fw-bold mb-1 text-white"
            style={{ fontSize: "0.875rem" }}
          >
            OneCart Admin
          </h6>

          <p
            className="mb-0 text-wrap"
            style={{
              fontSize: "0.75rem",
              color: "#9ca3af",
              lineHeight: "1.4",
            }}
          >
            Manage products, orders, and growth more efficiently.
          </p>
        </div>

        {/* Image Box - Rigid absolute width keeps it from shrinking */}
        <div
          className="rounded-3 d-flex align-items-center justify-content-center"
          style={{
            width: "48px",
            height: "48px",
            minWidth: "48px", // CRITICAL: Stops the image box from shrinking
            background: "rgba(255, 255, 255, 0.03)", // Optional subtle backing glow
          }}
        >
          <img
            src="/bag-icon.png"
            alt="logo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </aside>
  );
}
