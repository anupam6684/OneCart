import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Material UI Icons for Update View Form Modules
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

export default function UpdateProduct() {
  // const navigate = useNavigate();
  const { id } = useParams(); // <-- Collects the target Product ID explicitly from the URL path string

  // Controlled Form State Management Matrix
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    discountPrice: "",
    stock: "",
    status: "Active",
    img: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  // Simulation Frame to mock API data fetching hook using the URL parameter identity
  useEffect(() => {
    console.log(
      `Fetching structural entity item record details for Product ID: ${id}`,
    );

    // Simulating database collection response loop delay
    const timer = setTimeout(() => {
      // Dummy baseline mock mapping directly to the data grid sample layers
      setProductData({
        name: "Nike Air Max 270",
        description:
          "Premium quality sneakers featuring lightweight engineered mesh matrix systems and wrap-around Max Air cushioning windows for pure high-performance responsiveness.",
        category: "Shoes",
        price: "6499",
        discountPrice: "5999",
        stock: "50",
        status: "Active",
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
      });
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `Pushing modification payload bundle for ID ${id}:`,
      productData,
    );
    // After handling API update transactions safely, return back to layout grid:
    // navigate("/products");
  };

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading product records...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container-fluid p-0"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* 1. TOP HEADER NAVIGATION TOOLBAR */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <button
          className="btn border bg-white p-2 rounded-3 d-flex align-items-center justify-content-center shadow-none"
          // onClick={() => navigate("/products")}
          style={{ borderColor: "#e2e8f0", width: "40px", height: "40px" }}
        >
          <ArrowBackIcon sx={{ fontSize: 18, color: "#64748b" }} />
        </button>
        <div>
          <h4
            className="fw-bold text-dark mb-0"
            style={{ letterSpacing: "-0.02em" }}
          >
            Edit Product
          </h4>
          <span className="text-muted small" style={{ fontSize: "0.825rem" }}>
            Modify inventory specifications and price matching models for SKU #
            {id}
          </span>
        </div>
      </div>

      {/* 2. CORE WORKSPACE FORM ENGINE */}
      <form onSubmit={handleSubmit} className="row g-4">
        {/* LEFT COMPONENT DATA CARD WRAPPER */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 rounded-4 shadow-sm bg-white p-4 d-flex flex-column gap-4">
            {/* Input Element: Name */}
            <div>
              <label className="form-label fw-medium text-dark small mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control rounded-3 px-3 shadow-none bg-light border-0"
                style={{ height: "44px", fontSize: "0.9rem" }}
                value={productData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Input Element: Description Textarea Box */}
            <div>
              <label className="form-label fw-medium text-dark small mb-2">
                Product Description
              </label>
              <textarea
                name="description"
                className="form-control rounded-3 p-3 shadow-none bg-light border-0"
                style={{ minHeight: "140px", fontSize: "0.9rem" }}
                value={productData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* DUAL COHORT COST INTERFACE GRID */}
            <div className="row g-3">
              <div className="col-12 col-sm-6">
                <label className="form-label fw-medium text-dark small mb-2">
                  Regular Price (INR)
                </label>
                <div
                  className="input-group bg-light rounded-3 px-2 align-items-center"
                  style={{ height: "44px" }}
                >
                  <CurrencyRupeeIcon
                    className="text-muted ms-1 me-1"
                    sx={{ fontSize: 16 }}
                  />
                  <input
                    type="number"
                    name="price"
                    className="form-control border-0 p-0 bg-transparent shadow-none"
                    style={{ fontSize: "0.9rem" }}
                    value={productData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <label className="form-label fw-medium text-dark small mb-2">
                  Discount Price (INR)
                </label>
                <div
                  className="input-group bg-light rounded-3 px-2 align-items-center"
                  style={{ height: "44px" }}
                >
                  <CurrencyRupeeIcon
                    className="text-muted ms-1 me-1"
                    sx={{ fontSize: 16 }}
                  />
                  <input
                    type="number"
                    name="discountPrice"
                    className="form-control border-0 p-0 bg-transparent shadow-none"
                    style={{ fontSize: "0.9rem" }}
                    value={productData.discountPrice}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COMPONENT ASSIGNED SPECIFICS SIDE PANEL */}
        <div className="col-12 col-lg-4">
          <div className="d-flex flex-column gap-4">
            {/* COMPONENT: INTERACTIVE IMAGE PREVIEW / DRAG AREA */}
            <div className="card border-0 rounded-4 shadow-sm bg-white p-4">
              <label className="form-label fw-medium text-dark small mb-3">
                Product Media Image
              </label>

              {productData.img ? (
                <div
                  className="position-relative rounded-4 overflow-hidden mb-2 border"
                  style={{ minHeight: "180px", maxHeight: "220px" }}
                >
                  <img
                    src={productData.img}
                    alt="Preview Target"
                    className="w-100 h-100 object-fit-cover"
                  />
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white opacity-0 bg-dark bg-opacity-70 transition-all custom-layer-hover"
                    style={{ cursor: "pointer", transition: "opacity 0.2s" }}
                    onClick={() =>
                      setProductData((prev) => ({ ...prev, img: "" }))
                    }
                  >
                    <CloudUploadOutlinedIcon sx={{ fontSize: 28, mb: 1 }} />
                    <span className="small fw-semibold">
                      Click to Replace Image
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed rounded-4 d-flex flex-column align-items-center justify-content-center p-4 text-center bg-light-hover"
                  style={{
                    borderColor: "#cbd5e1",
                    minHeight: "180px",
                    cursor: "pointer",
                  }}
                >
                  <CloudUploadOutlinedIcon
                    className="text-primary mb-2"
                    sx={{ fontSize: 36 }}
                  />
                  <span className="fw-semibold text-dark d-block small mb-1">
                    Upload replacements
                  </span>
                  <input type="file" className="d-none" accept="image/*" />
                </div>
              )}
            </div>

            {/* COMPONENT: HARDWARE INVENTORY INJECTIONS LIST */}
            <div className="card border-0 rounded-4 shadow-sm bg-white p-4 d-flex flex-column gap-3">
              {/* Category Drop Selector options frame */}
              <div>
                <label className="form-label fw-medium text-dark small mb-2">
                  Category
                </label>
                <select
                  name="category"
                  className="form-select rounded-3 px-3 shadow-none bg-light border-0"
                  style={{
                    height: "44px",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                  value={productData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Shoes">Shoes</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Bags">Bags</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              {/* Stock Input Box */}
              <div>
                <label className="form-label fw-medium text-dark small mb-2">
                  Inventory Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  className="form-control rounded-3 px-3 shadow-none bg-light border-0"
                  style={{ height: "44px", fontSize: "0.9rem" }}
                  value={productData.stock}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Status Pill Toggle options frame */}
              <div>
                <label className="form-label fw-medium text-dark small mb-2">
                  Visibility Status
                </label>
                <select
                  name="status"
                  className="form-select rounded-3 px-3 shadow-none bg-light border-0"
                  style={{
                    height: "44px",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                  value={productData.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active / Visible</option>
                  <option value="Inactive">Draft / Hidden</option>
                </select>
              </div>
            </div>

            {/* ACTIONS PANEL TRIGGERS TOOLBAR FOOTER */}
            <div className="d-flex align-items-center gap-3">
              <button
                type="button"
                className="btn border text-secondary bg-white w-50 rounded-3 shadow-none fw-medium"
                // onClick={() => navigate("/products")}
                style={{
                  height: "46px",
                  borderColor: "#e2e8f0",
                  fontSize: "0.9rem",
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary w-50 rounded-3 shadow-none fw-medium d-flex align-items-center justify-content-center gap-2"
                style={{ height: "46px", fontSize: "0.9rem" }}
              >
                <SaveOutlinedIcon sx={{ fontSize: 18 }} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Embedded CSS Injection layer specifically to handle the dynamic media preview hovered overlay mask cleanly */}
      <style>{`
        .custom-layer-hover:hover {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
