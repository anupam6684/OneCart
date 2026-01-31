import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-5  text-dark">
      {/* Top */}
      <div className="row gy-4 border-bottom border-top pb-4">
        {/* Left */}
        <div className="col-12 col-md-6 col-lg-7">
          <Link
            to="/"
            className="d-flex align-items-center gap-2 text-decoration-none text-dark"
          >
            <img src="/OneCartLogo.png" alt="logo" height="48" />
            <span className="fw-bold fs-4">OneCart</span>
          </Link>

          <p className="mt-4 text-muted fs-6">
            OneCart is a modern eCommerce platform built to deliver a fast,
            secure, and user-friendly shopping experience. Designed with
            performance and scalability in mind, OneCart brings simplicity and
            reliability to online shopping.
          </p>
        </div>

        {/* Right */}
        <div className="col-12 col-md-6 col-lg-5">
          <div className="row gy-3">
            <div className="col-12 col-sm-6">
              <span className="fw-semibold text-uppercase small">Company</span>
              <ul className="list-unstyled mt-3 text-muted">
                <li className="mb-2">Home</li>
                <li className="mb-2">About</li>
                <li className="mb-2">Delivery</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

            <div className="col-12 col-sm-6">
              <span className="fw-semibold text-uppercase small">
                Get in Touch
              </span>
              <ul className="list-unstyled mt-3 text-muted">
                <li className="mb-2">+1-000-000-0000</li>
                <li className="mb-2">email@example.com</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="row pt-4">
        <div className="col text-center text-muted small">
          © 2026 OneCart. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
