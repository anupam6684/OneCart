import React from "react";

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
      <div className="card border-0 rounded-4 shadow-sm bg-white p-4">
        {/* Table Content Panel Header Actions Toolbar */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
          <h4
            className="fw-bold text-dark mb-0"
            style={{ letterSpacing: "-0.02em" }}
          >
            Products
          </h4>
        </div>

        {/* 3. RESPONSIVE DATA TABLE ELEMENT MATRIX */}
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
                <th className="border-bottom-2 pb-3" style={{ width: "60px" }}>
                  #
                </th>
                <th className="border-bottom-2 pb-3">Product</th>
                <th className="border-bottom-2 pb-3">Category</th>
                <th className="border-bottom-2 pb-3">Price</th>
                <th className="border-bottom-2 pb-3">Stock</th>
                <th className="border-bottom-2 pb-3">Status</th>
                <th
                  className="border-bottom-2 pb-3 text-end"
                  style={{ width: "120px" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "0.9rem" }}>
              {products.map((p, idx) => (
                <tr key={p.id}>
                  {/* Sequence Count */}
                  <td className="text-muted py-3">{idx + 1}</td>

                  {/* Image Grid Identity Label Block */}
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="rounded-3 object-fit-cover shadow-sm border"
                        style={{ width: "44px", height: "44px" }}
                      />
                      <div>
                        <h6
                          className="mb-0 fw-semibold text-dark"
                          style={{ fontSize: "0.875rem" }}
                        >
                          {p.name}
                        </h6>
                        <span
                          className="text-muted extra-small"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {p.desc}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="text-muted">{p.category}</td>

                  {/* Price */}
                  <td className="fw-semibold text-dark">₹{p.price}</td>

                  {/* Stock Levels */}
                  <td className="text-muted">{p.stock}</td>

                  {/* Status Pills */}
                  <td>
                    <span
                      className={`badge rounded-2 border-0 fw-medium px-2 py-1`}
                      style={{
                        fontSize: "0.75rem",
                        backgroundColor:
                          p.status === "Active" ? "#ecfdf5" : "#fef2f2",
                        color: p.status === "Active" ? "#10b981" : "#ef4444",
                      }}
                    >
                      {p.status}
                    </span>
                  </td>

                  {/* Action Toolbar Core Triggers */}
                  <td className="text-end">
                    <div className="d-inline-flex gap-2">
                      <button
                        className="btn p-2 border rounded-3 text-primary bg-light-hover d-flex align-items-center shadow-none"
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

        {/* 4. FOOTER PAGINATION CONTROL INTERFACE GRID BAR */}
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
