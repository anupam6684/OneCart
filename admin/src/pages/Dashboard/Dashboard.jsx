import React from "react";
import { useState } from "react";

// Material UI Icons for Stats Cards & Table Actions
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard"; // Total Products
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined"; // Total Orders
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutlined"; // Total Users
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee"; // Total Revenue
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ProductsTable from "../../components/ProductsTable/ProductsTable";

export default function Dashboard() {
  // Dummy Analytics Data Matrix
  const stats = [
    {
      title: "Total Products",
      value: "120",
      change: "12%",
      icon: <CardGiftcardIcon sx={{ fontSize: 22 }} />,
      color: "#3b82f6",
      bg: "#eff6ff",
    },
    {
      title: "Total Orders",
      value: "250",
      change: "18%",
      icon: <LocalMallOutlinedIcon sx={{ fontSize: 22 }} />,
      color: "#10b981",
      bg: "#ecfdf5",
    },
    {
      title: "Total Users",
      value: "1,342",
      change: "22%",
      icon: <PeopleOutlineIcon sx={{ fontSize: 22 }} />,
      color: "#8b5cf6",
      bg: "#f5f3ff",
    },
    {
      title: "Total Revenue",
      value: "2,45,000",
      change: "28%",
      icon: <CurrencyRupeeIcon sx={{ fontSize: 20 }} />,
      color: "#f59e0b",
      bg: "#fffbeb",
      isCurrency: true,
    },
  ];

  // Table Data Row Dummy Array Mapping
  const products = [
    {
      id: 1,
      name: "Nike Air Max 270",
      desc: "Premium quality sneakers",
      category: "Shoes",
      price: "6,499",
      stock: 50,
      status: "Active",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80",
    },
    {
      id: 2,
      name: "Adidas T-Shirt",
      desc: "Comfortable cotton t-shirt",
      category: "Clothing",
      price: "1,299",
      stock: 120,
      status: "Active",
      img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100&q=80",
    },
    {
      id: 3,
      name: "Apple Watch Series 8",
      desc: "Advanced health features",
      category: "Electronics",
      price: "45,900",
      stock: 30,
      status: "Active",
      img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=100&q=80",
    },
    {
      id: 4,
      name: "Puma Backpack",
      desc: "Durable and stylish backpack",
      category: "Bags",
      price: "2,199",
      stock: 75,
      status: "Inactive",
      img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&q=80",
    },
    {
      id: 5,
      name: "Ray-Ban Sunglasses",
      desc: "UV protected lenses",
      category: "Accessories",
      price: "7,999",
      stock: 45,
      status: "Active",
      img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=100&q=80",
    },
  ];

  return (
    <div
      className="container-fluid p-0"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* 1. TOP STATS CARDS ROW GRID */}
      <div className="row g-4 mb-4">
        {stats.map((card, idx) => (
          <div className="col-12 col-sm-6 col-xl-3" key={idx}>
            <div className="card border-0 p-4 rounded-4 shadow-sm bg-white d-flex flex-row justify-content-between align-items-center">
              <div>
                <span
                  className="text-muted d-block mb-1 fw-medium"
                  style={{ fontSize: "0.875rem" }}
                >
                  {card.title}
                </span>
                <h3 className="fw-bold mb-2 text-dark d-flex align-items-center tracking-tight">
                  {card.isCurrency && (
                    <CurrencyRupeeIcon sx={{ fontSize: 24, mr: 0.5 }} />
                  )}
                  {card.value}
                </h3>
                <span
                  className="text-success fw-semibold d-flex align-items-center gap-1"
                  style={{ fontSize: "0.825rem" }}
                >
                  <ArrowUpwardIcon sx={{ fontSize: 14 }} />
                  {card.change}{" "}
                  <span className="text-muted fw-normal">from last month</span>
                </span>
              </div>

              {/* Dynamic Round Floating Badge Accent Frame */}
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "56px",
                  height: "56px",
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

      {/* 2. CORE INTERFACE AREA: PRODUCTS MANAGEMENT MODULE */}

      <ProductsTable />
    </div>
  );
}
