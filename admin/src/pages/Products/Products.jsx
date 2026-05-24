import React from "react";
import { useNavigate } from "react-router-dom";

// Material UI Icons for Products view
import InventoryIcon from "@mui/icons-material/Inventory2Outlined";
import CategoryIcon from "@mui/icons-material/CategoryOutlined";
import AssessmentIcon from "@mui/icons-material/AssessmentOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmberOutlined";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";

export default function Products() {
  const navigate = useNavigate();

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

  // Primary Interactive Products Array Dataset
  const productsList = [
    {
      id: 1,
      name: "Nike Air Max 270",
      desc: "Premium quality sneakers",
      category: "Shoes",
      price: "6,499",
      stock: 50,
      status: "Active",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=80",
    },
    {
      id: 2,
      name: "Adidas T-Shirt",
      desc: "Comfortable cotton t-shirt",
      category: "Clothing",
      price: "1,299",
      stock: 120,
      status: "Active",
      img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=120&q=80",
    },
    {
      id: 3,
      name: "Apple Watch Series 8",
      desc: "Advanced health features",
      category: "Electronics",
      price: "45,900",
      stock: 30,
      status: "Active",
      img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=120&q=80",
    },
    {
      id: 4,
      name: "Puma Backpack",
      desc: "Durable and stylish backpack",
      category: "Bags",
      price: "2,199",
      stock: 75,
      status: "Inactive",
      img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=120&q=80",
    },
    {
      id: 5,
      name: "Ray-Ban Sunglasses",
      desc: "UV protected lenses",
      category: "Accessories",
      price: "7,999",
      stock: 45,
      status: "Active",
      img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=120&q=80",
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

      {/* 2. MAIN HUB WORKSPACE DATA BLOCK */}
      <div className="card border-0 rounded-4 shadow-sm bg-white p-4">
        {/* Management Toolbar Filter Controls Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          {/* Action Filter Input Search Tool */}
          <div
            className="d-flex flex-grow-1 align-items-center gap-3"
            style={{ maxWidth: "500px" }}
          >
            <div
              className="input-group border rounded-3 px-2 bg-light align-items-center"
              style={{ height: "40px" }}
            >
              <SearchIcon className="text-muted me-2" sx={{ fontSize: 18 }} />
              <input
                type="text"
                className="form-control border-0 p-0 bg-transparent shadow-none"
                placeholder="Search products..."
                style={{ fontSize: "0.875rem" }}
              />
            </div>

            <button
              className="btn border text-secondary bg-white d-flex align-items-center gap-2 px-3 rounded-3 shadow-none"
              style={{
                height: "40px",
                borderColor: "#e2e8f0",
                fontSize: "0.875rem",
              }}
            >
              <TuneIcon sx={{ fontSize: 16 }} />
              <span>Filters</span>
            </button>
          </div>

          {/* Primary Action Route Click Navigation Trigger */}
          <button
            className="btn btn-primary d-flex align-items-center gap-2 px-3 rounded-3 fw-medium shadow-none ms-auto ms-md-0"
            onClick={() => navigate("/products/add")}
            style={{ height: "40px", fontSize: "0.875rem" }}
          >
            <AddIcon sx={{ fontSize: 18 }} />
            <span>Add Product</span>
          </button>
        </div>

        {/* 3. PRODUCT SPECIFIC RESPONSIVE DATA TABLE LAYER */}
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
                <th className="border-bottom pb-3" style={{ width: "60px" }}>
                  #
                </th>
                <th className="border-bottom pb-3">Product</th>
                <th className="border-bottom pb-3">Category</th>
                <th className="border-bottom pb-3">Price</th>
                <th className="border-bottom pb-3">Stock</th>
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
              {productsList.map((product, idx) => (
                <tr key={product.id}>
                  <td className="text-muted py-3">{idx + 1}</td>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="rounded-3 object-fit-cover shadow-sm border"
                        style={{ width: "44px", height: "44px" }}
                      />
                      <div>
                        <h6
                          className="mb-0 fw-semibold text-dark"
                          style={{ fontSize: "0.875rem" }}
                        >
                          {product.name}
                        </h6>
                        <span
                          className="text-muted extra-small"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {product.desc}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-muted">{product.category}</td>
                  <td className="fw-semibold text-dark">₹{product.price}</td>
                  <td className="text-muted">{product.stock}</td>
                  <td>
                    <span
                      className="badge rounded-2 border-0 fw-medium px-2 py-1"
                      style={{
                        fontSize: "0.75rem",
                        backgroundColor:
                          product.status === "Active" ? "#ecfdf5" : "#fef2f2",
                        color:
                          product.status === "Active" ? "#10b981" : "#ef4444",
                      }}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="text-end">
                    <div className="d-inline-flex gap-2">
                      <button
                        className="btn p-2 border rounded-3 text-primary bg-light-hover d-flex align-items-center shadow-none"
                        onClick={() => navigate(`/products/${product.id}/edit`)}
                        style={{ borderColor: "#e2e8f0" }}
                      >
                        <EditOutlinedIcon sx={{ fontSize: 16 }} />
                      </button>
                      <button
                        className="btn p-2 border rounded-3 text-danger bg-light-hover d-flex align-items-center shadow-none"
                        style={{ borderColor: "#e2e8f0" }}
                      >
                        <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. FOOTER PAGINATION CONTEXT CONTROLS PANEL */}
        <div
          className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 mt-4 pt-3 border-top"
          style={{ borderColor: "#f1f5f9" }}
        >
          <span className="text-muted small" style={{ fontSize: "0.825rem" }}>
            Showing 1 to 5 of 120 products
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
                  24
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
