import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { ShopContext } from "../context/ShopContext";

export default function RelatedProduct({ category, subcategory, _id }) {
  const [related, setRelated] = useState([]);
  const { products } = useContext(ShopContext);
  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();

      productCopy = productCopy.filter(
        (item) =>
          item.category === category && item.subcategory === subcategory,
        //    &&
        //   item._id != _id,
      );

      setRelated(productCopy.slice(0, 4)); // show only 4 related products
    }
  }, [products, category, subcategory]);
  return (
    <div className="my-5">
      <div className="my-5">
        {" "}
        <Title text1="related" text2="product" />
      </div>

      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
        {related.map((item) => (
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
