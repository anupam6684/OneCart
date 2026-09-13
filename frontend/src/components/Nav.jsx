import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { ShopContext } from "../context/ShopContext";
import { logoutUser } from "../controllers/userController";
import { toast } from "react-toastify";
export default function Nav() {
  const navigate = useNavigate();
  const { setShowSearch, showSearch, cartCont, token, setToken, userAllData } =
    useContext(ShopContext);
  /* ========================================================= DEFAULT USER IMAGE ========================================================= */ const defaultUserImage =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  const userImage = userAllData?.image || defaultUserImage;
  /* ========================================================= LOGOUT ========================================================= */ const handleLogout =
    async () => {
      try {
        await logoutUser();
        setToken("");
        navigate("/login");
        toast.success("Logout Successfully");
      } catch (error) {
        console.error("Logout error:", error);
        /* * Even if the backend logout request fails, * remove the local token. */ setToken(
          "",
        );
        navigate("/login");
        toast.success("Logout Successfully");
      }
    };
  return (
    <nav className="navbar navbar-expand-lg border-bottom mb-3 bg-white sticky-top">
      {" "}
      <div className="container-fluid px-4">
        {" "}
        {/* ===================================================== 1. LOGO ===================================================== */}{" "}
        <div className="d-flex align-items-center">
          {" "}
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center gap-2 mb-0"
          >
            {" "}
            <img
              src="/OneCartLogo.png"
              alt="OneCart"
              style={{ height: "3rem" }}
            />{" "}
            <span className="fw-bold fs-4"> OneCart </span>{" "}
          </Link>{" "}
        </div>{" "}
        {/* ===================================================== 2. CENTER NAVIGATION ===================================================== */}{" "}
        <div
          className="collapse navbar-collapse justify-content-center"
          id="mainNavbar"
        >
          {" "}
          <ul className="navbar-nav gap-4">
            {" "}
            {/* HOME */}{" "}
            <li className="nav-item text-uppercase">
              {" "}
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
                to="/"
              >
                {" "}
                Home{" "}
              </NavLink>{" "}
            </li>{" "}
            {/* COLLECTION */}{" "}
            <li className="nav-item text-uppercase">
              {" "}
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
                to="/collection"
              >
                {" "}
                Collection{" "}
              </NavLink>{" "}
            </li>{" "}
            {/* ABOUT */}{" "}
            <li className="nav-item text-uppercase">
              {" "}
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
                to="/about"
              >
                {" "}
                About{" "}
              </NavLink>{" "}
            </li>{" "}
            {/* CONTACT */}{" "}
            <li className="nav-item text-uppercase">
              {" "}
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
                to="/contact"
              >
                {" "}
                Contact{" "}
              </NavLink>{" "}
            </li>{" "}
            {/* ================================================= ADMIN ================================================= */}{" "}
            <li className="nav-item mt-2 mt-lg-0">
              {" "}
              <a
                href="https://one-cart-admin-five.vercel.app/login"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark rounded-pill px-4"
              >
                {" "}
                <i className="fa-solid fa-shield-halved me-2"></i> Admin{" "}
              </a>{" "}
            </li>{" "}
          </ul>{" "}
        </div>{" "}
        {/* ===================================================== 3. RIGHT SIDE ICONS ===================================================== */}{" "}
        <div className="d-flex align-items-center gap-3 ms-auto">
          {" "}
          {/* ================================================= SEARCH ================================================= */}{" "}
          <button
            type="button"
            onClick={() => setShowSearch(!showSearch)}
            className="btn btn-link text-dark p-0 border-0 shadow-none"
            aria-label="Search"
          >
            {" "}
            <i className="fa-solid fa-magnifying-glass"></i>{" "}
          </button>{" "}
          {/* ================================================= USER DROPDOWN ================================================= */}{" "}
          <div className="dropdown">
            {" "}
            <img
              src={userImage}
              alt="User profile"
              width="40"
              height="40"
              className="dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                cursor: "pointer",
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid #e5e7eb",
              }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = defaultUserImage;
              }}
            />{" "}
            <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0">
              {" "}
              {token ? (
                <>
                  {" "}
                  {/* ================================================= ORDERS ================================================= */}{" "}
                  <li>
                    {" "}
                    <Link className="dropdown-item" to="/orders">
                      {" "}
                      Orders{" "}
                    </Link>{" "}
                  </li>{" "}
                  {/* ================================================= PROFILE ================================================= */}{" "}
                  <li>
                    {" "}
                    <Link className="dropdown-item" to="/profile">
                      {" "}
                      Profile{" "}
                    </Link>{" "}
                  </li>{" "}
                  {/* ================================================= DIVIDER ================================================= */}{" "}
                  <li>
                    {" "}
                    <hr className="dropdown-divider" />{" "}
                  </li>{" "}
                  {/* ================================================= LOGOUT ================================================= */}{" "}
                  <li>
                    {" "}
                    <button
                      type="button"
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      {" "}
                      Logout{" "}
                    </button>{" "}
                  </li>{" "}
                </>
              ) : (
                /* ================================================= LOGIN ================================================= */ <li>
                  {" "}
                  <Link className="dropdown-item" to="/login">
                    {" "}
                    Login{" "}
                  </Link>{" "}
                </li>
              )}{" "}
            </ul>{" "}
          </div>{" "}
          {/* ===================================================== CART ===================================================== */}{" "}
          <Link
            to="/checkout"
            className="position-relative text-dark"
            aria-label="Shopping cart"
          >
            {" "}
            <Badge badgeContent={cartCont} color="error" showZero>
              {" "}
              <ShoppingCartIcon />{" "}
            </Badge>{" "}
          </Link>{" "}
          {/* ===================================================== MOBILE NAVBAR TOGGLER ===================================================== */}{" "}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {" "}
            <span className="navbar-toggler-icon"></span>{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </nav>
  );
}
