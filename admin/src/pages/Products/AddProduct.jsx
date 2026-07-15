import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ProductColorVariants from "../../components/Color/ProductColorVariants";
import ProductSizeVariants from "../../components/Size/ProductSizeVariants";
import ProductForm from "../../components/ProductForm/ProductForm";

export default function AddProduct() {
  const navigate = useNavigate();

  // Primary Form Fields State Matrix
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

  const [sizes, setSizes] = useState(["7", "8", "9", "10"]);
  const [currentSize, setCurrentSize] = useState("M");

  // Shared Color Picker States (Lifted up so the parent form can submit them)
  const [selectedColors, setSelectedColors] = useState(["#32a852", "#000000"]);
  const [hsva, setHsva] = useState({ h: 136, s: 70, v: 66, a: 1 });
  const [hexColor, setHexColor] = useState("#32a852");

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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const finalProductPayload = {
      ...formData,
      sizes: sizes,
      colors: selectedColors, // Sent cleanly as ["#32a852", "#000000"]
    };

    console.log(
      "Submitting form payload package to backend API:",
      finalProductPayload,
    );
    // await axios.post(backendUrl + "/api/product/add", finalProductPayload);
    navigate("/products");
  };

  return (
    <div
      className="container-fluid p-0"
      style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#f8fafc" }}
    >
      <ProductForm />
    </div>
  );
}
