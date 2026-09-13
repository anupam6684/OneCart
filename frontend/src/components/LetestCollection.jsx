import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

export default function LatestCollection() {
  const LIMIT = 15;
  const [latestProduct, setLatestProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const { products } = useContext(ShopContext);

  useEffect(() => {
    if (!products || products.length === 0) {
      setLoading(true);
      return;
    }

    const filtered = products
      .filter((item) => item.isNewArrival)
      .slice(0, LIMIT);

    setLatestProduct(filtered);
    setLoading(false);
  }, [products]);

  return (
    <div className="my-5 container">
      <div className="text-center pb-4">
        <Title text1="LATEST " text2="COLLECTIONS" />
        <p className="text-body-secondary mt-2 px-3 px-md-5 fs-6 fs-sm-6 fs-md-5 fs-lg-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>

      <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="col">
                <div className="card border-0 shadow-sm h-100 placeholder-glow overflow-hidden">
                  {/* Card Image Skeleton */}
                  <div
                    className="placeholder bg-secondary-subtle w-100"
                    style={{ height: "240px", borderRadius: "8px" }}
                  />

                  {/* Card Content Skeleton */}
                  <div className="card-body px-1 py-3">
                    <span className="placeholder col-8 bg-secondary-subtle rounded mb-2 d-block" />
                    <span className="placeholder col-5 bg-secondary-subtle rounded d-block" />
                    <div className="d-flex gap-2 mt-2">
                      <span className="placeholder col-3 bg-secondary-subtle rounded" />
                      <span className="placeholder col-2 bg-secondary-subtle rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          : latestProduct.map((item) => (
              <div key={item._id} className="col">
                <ProductItem
                  _id={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.newPrice}
                  oldPrice={item.oldPrice}
                />
              </div>
            ))}
      </div>
    </div>
  );
}
