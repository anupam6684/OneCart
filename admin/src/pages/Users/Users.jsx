import React, { useState, useEffect } from "react";

import { userService } from "../../services/userService";

// Material UI Icons for Users Management Panel
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import GppBadOutlinedIcon from "@mui/icons-material/GppBadOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";

export default function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await userService.getAll();

      console.log(data);
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Helper styling profiles to control status pills dynamically
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "ACTIVE":
        return { bg: "#ecfdf5", color: "#10b981" };

      case "PENDING":
        return { bg: "#fffbeb", color: "#f59e0b" };

      case "SUSPENDED":
        return { bg: "#fef2f2", color: "#ef4444" };

      default:
        return { bg: "#f8fafc", color: "#64748b" };
    }
  };

  const totalUsers = users.length;

  const activeUsers = users.filter((user) => user.status === "ACTIVE").length;

  const pendingUsers = users.filter((user) => user.status === "PENDING").length;

  const suspendedUsers = users.filter(
    (user) => user.status === "SUSPENDED",
  ).length;
  // Analytical Grid Segment Mapping Matrix
  const overviewCards = [
    {
      title: "Total Users",
      value: totalUsers,
      suffix: "registered accounts",
      icon: <GroupOutlinedIcon sx={{ fontSize: 22 }} />,
      color: "#3b82f6",
      bg: "#eff6ff",
    },
    {
      title: "Active Users",
      value: activeUsers,
      suffix: "active accounts",
      icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 22 }} />,
      color: "#10b981",
      bg: "#ecfdf5",
    },
    {
      title: "Pending Users",
      value: pendingUsers,
      suffix: "awaiting verification",
      icon: <MarkEmailUnreadOutlinedIcon sx={{ fontSize: 22 }} />,
      color: "#f59e0b",
      bg: "#fffbeb",
    },
    {
      title: "Suspended Users",
      value: suspendedUsers,
      suffix: "restricted accounts",
      icon: <GppBadOutlinedIcon sx={{ fontSize: 22 }} />,
      color: "#ef4444",
      bg: "#fef2f2",
    },
  ];

  return (
    <div
      className="container-fluid p-0"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* 1. MANAGEMENT METRICS SEGMENT GRID */}
      <div className="row g-4 mb-4">
        {overviewCards.map((card, idx) => (
          <div className="col-12 col-sm-6 col-xl-3" key={idx}>
            <div className="card border-0 p-3 rounded-4 shadow-sm bg-white d-flex flex-row justify-content-between align-items-center">
              <div>
                <span
                  className="text-muted d-block mb-1 fw-medium"
                  style={{ fontSize: "0.825rem" }}
                >
                  {card.title}
                </span>
                <h3
                  className="fw-bold mb-1 text-dark tracking-tight"
                  style={{ fontSize: "1.6rem" }}
                >
                  {card.value}
                </h3>
                <span
                  className="text-muted small"
                  style={{ fontSize: "0.75rem" }}
                >
                  {card.suffix}
                </span>
              </div>
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: card.bg,
                  color: card.color,
                }}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 2. CORE MASTER CONTROL CARD FRAME */}
      <div className="card border-0 rounded-4 shadow-sm bg-white p-4">
        {/* Dynamic Filters Configuration Header Toolbar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <h4
            className="fw-bold text-dark mb-0"
            style={{ letterSpacing: "-0.02em" }}
          >
            Registered Users Matrix
          </h4>

          <div className="d-flex align-items-center gap-3 flex-wrap">
            {/* Search Control Tool */}
            <div
              className="input-group border rounded-3 px-2 bg-light align-items-center"
              style={{ height: "40px", maxWidth: "280px" }}
            >
              <SearchIcon className="text-muted me-2" sx={{ fontSize: 18 }} />
              <input
                type="text"
                className="form-control border-0 p-0 bg-transparent shadow-none"
                placeholder="Search name, email identity..."
                style={{ fontSize: "0.875rem" }}
              />
            </div>

            {/* Context Select Filter Option Box */}
            <div
              className="input-group border rounded-3 px-2 bg-white align-items-center"
              style={{
                height: "40px",
                width: "140px",
                borderColor: "#e2e8f0 !important",
              }}
            >
              <FilterListIcon
                className="text-secondary me-1"
                sx={{ fontSize: 16 }}
              />
              <select
                className="form-select border-0 p-0 bg-transparent shadow-none cursor-pointer"
                style={{ fontSize: "0.85rem" }}
              >
                <option value="All">All Roles</option>
                <option value="Customer">Customers</option>
                <option value="Manager">Managers</option>
                <option value="Admin">Administrators</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. RESPONSIVE CUSTOMER INFRASTRUCTURE MATRIX TABLE */}
        <div className="table-responsive">
          <table
            className="table align-middle mb-0"
            style={{ borderColor: "#f1f5f9" }}
          >
            <thead>
              <tr
                className="text-muted"
                style={{
                  fontSize: "0.825rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                }}
              >
                <th className="border-bottom pb-3">User Instance</th>
                <th className="border-bottom pb-3">Account ID</th>
                <th className="border-bottom pb-3">Phone Number</th>

                <th className="border-bottom pb-3">Role Status</th>
                <th className="border-bottom pb-3">Join Date</th>
                <th className="border-bottom pb-3">Last Login</th>
                <th className="border-bottom pb-3">Total Orders</th>
                <th className="border-bottom pb-3">Security Pill</th>
                <th
                  className="border-bottom pb-3 text-end"
                  style={{ width: "140px" }}
                >
                  Controls
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "0.9rem" }}>
              {users.map((user) => {
                const badgeStyles = getStatusBadgeStyle(user.status);
                return (
                  <tr key={user._id}>
                    {/* User Profile Info Identity Segment */}
                    <td className="py-3">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={user.image}
                          alt={user.username}
                          className="rounded-circle object-fit-cover shadow-sm border"
                          style={{ width: "40px", height: "40px" }}
                        />
                        <div>
                          <h6
                            className="mb-0 fw-semibold text-dark"
                            style={{ fontSize: "0.875rem" }}
                          >
                            {user.username}
                          </h6>
                          <span
                            className="text-muted"
                            style={{ fontSize: "0.75rem" }}
                          >
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Account ID */}
                    <td className="text-muted font-monospace">{user._id}</td>
                    {/* Phone number */}
                    <td className="text-muted font-monospace">
                      {user.phone || 91000000}
                    </td>

                    {/* Role Level Label */}
                    <td>
                      <span
                        className="fw-medium px-2 py-1 rounded-2 text-dark"
                        style={{
                          fontSize: "0.8rem",
                          backgroundColor:
                            user.role === "Manager" ? "#e0f2fe" : "#f1f5f9",
                          color:
                            user.role === "Manager" ? "#0369a1" : "#334155",
                        }}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="text-muted">
                      {new Date(user.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    <td className="text-muted">
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Never"}
                    </td>

                    <td className="fw-semibold text-dark px-4">
                      {user.orders.length}
                    </td>

                    {/* Account Status Flag Pill */}
                    <td>
                      <span
                        className="badge rounded-2 border-0 fw-medium px-2 py-1"
                        style={{
                          fontSize: "0.75rem",
                          backgroundColor: badgeStyles.bg,
                          color: badgeStyles.color,
                        }}
                      >
                        {user.status}
                      </span>
                    </td>

                    {/* Administrative Action Shortcuts */}
                    <td className="text-end">
                      <div className="d-inline-flex gap-2">
                        <button
                          className="btn p-2 border rounded-3 text-secondary bg-light-hover d-flex align-items-center shadow-none"
                          style={{ borderColor: "#e2e8f0" }}
                          title="Dispatch Direct Email notification"
                        >
                          <MailOutlineIcon sx={{ fontSize: 16 }} />
                        </button>
                        <button
                          className="btn p-2 border rounded-3 text-primary bg-light-hover d-flex align-items-center shadow-none"
                          style={{ borderColor: "#e2e8f0" }}
                          title="Edit Access Role Permissions"
                        >
                          <EditOutlinedIcon sx={{ fontSize: 16 }} />
                        </button>
                        {user.status !== "Suspended" && (
                          <button
                            className="btn p-2 border rounded-3 text-danger bg-light-hover d-flex align-items-center shadow-none"
                            style={{ borderColor: "#e2e8f0" }}
                            title="Suspend Profile Access"
                          >
                            <BlockOutlinedIcon sx={{ fontSize: 16 }} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 4. FOOTER PAGINATION CONTEXT LAYER CONTROLS */}
        <div
          className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 mt-4 pt-3 border-top"
          style={{ borderColor: "#f1f5f9" }}
        >
          <span className="text-muted small" style={{ fontSize: "0.825rem" }}>
            Showing 1 to 5 of 1,342 entries
          </span>

          <nav>
            <ul className="pagination pagination-sm mb-0 gap-1 border-0">
              <li className="page-item disabled">
                <span
                  className="page-link border rounded-2 px-3 py-1 text-muted"
                  style={{ cursor: "default" }}
                >
                  &lsaquo;
                </span>
              </li>
              <li className="page-item active">
                <span
                  className="page-link border rounded-2 px-3 py-1 bg-primary text-white border-primary"
                  style={{ cursor: "pointer" }}
                >
                  1
                </span>
              </li>
              <li className="page-item">
                <span
                  className="page-link border rounded-2 px-3 py-1 text-dark bg-white"
                  style={{ cursor: "pointer" }}
                >
                  2
                </span>
              </li>
              <li className="page-item">
                <span
                  className="page-link border rounded-2 px-3 py-1 text-dark bg-white"
                  style={{ cursor: "pointer" }}
                >
                  3
                </span>
              </li>
              <li className="page-item disabled">
                <span className="page-link border-0 bg-transparent text-muted px-1">
                  ...
                </span>
              </li>
              <li className="page-item">
                <span
                  className="page-link border rounded-2 px-3 py-1 text-dark bg-white"
                  style={{ cursor: "pointer" }}
                >
                  268
                </span>
              </li>
              <li className="page-item">
                <span
                  className="page-link border rounded-2 px-3 py-1 text-dark bg-white"
                  style={{ cursor: "pointer" }}
                >
                  &rsaquo;
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
