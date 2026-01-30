import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

export default function ProductItem({ _id, name, image, price, oldPrice }) {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${_id}`} className="text-decoration-none text-dark">
      {/* Image */}
      <div className="img-box mb-2 border">
        <img src={image[0]} alt={name} />
      </div>

      {/* Product name */}
      <p className="mt-2 mb-1 small">{name}</p>

      {/* Old price */}
      {oldPrice && (
        <p className="text-muted text-decoration-line-through mb-1">
          {currency}
          {oldPrice}
        </p>
      )}

      {/* New price */}
      <p className="fw-bold mb-0">
        {currency}
        {price}
      </p>
    </Link>
  );
}
