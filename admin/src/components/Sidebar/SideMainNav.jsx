import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
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

export default function SideMainNav() {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const navStyleHandler = ({ isActive }) => ({
    backgroundColor: isActive ? "#0d6efd" : "transparent",
    opacity: isActive ? 1 : 0.75,
    borderRadius: "8px",
    padding: "10px 16px",
    transition: "all 0.2s ease-in-out",
    fontSize: "0.925rem",
    fontWeight: "500",
  });

  // 1. Core Platform Workspace Section
  const mainNav = [
    {
      to: "/",
      label: "Dashboard",
      icon: <DashboardIcon sx={{ fontSize: 20 }} />,
    },

    {
      label: "Products",
      icon: <InventoryIcon sx={{ fontSize: 20 }} />,
      children: [
        { to: "/products", label: "All Products" },
        { to: "/products/add", label: "Add Product" },
      ],
    },

    {
      label: "Categories",
      icon: <ClassIcon sx={{ fontSize: 20 }} />,
      children: [
        { to: "/categories", label: "All Categories" },
        { to: "/categories/add", label: "Add Category" },
      ],
    },

    {
      label: "Orders",
      icon: <ShoppingCartIcon sx={{ fontSize: 20 }} />,
      children: [
        { to: "/orders", label: "All Orders" },
        { to: "/orders/pending", label: "Pending Orders" },
      ],
    },

    {
      label: "Users",
      icon: <PeopleIcon sx={{ fontSize: 20 }} />,
      children: [
        { to: "/users", label: "All Users" },
        { to: "/users/admins", label: "Admins" },
      ],
    },

    {
      to: "/coupons",
      label: "Coupons",
      icon: <ConfirmationNumberOutlinedIcon sx={{ fontSize: 20 }} />,
    },

    {
      to: "/reports",
      label: "Reports",
      icon: <AssessmentOutlinedIcon sx={{ fontSize: 20 }} />,
    },
  ];
  return (
    <ul className="nav nav-pills flex-column gap-1">
      {mainNav.map((item) => (
        <li className="nav-item" key={item.label}>
          {item.children ? (
            <>
              <div
                onClick={() => toggleMenu(item.label)}
                className="nav-link text-white d-flex align-items-center justify-content-between"
                style={{
                  cursor: "pointer",
                  borderRadius: "8px",
                  padding: "10px 16px",
                }}
              >
                <div className="d-flex align-items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>

                {openMenus[item.label] ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </div>

              {openMenus[item.label] && (
                <ul className="nav flex-column ms-4 mt-1">
                  {item.children.map((subItem) => (
                    <li key={subItem.to}>
                      <NavLink
                        to={subItem.to}
                        className="nav-link text-white"
                        style={({ isActive }) => ({
                          opacity: isActive ? 1 : 0.7,
                          fontSize: "0.85rem",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          backgroundColor: isActive
                            ? "rgba(13,110,253,0.2)"
                            : "transparent",
                        })}
                      >
                        {subItem.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <NavLink
              to={item.to}
              style={navStyleHandler}
              className="nav-link text-white d-flex align-items-center gap-3"
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  );
}
