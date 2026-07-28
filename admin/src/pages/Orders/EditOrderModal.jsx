import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

// Material UI Icons
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

// Validation Schema using Yup
const editOrderSchema = Yup.object().shape({
  customer: Yup.string().required("Customer name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  orderStatus: Yup.string().required("Status is required"),
  paymentMethod: Yup.string().required("Payment method is required"),
  paymentStatus: Yup.string().required("Payment status is required"),
  shippingAddress: Yup.object().shape({
    fullname: Yup.string().required("Full name is required"),
    phone: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    pincode: Yup.string().required("Pincode is required"),
  }),
  items: Yup.array()
    .of(
      Yup.object().shape({
        quantity: Yup.number().min(1, "Min quantity is 1").required("Required"),
        price: Yup.number().required("Required"),
      }),
    )
    .min(1, "Order must contain at least one item"),
  shippingCharge: Yup.number().min(0, "Cannot be negative"),
  discount: Yup.number().min(0, "Cannot be negative"),
});

export default function EditOrderModal({
  show,
  selectedOrder,
  handleClose,
  handleSave,
}) {
  if (!show || !selectedOrder) return null;

  // Initial Values Formik setup
  const initialValues = {
    customer: selectedOrder.customer || "",
    email: selectedOrder.email || "",
    orderStatus: selectedOrder.orderStatus || "PENDING",
    paymentMethod: selectedOrder.paymentMethod || "COD",
    paymentStatus: selectedOrder.paymentStatus || "PENDING",
    shippingAddress: {
      fullname: selectedOrder.shippingAddress?.fullname || "",
      phone: selectedOrder.shippingAddress?.phone || "",
      address: selectedOrder.shippingAddress?.address || "",
      city: selectedOrder.shippingAddress?.city || "",
      state: selectedOrder.shippingAddress?.state || "",
      pincode: selectedOrder.shippingAddress?.pincode || "",
    },
    items: selectedOrder.items || [],
    shippingCharge: selectedOrder.shippingCharge ?? 40,
    discount: selectedOrder.discount ?? 0,
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    // Dynamic Subtotal & Total Amount Calculation
    const subTotal = values.items.reduce(
      (sum, item) =>
        sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0,
    );

    const totalAmount = Math.max(
      0,
      subTotal +
        Number(values.shippingCharge || 0) -
        Number(values.discount || 0),
    );

    // Prepare complete payload
    const payload = {
      ...values,
      items: values.items.map((item) => ({
        ...item,
        total: (Number(item.price) || 0) * (Number(item.quantity) || 1),
      })),
      subTotal,
      totalAmount,
    };

    try {
      await handleSave(selectedOrder._id, payload);
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(15, 23, 42, 0.65)", zIndex: 1055 }}
      onClick={handleClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-content border-0 rounded-4 shadow-lg overflow-hidden d-flex flex-column"
          style={{ maxHeight: "90vh" }}
        >
          {/* Modal Header */}
          <div className="modal-header border-bottom p-3 px-4 bg-light flex-shrink-0">
            <div>
              <h5 className="modal-title fw-bold text-dark mb-0">
                Edit Order Details
              </h5>
              <span className="text-muted small" style={{ fontSize: "0.8rem" }}>
                ID: {selectedOrder._id}
              </span>
            </div>
            <button
              type="button"
              className="btn-close shadow-none"
              onClick={handleClose}
            ></button>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={editOrderSchema}
            onSubmit={handleFormSubmit}
            enableReinitialize
          >
            {({ values, errors, touched, isSubmitting }) => {
              // Live Calculations
              const currentSubTotal = values.items.reduce(
                (sum, item) =>
                  sum +
                  (Number(item.price) || 0) * (Number(item.quantity) || 1),
                0,
              );

              const currentTotalAmount = Math.max(
                0,
                currentSubTotal +
                  Number(values.shippingCharge || 0) -
                  Number(values.discount || 0),
              );

              return (
                <Form
                  id="editOrderForm"
                  className="d-flex flex-column flex-grow-1 overflow-hidden"
                >
                  {/* Modal Body (Scrollable Area) */}
                  <div
                    className="modal-body p-4 flex-grow-1 overflow-y-auto"
                    style={{ backgroundColor: "#fafafa" }}
                  >
                    <div className="row g-4">
                      {/* Left Column: Customer, Address, Items */}
                      <div className="col-12 col-lg-7">
                        {/* Customer Info */}
                        <div className="card border-0 rounded-3 p-3 bg-white shadow-sm mb-3">
                          <div className="d-flex align-items-center gap-2 mb-3 text-primary">
                            <PersonOutlinedIcon sx={{ fontSize: 20 }} />
                            <h6 className="fw-bold mb-0 text-dark">
                              Customer Details
                            </h6>
                          </div>
                          <div className="row g-3">
                            <div className="col-12 col-md-6">
                              <label className="form-label text-muted small fw-medium mb-1">
                                Customer Name
                              </label>
                              <Field
                                name="customer"
                                type="text"
                                className={`form-control form-control-sm rounded-2 shadow-none ${
                                  errors.customer && touched.customer
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                            </div>
                            <div className="col-12 col-md-6">
                              <label className="form-label text-muted small fw-medium mb-1">
                                Email
                              </label>
                              <Field
                                name="email"
                                type="email"
                                className={`form-control form-control-sm rounded-2 shadow-none ${
                                  errors.email && touched.email
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="card border-0 rounded-3 p-3 bg-white shadow-sm mb-3">
                          <div className="d-flex align-items-center gap-2 mb-3 text-danger">
                            <HomeOutlinedIcon sx={{ fontSize: 20 }} />
                            <h6 className="fw-bold mb-0 text-dark">
                              Shipping Address
                            </h6>
                          </div>
                          <div className="row g-2">
                            <div className="col-12 col-md-6">
                              <Field
                                name="shippingAddress.fullname"
                                placeholder="Full Name"
                                className="form-control form-control-sm rounded-2 shadow-none"
                              />
                            </div>
                            <div className="col-12 col-md-6">
                              <Field
                                name="shippingAddress.phone"
                                placeholder="Phone Number"
                                className="form-control form-control-sm rounded-2 shadow-none"
                              />
                            </div>
                            <div className="col-12">
                              <Field
                                name="shippingAddress.address"
                                placeholder="Street Address"
                                className="form-control form-control-sm rounded-2 shadow-none"
                              />
                            </div>
                            <div className="col-12 col-md-4">
                              <Field
                                name="shippingAddress.city"
                                placeholder="City"
                                className="form-control form-control-sm rounded-2 shadow-none"
                              />
                            </div>
                            <div className="col-12 col-md-4">
                              <Field
                                name="shippingAddress.state"
                                placeholder="State"
                                className="form-control form-control-sm rounded-2 shadow-none"
                              />
                            </div>
                            <div className="col-12 col-md-4">
                              <Field
                                name="shippingAddress.pincode"
                                placeholder="Pincode"
                                className="form-control form-control-sm rounded-2 shadow-none"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Order Items FieldArray with Scroll Constraint */}
                        <div className="card border-0 rounded-3 p-3 bg-white shadow-sm">
                          <div className="d-flex align-items-center gap-2 mb-3 text-secondary">
                            <LocalMallOutlinedIcon sx={{ fontSize: 20 }} />
                            <h6 className="fw-bold mb-0 text-dark">
                              Order Items ({values.items.length})
                            </h6>
                          </div>

                          <FieldArray name="items">
                            {({ remove }) => (
                              <div
                                className="table-responsive"
                                style={{
                                  maxHeight: "260px",
                                  overflowY: "auto",
                                }}
                              >
                                <table className="table align-middle table-borderless mb-0">
                                  <thead className="border-bottom sticky-top bg-white">
                                    <tr
                                      className="text-muted small"
                                      style={{ fontSize: "0.75rem" }}
                                    >
                                      <th>Product</th>
                                      <th>Size</th>
                                      <th>Price</th>
                                      <th style={{ width: "80px" }}>Qty</th>
                                      <th className="text-end">Total</th>
                                      <th className="text-center">Del</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {values.items.map((item, idx) => (
                                      <tr
                                        key={item._id || idx}
                                        className="border-bottom"
                                      >
                                        <td>
                                          <div className="d-flex align-items-center gap-2">
                                            <img
                                              src={
                                                Array.isArray(item.image)
                                                  ? item.image[0]
                                                  : item.image ||
                                                    "https://via.placeholder.com/36"
                                              }
                                              alt={item.name}
                                              className="rounded-2 object-fit-cover"
                                              style={{
                                                width: "36px",
                                                height: "36px",
                                                backgroundColor: "#f8fafc",
                                              }}
                                            />
                                            <span
                                              className="small fw-medium text-dark text-truncate"
                                              style={{ maxWidth: "120px" }}
                                            >
                                              {item.name}
                                            </span>
                                          </div>
                                        </td>
                                        <td>
                                          <span className="badge bg-light text-dark border">
                                            {item.size || "Free"}
                                          </span>
                                        </td>
                                        <td className="small">₹{item.price}</td>
                                        <td>
                                          <Field
                                            name={`items.${idx}.quantity`}
                                            type="number"
                                            min="1"
                                            className="form-control form-control-sm text-center shadow-none p-1"
                                          />
                                        </td>
                                        <td className="text-end small fw-bold">
                                          ₹
                                          {(item.price || 0) *
                                            (item.quantity || 1)}
                                        </td>
                                        <td className="text-center">
                                          <button
                                            type="button"
                                            onClick={() => {
                                              if (values.items.length <= 1) {
                                                alert(
                                                  "Order must contain at least one item.",
                                                );
                                                return;
                                              }
                                              remove(idx);
                                            }}
                                            className="btn btn-link text-danger p-0 shadow-none"
                                          >
                                            <DeleteOutlineIcon
                                              sx={{ fontSize: 18 }}
                                            />
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </FieldArray>
                        </div>
                      </div>

                      {/* Right Column: Statuses & Calculations */}
                      <div className="col-12 col-lg-5">
                        {/* Statuses Box */}
                        <div className="card border-0 rounded-3 p-3 bg-white shadow-sm mb-3">
                          <div className="d-flex align-items-center gap-2 mb-3 text-warning">
                            <CreditCardOutlinedIcon sx={{ fontSize: 20 }} />
                            <h6 className="fw-bold mb-0 text-dark">
                              Statuses & Gateway
                            </h6>
                          </div>

                          <div className="mb-2">
                            <label className="form-label text-muted small fw-medium mb-1">
                              Order Status
                            </label>
                            <Field
                              as="select"
                              name="orderStatus"
                              className="form-select form-select-sm fw-medium shadow-none"
                            >
                              <option value="PENDING">Pending</option>
                              <option value="CONFIRMED">Confirmed</option>
                              <option value="PACKED">Packed</option>
                              <option value="SHIPPED">Shipped</option>
                              <option value="OUT_FOR_DELIVERY">
                                Out for Delivery
                              </option>
                              <option value="DELIVERED">Delivered</option>
                              <option value="CANCELLED">Cancelled</option>
                            </Field>
                          </div>

                          <div className="mb-2">
                            <label className="form-label text-muted small fw-medium mb-1">
                              Payment Method
                            </label>
                            <Field
                              as="select"
                              name="paymentMethod"
                              className="form-select form-select-sm fw-medium shadow-none"
                            >
                              <option value="COD">COD</option>
                              <option value="RAZORPAY">Razorpay</option>
                              <option value="STRIPE">Stripe</option>
                              <option value="PAYTM">Paytm</option>
                            </Field>
                          </div>

                          <div>
                            <label className="form-label text-muted small fw-medium mb-1">
                              Payment Status
                            </label>
                            <Field
                              as="select"
                              name="paymentStatus"
                              className="form-select form-select-sm fw-medium shadow-none"
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="PAID">PAID</option>
                              <option value="FAILED">FAILED</option>
                            </Field>
                          </div>
                        </div>

                        {/* Pricing Calculation Box */}
                        <div className="card border-0 rounded-3 p-3 bg-white shadow-sm">
                          <h6 className="fw-bold mb-3 text-dark">
                            Pricing Calculation
                          </h6>

                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted small">Subtotal</span>
                            <span className="fw-medium small">
                              ₹{currentSubTotal}
                            </span>
                          </div>

                          <div className="mb-2">
                            <label className="form-label text-muted small fw-medium mb-1">
                              Shipping Charge (₹)
                            </label>
                            <Field
                              name="shippingCharge"
                              type="number"
                              className="form-control form-control-sm shadow-none"
                            />
                          </div>

                          <div className="mb-2">
                            <label className="form-label text-muted small fw-medium mb-1">
                              Discount (₹)
                            </label>
                            <Field
                              name="discount"
                              type="number"
                              className="form-control form-control-sm text-danger shadow-none"
                            />
                          </div>

                          <hr className="my-2" />

                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold text-dark">
                              Total Amount
                            </span>
                            <span className="fw-bold fs-5 text-primary">
                              ₹{currentTotalAmount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ALWAYS VISIBLE STICKY FOOTER */}
                  <div
                    className="modal-footer border-top p-3 bg-white d-flex justify-content-between flex-shrink-0"
                    style={{ position: "sticky", bottom: 0, zIndex: 10 }}
                  >
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm px-4 rounded-3"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary btn-sm px-4 rounded-3 d-flex align-items-center gap-1 fw-bold shadow-sm"
                    >
                      <SaveOutlinedIcon sx={{ fontSize: 18 }} />
                      {isSubmitting ? "Saving..." : "Save Updates"}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

EditOrderModal.propTypes = {
  show: PropTypes.bool.isRequired,
  selectedOrder: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};
