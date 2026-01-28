import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

export default function Searchbar() {
  const { search, setSearch, showSearch } = useContext(ShopContext);
  const location = useLocation();

  const isVisible = showSearch && location.pathname.includes("collection");

  if (!isVisible) return null;

  return (
    <div className="d-flex justify-content-center  my-3">
      <div className="position-relative w-50">
        <input
          type="text"
          className="form-control rounded-pill ps-4 pe-5"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ background: "#fafafa" }}
        />

        <i className="fa-solid fa-magnifying-glass position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
      </div>
    </div>
  );
}
