import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Rating from "@mui/material/Rating";
import RelatedProduct from "../components/RelatedProduct";

export default function Product() {
  const { productId } = useParams();
  const { products } = useContext(ShopContext);

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
                <div className="col-12 col-md-10 order-1 order-md-2">
                  <img
                    src={productImg}
                    alt={productData.name}
                    className="img-fluid border rounded w-100"
                    style={{
                      height: "70vh",
                      maxHeight: "800px",
                      maxWidth: "700px",

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

            <div className="col-6">
              <h2 className="fw-bold my-3">{productData.name}</h2>

              {/* Rating */}
              <p className="text-warning mb-3 d-flex">
                <Rating
                  name="half-rating-read"
                  defaultValue={productData.rating}
                  precision={0.1}
                  readOnly
                />
                <span className="text-muted fs-6">({productData.rating})</span>
              </p>
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
              {/* Description */}
              <p className="text-muted">{productData.description}</p>

              {/* Sizes */}
              <div className="mb-3">
                <h6 className="fw-bold">Select Size</h6>

                {productData.sizes?.map((size, index) => (
                  <button
                    key={index}
                    className={`btn  me-2 ${
                      selectedSize === size
                        ? "btn-dark text-white"
                        : "btn-outline-dark"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}

                {!selectedSize && (
                  <p className="text-danger mt-2">Please select a size</p>
                )}
              </div>

              {/* Buttons */}
              <div className="d-flex gap-3 my-4">
                <button className="btn btn-dark px-4">Add to Cart</button>
              </div>
              <hr />
              {/* notice */}
              <div className="text-muted my-5">
                <p>100% Original product.</p>
                <p> Cash on delivery is available on this product.</p>
                <p> Easy return and exchange policy within 7 days.</p>
              </div>
            </div>
          </div>
          <div className="text-muted mt-5 pt-5 border rounded-3">
            <div className="d-flex">
              <div className="fw-5 border btn ms-2">Description</div>
              <div className="fw-5 border btn ms-2">{productData.rating}</div>
            </div>

            <p className="p-2">
              An e-commerce website is an online platform that facilitates the
              buying and selling of products or services over the internet. It
              serves as a virtual marketplace where businesses and individuals
              can showcase their products, interact with customers, and conduct
              transactions without the need for a physical presence. E-commerce
              websites have gained immense popularity due to their convenience,
              accessibility, and the global reach they offer.
            </p>
            <p className="p-2">
              E-commerce websites typically display products or services along
              with detailed descriptions, images, prices, and any available
              variations (e.g., sizes, colors). Each product usually has its own
              dedicated page with relevant information.
            </p>
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
