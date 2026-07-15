import React, { useRef, useState } from "react";
import { Hue } from "@uiw/react-color";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

function hsvaToHex(hsva) {
  const { h, s, v } = hsva;
  const c = (v / 100) * (s / 100);
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = (v / 100) - c;

  let r, g, b;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = (val) =>
    Math.round((val + m) * 255)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase();

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function getHueColor(h) {
  const c = 100;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let r, g, b;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = (val) =>
    Math.round(val * 2.55)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase();

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export default function ProductColorVariants({
  selectedColors = [],
  setSelectedColors,
  hsva = { h: 0, s: 100, v: 100, a: 1 },
  setHsva,
  hexColor = "#ffffff",
  setHexColor,
}) {
  const padRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleAddColorToProduct = () => {
    const cleanHex = hexColor.toLowerCase();
    if (selectedColors.includes(cleanHex)) return;
    setSelectedColors([...selectedColors, cleanHex]);
  };

  const handleRemoveColor = (colorToRemove) => {
    setSelectedColors(selectedColors.filter((c) => c !== colorToRemove));
  };

  const handlePadClick = (e) => {
    if (!padRef.current) return;

    const rect = padRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const saturation = Math.round((x / rect.width) * 100);
    const brightness = Math.round(100 - (y / rect.height) * 100);

    const newHsva = {
      ...hsva,
      s: Math.max(0, Math.min(100, saturation)),
      v: Math.max(0, Math.min(100, brightness)),
    };

    setHsva(newHsva);
    setHexColor(hsvaToHex(newHsva));
  };

  const handlePadMouseDown = () => {
    setIsDragging(true);
  };

  const handlePadMouseMove = (e) => {
    if (!isDragging || !padRef.current) return;
    handlePadClick(e);
  };

  const handlePadMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-100">
      {/* Selected Color Badges */}
      <div className="mb-3">
        <div
          className="d-flex align-items-center flex-wrap gap-2"
          style={{ minHeight: "36px" }}
        >
          {selectedColors.length === 0 ? (
            <span
              className="text-muted small fst-italic"
              style={{ fontSize: "0.85rem" }}
            >
              No colors assigned yet. Use the picker below.
            </span>
          ) : (
            selectedColors.map((color) => (
              <span
                key={color}
                className="d-inline-flex align-items-center gap-2 px-2 py-1 rounded-3 border bg-light font-monospace"
                style={{ fontSize: "0.8rem", borderColor: "#e2e8f0" }}
              >
                <span
                  className="rounded-circle border d-block"
                  style={{
                    width: "14px",
                    height: "14px",
                    background: color,
                    borderColor: "rgba(0,0,0,0.1)",
                  }}
                />
                <span className="text-uppercase fw-semibold">{color}</span>
                <CloseIcon
                  sx={{ fontSize: 14, cursor: "pointer" }}
                  className="text-danger ms-1"
                  onClick={() => handleRemoveColor(color)}
                />
              </span>
            ))
          )}
        </div>
      </div>

      {/* Color Picker Box */}
      <div className="p-3 bg-light rounded-4 border border-light d-flex flex-column gap-3">
        <div
          className="d-flex align-items-center gap-3 border-bottom pb-3"
          style={{ borderColor: "rgba(0,0,0,0.05)" }}
        >
          <div
            className="rounded-3 border shadow-sm"
            style={{
              width: "48px",
              height: "48px",
              background: hexColor,
              borderColor: "#cbd5e1",
            }}
          />
          <div>
            <span
              className="text-muted d-block"
              style={{ fontSize: "0.75rem" }}
            >
              Active Custom Spec
            </span>
            <h6
              className="font-monospace text-dark text-uppercase fw-bold mb-0"
              style={{ fontSize: "1rem" }}
            >
              {hexColor}
            </h6>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm rounded-3 d-flex align-items-center justify-content-center gap-1 ms-auto shadow-none fw-medium"
            style={{ height: "36px", fontSize: "0.8rem" }}
            onClick={handleAddColorToProduct}
          >
            <AddIcon sx={{ fontSize: 16 }} />
            <span>Assign Variant</span>
          </button>
        </div>

        {/* Custom Saturation Pad */}
        <div className="d-flex justify-content-center">
          <div
            ref={padRef}
            onMouseDown={handlePadMouseDown}
            onMouseMove={handlePadMouseMove}
            onMouseUp={handlePadMouseUp}
            onMouseLeave={handlePadMouseUp}
            onClick={handlePadClick}
            style={{
              width: "100%",
              maxWidth: "250px",
              height: "200px",
              borderRadius: "8px",
              background: `linear-gradient(to right, white 0%, ${getHueColor(
                hsva.h
              )} 100%), linear-gradient(to top, black 0%, transparent 100%)`,
              cursor: "crosshair",
              position: "relative",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                border: "2px solid white",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
                left: `${hsva.s}%`,
                top: `${100 - hsva.v}%`,
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* Hue Slider */}
        <div>
          <label
            className="form-label text-muted fw-semibold text-uppercase mb-2"
            style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
          >
            Hue
          </label>
          <Hue
            hue={hsva.h}
            onChange={(color) => {
              const newHsva = { ...hsva, h: color.h };
              setHsva(newHsva);
              setHexColor(hsvaToHex(newHsva));
            }}
            style={{
              width: "100%",
              height: "12px",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* Brightness Slider */}
        <div>
          <label
            className="form-label text-muted fw-semibold text-uppercase mb-2"
            style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
          >
            Brightness ({hsva.v}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={hsva.v}
            onChange={(e) => {
              const newV = parseInt(e.target.value);
              const newHsva = { ...hsva, v: newV };
              setHsva(newHsva);
              setHexColor(hsvaToHex(newHsva));
            }}
            className="form-range"
            style={{ cursor: "pointer" }}
          />
        </div>

        {/* Saturation Slider */}
        <div>
          <label
            className="form-label text-muted fw-semibold text-uppercase mb-2"
            style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
          >
            Saturation ({hsva.s}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={hsva.s}
            onChange={(e) => {
              const newS = parseInt(e.target.value);
              const newHsva = { ...hsva, s: newS };
              setHsva(newHsva);
              setHexColor(hsvaToHex(newHsva));
            }}
            className="form-range"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}
