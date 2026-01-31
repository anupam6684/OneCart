import React, { useState } from "react";
import { toast } from "react-toastify";
export default function SubscribeBox() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email); // This will log the input value

    toast.success(`Subscribed with: ${email}`);
  };

  return (
    <div className="text-center pt-3 pb-5 px-3">
      <h1 className="mb-3 fs-3 fs-md-4">Subscribe now & get 20% off</h1>
      <p className="text-secondary mb-4 fs-6 fs-md-5">
        Subscribe to OneCart and be the first to receive exclusive deals,
        special offers, and the latest product updates
      </p>

      <form
        className="d-flex justify-content-center flex-column flex-sm-row gap-2"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="form-control flex-grow-1"
          style={{ minWidth: "350px", maxWidth: "600px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn btn-dark px-4">
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
}
