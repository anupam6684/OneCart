import React from "react";

export default function Filter({ selectedCategory, onCategoryChange }) {
  return (
    <>
      <h6 className="fw-bold mb-3">Filters</h6>
      {/* Category */}
      <div className="mb-3 border p-3 rounded">
        <p className="fw-semibold mb-1">Category</p>
        <div className="form-check">
          <input
            className="form-check-input"
            value={"Men"}
            type="checkbox"
            checked={selectedCategory.includes("Men")}
            onChange={() => onCategoryChange("Men")}
          />
          <label className="form-check-label">Men</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            value={"Women"}
            type="checkbox"
            checked={selectedCategory.includes("Women")}
            onChange={() => onCategoryChange("Women")}
          />
          <label className="form-check-label">Women</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            value={"Kids"}
            type="checkbox"
            checked={selectedCategory.includes("Kids")}
            onChange={() => onCategoryChange("Kids")}
          />
          <label className="form-check-label">Kids</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input "
            value={"Unisex"}
            type="checkbox"
            checked={selectedCategory.includes("Unisex")}
            onChange={() => onCategoryChange("Unisex")}
          />
          <label className="form-check-label">Unisex</label>
        </div>
      </div>
    </>
  );
}
