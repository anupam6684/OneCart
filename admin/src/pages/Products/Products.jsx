import React, { useEffect, useState } from "react";

// Material UI Icons for Products view
import InventoryIcon from "@mui/icons-material/Inventory2Outlined";
import CategoryIcon from "@mui/icons-material/CategoryOutlined";
import AssessmentIcon from "@mui/icons-material/AssessmentOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmberOutlined";

import ProductsTable from "../../components/ProductsTable/ProductsTable";

export default function Products() {
  // Secondary Filter Overview Cards Mapping Array
  const summaryCards = [
    {
      title: "Total Products",
      value: "120",
      change: "12%",
      icon: <InventoryIcon sx={{ fontSize: 22 }} />,
      color: "#3b82f6",
      bg: "#eff6ff",
    },
    {
      title: "Total Categories",
      value: "8",
      change: "8%",
      icon: <CategoryIcon sx={{ fontSize: 22 }} />,
      color: "#10b981",
      bg: "#ecfdf5",
    },
    {
      title: "Total Stock",
      value: "1,248",
      change: "15%",
      icon: <AssessmentIcon sx={{ fontSize: 22 }} />,
      color: "#8b5cf6",
      bg: "#f5f3ff",
    },
    {
      title: "Low Stock",
      value: "12",
      change: "5%",
      icon: <WarningAmberIcon className="text-danger" sx={{ fontSize: 22 }} />,
      color: "#ef4444",
      bg: "#fef2f2",
      isWarning: true,
    },
  ];

  return (
    <div
      className="container-fluid p-0"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* 1. TOP SUB-ANALYTICS MINI SUMMARY GRID */}
      <div className="row g-4 mb-4">
        {summaryCards.map((card, index) => (
          <div className="col-12 col-sm-6 col-xl-3" key={index}>
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
                  className={`fw-semibold d-flex align-items-center gap-1`}
                  style={{
                    fontSize: "0.775rem",
                    color: card.isWarning ? "#ef4444" : "#10b981",
                  }}
                >
                  {card.isWarning ? "↓" : "↑"} {card.change}{" "}
                  <span className="text-muted fw-normal">from last month</span>
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

      {/* products list and search card */}

      <ProductsTable />
    </div>
  );
}
