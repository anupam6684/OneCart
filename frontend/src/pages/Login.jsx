import React, { useState } from "react";
import Title from "../components/Title";

export default function Login() {
  const [currentState, setCurrentState] = useState("login");
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div
      className=" d-flex justify-content-center align-items-center"
      style={{ minHeight: "75vh" }}
    >
      <div
        className="card shadow-lg"
        style={{ maxWidth: "900px", width: "100%" }}
      >
        <div className="row g-0">
          {/* Left Image Section */}
          <div className="col-md-6 d-none d-md-block">
            <img
              src="/signup.png"
              alt="login"
              className="img-fluid h-100 w-100"
              style={{
                objectFit: "cover",
                borderRadius: "0.375rem 0 0 0.375rem",
              }}
            />
          </div>

          {/* Right Form Section */}
          <div className="col-md-6 p-4">
            {currentState === "login" ? (
              <Title text1="Welcome" text2="Back" />
            ) : (
              <Title text1="Sign" text2="Up" />
            )}

            <form onSubmit={handleSubmit}>
              {currentState === "login" ? (
                ""
              ) : (
                <div className="mb-2">
                  <label className="form-label">UserName</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter UserName"
                    required
                  />
                </div>
              )}
              <div className="mb-2">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  required
                />
              </div>
              {currentState === "login" ? (
                <span className=" btn">Forgot your password?</span>
              ) : (
                ""
              )}
              {currentState === "login" ? (
                <button className="btn btn-dark w-100 mt-2">Sign In</button>
              ) : (
                <button className="btn btn-dark w-100 mt-2">Sign Up</button>
              )}
              {currentState === "login" ? (
                <p className="text-center mt-3 mb-0">
                  Don’t have an account?{" "}
                  <span
                    className="text-primary btn"
                    onClick={() => setCurrentState("signup")}
                  >
                    Sign up
                  </span>
                </p>
              ) : (
                <p className="text-center mt-3 mb-0">
                  Already have an account?{" "}
                  <span
                    className="text-primary btn"
                    onClick={() => setCurrentState("login")}
                  >
                    Login
                  </span>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
