import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Material UI Icons for Update View Form Modules
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { productService } from "../../services/productService";
import ProductForm from "../../components/ProductForm/ProductForm";

export default function UpdateProduct() {
  // const navigate = useNavigate();
  const { id } = useParams(); // <-- Collects the target Product ID explicitly from the URL path string
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState([]);

  // fatch data from db
  const getProductData = async () => {
    try {
      setIsLoading(true);
      const response = await productService.getById(id);
      console.log(response.data.product);
      setProductData(response.data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getProductData();
  }, []);

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
    <>
      <ProductForm initialData={productData} isEditMode={true} />
    </>
  );
}
