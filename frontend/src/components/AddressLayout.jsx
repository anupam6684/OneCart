import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { ShopContext } from "../context/ShopContext";
import { addressService } from "../services/addressService";
import AddressForm from "./Address";

export default function AddressLayout() {
  const {
    step,
    setStep,
    userAllData,
    selectedAddressId,
    setSelectedAddressId,
  } = useContext(ShopContext);

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Sync saved addresses on mount or when context updates
  useEffect(() => {
    if (userAllData?.address) {
      setSavedAddresses(userAllData.address);
      // Auto-select first or default address if none selected yet
      if (!selectedAddressId && userAllData.address.length > 0) {
        const defaultAddr =
          userAllData.address.find((a) => a.isDefault) ||
          userAllData.address[0];
        if (defaultAddr?._id) {
          setSelectedAddressId(defaultAddr._id);
        }
      }
    }
  }, [userAllData, selectedAddressId, setSelectedAddressId]);

  // Select address & proceed to Payment step
  const handleDeliverHere = (address) => {
    setSelectedAddressId(address._id);
    localStorage.setItem("selectedAddress", JSON.stringify(address));
    toast.success(`Delivering to ${address.addressType || "selected address"}`);
    setStep(step + 1);
  };

  // Delete address action
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        const response = await addressService.deleteAddress(id);
        if (response?.data?.success) {
          toast.success("Address deleted successfully");
          setSavedAddresses((prev) => prev.filter((item) => item._id !== id));
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete address");
      }
    }
  };

  // Handle Add/Edit form submission success
  const handleFormSubmitSuccess = async (formValues) => {
    try {
      let response;
      if (editingAddress) {
        response = await addressService.updateAddress(
          editingAddress._id,
          formValues,
        );
      } else {
        response = await addressService.addAddress(formValues);
      }

      if (response?.data?.success) {
        toast.success(
          editingAddress ? "Address updated!" : "New address added!",
        );
        setIsAddingNew(false);
        setEditingAddress(null);
      } else {
        toast.error(response?.data?.message || "Operation failed");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Error processing address request");
    }
  };

  // Helper icon renderer for address types
  const renderAddressTypeIcon = (type) => {
    const normalized = (type || "").toLowerCase();
    if (normalized === "home")
      return (
        <HomeOutlinedIcon sx={{ fontSize: 18 }} className="text-primary" />
      );
    if (normalized === "work" || normalized === "office")
      return (
        <WorkOutlinedIcon sx={{ fontSize: 18 }} className="text-warning" />
      );
    return (
      <LocationOnOutlinedIcon
        sx={{ fontSize: 18 }}
        className="text-secondary"
      />
    );
  };

  return (
    <div
      className="container py-4"
      style={{ fontFamily: "'Inter', sans-serif", maxWidth: "720px" }}
    >
      {/* HEADER TITLE */}
      <div className="text-center mb-4">
        <Title text1="SELECT" text2="ADDRESS" />
        <p className="text-muted small mb-0 mt-1">
          Choose where you want your order delivered
        </p>
      </div>

      {/* 1. ADD NEW ADDRESS BUTTON */}
      {!isAddingNew && !editingAddress && (
        <div className="mb-4">
          <button
            type="button"
            className="btn w-100 p-3 rounded-4 d-flex align-items-center justify-content-between border border-2 border-dashed bg-white text-dark shadow-sm hover-shadow transition-all"
            style={{
              borderColor: "#d1d5db",
              transition: "all 0.25s ease-in-out",
            }}
            onClick={() => {
              setEditingAddress(null);
              setIsAddingNew(true);
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle bg-light border d-flex align-items-center justify-content-center text-dark"
                style={{ width: "42px", height: "42px", flexShrink: 0 }}
              >
                <AddIcon sx={{ fontSize: 22 }} />
              </div>
              <div className="text-start">
                <span className="d-block fw-bold fs-6 mb-0 text-dark">
                  Add New Delivery Address
                </span>
                <span className="text-muted small">
                  Save a home, work, or secondary shipping location
                </span>
              </div>
            </div>
            <span className="badge bg-dark text-white rounded-pill px-3 py-1.5 small fw-semibold">
              + Add
            </span>
          </button>
        </div>
      )}

      {/* 2. REUSABLE ADDRESS FORM (ADD / EDIT) */}
      {(isAddingNew || editingAddress) && (
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold text-dark m-0">
              {editingAddress ? "Edit Address Details" : "Add New Address"}
            </h6>
          </div>

          <AddressForm
            initialValues={editingAddress || {}}
            onSubmitSuccess={handleFormSubmitSuccess}
            onCancel={() => {
              setIsAddingNew(false);
              setEditingAddress(null);
            }}
            showCancel={savedAddresses.length > 0}
          />
        </div>
      )}

      {/* 3. SAVED ADDRESSES LIST */}
      {!isAddingNew && !editingAddress && (
        <div className="d-flex flex-column gap-3 mb-4">
          {savedAddresses.length === 0 ? (
            <div className="text-center py-5 text-muted border rounded-4 bg-light">
              <LocationOnOutlinedIcon
                sx={{ fontSize: 40 }}
                className="text-muted mb-2 d-block mx-auto"
              />
              <p className="mb-0 fw-medium">No saved addresses found.</p>
              <span className="small text-secondary">
                Click the button above to add a shipping address.
              </span>
            </div>
          ) : (
            savedAddresses.map((item) => {
              const isSelected = selectedAddressId === item._id;

              return (
                <div
                  key={item._id}
                  onClick={() => setSelectedAddressId(item._id)}
                  className={`card rounded-4 border transition-all cursor-pointer overflow-hidden ${
                    isSelected
                      ? "border-dark shadow-sm bg-white"
                      : "border-light-subtle bg-white hover-shadow-sm"
                  }`}
                  style={{
                    borderWidth: isSelected ? "2px" : "1px",
                  }}
                >
                  <div className="card-body p-3.5 p-md-4">
                    {/* Header: Radio, Tag, Default Badge */}
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <input
                          className="form-check-input m-0 cursor-pointer shadow-none"
                          type="radio"
                          name="addressRadio"
                          id={`radio-${item._id}`}
                          checked={isSelected}
                          onChange={() => setSelectedAddressId(item._id)}
                          style={{ width: "18px", height: "18px" }}
                        />
                        <span className="d-flex align-items-center gap-1">
                          {renderAddressTypeIcon(item.addressType)}
                          <label
                            htmlFor={`radio-${item._id}`}
                            className="fw-bold text-dark cursor-pointer mb-0 text-uppercase tracking-wide"
                            style={{ fontSize: "0.85rem" }}
                          >
                            {item.addressType || "HOME"}
                          </label>
                        </span>

                        {item.isDefault && (
                          <span className="badge bg-secondary-subtle text-secondary rounded-pill px-2 py-0.5 small fw-normal">
                            Default
                          </span>
                        )}
                      </div>

                      {isSelected && (
                        <span className="badge bg-dark text-white rounded-pill px-3 py-1 small d-flex align-items-center gap-1">
                          <CheckCircleIcon sx={{ fontSize: 14 }} /> Selected
                        </span>
                      )}
                    </div>

                    {/* Customer Info */}
                    <div className="ps-4 mb-2">
                      <div className="fw-bold text-dark fs-6 mb-0.5">
                        {item.fullname}
                      </div>
                      <div className="text-muted small">
                        📞{" "}
                        <span className="fw-medium text-dark">
                          {item.phone}
                        </span>
                      </div>
                    </div>

                    {/* Street Address */}
                    <div className="ps-4 mb-3 text-secondary small lh-base">
                      <div>{item.address}</div>
                      <div>
                        {item.city}, {item.state} —{" "}
                        <span className="fw-semibold text-dark">
                          {item.pincode}
                        </span>
                      </div>
                    </div>

                    {/* Action Toolbar */}
                    <div className="ps-4 pt-3 border-top d-flex align-items-center justify-content-between gap-2 flex-wrap">
                      <div className="d-flex align-items-center gap-3">
                        <button
                          type="button"
                          className="btn btn-sm btn-link text-decoration-none text-secondary p-0 shadow-none d-flex align-items-center gap-1"
                          style={{ fontSize: "0.825rem" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingAddress(item);
                            setIsAddingNew(false);
                          }}
                        >
                          <EditOutlinedIcon sx={{ fontSize: 16 }} /> Edit
                        </button>

                        <span className="text-muted opacity-25">|</span>

                        <button
                          type="button"
                          className="btn btn-sm btn-link text-decoration-none text-danger p-0 shadow-none d-flex align-items-center gap-1"
                          style={{ fontSize: "0.825rem" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item._id);
                          }}
                        >
                          <DeleteOutlineIcon sx={{ fontSize: 16 }} /> Delete
                        </button>
                      </div>

                      <button
                        type="button"
                        className={`btn btn-sm ${
                          isSelected ? "btn-dark" : "btn-outline-dark"
                        } px-4 rounded-3 fw-semibold shadow-none`}
                        style={{ fontSize: "0.825rem", height: "36px" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeliverHere(item);
                        }}
                      >
                        Deliver Here
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* 4. BACK NAVIGATION FOOTER */}
      {!isAddingNew && !editingAddress && (
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="btn btn-link text-secondary text-decoration-none p-0 d-flex align-items-center gap-1 shadow-none small fw-medium"
          >
            <KeyboardBackspaceIcon sx={{ fontSize: 18 }} /> Back to Cart
          </button>
        </div>
      )}
    </div>
  );
}
