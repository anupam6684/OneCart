import React, { useEffect, useState, useContext } from "react";
import { fetchProfile } from "../controllers/userController";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { logoutUser } from "../controllers/userController";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setToken } = useContext(ShopContext);

  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile();
        if (data?.success) {
          setUser(data.user);
        } else {
          toast.error(data.message || "Failed to load profile.");
        }
      } catch (error) {
        toast.error(error.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // 1. Loading State (Prevents premature 404 flashing)
  if (loading) {
    return (
      <div className="container py-5 text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mt-3">Loading your profile...</p>
      </div>
    );
  }

  // 2. Real 404/Error State
  if (!user) {
    return (
      <div className="container py-5 text-center">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h3 className="fw-bold">Profile Not Found</h3>
        <p className="text-muted">We couldn't retrieve your profile data.</p>
        <Link to="/" className="btn btn-dark mt-3 px-4 rounded-pill">
          Back to Home
        </Link>
      </div>
    );
  }

  // Helper check: MongoDB default address arrays sometimes contain an empty object [ {} ]
  const hasValidAddress =
    user.address &&
    user.address.length > 0 &&
    Object.keys(user.address[0]).length > 0;

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Left Side: Profile Card Summary */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 text-center p-4 h-100 bg-white">
            <div className="position-relative d-inline-block mx-auto mt-3">
              <img
                src={
                  user.image ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="profile"
                width={120}
                height={120}
                className="rounded-circle border border-4 border-light shadow-sm object-fit-cover"
              />
              <span className="position-absolute bottom-0 end-0 badge rounded-pill bg-success border border-2 border-white px-2 py-1 small text-uppercase">
                {user.role || "Customer"}
              </span>
            </div>

            <h3 className="fw-bold mt-4 mb-1 text-dark">{user.username}</h3>
            <p className="text-muted small mb-4">{user.email}</p>

            <hr className="text-muted opacity-25" />

            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-primary rounded-pill py-2 fw-medium shadow-sm">
                Edit Profile
              </button>
              <button className="btn  btn-outline-secondary rounded-pill py-2 fw-medium">
                Change Password
              </button>
              <button
                className="btn btn-danger rounded-pill py-2 fw-medium shadow-sm"
                onClick={() => {
                  logoutUser();
                  setToken("");
                  navigate("/login");
                  toast.success("Logout SuccessFully");
                }}
              >
                Logout Profile
              </button>
              <button className="btn  btn-danger rounded-pill py-2 fw-medium">
                Account Delete
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Account Details & Addresses */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            {/* Account Information Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold m-0 text-dark">Account Details</h4>
              <Link
                to="/orders"
                className="btn btn-sm btn-dark rounded-pill px-3 py-2"
              >
                📦 View My Orders ({user.orders?.length || 0})
              </Link>
            </div>

            {/* Profile Meta Metrics */}
            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <div className="p-3 bg-light rounded-4 border-0">
                  <span className="d-block text-muted small uppercase fw-semibold">
                    Username
                  </span>
                  <span className="fs-6 fw-bold text-dark mt-1 d-block">
                    {user.username}
                  </span>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-3 bg-light rounded-4 border-0">
                  <span className="d-block text-muted small uppercase fw-semibold">
                    Email Address
                  </span>
                  <span className="fs-6 fw-bold text-dark mt-1 d-block text-break">
                    {user.email}
                  </span>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-3 bg-light rounded-4 border-0">
                  <span className="d-block text-muted small uppercase fw-semibold">
                    Account Tier
                  </span>
                  <span className="fs-6 fw-bold text-success mt-1 d-block">
                    {user.role}
                  </span>
                </div>
              </div>
              <div className="col-sm-6 d-flex justify-content-around">
                <div className="row">
                  <div className="p-3 bg-light rounded-4 border-0">
                    <span className="d-block text-muted small uppercase fw-semibold">
                      Member Since
                    </span>
                    <span className="fs-6 fw-bold text-dark mt-1 d-block">
                      {user.createdAt ? (
                        <>
                          <div>
                            📅{" "}
                            {new Date(user.createdAt).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </div>
                          <div className="text-muted fw-normal small mt-1">
                            ⏰{" "}
                            {new Date(user.createdAt).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                              },
                            )}
                          </div>
                        </>
                      ) : (
                        "N/A"
                      )}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="p-3 bg-light rounded-4 border-0">
                    <span className="d-block text-muted small uppercase fw-semibold">
                      Last Update Profile
                    </span>
                    <span className="fs-6 fw-bold text-dark mt-1 d-block">
                      {user.createdAt ? (
                        <>
                          <div>
                            📅{" "}
                            {new Date(user.updatedAt).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </div>
                          <div className="text-muted fw-normal small mt-1">
                            ⏰{" "}
                            {new Date(user.updatedAt).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                              },
                            )}
                          </div>
                        </>
                      ) : (
                        "N/A"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <h5 className="fw-bold mb-3 text-dark">Saved Addresses</h5>
            <div className="card border rounded-4 p-3 bg-light">
              {hasValidAddress ? (
                user.address.map((item, index) => (
                  <div
                    key={index}
                    className={index > 0 ? "mt-3 pt-3 border-top" : ""}
                  >
                    <h6 className="fw-bold text-dark mb-1">
                      {item.name || user.username}
                    </h6>
                    <p className="mb-1 text-secondary">
                      {item.street || "No street details"}
                    </p>
                    <p className="mb-0 text-secondary">
                      {item.city} {item.state} {item.zip}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-3">
                  <p className="text-muted mb-0 small">
                    No address information added yet.
                  </p>
                  <button className="btn btn-link btn-sm text-decoration-none p-0 mt-1 fw-medium">
                    + Add New Address
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
