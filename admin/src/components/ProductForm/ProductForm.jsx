import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloseIcon from "@mui/icons-material/Close";

import ProductColorVariants from "../Color/ProductColorVariants";
import ProductSizeVariants from "../Size/ProductSizeVariants";

import productSchema from "../../validation/productFormSchema";
import CategoryData from "../../assets/dummyData/CatagoryData";

import { API_BASE_URL } from "../../services/authService";
import { productService } from "../../services/productService";

export default function ProductForm({
  initialData = null,
  isEditMode = false,
}) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // ================= STATES =================
  const [sizes, setSizes] = useState(["7", "8", "9", "10"]);
  const [currentSize, setCurrentSize] = useState("M");
  const [selectedColors, setSelectedColors] = useState(["#32a852", "#000000"]);
  const [hsva, setHsva] = useState({ h: 136, s: 70, v: 66, a: 1 });
  const [hexColor, setHexColor] = useState("#32a852");

  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);

  //  images sate
  const [oldImages, setOldImages] = useState([]); //  fatch from DB
  const [newImages, setNewImages] = useState([]); // from file images

  // ================= REACT HOOK FORM =================
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(productSchema),
    mode: "onBlur",
    defaultValues: initialData || {
      isBestSeller: false,
      isNewArrival: false,
      images: [], //
      colors: ["#32a852", "#000000"], // Set matching defaults
      sizes: ["7", "8", "9", "10"], // Set matching defaults
      ...initialData,
    },
  });

  // ================= EDIT MODE =================
  useEffect(() => {
    if (initialData) {
      reset(initialData);
      if (initialData.sizes) setSizes(initialData.sizes);
      if (initialData.colors) setSelectedColors(initialData.colors);
      if (initialData.images) setOldImages(initialData.images);
    }
  }, [initialData, reset]);

  // ================= CATEGORY WATCH =================
  const watchCategory = watch("category");
  const subcategories = watchCategory ? CategoryData[watchCategory] || [] : [];

  //  category & sub category handle
  useEffect(() => {
    if (watchCategory && initialData?.category !== watchCategory) {
      setValue("subcategory", "");
    }
  }, [watchCategory, setValue, initialData]);

  // ================= IMAGE HANDLER =================
  const imagePreviews = [
    ...oldImages,
    ...newImages.map((file) => URL.createObjectURL(file)),
  ];
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length + imagePreviews.length > 4) {
      setValidationErrors((prev) => ({
        ...prev,
        image: "Maximum 4 images allowed",
      }));
      return;
    }

    const updatedFiles = [...newImages, ...files];

    setNewImages(updatedFiles);

    setValue("images", updatedFiles, {
      shouldValidate: true,
    });

    setValidationErrors((prev) => {
      const { image, ...rest } = prev;
      return rest;
    });
  };

  // ================= REMOVE IMAGE =================
  const removeImage = (index) => {
    if (index < oldImages.length) {
      setOldImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - oldImages.length;

      setNewImages((prev) => prev.filter((_, i) => i !== newIndex));
    }
  };

  // ================= COLOR & SIZE VALIDATION =================
  // Keep React Hook Form dynamically synced with your custom variant states
  useEffect(() => {
    setValue("images", newImages, {
      shouldValidate: true,
    });
  }, [newImages, setValue]);
  useEffect(() => {
    setValue("sizes", sizes, { shouldValidate: true });
  }, [sizes, setValue]);

  useEffect(() => {
    setValue("colors", selectedColors, { shouldValidate: true });
  }, [selectedColors, setValue]);

  const validateColorsSizes = () => {
    const newErrors = {};
    if (!selectedColors.length)
      newErrors.colors = "Please add at least one color";
    if (!sizes.length) newErrors.sizes = "Please add at least one size";
    return newErrors;
  };

  // ================= SUBMIT =================
  const onSubmit = async (data) => {
    console.log("FORM SUBMITTED");
    console.log(data);

    const colorSizeErrors = validateColorsSizes();
    if (Object.keys(colorSizeErrors).length > 0) {
      setValidationErrors(colorSizeErrors);
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", data.name?.trim());
      formData.append("brand", data.brand?.trim());
      formData.append("description", data.description?.trim() || "");
      formData.append("oldPrice", data.oldPrice);
      formData.append("newPrice", data.newPrice);
      formData.append("stock", data.stock);
      formData.append("colors", JSON.stringify(selectedColors));
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("category", data.category);
      formData.append("subcategory", data.subcategory);
      formData.append("isBestSeller", data.isBestSeller || false);
      formData.append("isNewArrival", data.isNewArrival || false);

      newImages.forEach((file, index) => {
        formData.append(`image${index + 1}`, file);
      });

      console.log("Sending API request...");
      console.log(formData);

      const response = isEditMode
        ? await productService.update(initialData?._id, formData)
        : await productService.create(formData);

      if (response.data.success) {
        toast.success(response.data.message);
        resetAllState();
        navigate("/products");
      } else {
        toast.error(response.data.message);
      }

      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ================= RESET =================
  const resetAllState = () => {
    reset();
    setOldImages([]);
    setNewImages([]);
    setValidationErrors({});
    setSizes(["7", "8", "9", "10"]);
    setSelectedColors(["#32a852", "#000000"]);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (err) =>
        console.log("Zod Validation Errors:", err),
      )}
      className="row g-4"
    >
      {/* LEFT SIDE COLUMN: IMAGES & VARIANTS */}
      <div className="col-md-4 d-flex flex-column gap-4">
        <div className="card border-0 rounded-4 shadow-sm bg-white p-4">
          <h5
            className="fw-bold text-dark mb-3"
            style={{ fontSize: "1.05rem" }}
          >
            {isEditMode ? "Edit Product Images" : "Product Images"}
          </h5>

          <div
            className="border border-2 border-dashed rounded-4 p-4 text-center d-flex flex-column align-items-center justify-content-center mb-3 position-relative"
            style={{
              borderColor: "#cbd5e1",
              minHeight: "160px",
              background: "#f8fafc",
              cursor: "pointer",
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <CloudUploadOutlinedIcon
              className="text-primary mb-2"
              sx={{ fontSize: 32 }}
            />
            <p className="mb-1 text-dark fw-semibold small">
              Drag & drop images here
            </p>
            <p className="mb-2 text-muted small">
              or click to <span className="text-primary fw-medium">browse</span>
            </p>
            <span
              className="text-muted extra-small"
              style={{ fontSize: "0.725rem" }}
            >
              (Max 4 images, 5MB each)
            </span>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="d-none"
              onChange={handleFileChange}
            />
          </div>

          {validationErrors.image && (
            <div className="alert alert-danger small py-2 px-3 mb-3">
              {validationErrors.image}
            </div>
          )}

          <div className="d-flex gap-2 flex-wrap">
            {imagePreviews.map((imgUrl, i) => (
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
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
                <span
                  className="position-absolute top-0 end-0 rounded-circle bg-danger text-white d-flex align-items-center justify-content-center cursor-pointer m-1"
                  style={{ width: "16px", height: "16px", fontSize: "10px" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(i);
                  }}
                >
                  <CloseIcon sx={{ fontSize: 10 }} />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sizes Component */}
        <div className="card border-0 rounded-4 shadow-sm bg-white p-4 d-flex flex-column gap-4">
          <h5
            className="fw-bold text-dark mb-1"
            style={{ fontSize: "1.05rem" }}
          >
            Product Variants
          </h5>
          <div>
            <label className="form-label text-secondary small fw-medium mb-2">
              Size
            </label>
            <ProductSizeVariants
              selectedSizes={sizes}
              setSelectedSizes={setSizes}
              currentSize={currentSize}
              setCurrentSize={setCurrentSize}
            />
            {validationErrors.sizes && (
              <small className="text-danger d-block mt-2">
                {validationErrors.sizes}
              </small>
            )}
          </div>
        </div>
      </div>

      {/* MIDDLE SIDE COLUMN: COLOR INFORMATION */}
      <div className="col-md-4">
        <div className="card border-0 rounded-4 shadow-sm bg-white p-4 d-flex flex-column gap-4">
          <h5 className="fw-bold text-dark" style={{ fontSize: "1.05rem" }}>
            Product Colors
          </h5>
          <div>
            <label className="form-label text-secondary small fw-medium">
              Color
            </label>
            <ProductColorVariants
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              hsva={hsva}
              setHsva={setHsva}
              hexColor={hexColor}
              setHexColor={setHexColor}
            />
            {validationErrors.colors && (
              <small className="text-danger d-block mt-2">
                {validationErrors.colors}
              </small>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE COLUMN: PRODUCT INFORMATION */}
      <div className="col-md-4">
        <div className="card border-0 rounded-4 shadow-sm bg-white p-4">
          <h5
            className="fw-bold text-dark mb-4"
            style={{ fontSize: "1.05rem" }}
          >
            Product Information
          </h5>
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <label className="form-label text-dark fw-medium small mb-2">
                Product Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control rounded-3 border bg-white px-3 shadow-none"
                style={{
                  height: "44px",
                  fontSize: "0.875rem",
                  borderColor: errors.name ? "#dc3545" : "#e2e8f0",
                }}
                placeholder="Enter product name"
                {...register("name")}
              />
              {errors.name && (
                <small className="text-danger">{errors.name.message}</small>
              )}
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label text-dark fw-medium small mb-2">
                Brand Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control rounded-3 border bg-white px-3 shadow-none"
                style={{
                  height: "44px",
                  fontSize: "0.875rem",
                  borderColor: errors.brand ? "#dc3545" : "#e2e8f0",
                }}
                placeholder="Enter Brand name"
                {...register("brand")}
              />
              {errors.brand && (
                <small className="text-danger">{errors.brand.message}</small>
              )}
            </div>

            <div className="col-12">
              <label className="form-label text-dark fw-medium small mb-2">
                Description
              </label>
              <textarea
                className="form-control rounded-3 border bg-white p-3 shadow-none"
                style={{
                  minHeight: "150px",
                  fontSize: "0.875rem",
                  borderColor: "#e2e8f0",
                  resize: "none",
                }}
                placeholder="Enter product description..."
                {...register("description")}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label text-dark fw-medium small mb-2">
                Category <span className="text-danger">*</span>
              </label>
              <select
                className="form-select rounded-3 border bg-white px-3 shadow-none text-muted"
                style={{
                  height: "44px",
                  fontSize: "0.875rem",
                  borderColor: errors.category ? "#dc3545" : "#e2e8f0",
                  cursor: "pointer",
                }}
                {...register("category")}
              >
                <option value="">Select category</option>
                {Object.keys(CategoryData).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <small className="text-danger">{errors.category.message}</small>
              )}
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label text-dark fw-medium small mb-2">
                Sub-Category <span className="text-danger">*</span>
              </label>
              <select
                className="form-select rounded-3 border bg-white px-3 shadow-none text-muted"
                style={{
                  height: "44px",
                  fontSize: "0.875rem",
                  borderColor: errors.subcategory ? "#dc3545" : "#e2e8f0",
                  cursor: "pointer",
                }}
                {...register("subcategory")}
              >
                <option value="">Select sub-category</option>
                {subcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
              {errors.subcategory && (
                <small className="text-danger">
                  {errors.subcategory.message}
                </small>
              )}
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label text-dark fw-medium small mb-2">
                Price <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control rounded-3 border bg-white px-3 shadow-none"
                style={{
                  height: "44px",
                  fontSize: "0.875rem",
                  borderColor: errors.oldPrice ? "#dc3545" : "#e2e8f0",
                }}
                placeholder="Enter price"
                {...register("oldPrice", { valueAsNumber: true })}
              />
              {errors.oldPrice && (
                <small className="text-danger">{errors.oldPrice.message}</small>
              )}
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label text-dark fw-medium small mb-2">
                Selling Price <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control rounded-3 border bg-white px-3 shadow-none"
                style={{
                  height: "44px",
                  fontSize: "0.875rem",
                  borderColor: errors.newPrice ? "#dc3545" : "#e2e8f0",
                }}
                placeholder="Enter Selling price"
                {...register("newPrice", { valueAsNumber: true })}
              />
              {errors.newPrice && (
                <small className="text-danger">{errors.newPrice.message}</small>
              )}
            </div>

            <div className="col-12 col-xl-5">
              <label className="form-label text-dark fw-medium small mb-2">
                Stock <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control rounded-3 border bg-white px-3 shadow-none"
                style={{
                  height: "44px",
                  fontSize: "0.875rem",
                  borderColor: errors.stock ? "#dc3545" : "#e2e8f0",
                }}
                placeholder="Enter Stocks"
                {...register("stock", { valueAsNumber: true })}
              />
              {errors.stock && (
                <small className="text-danger">{errors.stock.message}</small>
              )}
            </div>

            <div className="col-12 col-xl-7 d-flex flex-row flex-wrap align-items-center justify-content-start gap-3 pt-xl-4 mt-xl-2">
              <div className="form-check form-switch m-0 d-flex align-items-center text-nowrap">
                <input
                  className="form-check-input shadow-none m-0"
                  type="checkbox"
                  id="isBestSeller"
                  style={{ width: "45px", height: "22px", cursor: "pointer" }}
                  {...register("isBestSeller")}
                />
                <label
                  className="form-check-label text-dark fw-medium small ms-2"
                  htmlFor="isBestSeller"
                  style={{ cursor: "pointer" }}
                >
                  Best Seller
                </label>
              </div>

              <div className="form-check form-switch m-0 d-flex align-items-center text-nowrap">
                <input
                  className="form-check-input shadow-none m-0"
                  type="checkbox"
                  id="isNewArrival"
                  style={{ width: "45px", height: "22px", cursor: "pointer" }}
                  {...register("isNewArrival")}
                />
                <label
                  className="form-check-label text-dark fw-medium small ms-2"
                  htmlFor="isNewArrival"
                  style={{ cursor: "pointer" }}
                >
                  New Arrival
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GLOBAL SUBMISSION FOOTER CTA BAR */}
      <div className="col-12">
        <div className="card border-0 rounded-4 shadow-sm bg-white p-3 d-flex flex-row align-items-center justify-content-end gap-3">
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
            disabled={loading}
            className="btn btn-primary rounded-3 px-4 fw-medium shadow-none"
            style={{ height: "40px", fontSize: "0.875rem" }}
          >
            {loading
              ? "Processing..."
              : isEditMode
                ? "Update Product"
                : "Save Product"}
          </button>
        </div>
      </div>
    </form>
  );
}
