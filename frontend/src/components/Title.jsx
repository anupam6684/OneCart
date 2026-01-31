import React from "react";

export default function Title({ text1, text2 }) {
  return (
    <div className="text-center my-2">
      <h2 className="fw-semibold text-uppercase ">
        {text1} <span className="text-danger fw-bold">{text2}</span>
      </h2>

      <div className="d-flex justify-content-center">
        <div
          className="bg-danger "
          style={{ width: "200px", height: "2.5px" }}
        ></div>
      </div>
    </div>
  );
}
