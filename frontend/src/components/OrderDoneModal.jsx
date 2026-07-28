import React, { useState, useEffect } from "react";

// 10 HIGH-END LUXURY ANIMATION STYLES
const PREMIUM_ANIMATION_STYLES = [
  {
    id: "emerald-halo",
    name: "1. Emerald Halo & Pulse",
    icon: "✓",
    css: `
      .anim-stage { position: relative; width: 90px; height: 90px; }
      .emerald-halo-ring {
        position: absolute; inset: 0; border-radius: 50%;
        border: 2px solid #10b981;
        animation: ringExpand 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
      }
      .emerald-core-badge {
        width: 100%; height: 100%; border-radius: 50%;
        background: linear-gradient(135deg, #10b981 0%, #047857 100%);
        color: white; font-size: 42px; font-weight: bold;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 12px 30px rgba(16, 185, 129, 0.45);
        animation: coreFloat 2.5s ease-in-out infinite;
      }
      @keyframes ringExpand {
        0% { transform: scale(0.85); opacity: 0.9; }
        100% { transform: scale(1.6); opacity: 0; }
      }
      @keyframes coreFloat {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-6px) scale(1.03); }
      }
    `,
  },
  {
    id: "gold-trophy-royal",
    name: "2. Royal Gold Cup & Sparkles",
    icon: "🏆",
    css: `
      .anim-stage {
        font-size: 70px; position: relative;
        filter: drop-shadow(0 15px 20px rgba(245, 158, 11, 0.4));
        animation: royalFloat 2.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
      }
      .sparkle-dot {
        position: absolute; width: 8px; height: 8px; border-radius: 50%;
        background: #fbbf24; box-shadow: 0 0 10px #fbbf24;
      }
      .sp-1 { top: -5px; left: 10px; animation: sparkleFlash 1.5s infinite 0.2s; }
      .sp-2 { bottom: 5px; right: 10px; animation: sparkleFlash 1.5s infinite 0.7s; }
      @keyframes royalFloat {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-12px) rotate(-3deg); }
      }
      @keyframes sparkleFlash {
        0%, 100% { opacity: 0; transform: scale(0.4); }
        50% { opacity: 1; transform: scale(1.4); }
      }
    `,
  },
  {
    id: "neon-stroke-drawing",
    name: "3. Neon Emerald Drawing Path",
    icon: null,
    css: `
      .anim-stage { width: 90px; height: 90px; filter: drop-shadow(0 0 12px rgba(16, 185, 129, 0.6)); }
      .neon-circle {
        stroke-dasharray: 166; stroke-dashoffset: 166; stroke-width: 3.5;
        stroke: #10b981; fill: none;
        animation: neonCircleDraw 2s ease-in-out infinite;
      }
      .neon-check {
        stroke-dasharray: 48; stroke-dashoffset: 48; stroke-width: 4;
        stroke: #34d399; fill: none; stroke-linecap: round;
        animation: neonCheckDraw 2s ease-in-out infinite;
      }
      @keyframes neonCircleDraw {
        0% { stroke-dashoffset: 166; }
        50%, 100% { stroke-dashoffset: 0; }
      }
      @keyframes neonCheckDraw {
        0%, 25% { stroke-dashoffset: 48; }
        70%, 100% { stroke-dashoffset: 0; }
      }
    `,
  },
  {
    id: "3d-card-glass",
    name: "4. Glassmorphism Check Card",
    icon: "💳",
    css: `
      .anim-stage {
        font-size: 65px;
        background: rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(10px);
        padding: 12px 24px; border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.4);
        box-shadow: 0 15px 35px rgba(0,0,0,0.08);
        animation: glassCardTilt 2.4s ease-in-out infinite;
      }
      @keyframes glassCardTilt {
        0%, 100% { transform: perspective(400px) rotateY(-8deg) rotateX(4deg); }
        50% { transform: perspective(400px) rotateY(8deg) rotateX(-4deg); }
      }
    `,
  },
  {
    id: "diamond-starburst",
    name: "5. Diamond Starburst Shimmer",
    icon: "💎",
    css: `
      .anim-stage {
        font-size: 70px;
        filter: drop-shadow(0 10px 20px rgba(59, 130, 246, 0.35));
        animation: diamondShimmer 2.2s ease-in-out infinite;
      }
      @keyframes diamondShimmer {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(5deg); }
        75% { transform: scale(1.1) rotate(-5deg); }
      }
    `,
  },
  {
    id: "cyber-hyper-express",
    name: "6. Cyber Express Delivery",
    icon: "🚀",
    css: `
      .anim-stage {
        font-size: 70px;
        filter: drop-shadow(0 15px 25px rgba(99, 102, 241, 0.45));
        animation: rocketHover 1.8s ease-in-out infinite;
      }
      @keyframes rocketHover {
        0% { transform: translateY(10px) rotate(-5deg); }
        50% { transform: translateY(-12px) rotate(5deg) scale(1.08); }
        100% { transform: translateY(10px) rotate(-5deg); }
      }
    `,
  },
  {
    id: "luxury-gift-box",
    name: "7. Platinum Gift Unboxing",
    icon: "🎁",
    css: `
      .anim-stage {
        font-size: 70px;
        filter: drop-shadow(0 12px 25px rgba(236, 72, 153, 0.4));
        animation: giftUnbox 1.9s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
      }
      @keyframes giftUnbox {
        0%, 100% { transform: scale(1) rotate(0deg); }
        30% { transform: scale(1.15) rotate(-8deg); }
        60% { transform: scale(1.15) rotate(8deg); }
      }
    `,
  },
  {
    id: "golden-confetti-burst",
    name: "8. Celebration Popper Stream",
    icon: "🎉",
    css: `
      .anim-stage {
        font-size: 70px;
        filter: drop-shadow(0 12px 25px rgba(139, 92, 246, 0.4));
        animation: popperStream 1.6s ease-in-out infinite;
      }
      @keyframes popperStream {
        0%, 100% { transform: scale(1) translateY(0); }
        50% { transform: scale(1.2) translateY(-10px); }
      }
    `,
  },
  {
    id: "gradient-shield-check",
    name: "9. Quantum Verified Shield",
    icon: "🛡️",
    css: `
      .anim-stage {
        font-size: 70px;
        filter: drop-shadow(0 12px 25px rgba(20, 184, 166, 0.4));
        animation: shieldPulse 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      }
      @keyframes shieldPulse {
        0%, 100% { transform: scale(1) rotateY(0deg); }
        50% { transform: scale(1.12) rotateY(180deg); }
      }
    `,
  },
  {
    id: "infinity-glow-heart",
    name: "10. Premium Heartbeat Glow",
    icon: "💖",
    css: `
      .anim-stage {
        font-size: 70px;
        filter: drop-shadow(0 15px 30px rgba(239, 68, 68, 0.45));
        animation: heartGlow 1.4s ease-in-out infinite;
      }
      @keyframes heartGlow {
        0%, 100% { transform: scale(1); }
        15% { transform: scale(1.22); }
        30% { transform: scale(1); }
        45% { transform: scale(1.18); }
      }
    `,
  },
];

