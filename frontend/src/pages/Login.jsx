import React, { useState, useContext } from "react";
import Title from "../components/Title";
import { authService } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { ShopContext } from "../context/ShopContext";

export default function Login() {
  const { setToken } = useContext(ShopContext);
  const [currentState, setCurrentState] = useState("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currentState == "login") {
      try {
        const data = await authService.login(email, password);
        console.log(data);
        if (data.success && data.token) {
          localStorage.setItem("token", data.token);

          setToken(data.token);

          toast.success("Login Successful");

          navigate("/");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      try {
        const data = await authService.register(username, email, password);

        if (data.success && data.token) {
          localStorage.setItem("token", data.token);

          setToken(data.token);

          toast.success("Register Successful");

          setTimeout(() => {
            setCurrentState("login");
          }, 1500);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
