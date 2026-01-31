import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Rating from "@mui/material/Rating";
import RelatedProduct from "../components/RelatedProduct";

export default function Product() {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [productImg, setProductImg] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);

  const findProduct = () => {
    if (!products.length) return;

    const product = products.find(
      (item) => String(item._id) === String(productId),
    );

    if (product) {
      setProductData(product);
      setProductImg(product.image?.[0] || "");
    }
  };

  useEffect(() => {
    findProduct();
  }, [productId, products]);

  return (
    <div>
      {productData ? (
        <div className="mt-3">
          <div className=" row g-5">
            {/* left image */}
            <div className="col-md-6">
              <div className="row">
                {/* Main Image */}
                <div className="col-12 col-md-10 order-1 order-md-2 position-relative">
                  <div className="position-absolute top-0 start-0 m-2 d-flex flex-column gap-2">
                    {productData.isBestSeller && (
                      <span className="badge bg-danger px-3 py-2 shadow">
                        Best Seller
                      </span>
                    )}

                    {productData.isNewArrival && (
                      <span className="badge bg-success px-3 py-2 shadow">
                        New Arrival
                      </span>
                    )}
                  </div>

                  <img
                    src={productImg}
                    alt={productData.name}
                    className="img-fluid border rounded w-100"
                    style={{
                      height: "70vh",
                      maxHeight: "800px",
                      maxWidth: "550px",
                      // objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                </div>

                {/* Thumbnails */}
                <div className="col-12 col-md-2 order-2 order-md-1 mt-3 mt-md-0">
                  <div className="d-flex d-md-block gap-2">
                    {productData.image?.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt=""
                        className="img-thumbnail"
                        style={{ width: "80px", cursor: "pointer" }}
                        onClick={() => setProductImg(img)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Product Info */}

            {/* RIGHT: Product Info */}
            <div className="col-md-6">
              <h2 className="fw-bold my-2">{productData.name}</h2>

              <p className="text-muted mb-1">
                Brand: <strong>{productData.brand}</strong>
              </p>

              <p className="text-muted">
                Category: {productData.category} / {productData.subcategory}
              </p>

              {/* Rating */}
              <div className="d-flex align-items-center mb-3">
                <Rating
                  name="rating-read"
                  value={productData.rating}
                  precision={0.1}
                  readOnly
                />
                <span className="text-muted ms-2">({productData.rating})</span>
              </div>

              {/* Price */}
              <div className="mb-3">
                <span className="fs-3 fw-bold text-danger">
                  ₹{productData.newPrice}
                </span>
                <span className="text-muted text-decoration-line-through ms-2">
                  ₹{productData.oldPrice}
                </span>
                <span className="text-success ms-2">
                  (
                  {Math.round(
                    ((productData.oldPrice - productData.newPrice) /
                      productData.oldPrice) *
                      100,
                  )}
                  % OFF)
                </span>
              </div>

              {/* Stock */}
              <div className="d-flex gap-4">
                {" "}
                <span
                  className={`fw-semibold ${productData.stock > 10 ? "text-success" : "text-danger"}`}
                >
                  {productData.stock}
                </span>
                <p
                  className={`fw-semibold ${productData.stock > 0 ? "text-success" : "text-danger"}`}
                >
                  {productData.stock > 0
                    ? "___In Stock"
                    : "___Out of Stock"}{" "}
                </p>
              </div>

              {/* Description */}
              <p className="text-muted">{productData.description}</p>

              {/* Sizes */}
              <div className="mb-3">
                <h6 className="fw-bold">Select Size</h6>
                {productData.sizes.map((size) => (
                  <button
                    key={size}
                    className={`btn me-2 mb-2 ${
                      selectedSize === size ? "btn-dark" : "btn-outline-dark"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Add to Cart */}
              <button
                className="btn btn-dark px-4"
                disabled={!selectedSize}
                onClick={() => addToCart(productData._id, selectedSize)}
              >
                {selectedSize ? "Add to Cart" : "Select Size"}
              </button>

              <hr className="my-4" />

              {/* Product Info */}
              <div className="text-muted">
                <p>✔ 100% Original Product</p>
                <p>✔ Cash on Delivery Available</p>
                <p>✔ 7 Days Easy Return & Exchange</p>
              </div>
            </div>
          </div>
          <div className="text-muted mt-5 pt-5 border rounded-3">
            <div className="d-flex">
              <div className="fw-5 border btn ms-2">Description</div>
              <div className="fw-5 border btn ms-2">{productData.rating}</div>
            </div>

            <p className="p-2">
              This high-quality product is designed to deliver both comfort and
              durability for everyday use. Crafted with premium materials, it
              offers a perfect balance of style and functionality. Suitable for
              daily wear, it ensures long-lasting performance while maintaining
              a modern look.
            </p>
            <ul className="ms-3">
              <li> Premium quality material</li>

              <li>Comfortable and breathable design</li>

              <li>Durable and long-lasting</li>

              <li>Modern fit for everyday use</li>

              <li>Easy to maintain</li>
            </ul>
          </div>

          <RelatedProduct
            category={productData.category}
            subcategory={productData.subcategory}
            _id={productData._id}
          />
        </div>
      ) : (
        <div
          className="d-flex flex-column justify-content-center align-items-center text-center"
          style={{ minHeight: "100vh" }}
        >
          <h2 className="text-danger display-4">Product Not Found 😞</h2>
          <p className="fs-5">
            The product you are looking for does not exist or has been removed.
          </p>
          <a href="/collection" className="btn btn-dark mt-3">
            Go Back to Products
          </a>
        </div>
      )}
    </div>
  );
}
