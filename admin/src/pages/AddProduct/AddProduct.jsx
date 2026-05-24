import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Material UI Icons to match mockup layout precisely
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloseIcon from "@mui/icons-material/Close";

export default function AddProduct() {
  const navigate = useNavigate();

  // Form State Control Matrix
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    salePrice: "",
    stock: "",
    brand: "",
    description: "",
    featured: false,
  });

  // Variants Chips State Management
  const [sizes, setSizes] = useState(["7", "8", "9", "10"]);
  const colors = [
    { name: "black", hex: "#000000" },
    { name: "white", hex: "#ffffff", border: true },
    { name: "blue", hex: "#0d6efd" },
    { name: "red", hex: "#dc3545" },
    {
      name: "gradient",
      hex: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
    },
  ];

  // Dummy uploaded images matching the shoe items in your mockup
  const uploadedImages = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&q=80",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=150&q=80",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=150&q=80",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const removeSize = (sizeToRemove) => {
    setSizes(sizes.filter((size) => size !== sizeToRemove));
  };

  return (
    <div
      className="container-fluid p-0"
      style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#f8fafc" }}
    >
      <div className="row g-4">
        {/* ================= LEFT SIDE COLUMN: FORM METADATA ================= */}
        <div className="col-12 col-xl-8">
          <div className="card border-0 rounded-4 shadow-sm bg-white p-4">
            <h5
              className="fw-bold text-dark mb-4"
              style={{ fontSize: "1.05rem" }}
            >
              Product Information
            </h5>

            <div className="row g-4">
              {/* Product Name */}
              <div className="col-12 col-md-6">
                <label className="form-label text-dark fw-medium small mb-2">
                  Product Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control rounded-3 border bg-white px-3 shadow-none"
                  style={{
                    height: "44px",
                    fontSize: "0.875rem",
                    borderColor: "#e2e8f0",
                  }}
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              {/* Category Dropdown */}
              <div className="col-12 col-md-6">
                <label className="form-label text-dark fw-medium small mb-2">
                  Category <span className="text-danger">*</span>
                </label>
                <select
                  name="category"
                  className="form-select rounded-3 border bg-white px-3 shadow-none text-muted"
                  style={{
                    height: "44px",
                    fontSize: "0.875rem",
                    borderColor: "#e2e8f0",
                    cursor: "pointer",
                  }}
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select category</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Electronics">Electronics</option>
                </select>
              </div>

              {/* Price */}
              <div className="col-12 col-md-6">
                <label className="form-label text-dark fw-medium small mb-2">
                  Price <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  className="form-control rounded-3 border bg-white px-3 shadow-none"
                  style={{
                    height: "44px",
                    fontSize: "0.875rem",
                    borderColor: "#e2e8f0",
                  }}
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>

              {/* Sale Price */}
              <div className="col-12 col-md-6">
                <label className="form-label text-dark fw-medium small mb-2">
                  Sale Price
                </label>
                <input
                  type="number"
                  name="salePrice"
                  className="form-control rounded-3 border bg-white px-3 shadow-none"
                  style={{
                    height: "44px",
                    fontSize: "0.875rem",
                    borderColor: "#e2e8f0",
                  }}
                  placeholder="Enter sale price (optional)"
                  value={formData.salePrice}
                  onChange={handleInputChange}
                />
              </div>

              {/* Stock */}
              <div className="col-12 col-md-6">
                <label className="form-label text-dark fw-medium small mb-2">
                  Stock <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  className="form-control rounded-3 border bg-white px-3 shadow-none"
                  style={{
                    height: "44px",
                    fontSize: "0.875rem",
                    borderColor: "#e2e8f0",
                  }}
                  placeholder="Enter stock quantity"
                  value={formData.stock}
                  onChange={handleInputChange}
                />
              </div>

              {/* Brand */}
              <div className="col-12 col-md-6">
                <label className="form-label text-dark fw-medium small mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  className="form-control rounded-3 border bg-white px-3 shadow-none"
                  style={{
                    height: "44px",
                    fontSize: "0.875rem",
                    borderColor: "#e2e8f0",
                  }}
                  placeholder="Enter brand name"
                  value={formData.brand}
                  onChange={handleInputChange}
                />
              </div>

              {/* Description */}
              <div className="col-12">
                <label className="form-label text-dark fw-medium small mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  className="form-control rounded-3 border bg-white p-3 shadow-none"
                  style={{
                    minHeight: "150px",
                    fontSize: "0.875rem",
                    borderColor: "#e2e8f0",
                    resize: "none",
                  }}
                  placeholder="Enter product description..."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE COLUMN: IMAGES & VARIANTS ================= */}
        <div className="col-12 col-xl-4 d-flex flex-column gap-4">
          {/* UPLOAD IMAGES PANEL */}
          <div className="card border-0 rounded-4 shadow-sm bg-white p-4">
            <h5
              className="fw-bold text-dark mb-3"
              style={{ fontSize: "1.05rem" }}
            >
              Product Images
            </h5>

            {/* Drag & Drop Frame Wrapper */}
            <div
              className="border border-2 border-dashed rounded-4 p-4 text-center d-flex flex-column align-items-center justify-content-center mb-3"
              style={{
                borderColor: "#cbd5e1",
                minHeight: "160px",
                background: "#f8fafc",
              }}
            >
              <CloudUploadOutlinedIcon
                className="text-primary mb-2"
                sx={{ fontSize: 32 }}
              />
              <p className="mb-1 text-dark fw-semibold small">
                Drag & drop images here
              </p>
              <p className="mb-2 text-muted small">
                or click to{" "}
                <span
                  className="text-primary fw-medium"
                  style={{ cursor: "pointer" }}
                >
                  browse
                </span>
              </p>
              <span
                className="text-muted extra-small"
                style={{ fontSize: "0.725rem" }}
              >
                (Max 5 images, 5MB each)
              </span>
              <input type="file" className="d-none" multiple accept="image/*" />
            </div>

            {/* Thumbnail Image List Container Grid */}
            <div className="d-flex gap-2 flex-wrap">
              {uploadedImages.map((imgUrl, i) => (
                <div
                  key={i}
                  className="position-relative rounded-3 overflow-hidden border p-1 bg-light"
                  style={{
                    width: "76px",
                    height: "76px",
                    borderColor: "#e2e8f0",
                  }}
                >
                  <img
                    src={imgUrl}
                    alt="preview"
                    className="w-100 h-100 object-fit-cover rounded-2"
                  />
                  <span
                    className="position-absolute top-0 end-0 rounded-circle bg-danger text-white d-flex align-items-center justify-content-center cursor-pointer m-1"
                    style={{
                      width: "16px",
                      height: "16px",
                      fontSize: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 10 }} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* PRODUCT VARIANTS PANEL */}
          <div className="card border-0 rounded-4 shadow-sm bg-white p-4">
            <h5
              className="fw-bold text-dark mb-3"
              style={{ fontSize: "1.05rem" }}
            >
              Product Variants
            </h5>

            {/* Sizes Array Layer */}
            <div className="mb-3">
              <label className="form-label text-muted small fw-medium mb-2">
                Size
              </label>
              <div
                className="form-control d-flex align-items-center flex-wrap gap-2 rounded-3 bg-white border px-3 py-2"
                style={{ minHeight: "44px", borderColor: "#e2e8f0" }}
              >
                {sizes.map((size) => (
                  <span
                    key={size}
                    className="d-inline-flex align-items-center gap-1 bg-light text-dark px-2 py-1 border rounded-2 small fw-medium"
                    style={{ fontSize: "0.775rem", borderColor: "#cbd5e1" }}
                  >
                    {size}
                    <CloseIcon
                      sx={{ fontSize: 12, cursor: "pointer" }}
                      onClick={() => removeSize(size)}
                    />
                  </span>
                ))}
              </div>
            </div>

            {/* Color Swatch Radio Elements Layer */}
            <div>
              <label className="form-label text-muted small fw-medium mb-2">
                Color
              </label>
              <div className="d-flex align-items-center gap-2 py-1">
                {colors.map((color, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`rounded-circle border d-block shadow-none p-0 position-relative ${i === 0 ? "border-primary border-2" : ""}`}
                    style={{
                      width: "24px",
                      height: "24px",
                      background: color.hex,
                      borderColor: color.border ? "#cbd5e1" : "transparent",
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= GLOBAL SUBMISSION FOOTER CTA BAR ================= */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card border-0 rounded-4 shadow-sm bg-white p-3 d-flex flex-row align-items-center justify-content-between">
            {/* Featured Product Checkbox Input */}
            <div className="form-check d-flex align-items-center gap-2 ps-2">
              <input
                className="form-check-input m-0 shadow-none cursor-pointer"
                type="checkbox"
                name="featured"
                id="featuredCheck"
                checked={formData.featured}
                onChange={handleInputChange}
                style={{ width: "18px", height: "18px", cursor: "pointer" }}
              />
              <label
                className="form-check-label text-dark fw-medium small cursor-pointer select-none"
                htmlFor="featuredCheck"
                style={{ userSelect: "none", cursor: "pointer" }}
              >
                Featured Product
              </label>
            </div>

            {/* Layout Actions buttons control matrix */}
            <div className="d-flex gap-3">
              <button
                type="button"
                className="btn border rounded-3 px-4 fw-medium text-secondary shadow-none bg-white"
                onClick={() => navigate("/products")}
                style={{
                  height: "40px",
                  fontSize: "0.875rem",
                  borderColor: "#cbd5e1",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary rounded-3 px-4 fw-medium shadow-none"
                style={{ height: "40px", fontSize: "0.875rem" }}
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
