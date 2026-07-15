import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const NUMERIC_SIZES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const TEXT_SIZES = ["S", "M", "L", "XL", "XXL", "Free"];

export default function ProductSizeVariants({
  selectedSizes = [],
  setSelectedSizes,
  currentSize = "M",
  setCurrentSize,
}) {
  const [showPicker, setShowPicker] = useState(false);
  const [expandNumeric, setExpandNumeric] = useState(true);
  const [expandText, setExpandText] = useState(true);

  const handleSelectSize = (size) => {
    setCurrentSize(size);
    if (!selectedSizes.includes(size)) {
      setSelectedSizes([...selectedSizes, size]);
      setShowPicker(false);
    }
  };

  const handleRemoveSize = (sizeToRemove) => {
    setSelectedSizes(selectedSizes.filter((s) => s !== sizeToRemove));
  };

  return (
    <div className="w-100">
      {/* Selected Size Badges */}
      <div className="mb-3">
        <div
          className="d-flex align-items-center flex-wrap gap-2"
          style={{ minHeight: "36px" }}
        >
          {selectedSizes.length === 0 ? (
            <span
              className="text-muted small fst-italic"
              style={{ fontSize: "0.85rem" }}
            >
              No sizes assigned yet.
            </span>
          ) : (
            selectedSizes.map((size) => (
              <span
                key={size}
                className="d-inline-flex align-items-center gap-2 px-2 py-1 rounded-3 border bg-light font-monospace"
                style={{ fontSize: "0.8rem", borderColor: "#e2e8f0" }}
              >
                <span className="text-uppercase fw-semibold">{size}</span>
                <CloseIcon
                  sx={{ fontSize: 14, cursor: "pointer" }}
                  className="text-danger ms-1"
                  onClick={() => handleRemoveSize(size)}
                />
              </span>
            ))
          )}
        </div>
      </div>

      {/* Add Size Button */}
      <button
        type="button"
        className="btn btn-primary btn-sm rounded-3 d-flex align-items-center justify-content-center gap-1 shadow-none fw-medium"
        style={{ height: "36px", fontSize: "0.8rem" }}
        onClick={() => setShowPicker(!showPicker)}
      >
        <AddIcon sx={{ fontSize: 16 }} />
        <span>{showPicker ? "Close" : "Add Size"}</span>
      </button>

      {/* Size Picker Box - Only show when expanded */}
      {showPicker && (
        <div className="p-3 bg-light rounded-4 border border-light d-flex flex-column gap-3 mt-3">
          {/* Numeric Sizes Section */}
          <div>
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none text-dark fw-semibold text-start w-100 mb-2"
              onClick={() => setExpandNumeric(!expandNumeric)}
              style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
            >
              <span className="text-uppercase">Numeric Sizes</span>
              <span className="ms-2 text-muted" style={{ fontSize: "0.8em" }}>
                {expandNumeric ? "−" : "+"}
              </span>
            </button>
            {expandNumeric && (
              <div className="d-flex gap-2 flex-wrap">
                {NUMERIC_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`btn btn-sm rounded-3 fw-semibold ${
                      selectedSizes.includes(size)
                        ? "btn-primary disabled"
                        : "btn-outline-secondary"
                    }`}
                    style={{ fontSize: "0.8rem", padding: "6px 14px" }}
                    onClick={() => handleSelectSize(size)}
                    disabled={selectedSizes.includes(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Text Sizes Section */}
          <div>
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none text-dark fw-semibold text-start w-100 mb-2"
              onClick={() => setExpandText(!expandText)}
              style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
            >
              <span className="text-uppercase">Text Sizes</span>
              <span className="ms-2 text-muted" style={{ fontSize: "0.8em" }}>
                {expandText ? "−" : "+"}
              </span>
            </button>
            {expandText && (
              <div className="d-flex gap-2 flex-wrap">
                {TEXT_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`btn btn-sm rounded-3 fw-semibold ${
                      selectedSizes.includes(size)
                        ? "btn-primary disabled"
                        : "btn-outline-secondary"
                    }`}
                    style={{ fontSize: "0.8rem", padding: "6px 14px" }}
                    onClick={() => handleSelectSize(size)}
                    disabled={selectedSizes.includes(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
