import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export default function AddressForm({
  initialData = null,
  onSubmitSuccess,
  onCancel,
  showCancel = true,
}) {
  // Validation Schema (Fixed 10-digit phone regex)
  const validationSchema = Yup.object({
    fullname: Yup.string()
      .min(3, "Minimum 3 characters required")
      .required("Full name is required"),

    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),

    address: Yup.string()
      .min(10, "Address is too short")
      .required("Address is required"),

    city: Yup.string().required("City is required"),

    state: Yup.string().required("State is required"),

    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
  });

  // Pre-fill fields if editing, otherwise use empty values
  const defaultValues = {
    addressType: initialData?.addressType || "Home",
    fullname: initialData?.fullname || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    pincode: initialData?.pincode || "",
  };

  return (
    <Formik
      initialValues={defaultValues}
      enableReinitialize={true} // Ensures pre-filled data updates dynamically when editing
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        try {
          await onSubmitSuccess(values);
          resetForm();
        } catch (error) {
          console.error("Submission Error:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="card border-0 shadow-sm rounded-4 bg-white p-4">
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
            <h5 className="fw-bold text-dark mb-0">
              {initialData ? "Edit Address" : "Add New Address"}
            </h5>
            {showCancel && (
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary rounded-3 px-3 shadow-none"
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
          </div>

          {/* ADDRESS TYPE TAG */}
          <div className="mb-3">
            <label className="form-label text-dark fw-medium small mb-1">
              Address Type
            </label>
            <div className="d-flex gap-3">
              {["Home", "Office", "Other"].map((type) => (
                <label
                  key={type}
                  className="d-flex align-items-center gap-2 cursor-pointer small text-dark"
                  style={{ cursor: "pointer" }}
                >
                  <Field
                    type="radio"
                    name="addressType"
                    value={type}
                    className="form-check-input m-0 shadow-none"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* NAME + PHONE */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label text-dark fw-medium small mb-1">
                Full Name *
              </label>
              <Field
                name="fullname"
                className="form-control rounded-3 px-3 shadow-none"
                style={{ height: "44px", borderColor: "#e2e8f0" }}
                placeholder="Enter full name"
              />
              <ErrorMessage
                name="fullname"
                component="div"
                className="text-danger extra-small mt-1"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-dark fw-medium small mb-1">
                Mobile Number *
              </label>
              <Field
                name="phone"
                className="form-control rounded-3 px-3 shadow-none"
                style={{ height: "44px", borderColor: "#e2e8f0" }}
                placeholder="10-digit mobile number"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-danger extra-small mt-1"
              />
            </div>
          </div>

          {/* FULL ADDRESS */}
          <div className="mb-3">
            <label className="form-label text-dark fw-medium small mb-1">
              Full Address *
            </label>
            <Field
              as="textarea"
              name="address"
              rows="3"
              className="form-control rounded-3 p-3 shadow-none"
              style={{ borderColor: "#e2e8f0", resize: "none" }}
              placeholder="House no, street, area"
            />
            <ErrorMessage
              name="address"
              component="div"
              className="text-danger extra-small mt-1"
            />
          </div>

          {/* CITY + STATE */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label text-dark fw-medium small mb-1">
                City *
              </label>
              <Field
                name="city"
                className="form-control rounded-3 px-3 shadow-none"
                style={{ height: "44px", borderColor: "#e2e8f0" }}
                placeholder="Enter city"
              />
              <ErrorMessage
                name="city"
                component="div"
                className="text-danger extra-small mt-1"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-dark fw-medium small mb-1">
                State *
              </label>
              <Field
                name="state"
                className="form-control rounded-3 px-3 shadow-none"
                style={{ height: "44px", borderColor: "#e2e8f0" }}
                placeholder="Enter state"
              />
              <ErrorMessage
                name="state"
                component="div"
                className="text-danger extra-small mt-1"
              />
            </div>
          </div>

          {/* PINCODE */}
          <div className="mb-4">
            <label className="form-label text-dark fw-medium small mb-1">
              Pincode *
            </label>
            <Field
              name="pincode"
              className="form-control rounded-3 px-3 shadow-none"
              style={{ height: "44px", borderColor: "#e2e8f0" }}
              placeholder="6-digit pincode"
            />
            <ErrorMessage
              name="pincode"
              component="div"
              className="text-danger extra-small mt-1"
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="d-flex justify-content-between align-items-center gap-3 pt-2">
            {showCancel && (
              <button
                type="button"
                className="btn btn-outline-dark rounded-3 px-4 fw-medium shadow-none d-flex align-items-center gap-1"
                style={{ height: "44px" }}
                onClick={onCancel}
              >
                <KeyboardBackspaceIcon sx={{ fontSize: 18 }} /> Back
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-dark rounded-3 px-4 fw-medium shadow-none ms-auto"
              style={{ height: "44px" }}
            >
              {isSubmitting
                ? "Saving..."
                : initialData
                  ? "Update Address"
                  : "Save & Continue"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
