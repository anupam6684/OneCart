import React, { useEffect, useState, useContext } from "react";
import { fetchProfile, logoutUser } from "../controllers/userController";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

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

  // Handler to delete an address
  const handleDeleteAddress = async (addressId, index) => {
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;

    try {
      // TODO: Replace with your actual controller call
      // await deleteAddressController(addressId);

      setUser((prevUser) => ({
        ...prevUser,
        address: prevUser.address.filter((_, i) => i !== index),
      }));

      toast.success("Address deleted successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to delete address.");
    }
  };

  // Handler to trigger edit address (navigate to edit page or open modal)
  const handleEditAddress = (address, index) => {
    // TODO: Pass address data to your edit modal or edit route
    console.log("Edit Address:", address, "Index:", index);
    toast.info("Edit address triggered.");
  };

  // 1. Loading State
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

  // 2. Error / Not Found State
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
              <button className="btn btn-outline-secondary rounded-pill py-2 fw-medium">
                Change Password
              </button>
              <button
                className="btn btn-danger rounded-pill py-2 fw-medium shadow-sm"
                onClick={() => {
                  logoutUser();
                  setToken("");
                  navigate("/login");
                  toast.success("Logged out successfully");
                }}
              >
                Logout Profile
              </button>
              <button className="btn btn-outline-danger rounded-pill py-2 fw-medium">
                Delete Account
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
                📦 View My Orders
              </Link>
            </div>

            {/* Profile Meta Metrics */}
            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <div className="p-3 bg-light rounded-4 border-0">
                  <span className="d-block text-muted small text-uppercase fw-semibold">
                    Username
                  </span>
                  <span className="fs-6 fw-bold text-dark mt-1 d-block">
                    {user.username}
                  </span>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-3 bg-light rounded-4 border-0">
                  <span className="d-block text-muted small text-uppercase fw-semibold">
                    Email Address
                  </span>
                  <span className="fs-6 fw-bold text-dark mt-1 d-block text-break">
                    {user.email}
                  </span>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-3 bg-light rounded-4 border-0">
                  <span className="d-block text-muted small text-uppercase fw-semibold">
                    Account Tier
                  </span>
                  <span className="fs-6 fw-bold text-success mt-1 d-block">
                    {user.role}
                  </span>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-3 bg-light rounded-4 border-0">
                  <span className="d-block text-muted small text-uppercase fw-semibold">
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
            </div>

            {/* Address Section */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold m-0 text-dark">Saved Addresses</h5>
              <button className="btn btn-sm btn-outline-primary rounded-pill px-3">
                + Add New Address
              </button>
            </div>

            <div className="card border rounded-4 p-3 bg-light">
              {hasValidAddress ? (
                user.address.map((item, index) => (
                  <div
                    key={item._id || index}
                    className={index > 0 ? "mt-3 pt-3 border-top" : ""}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <h6 className="fw-bold text-dark m-0">
                            {item.fullname}
                          </h6>
                          {item.isDefault && (
                            <span className="badge bg-success">Default</span>
                          )}
                        </div>

                        <p className="mb-1 text-secondary">{item.address}</p>

                        <p className="mb-1 text-secondary">
                          {item.city}, {item.state} - {item.pincode}
                        </p>

                        <p className="mb-0 text-secondary">📞 {item.phone}</p>
                      </div>

                      {/* Edit & Delete Actions */}
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                          onClick={() => handleEditAddress(item, index)}
                          title="Edit Address"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger rounded-pill px-3"
                          onClick={() =>
                            handleDeleteAddress(item._id || index, index)
                          }
                          title="Delete Address"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted mb-0">No saved address found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
