import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Title from "./Title";
import { toast } from "react-toastify";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EastIcon from "@mui/icons-material/East";
import { ShopContext } from "../context/ShopContext";

export default function Address() {
  const { step, setStep } = useContext(ShopContext);
  const validationSchema = Yup.object({
    fullname: Yup.string()
      .min(3, "Minimum 3 characters required")
      .required("Full name is required"),

    phone: Yup.string()
      .matches(/^[0-9]{11}$/, "Mobile number must be exactly 10 digits")
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

  return (
    <div className="pt-5 container ">
      {/* TITLE */}
      <div className="text-center mb-4 ">
        <Title text1="DELIVERY" text2="ADDRESS" />
      </div>

      <Formik
        initialValues={{
          fullname: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Address Data:", values);
          toast.success("Address saved successfully 🚀");
          setStep(step + 1);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="card m-5">
            {/* NAME + PHONE */}
            <div className="row px-5 pt-4 ">
              <div className="col-md-6 mb-3">
                <label>Full Name *</label>
                <Field
                  name="fullname"
                  className="form-control"
                  placeholder="Enter full name"
                />
                <ErrorMessage
                  name="fullname"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Mobile Number *</label>
                <Field
                  name="phone"
                  className="form-control"
                  placeholder="10-digit mobile number"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            {/* ADDRESS */}
            <div className="mb-3 px-5">
              <label>Full Address *</label>
              <Field
                as="textarea"
                name="address"
                rows="3"
                className="form-control"
                placeholder="House no, street, area"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-danger"
              />
            </div>

            {/* CITY + STATE */}
            <div className="row px-5">
              <div className="col-md-6 mb-3 ">
                <label>City *</label>
                <Field
                  name="city"
                  className="form-control"
                  placeholder="Enter city"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>State *</label>
                <Field
                  name="state"
                  className="form-control"
                  placeholder="Enter state"
                />
                <ErrorMessage
                  name="state"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            {/* PINCODE */}
            <div className="mb-4 px-5">
              <label>Pincode *</label>
              <Field
                name="pincode"
                className="form-control"
                placeholder="6-digit pincode"
              />
              <ErrorMessage
                name="pincode"
                component="div"
                className="text-danger"
              />
            </div>

            {/* SUBMIT */}
            <div className="d-flex gap-4 p-3">
              <button
                onClick={() => {
                  setStep(step - 1);
                }}
                className="btn btn-dark w-100 mt-3 fs-6"
              >
                <KeyboardBackspaceIcon /> Back to Cart
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-dark w-100 mt-3 fs-6"
              >
                Save & Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
