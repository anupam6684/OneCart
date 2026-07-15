import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { productService } from "../../services/productService";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ProductsTable() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  //  all products
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  // fatch products data from DB
  const fatchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll();
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // search products
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?",
      );

      if (!confirmDelete) return;

      const response = await productService.delete(id);

      if (response.data.success) {
        toast.success(response.data.msg);

        setProducts((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  // edit product
  useEffect(() => {
    fatchProducts();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }
  return (
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              <th className="border-bottom pb-3">Collors</th>
              <th className="border-bottom pb-3">Brand</th>
              <th className="border-bottom pb-3">Category</th>
              <th className="border-bottom pb-3"> Sub Category</th>
              <th className="border-bottom pb-3"> Main Price</th>
              <th className="border-bottom pb-3"> Selling Price</th>
              <th className="border-bottom pb-3">Stock</th>
              <th className="border-bottom pb-3">Best Seller</th>
              <th className="border-bottom pb-3">New Arrival</th>
              <th
                className="border-bottom pb-3 text-end"
                style={{ width: "120px" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "0.9rem" }}>
            {filteredProducts.map((product, idx) => (
              <tr key={idx}>
                <td className="text-muted py-3">{idx + 1}</td>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={product.image?.[0] || "./image.jpg"}
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
                        {product.description}
                      </span>
                      <h6
                        className=" fw-semibold text-muted"
                        style={{ fontSize: "0.875rem" }}
                      >
                        {product.sizes.join(",")}
                      </h6>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex gap-1">
                    {product.colors?.map((color, index) => (
                      <span
                        key={index}
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          backgroundColor: color,
                          border: "1px solid #ddd",
                          display: "inline-block",
                        }}
                      />
                    ))}
                  </div>
                </td>
                <td className="text-muted">{product.brand}</td>
                <td className="text-muted">{product.category}</td>
                <td className="text-muted">{product.subcategory}</td>
                <td className="fw-semibold text-dark">₹{product.oldPrice}</td>
                <td className="fw-semibold text-dark">₹{product.newPrice}</td>

                <td className="text-muted">{product.stock}</td>

                <td>
                  <span
                    className="badge rounded-2 border-0 fw-medium px-2 py-1"
                    style={{
                      fontSize: "0.75rem",
                      backgroundColor: product.isBestSeller
                        ? "#ecfdf5"
                        : "#fef2f2",
                      color: product.isBestSeller ? "#10b981" : "#ef4444",
                    }}
                  >
                    {product.isBestSeller ? "Best Seller" : "Normal"}
                  </span>
                </td>
                <td>
                  <span
                    className="badge rounded-2 border-0 fw-medium px-2 py-1"
                    style={{
                      fontSize: "0.75rem",
                      backgroundColor: product.isNewArrival
                        ? "#ecfdf5"
                        : "#fef2f2",
                      color: product.isNewArrival ? "#10b981" : "#ef4444",
                    }}
                  >
                    {product.isNewArrival ? "YES" : "NO"}
                  </span>
                </td>
                <td className="text-end">
                  <div className="d-inline-flex gap-3">
                    <button
                      className="btn p-2 border rounded-3 text-primary bg-light-hover d-flex align-items-center shadow-none"
                      onClick={() => navigate(`/products/${product._id}/edit`)}
                      style={{ borderColor: "#e2e8f0" }}
                    >
                      <EditOutlinedIcon sx={{ fontSize: 16 }} />
                    </button>
                    <button
                      className="btn p-2 border rounded-3 text-danger bg-light-hover d-flex align-items-center shadow-none"
                      style={{ borderColor: "#e2e8f0" }}
                      onClick={() => {
                        handleDelete(product._id);
                      }}
                    >
                      <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                    </button>
                    <button
                      className="btn p-2 border rounded-3 text-success bg-light-hover d-flex align-items-center shadow-none"
                      style={{ borderColor: "#e2e8f0" }}
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      <VisibilityIcon sx={{ fontSize: 16 }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* { 4. FOOTER PAGINATION CONTEXT CONTROLS PANEL */}
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
  );
}
