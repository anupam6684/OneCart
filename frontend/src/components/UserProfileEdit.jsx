import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { userService } from "../services/userService";

// Material UI Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SaveIcon from "@mui/icons-material/Save";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const profileEditSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),

  email: z.string().email("Please provide a valid email address"),

  phone: z.string().refine((val) => val === "" || /^[0-9]{10}$/.test(val), {
    message: "Phone number must be exactly 10 digits",
  }),
});

export default function UserProfileEdit() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [userData, setUserData] = useState({
    _id: "6a65fcc1239ca4e111e2ef55",
    username: "anupam",
    email: "anupamjana6684@gmail.com",
    role: "CUSTOMER",
    status: "ACTIVE",
    phone: "",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    lastLogin: "2026-09-13T08:50:15.076+00:00",
    createdAt: "2026-07-26T12:25:37.809+00:00",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(userData.image);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      username: userData.username,
      email: userData.email,
      phone: userData.phone || "",
    },
  });

  // Local file picker & immediate base64 preview
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file size must be less than 5MB");
      return;
    }

    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleResetPhoto = () => {
    setSelectedFile(null);
    setPreviewImage(userData.image);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Submit multipart form to your Express backend
  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("phone", values.phone);

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const response = await userService.updateProfile(userData._id, formData);
      console.log(response);

      if (response.data.success) {
        const updated = response.data.user;
        setUserData(updated);
        setPreviewImage(updated.image);
        setSelectedFile(null);
        reset({
          username: updated.username,
          email: updated.email,
          phone: updated.phone || "",
        });
        toast.success("Profile saved successfully!");
        navigate(-1);
      } else {
        toast.error(response.data.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const hasFormChanges = isDirty || selectedFile !== null;

  return (
    <div
      className="min-vh-100 bg-light py-5"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="container" style={{ maxWidth: "880px" }}>
        {/* Navigation & Status Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-white bg-white border rounded-3 px-3.5 py-2 d-inline-flex align-items-center gap-2 text-secondary fw-semibold shadow-sm"
          >
            <ArrowBackIcon sx={{ fontSize: 18 }} />
            <span>Return</span>
          </button>

          <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1.5 fw-semibold d-inline-flex align-items-center gap-1">
            <CheckCircleIcon sx={{ fontSize: 15 }} />
            {userData.status} ACCOUNT
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-4">
            {/* Left Column: Avatar Management Card */}
            <div className="col-12 col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 bg-white p-4 text-center h-100 d-flex flex-column justify-content-between">
                <div>
                  <h6 className="fw-bold text-dark text-uppercase tracking-wider extra-small mb-4 text-start">
                    Profile Photo
                  </h6>

                  <div className="position-relative d-inline-block mx-auto mb-3">
                    <img
                      src={previewImage}
                      alt="Avatar"
                      className="rounded-circle border border-3 border-white shadow-sm object-fit-cover bg-light"
                      style={{ width: "128px", height: "128px" }}
                      onError={() =>
                        setPreviewImage(
                          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                        )
                      }
                    />
                  </div>

                  <h6 className="fw-bold text-dark mb-0">
                    @{userData.username}
                  </h6>
                  <p className="text-muted extra-small mb-3">{userData.role}</p>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="d-none"
                  />

                  <div className="d-grid gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="btn btn-outline-dark rounded-3 py-2 fw-semibold extra-small d-flex align-items-center justify-content-center gap-1.5 shadow-none"
                    >
                      <CloudUploadOutlinedIcon sx={{ fontSize: 18 }} />
                      Choose Photo
                    </button>

                    {selectedFile && (
                      <button
                        type="button"
                        onClick={handleResetPhoto}
                        className="btn btn-link text-danger text-decoration-none py-1 extra-small d-flex align-items-center justify-content-center gap-1"
                      >
                        <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                        Cancel Selection
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-light rounded-3 text-start mt-3">
                  <div className="text-muted extra-small mb-1">
                    <strong>Joined:</strong>{" "}
                    {new Date(userData.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-muted extra-small">
                    <strong>Role access:</strong> Full Store Customer
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Profile Form Details */}
            <div className="col-12 col-lg-8">
              <div className="card border-0 shadow-sm rounded-4 bg-white p-4 p-md-5">
                <div className="border-bottom pb-3 mb-4">
                  <h5 className="fw-bold text-dark mb-1">
                    Account Credentials
                  </h5>
                  <p className="text-muted small mb-0">
                    Update your operational contact details and identifier
                  </p>
                </div>

                <div className="row g-3 mb-4">
                  {/* Username Field */}
                  <div className="col-12 col-md-6">
                    <label className="form-label text-dark fw-semibold small mb-1.5">
                      Username <span className="text-danger">*</span>
                    </label>
                    <div
                      className={`input-group border rounded-3 bg-white px-3 align-items-center ${errors.username ? "border-danger" : "border-light-subtle"}`}
                      style={{ height: "46px" }}
                    >
                      <PersonOutlineIcon
                        className="text-muted me-2"
                        sx={{ fontSize: 20 }}
                      />
                      <input
                        type="text"
                        {...register("username")}
                        className="form-control border-0 p-0 shadow-none bg-transparent"
                        placeholder="Username"
                      />
                    </div>
                    {errors.username && (
                      <p className="text-danger extra-small mt-1 mb-0">
                        {errors.username.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="col-12 col-md-6">
                    <label className="form-label text-dark fw-semibold small mb-1.5">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <div
                      className={`input-group border rounded-3 bg-white px-3 align-items-center ${errors.email ? "border-danger" : "border-light-subtle"}`}
                      style={{ height: "46px" }}
                    >
                      <MailOutlineIcon
                        className="text-muted me-2"
                        sx={{ fontSize: 20 }}
                      />
                      <input
                        type="email"
                        {...register("email")}
                        className="form-control border-0 p-0 shadow-none bg-transparent"
                        placeholder="Email address"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-danger extra-small mt-1 mb-0">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="col-12 col-md-6">
                    <label className="form-label text-dark fw-semibold small mb-1.5">
                      Mobile Number
                    </label>
                    <div
                      className={`input-group border rounded-3 bg-white px-3 align-items-center ${errors.phone ? "border-danger" : "border-light-subtle"}`}
                      style={{ height: "46px" }}
                    >
                      <PhoneOutlinedIcon
                        className="text-muted me-2"
                        sx={{ fontSize: 20 }}
                      />
                      <input
                        type="text"
                        {...register("phone")}
                        maxLength={10}
                        className="form-control border-0 p-0 shadow-none bg-transparent"
                        placeholder="10-digit mobile number"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-danger extra-small mt-1 mb-0">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Role Display */}
                  <div className="col-12 col-md-6">
                    <label className="form-label text-muted fw-semibold small mb-1.5">
                      Assigned Role
                    </label>
                    <div
                      className="input-group border rounded-3 bg-light px-3 align-items-center"
                      style={{ height: "46px" }}
                    >
                      <ShieldOutlinedIcon
                        className="text-muted me-2"
                        sx={{ fontSize: 20 }}
                      />
                      <input
                        type="text"
                        readOnly
                        value={userData.role}
                        className="form-control border-0 p-0 shadow-none bg-transparent text-muted cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* System Audit Box */}
                <div className="p-3 bg-light rounded-3 d-flex flex-wrap justify-content-between align-items-center gap-2 border mb-4">
                  <span className="extra-small text-muted">
                    <strong>ID:</strong>{" "}
                    <code className="text-dark">{userData._id}</code>
                  </span>
                  <span className="extra-small text-muted">
                    <strong>Last Activity:</strong>{" "}
                    {new Date(userData.lastLogin).toLocaleString()}
                  </span>
                </div>

                {/* Action Bar */}
                <div className="d-flex justify-content-end gap-2.5 pt-3 border-top">
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                      handleResetPhoto();
                    }}
                    disabled={!hasFormChanges || isSubmitting}
                    className="btn btn-outline-secondary rounded-3 px-4 py-2 fw-semibold extra-small"
                    style={{ height: "44px" }}
                  >
                    Discard Changes
                  </button>

                  <button
                    type="submit"
                    disabled={!hasFormChanges || isSubmitting}
                    className="btn btn-dark rounded-3 px-4 py-2 fw-semibold extra-small d-inline-flex align-items-center gap-1.5 shadow-sm"
                    style={{ height: "44px" }}
                  >
                    <SaveIcon sx={{ fontSize: 18 }} />
                    <span>{isSubmitting ? "Saving..." : "Save Profile"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
