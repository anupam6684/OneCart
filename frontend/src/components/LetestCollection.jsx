import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

export default function LetestCollection() {
  const Linit = 15;
  const [latestProduct, setLatestProduct] = useState([]);
  const { products } = useContext(ShopContext);

  useEffect(() => {
    if (!products.length) return;

    setLatestProduct(
      products.filter((item) => item.isNewArrival).slice(0, Linit),
    );
  }, []);

  return (
    <div className=" my-5">
      <div className="text-center pb-4">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="text-body-secondary mt-2 px-3 px-md-5 fs-6 fs-sm-6 fs-md-5 fs-lg-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>

      <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
        {latestProduct.map((item) => (
          <div key={item.id} className="col">
            <ProductItem
              id={item.id}
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
