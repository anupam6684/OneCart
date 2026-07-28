import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function Collection() {
  const { products, search, showSearch } = useContext(ShopContext);

  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  // Toggle Category Selection
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value],
    );
  };

  // Toggle SubCategory Selection
  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedSubCategory((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value],
    );
  };

  // Filter & Sort Logic
  const applyFilterAndSort = () => {
    let productsCopy = products ? [...products] : [];

    // 1. Search Query Filter
    if (showSearch && search.trim()) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase().trim()),
      );
    }

    // 2. Category Filter
    if (selectedCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        selectedCategory.includes(item.category),
      );
    }

    // 3. Subcategory Filter
    if (selectedSubCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        selectedSubCategory.includes(item.subcategory),
      );
    }

    // 4. Sorting
    switch (sortType) {
      case "low-high":
        productsCopy.sort((a, b) => a.newPrice - b.newPrice);
        break;
      case "high-low":
        productsCopy.sort((a, b) => b.newPrice - a.newPrice);
        break;
      default:
        break;
    }

    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    applyFilterAndSort();
  }, [
    products,
    selectedCategory,
    selectedSubCategory,
    sortType,
    showSearch,
    search,
  ]);

  // Sidebar Filter UI Content
  const FilterSection = () => (
    <div className="d-flex flex-column gap-4">
      {/* Categories Box */}
      <div className="card border-0 rounded-3 p-3 bg-white shadow-sm">
        <p className="fw-bold mb-2 text-dark border-bottom pb-2">CATEGORIES</p>
        <div className="d-flex flex-column gap-2 text-secondary small">
          {["Men", "Women", "Kids"].map((cat) => (
            <label
              key={cat}
              className="d-flex align-items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                value={cat}
                checked={selectedCategory.includes(cat)}
                onChange={handleCategoryChange}
                className="form-check-input mt-0 shadow-none"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Subcategories Box */}
      <div className="card border-0 rounded-3 p-3 bg-white shadow-sm">
        <p className="fw-bold mb-2 text-dark border-bottom pb-2">TYPE</p>
        <div className="d-flex flex-column gap-2 text-secondary small">
          {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
            <label
              key={sub}
              className="d-flex align-items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                value={sub}
                checked={selectedSubCategory.includes(sub)}
                onChange={handleSubCategoryChange}
                className="form-check-input mt-0 shadow-none"
              />
              {sub}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="container py-4"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Mobile Trigger Button */}
      <div className="d-lg-none mb-3">
        <button
          className="btn btn-outline-dark btn-sm rounded-3 d-flex align-items-center gap-2 shadow-none"
          data-bs-toggle="offcanvas"
          data-bs-target="#filterOffcanvas"
        >
          <FilterListIcon sx={{ fontSize: 18 }} />
          Filters
        </button>
      </div>

      <div className="row g-4">
        {/* Desktop Sidebar Filter (Left) */}
        <div className="col-lg-3 d-none d-lg-block">
          <FilterSection />
        </div>

        {/* Right Content Area: Title, Sorting, and Products */}
        <div className="col-12 col-lg-9">
          {/* Header Row */}
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
            <Title text1="ALL" text2="COLLECTIONS" />

            {/* Sort Selector Dropdown */}
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="form-select form-select-sm border rounded-3 shadow-none text-secondary"
              style={{ width: "auto", minWidth: "200px" }}
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Price Low to High</option>
              <option value="high-low">Sort by: Price High to Low</option>
            </select>
          </div>

          {/* Product Items Grid */}
          {filterProducts.length === 0 ? (
            <div className="text-center py-5 bg-light rounded-4 border">
              <h6 className="text-muted mb-1">
                No products found matching your filter
              </h6>
              <p className="text-secondary small mb-0">
                Try clearing some category filters or search terms.
              </p>
            </div>
          ) : (
            <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-3 g-md-4">
              {filterProducts.map((item) => (
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
          )}
        </div>
      </div>

      {/* Mobile Offcanvas Drawer */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="filterOffcanvas"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-bold mb-0">Filters</h5>
          <button
            type="button"
            className="btn-close shadow-none"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body bg-light">
          <FilterSection />
        </div>
      </div>
    </div>
  );
}
