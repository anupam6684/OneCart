import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";

export default function Orders() {
  const { products, currency } = useContext(ShopContext);

  return (
    <div>
      <Title text1="My" text2="Orders" />

      <div className="col-12 ">
        {products.slice(0, 5).map((item) => {
          return (
            <div
              key={`${item._id}-${item.size}`}
              className="card mb-3 shadow-sm"
            >
              <div className="row g-3 align-items-center p-3">
                {/* Image */}

                <div className=" row col-12 col-md-4  pt-3">
                  <Link
                    to={`/product/${item._id}`}
                    className="text-decoration-none text-dark col-6"
                  >
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ maxHeight: "150px", objectFit: "cover" }}
                    />{" "}
                  </Link>

                  {/* Product Info */}
                  <div className="col-6 d-flex flex-column  ">
                    <h6 className="mb-1 text-dark">{item.name}</h6>
                    <div className="d-flex flex-row gap-4">
                      <samp>Quantity: 1</samp>
                      <samp> Size: M </samp>
                    </div>
                    <span className="text-muted">Date: Sun Feb 08 2026</span>
                    <span>
                      {" "}
                      Amount : {currency}
                      {item.newPrice}
                    </span>{" "}
                    <span>Payment : COD</span>
                  </div>
                </div>

                {/* Order status */}
                <div className="col-6 col-md-4 text-center mt-3 mt-md-0">
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <span
                      className="rounded-circle"
                      style={{
                        height: "15px",
                        width: "15px",
                        backgroundColor: "green",
                        display: "inline-block",
                      }}
                    ></span>
                    <span>Order Placed</span>
                  </div>
                </div>

                {/* order track button */}
                <div className="col-6 col-md-4 text-center  mt-3 mt-md-0">
                  <button className="btn border">Track Order</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