export default function OrderDoneModal({ show, orderDetails, handleClose }) {
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);

  // Pick a random luxury style every time the modal opens
  useEffect(() => {
    if (show) {
      const randomIndex = Math.floor(
        Math.random() * PREMIUM_ANIMATION_STYLES.length,
      );
      setCurrentStyleIndex(randomIndex);
    }
  }, [show]);

  if (!show) return null;

  const currentStyle = PREMIUM_ANIMATION_STYLES[currentStyleIndex];

  // Cycle through styles manually
  const handleNextStyle = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * PREMIUM_ANIMATION_STYLES.length);
    } while (nextIndex === currentStyleIndex);
    setCurrentStyleIndex(nextIndex);
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        zIndex: 9999,
        backdropFilter: "blur(8px)",
      }}
      onClick={handleClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 rounded-4 shadow-lg text-center p-4 overflow-hidden position-relative bg-white">
          {/* TOP CONTROLS & STYLE PICKER */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span
              className="badge bg-light text-dark border fw-semibold px-2 py-1 small"
              style={{ fontSize: "0.72rem" }}
            >
              {currentStyle.name}
            </span>
            <button
              type="button"
              onClick={handleNextStyle}
              className="btn btn-outline-dark btn-sm py-1 px-3 rounded-pill fw-medium"
              style={{ fontSize: "0.75rem" }}
            >
              ✨ Next Style
            </button>
          </div>

          {/* DYNAMIC ANIMATED HERO STAGE */}
          <div
            className="d-flex justify-content-center my-4 align-items-center position-relative"
            style={{ minHeight: "110px" }}
          >
            {currentStyle.id === "emerald-halo" ? (
              <div className="anim-stage">
                <div className="emerald-halo-ring"></div>
                <div className="emerald-core-badge">{currentStyle.icon}</div>
              </div>
            ) : currentStyle.id === "gold-trophy-royal" ? (
              <div className="anim-stage">
                <div className="sparkle-dot sp-1"></div>
                <div className="sparkle-dot sp-2"></div>
                {currentStyle.icon}
              </div>
            ) : currentStyle.id === "neon-stroke-drawing" ? (
              <div className="anim-stage">
                <svg viewBox="0 0 52 52" className="w-100 h-100">
                  <circle className="neon-circle" cx="26" cy="26" r="25" />
                  <path
                    className="neon-check"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </div>
            ) : (
              <div className="anim-stage">{currentStyle.icon}</div>
            )}
          </div>

          {/* HEADINGS & SUCCESS TEXT */}
          <h4 className="fw-bold text-dark mb-1 tracking-tight">
            Order Placed Successfully
          </h4>
          <p className="text-muted small mb-4" style={{ lineHeight: "1.5" }}>
            We've received your order and are preparing it for shipment.
          </p>

          {/* ORDER DETAILS SUMMARY CARD */}
          {orderDetails && (
            <div className="bg-light p-3 rounded-3 text-start mb-4 border border-light-subtle shadow-sm">
              <div className="d-flex justify-content-between small text-secondary mb-1">
                <span>Order ID:</span>
                <strong className="text-dark">#{orderDetails._id}</strong>
              </div>
              <div className="d-flex justify-content-between small text-secondary mb-1">
                <span>Payment Method:</span>
                <strong className="text-dark">
                  {orderDetails.paymentMethod}
                </strong>
              </div>
              <div className="d-flex justify-content-between small text-secondary">
                <span>Total Amount Paid:</span>
                <strong className="text-success fs-6 fw-bold">
                  ₹{orderDetails.totalAmount || orderDetails.total || 0}
                </strong>
              </div>
            </div>
          )}

          {/* ACTION CTA BUTTON */}
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-dark w-100 rounded-3 py-2.5 fw-bold shadow-sm"
          >
            View Order Details
          </button>
        </div>
      </div>

      {/* DYNAMICALLY INJECTED STYLES FOR THE ACTIVE ANIMATION */}
      <style>{currentStyle.css}</style>
    </div>
  );
}
