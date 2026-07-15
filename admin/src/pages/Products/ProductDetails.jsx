import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaStar,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaImage,
} from "react-icons/fa";
import { productService } from "../../services/productService";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Fallback placeholder image in case product image array is empty
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23ccc' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='3' width='18' height='18' rx='2' ry='2'></rect><circle cx='8.5' cy='8.5' r='1.5'></circle><polyline points='21 15 16 10 5 21'></polyline></svg>";

const ProductDetails = () => {
  const [Product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?",
      );

      if (!confirmDelete) return;

      const response = await productService.delete(id);

      if (response.data.success) {
        toast.success(response.data.msg);
        navigate("/products");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getById(id);

        if (response.data.success) {
          const productData = response.data.product;
          setProduct(productData);

          if (productData?.image && productData.image.length > 0) {
            setSelectedImage(productData.image[0]);
          } else {
            setSelectedImage(PLACEHOLDER_IMAGE);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center py-5"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!Product) {
    return (
      <div className="container py-5 text-center">
        <h4 className="text-muted">Product details could not be found.</h4>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  const hasImages = Array.isArray(Product.image) && Product.image.length > 0;
  const imageList = hasImages ? Product.image : [PLACEHOLDER_IMAGE];
  const currentMainImage = selectedImage || imageList[0];

  return (
    <div className="container-fluid py-4">
      {/* Top Action Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-light shadow-sm rounded-circle"
            style={{ width: 45, height: 45 }}
            onClick={() => navigate("/products")}
          >
            <FaArrowLeft />
          </button>
          <div>
            <h2 className="fw-bold mb-0">
              {Product.name || "Product Details"}
            </h2>
            <small className="text-muted">
              Product ID :{" "}
              <span className="ms-1 fw-semibold">
                {Product._id ? Product._id : "N/A"}
              </span>
            </small>
          </div>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-primary px-4 shadow-sm"
            onClick={() => navigate(`/products/${Product._id}/edit`)}
          >
            <FaEdit className="me-2" /> Edit
          </button>
          <button
            className="btn btn-outline-danger px-4 shadow-sm"
            onClick={() => handleDelete(Product._id)}
          >
            <FaTrash className="me-2" /> Delete
          </button>
        </div>
      </div>

      {/* Unified Master Card (Single Page Component Container) */}
      <div className="card border-0 shadow rounded-4 overflow-hidden">
        <div className="row g-0">
          {/* Left Layout Pane: Interactive Media Window */}
          <div className="col-lg-5 bg-light d-flex flex-column justify-content-between p-4 border-end">
            <div
              className="d-flex align-items-center justify-content-center bg-white rounded-4 shadow-sm overflow-hidden position-relative w-100"
              style={{ height: "450px" }}
            >
              <img
                src={currentMainImage}
                alt={Product.name}
                className="img-fluid"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: hasImages ? "cover" : "contain",
                  padding: hasImages ? "0" : "2rem",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = PLACEHOLDER_IMAGE;
                  e.target.style.objectFit = "contain";
                }}
              />
              {!hasImages && (
                <div className="position-absolute bottom-0 mb-3 text-muted small">
                  <FaImage className="me-1" /> No image uploaded
                </div>
              )}
            </div>

            {/* Thumbnail Selection Carousel */}
            {hasImages && imageList.length > 1 && (
              <div className="d-flex gap-2 justify-content-center flex-wrap mt-4">
                {imageList.map((img, index) => {
                  const isActive = currentMainImage === img;
                  return (
                    <img
                      key={index}
                      src={img}
                      alt=""
                      className={`rounded border bg-white ${isActive ? "border-primary border-2 shadow-sm" : ""}`}
                      onClick={() => setSelectedImage(img)}
                      style={{
                        width: 75,
                        height: 75,
                        objectFit: "cover",
                        cursor: "pointer",
                        opacity: isActive ? 1 : 0.6,
                        transition: "all 0.15s ease-in-out",
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Layout Pane: Specifications & Metadata Info Sheet */}
          <div className="col-lg-7 bg-white p-4">
            {/* Context Header info */}
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
              <div>
                <h3 className="fw-bold mb-1">{Product.name}</h3>
                <div className="d-flex align-items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        star <= Math.round(Product.rating || 0)
                          ? "text-warning"
                          : "text-secondary"
                      }
                      size={14}
                    />
                  ))}
                  <span className="ms-2 text-muted small">
                    ({Product.rating || "0.0"})
                  </span>
                </div>
              </div>
            </div>

            {/* Financial Breakdown Block */}
            <div className="d-flex align-items-center gap-3 mb-4 bg-light p-3 rounded-3">
              <h2 className="text-success fw-bold mb-0">
                ₹{Product.newPrice || 0}
              </h2>
              {Product.oldPrice && Product.oldPrice > Product.newPrice && (
                <>
                  <h5 className="text-decoration-line-through text-muted mb-0">
                    ₹{Product.oldPrice}
                  </h5>
                  <span className="badge bg-danger rounded-pill px-2.5 py-1.5 fs-7">
                    {Math.round(
                      ((Product.oldPrice - Product.newPrice) /
                        Product.oldPrice) *
                        100,
                    )}
                    % OFF
                  </span>
                </>
              )}
            </div>

            {/* Core Properties Structural Grid */}
            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <span className="text-muted d-block small">Brand</span>
                <strong className="text-dark">{Product.brand || "—"}</strong>
              </div>
              <div className="col-sm-6">
                <span className="text-muted d-block small">Category</span>
                <strong className="text-dark">{Product.category || "—"}</strong>
              </div>
              <div className="col-sm-6">
                <span className="text-muted d-block small">Sub Category</span>
                <strong className="text-dark">
                  {Product.subcategory || "—"}
                </strong>
              </div>
              <div className="col-sm-6">
                <span className="text-muted d-block small">
                  Stock Fulfillment
                </span>
                <strong
                  className={Product.stock > 0 ? "text-success" : "text-danger"}
                >
                  <FaCheckCircle className="me-1" />
                  {Product.stock > 0
                    ? `${Product.stock} Available`
                    : "Out of Stock"}
                </strong>
              </div>
            </div>

            {/* Display Promotion Pill Badges if active */}
            {(Product.isBestSeller || Product.isNewArrival) && (
              <div className="mb-4 d-flex gap-2">
                {Product.isBestSeller && (
                  <span className="badge bg-success px-3 py-2 rounded-pill">
                    🔥 Best Seller
                  </span>
                )}
                {Product.isNewArrival && (
                  <span className="badge bg-primary px-3 py-2 rounded-pill">
                    ✨ New Arrival
                  </span>
                )}
              </div>
            )}

            {/* Color Swatches Grid */}
            {Product.colors && Product.colors.length > 0 && (
              <div className="mb-4">
                <h6 className="fw-bold text-secondary mb-2">
                  Available Colors
                </h6>
                <div className="d-flex gap-3 flex-wrap">
                  {Product.colors.map((color, index) => (
                    <div key={index} className="text-center">
                      <div
                        title={color}
                        className="rounded-circle shadow-sm border mx-auto"
                        style={{
                          width: 35,
                          height: 35,
                          backgroundColor: color,
                          border:
                            color.toUpperCase() === "#FFFFFF" ||
                            color.toLowerCase() === "white"
                              ? "2px solid #aaa"
                              : "1px solid #ddd",
                        }}
                      ></div>
                      <small
                        className="text-muted d-block mt-1 xx-small"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {color}
                      </small>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Size Configuration Badges */}
            {Product.sizes && Product.sizes.length > 0 && (
              <div className="mb-4">
                <h6 className="fw-bold text-secondary mb-2">Available Sizes</h6>
                <div className="d-flex gap-2 flex-wrap">
                  {Product.sizes.map((size, index) => (
                    <span
                      key={index}
                      className="badge bg-light text-dark border px-3 py-2 fs-7 fw-semibold"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Narrative Description Container Block */}
            <div className="mb-4">
              <h6 className="fw-bold text-secondary mb-2">
                Product Description
              </h6>
              <div
                className="bg-light rounded-3 p-3 text-muted small lh-base"
                style={{ whiteSpace: "pre-line" }}
              >
                {Product.description ||
                  "No product catalog overview description provided."}
              </div>
            </div>

            {/* System Status Log Footer Bar */}
            <hr className="text-muted opacity-25 my-4" />
            <div className="row g-2 text-muted small">
              <div className="col-sm-6">
                <span>Created On:</span>{" "}
                <span className="fw-semibold text-dark">
                  {Product.date
                    ? new Date(Product.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "—"}
                </span>
              </div>
              <div className="col-sm-6">
                <span>Product Status:</span>{" "}
                <span
                  className={`badge ${Product.stock > 0 ? "bg-success" : "bg-danger"} ms-1`}
                >
                  {Product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
