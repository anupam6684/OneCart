import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Title from "./Title";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SendUsForm() {
  const [sendUsData, setSendUsData] = useState({});

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Minimum 3 characters required")
      .required("Name is required"),

    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email is required"),

    subject: Yup.string().required("Subject is required"),

    message: Yup.string()
      .min(10, "Minimum 10 characters required")
      .required("Message is required"),

    number: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
  });

  return (
    <div
      style={{ minHeight: "750px", backgroundColor: "#F3F3F6" }}
      className="rounded-2 border m-5 p-4"
    >
      <div className="my-5 text-center border-bottom">
        <Title text1="Send" text2="US" />
        <p>
          Have a question or want to work together? Feel free to reach out using
          the form below.
        </p>
      </div>

      <Formik
        initialValues={{
          username: "",
          email: "",
          subject: "",
          message: "",
          number: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          setSendUsData(values);
          toast.success("Message sent successfully 🚀");
          console.log(sendUsData);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="row">
              <div className="col mx-3 p-3">
                <label>Your Name *</label>
                <Field
                  name="username"
                  className="form-control"
                  placeholder="Enter your name"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="col mx-3 p-3">
                <label>Your Email *</label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            <div className="row">
              <div className="col mx-3 p-3">
                <label>Subject *</label>
                <Field
                  name="subject"
                  className="form-control"
                  placeholder="Enter subject"
                />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="col mx-3 p-3">
                <label>Mobile Number *</label>
                <Field
                  type="tel"
                  name="number"
                  className="form-control"
                  placeholder="10-digit mobile number"
                />
                <ErrorMessage
                  name="number"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            <div className="mx-3 pt-2 mb-3">
              <label>Your Message *</label>
              <Field
                as="textarea"
                name="message"
                rows="4"
                className="form-control"
                placeholder="Write your message here..."
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-danger"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-dark w-25 d-block mx-auto mt-5"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
