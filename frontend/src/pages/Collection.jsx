import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import Filter from "../components/Filter";
import Title from "../components/Title";

export default function Product() {
  const { products } = useContext(ShopContext);
  const [filterProduct, setFilterProduct] = useState([]);
  const [selectedCategory, setSelectCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const handleCategoryChange = (categoty) => {
    setSelectCategory((prev) =>
      prev.includes(categoty)
        ? prev.filter((c) => c !== categoty)
        : [...prev, categoty],
    );
  };

  const applyFilterAndSort = () => {
    // Step 1: Filter
    let filtered = selectedCategory.length
      ? products.filter((item) => selectedCategory.includes(item.category))
      : [...products];

    // Step 2: Sort
    switch (sortType) {
      case "low-high":
        filtered.sort((a, b) => a.newPrice - b.newPrice);
        break;
      case "high-low":
        filtered.sort((a, b) => b.newPrice - a.newPrice);
        break;
      default:
        break; // keep original order
    }

    setFilterProduct(filtered);
  };

  useEffect(() => {
    applyFilterAndSort();
  }, [products, selectedCategory, sortType]);

  return (
    <div className=" my-4">
      {/* Mobile Filter Button */}
      <button
        className="btn btn-outline-dark d-lg-none mb-3"
        data-bs-toggle="offcanvas"
        data-bs-target="#filterOffcanvas"
      >
        ☰ Filter
      </button>

      <div className="row">
        {/* Desktop Filter */}
        <div className="col-lg-2 d-none d-lg-block">
          <Filter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Products */}
        <div className="col-12 col-lg-10">
          <div className="d-flex my-3 justify-content-between ">
            <Title text1="ALL" text2="COLLECTION" />
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="fs-6 rounded-3 px-2 py-1 "
            >
              <option value="relevent">Sort By : Relevent </option>
              <option value="low-high">Sort By : Low To High </option>
              <option value="high-low">Sort By : High To Low </option>
            </select>
          </div>

          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
            {filterProduct.map((item) => (
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
      </div>

      {/* Mobile Filter Offcanvas */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="filterOffcanvas"
      >
        <div className="offcanvas-header">
          <h5 className="fw-bold">Filters</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          <Filter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>
    </div>
  );
}
