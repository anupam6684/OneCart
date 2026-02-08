import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import CartTotal from "./CartTotal";

export default function Cart() {
  const [cartData, setCartData] = useState([]);

  const {
    products,
    updateQuantity,
    currency,

    cartItems,
  } = useContext(ShopContext);

  useEffect(() => {
    const tempData = [];

    for (let itemId in cartItems) {
      for (let size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }

    setCartData(tempData);
    console.log(tempData);
  }, [cartItems]);

  return (
    <div className="pt-5 container">
      <div className="cart-title-wrapper">
        <Title text1="My" text2="Cart" />
      </div>

      {cartData.length === 0 && (
        <p className="text-center text-muted fs-2 mt-5">
          Your cart is empty 🛒
        </p>
      )}

      {cartData.length > 0 && (
        <div className="row mt-4 g-4">
          {/* LEFT: CART ITEMS */}
          <div className="col-12 col-lg-8">
            {cartData.map((item) => {
              const productData = products.find(
                (product) => product._id == item._id,
              );

              if (!productData) return null;

              return (
                <div
                  key={`${item._id}-${item.size}`}
                  className="card mb-3 shadow-sm"
                >
                  <div className="row g-3 align-items-center p-3">
                    {/* Image */}

                    <div className="col-4 col-md-2 text-center">
                      <Link
                        to={`/product/${productData._id}`}
                        className="text-decoration-none text-dark"
                      >
                        <img
                          src={productData.image[0]}
                          alt={productData.name}
                          className="img-fluid rounded"
                          style={{ maxHeight: "120px", objectFit: "cover" }}
                        />{" "}
                      </Link>
                    </div>

                    {/* Product Info */}
                    <div className="col-8 col-md-4">
                      <h6 className="mb-1 text-dark">{productData.name}</h6>

                      <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                        <span className="badge bg-secondary">
                          Size: {item.size}
                        </span>
                        <span className="text-muted small">
                          {productData.brand}
                        </span>
                      </div>

                      <p className="text-muted small mb-0">
                        {productData.category} / {productData.subcategory}
                      </p>
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
                            ? "In Stock"
                            : "Out of Stock"}{" "}
                        </p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-4 col-md-2 mt-3 mt-md-0">
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-outline-dark btn-sm"
                          onClick={() => {
                            updateQuantity(
                              item._id,
                              item.size,
                              item.quantity - 1,
                            );
                          }}
                        >
                          −
                        </button>
                        <span className="fw-bold">{item.quantity}</span>
                        <button
                          className="btn btn-outline-dark btn-sm"
                          onClick={() => {
                            updateQuantity(
                              item._id,
                              item.size,
                              item.quantity + 1,
                            );
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-4 col-md-2 text-center mt-3 mt-md-0">
                      <div className="fw-bold text-danger fs-5">
                        {currency}
                        {productData.newPrice * item.quantity}
                      </div>
                      <div className="text-muted text-decoration-line-through">
                        {currency}
                        {productData.oldPrice * item.quantity}
                      </div>
                      <div className="text-success small">
                        {Math.round(
                          ((productData.oldPrice - productData.newPrice) /
                            productData.oldPrice) *
                            100,
                        )}
                        % OFF
                      </div>
                    </div>

                    {/* Remove */}
                    <div className="col-4 col-md-2 text-center">
                      <button
                        className="btn btn-link text-danger p-0"
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.size,
                            (item.quantity = 0),
                          )
                        }
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="col-12 col-lg-4">
            <div className="card shadow-sm cart-total-wrapper">
              <CartTotal cartData={cartData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
