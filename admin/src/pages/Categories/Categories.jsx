import React, { useState } from "react";
import CategoryIcon from "@mui/icons-material/CategoryOutlined";
import LayersIcon from "@mui/icons-material/LayersOutlined";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeedOutlined";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import SearchIcon from "@mui/icons-material/Search";

export default function Categories() {
  const initialCategories = [
    { id: 1, name: "Shoes", slug: "shoes", productCount: 45, status: "Active" },
    {
      id: 2,
      name: "Clothing",
      slug: "clothing",
      productCount: 120,
      status: "Active",
    },
    {
      id: 3,
      name: "Electronics",
      slug: "electronics",
      productCount: 30,
      status: "Active",
    },
    { id: 4, name: "Bags", slug: "bags", productCount: 75, status: "Active" },
    {
      id: 5,
      name: "Accessories",
      slug: "accessories",
      productCount: 45,
      status: "Inactive",
    },
  ];

  const [categories] = useState(initialCategories);

  return (
    <div
      className="container-fluid p-0"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Summary Cards Row */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-4">
          <div className="card border-0 p-3 rounded-4 shadow-sm bg-white d-flex flex-row justify-content-between align-items-center">
            <div>
              <span
                className="text-muted d-block mb-1 fw-medium"
                style={{ fontSize: "0.825rem" }}
              >
                Total Categories
              </span>
              <h3
                className="fw-bold mb-1 text-dark tracking-tight"
                style={{ fontSize: "1.6rem" }}
              >
                {categories.length}
              </h3>
            </div>
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#eff6ff",
                color: "#3b82f6",
              }}
            >
              <CategoryIcon sx={{ fontSize: 22 }} />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card border-0 p-3 rounded-4 shadow-sm bg-white d-flex flex-row justify-content-between align-items-center">
            <div>
              <span
                className="text-muted d-block mb-1 fw-medium"
                style={{ fontSize: "0.825rem" }}
              >
                Active Groups
              </span>
              <h3
                className="fw-bold mb-1 text-dark tracking-tight"
                style={{ fontSize: "1.6rem" }}
              >
                4
              </h3>
            </div>
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#ecfdf5",
                color: "#10b981",
              }}
            >
              <LayersIcon sx={{ fontSize: 22 }} />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card border-0 p-3 rounded-4 shadow-sm bg-white d-flex flex-row justify-content-between align-items-center">
            <div>
              <span
                className="text-muted d-block mb-1 fw-medium"
                style={{ fontSize: "0.825rem" }}
              >
                Total Stock Linked
              </span>
              <h3
                className="fw-bold mb-1 text-dark tracking-tight"
                style={{ fontSize: "1.6rem" }}
              >
                315 items
              </h3>
            </div>
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#f5f3ff",
                color: "#8b5cf6",
              }}
            >
              <DynamicFeedIcon sx={{ fontSize: 22 }} />
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Side: Create Form block */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 rounded-4 shadow-sm bg-white p-4">
            <h5 className="fw-bold text-dark mb-3">Create Category</h5>
            <div className="mb-3">
              <label className="form-label text-muted small fw-medium mb-2">
                Category Name
              </label>
              <input
                type="text"
                className="form-control rounded-3 px-3 shadow-none bg-light border-0"
                style={{ height: "42px", fontSize: "0.9rem" }}
                placeholder="e.g. Watches"
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-muted small fw-medium mb-2">
                Slug String
              </label>
              <input
                type="text"
                className="form-control rounded-3 px-3 shadow-none bg-light border-0"
                style={{ height: "42px", fontSize: "0.9rem" }}
                placeholder="e.g. watches"
              />
            </div>
            <div className="mb-4">
              <label className="form-label text-muted small fw-medium mb-2">
                Status
              </label>
              <select
                className="form-select rounded-3 px-3 shadow-none bg-light border-0"
                style={{ height: "42px", fontSize: "0.9rem" }}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <button
              className="btn btn-primary w-100 rounded-3 d-flex align-items-center justify-content-center gap-2 fw-medium"
              style={{ height: "44px" }}
            >
              <AddIcon sx={{ fontSize: 18 }} /> Add Category
            </button>
          </div>
        </div>

        {/* Right Side: Data Table list */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 rounded-4 shadow-sm bg-white p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold text-dark mb-0">
                Existing Sub-categories
              </h5>
              <div
                className="input-group border rounded-3 px-2 bg-light align-items-center"
                style={{ height: "36px", maxWidth: "200px" }}
              >
                <SearchIcon className="text-muted me-1" sx={{ fontSize: 16 }} />
                <input
                  type="text"
                  className="form-control border-0 p-0 bg-transparent shadow-none"
                  placeholder="Search categories..."
                  style={{ fontSize: "0.85rem" }}
                />
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr
                    className="text-muted"
                    style={{ fontSize: "0.8rem", textTransform: "uppercase" }}
                  >
                    <th className="border-bottom pb-2">Name</th>
                    <th className="border-bottom pb-2">Slug</th>
                    <th className="border-bottom pb-2">Linked Products</th>
                    <th className="border-bottom pb-2">Status</th>
                    <th className="border-bottom pb-2 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: "0.9rem" }}>
                  {categories.map((c) => (
                    <tr key={c.id}>
                      <td className="fw-semibold text-dark py-3">{c.name}</td>
                      <td className="text-muted font-monospace">{c.slug}</td>
                      <td className="text-dark px-3">
                        {c.productCount} products
                      </td>
                      <td>
                        <span
                          className="badge rounded-2 fw-medium px-2 py-1"
                          style={{
                            fontSize: "0.75rem",
                            backgroundColor:
                              c.status === "Active" ? "#ecfdf5" : "#fef2f2",
                            color:
                              c.status === "Active" ? "#10b981" : "#ef4444",
                          }}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex gap-2">
                          <button
                            className="btn p-2 border rounded-3 text-primary shadow-none"
                            style={{ borderColor: "#e2e8f0" }}
                          >
                            <EditOutlinedIcon sx={{ fontSize: 15 }} />
                          </button>
                          <button
                            className="btn p-2 border rounded-3 text-danger shadow-none"
                            style={{ borderColor: "#e2e8f0" }}
                          >
                            <DeleteOutlineIcon sx={{ fontSize: 15 }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
