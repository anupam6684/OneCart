import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { ShopContext } from "../context/ShopContext";

export default function Nav() {
  const { setShowSearch, showSearch } = useContext(ShopContext);
  return (
    <nav className="navbar navbar-expand-lg border-bottom mb-3">
      <div className="container-fluid px-4">
        {/* 1️⃣ LOGO SECTION */}
        <div className="d-flex align-items-center">
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center gap-2 mb-0"
          >
            <img
              src="/OneCartLogo.png"
              alt="OneCart"
              style={{ height: "3rem" }}
            />
            <span className="fw-bold fs-4">OneCart</span>
          </Link>
        </div>

        {/* 2️⃣ CENTER LINKS */}
        <div
          className="collapse navbar-collapse justify-content-center"
          id="mainNavbar"
        >
          <ul className="navbar-nav gap-4">
            <li className="nav-item text-uppercase">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item text-uppercase">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
                to="/collection"
              >
                Collection
              </NavLink>
            </li>
            <li className="nav-item text-uppercase">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li className="nav-item text-uppercase">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* 3️⃣ RIGHT ICONS */}
        <div className="d-flex align-items-center gap-3 ms-auto">
          <i
            onClick={() => setShowSearch(!showSearch)}
            className="fa-solid fa-magnifying-glass"
          ></i>
          <div className="dropdown">
            <img
              src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
              alt="userlogo"
              width="40"
              className="dropdown-toggle"
              data-bs-toggle="dropdown"
              style={{ cursor: "pointer", borderRadius: "50%" }}
            />

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="orders">
                  Orders
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </div>

          <Link to="/cart" className="position-relative text-dark">
            <Badge badgeContent={4} color="error">
              <ShoppingCartIcon />
            </Badge>
          </Link>

          {/* TOGGLER (FIXED RIGHT) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
