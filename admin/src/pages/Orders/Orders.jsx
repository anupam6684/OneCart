import React, { useState } from "react";

// Material UI Icons for Orders View
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

export default function Orders() {
  // Metric Summary Cards Dataset Mapping Matrix
  const summaryCards = [
    {
      title: "Total Orders",
      value: "250",
      suffix: "orders",
      icon: <ShoppingBagOutlinedIcon sx={{ fontSize: 22 }} />,
      color: "#3b82f6",
      bg: "#eff6ff",
    },
    {
      title: "Pending Fulfillment",
      value: "34",
      suffix: "awaiting processing",
      icon: <AutorenewOutlinedIcon sx={{ fontSize: 22 }} />,
      color: "#f59e0b",
      bg: "#fffbeb",
    },
    {
      title: "Completed Deliveries",
      value: "204",
      suffix: "dispatched safely",
      icon: <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 22 }} />,
      color: "#10b981",
      bg: "#ecfdf5",
    },
    {
      title: "Cancelled Orders",
      value: "12",
      suffix: "refunded fully",
      icon: <BlockOutlinedIcon sx={{ fontSize: 22 }} />,
      color: "#ef4444",
      bg: "#fef2f2",
    },
  ];

  // Core Order Data Array Grid Dataset
  const initialOrders = [
    {
      id: "ORD-9482",
      customer: "Anupam Jana",
      email: "anupam@example.com",
      date: "May 24, 2026",
      items: 3,
      total: "8,997",
      status: "Pending",
      method: "UPI",
    },
    {
      id: "ORD-9481",
      customer: "Rahul Sharma",
      email: "rahul@example.com",
      date: "May 23, 2026",
      items: 1,
      total: "1,299",
      status: "Delivered",
      method: "Cards",
    },
    {
      id: "ORD-9480",
      customer: "Priya Patel",
      email: "priya@example.com",
      date: "May 23, 2026",
      items: 2,
      total: "52,399",
      status: "Delivered",
      method: "Net Banking",
    },
    {
      id: "ORD-9479",
      customer: "Amit Mishra",
      email: "amit@example.com",
      date: "May 22, 2026",
      items: 5,
      total: "14,495",
      status: "Shipped",
      method: "COD",
    },
    {
      id: "ORD-9478",
      customer: "Sneha Reddy",
      email: "sneha@example.com",
      date: "May 20, 2026",
      items: 1,
      total: "7,999",
      status: "Cancelled",
      method: "UPI",
    },
  ];

  const [orders] = useState(initialOrders);

  // Helper utility to match color styling profiles to standard order tracking states
  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return { bg: "#ecfdf5", color: "#10b981" };
      case "Pending":
        return { bg: "#fffbeb", color: "#f59e0b" };
      case "Shipped":
        return { bg: "#f0fdfa", color: "#0d9488" };
      case "Cancelled":
        return { bg: "#fef2f2", color: "#ef4444" };
      default:
        return { bg: "#f8fafc", color: "#64748b" };
    }
  };

  return (
    <div
      className="container-fluid p-0"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* 1. TOP STATS CARDS ROW GRID */}
      <div className="row g-4 mb-4">
        {summaryCards.map((card, idx) => (
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

      {/* 2. CORE WORKSPACE BOARD: ORDERS MANAGEMENT MODULE */}
      <div className="card border-0 rounded-4 shadow-sm bg-white p-4">
        {/* Toolbar Filter Controls Header Area */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <h4
            className="fw-bold text-dark mb-0"
            style={{ letterSpacing: "-0.02em" }}
          >
            Orders Log
          </h4>

          <div className="d-flex align-items-center gap-3 flex-wrap">
            {/* Native Search Input Form Box */}
            <div
              className="input-group border rounded-3 px-2 bg-light align-items-center"
              style={{ height: "40px", maxWidth: "280px" }}
            >
              <SearchIcon className="text-muted me-2" sx={{ fontSize: 18 }} />
              <input
                type="text"
                className="form-control border-0 p-0 bg-transparent shadow-none"
                placeholder="Search Order ID, Customer..."
                style={{ fontSize: "0.875rem" }}
              />
            </div>

            {/* Dropdown Selection: Filter Status Shortcut tool */}
            <div
              className="input-group border rounded-3 px-2 bg-white align-items-center"
              style={{
                height: "40px",
                width: "150px",
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
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. CORE LOGISTICS DATA LAYERS TABLE MATRIX */}
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
                <th className="border-bottom pb-3">Order ID</th>
                <th className="border-bottom pb-3">Customer</th>
                <th className="border-bottom pb-3">Date</th>
                <th className="border-bottom pb-3">Items</th>
                <th className="border-bottom pb-3">Price Total</th>
                <th className="border-bottom pb-3">Payment</th>
                <th className="border-bottom pb-3">Status</th>
                <th
                  className="border-bottom pb-3 text-end"
                  style={{ width: "120px" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "0.9rem" }}>
              {orders.map((order) => {
                const statusStyles = getStatusStyle(order.status);
                return (
                  <tr key={order.id}>
                    {/* Order ID Link Column */}
                    <td
                      className="fw-semibold text-primary py-3"
                      style={{ cursor: "pointer" }}
                    >
                      {order.id}
                    </td>

                    {/* Customer Info Identity Segment */}
                    <td>
                      <div>
                        <h6
                          className="mb-0 fw-semibold text-dark"
                          style={{ fontSize: "0.875rem" }}
                        >
                          {order.customer}
                        </h6>
                        <span
                          className="text-muted"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {order.email}
                        </span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="text-muted">{order.date}</td>

                    {/* Items Quantities */}
                    <td className="text-muted">
                      {order.items} {order.items === 1 ? "item" : "items"}
                    </td>

                    {/* Price Total */}
                    <td className="fw-semibold text-dark">₹{order.total}</td>

                    {/* Payment Gateways methods */}
                    <td>
                      <span
                        className="text-secondary small bg-light px-2 py-1 rounded-2 fw-medium"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {order.method}
                      </span>
                    </td>

                    {/* Dynamic Badging pill tags matrix */}
                    <td>
                      <span
                        className="badge rounded-2 border-0 fw-medium px-2 py-1"
                        style={{
                          fontSize: "0.75rem",
                          backgroundColor: statusStyles.bg,
                          color: statusStyles.color,
                        }}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Action Toolbar Core Triggers */}
                    <td className="text-end">
                      <div className="d-inline-flex gap-2">
                        <button
                          className="btn p-2 border rounded-3 text-secondary bg-light-hover d-flex align-items-center shadow-none"
                          style={{ borderColor: "#e2e8f0" }}
                          title="View Invoice Summary"
                        >
                          <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
                        </button>
                        {order.status === "Pending" && (
                          <button
                            className="btn p-2 border rounded-3 text-primary bg-light-hover d-flex align-items-center shadow-none"
                            style={{ borderColor: "#e2e8f0" }}
                            title="Mark As Dispatched"
                          >
                            <LocalShippingOutlinedIcon sx={{ fontSize: 16 }} />
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

        {/* 4. FOOTER PAGINATION MODULE CONTROLS */}
        <div
          className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 mt-4 pt-3 border-top"
          style={{ borderColor: "#f1f5f9" }}
        >
          <span className="text-muted small" style={{ fontSize: "0.825rem" }}>
            Showing 1 to 5 of 250 orders
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
                  50
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
