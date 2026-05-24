import React, { useState } from "react";

// Material UI Icons for Notifications & FAQs management
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";

export default function FAQs() {
  // Top Analytics Row Dataset Mapping Matrix
  const overviewCards = [
    {
      title: "Total Dispatched",
      value: "48,250",
      suffix: "push notifications sent",
      icon: <NotificationsActiveOutlinedIcon sx={{ fontSize: 22 }} />,
      color: "#3b82f6",
      bg: "#eff6ff",
    },
    {
      title: "Average Read Rate",
      value: "76.4%",
      suffix: "+2.4% higher engagement",
      icon: <MarkEmailReadOutlinedIcon sx={{ fontSize: 22 }} />,
      color: "#10b981",
      bg: "#ecfdf5",
    },
    {
      title: "System Alerts",
      value: "0 Active",
      suffix: "all background runners clear",
      icon: <ReportProblemOutlinedIcon sx={{ fontSize: 22 }} />,
      color: "#8b5cf6",
      bg: "#f5f3ff",
    },
  ];

  // Core FAQ Accordion Dataset Array
  const initialFAQs = [
    {
      id: 1,
      question: "How do automated system order tracking notifications fire?",
      answer:
        "Automated tracking updates are directly wired to state machine changes in your database transactions. When an order status updates from 'Pending' to 'Shipped' or 'Delivered', an Express.js background runner immediately flags the transactional action loop and hits the Firebase Cloud Messaging API to alert the client app.",
      category: "Transactional",
    },
    {
      id: 2,
      question:
        "Can store managers schedule transactional promotion push alerts?",
      answer:
        "Yes. Using the administrative marketing console layout tool, store managers can compile target demographic subsets, attach coupon code payloads, and set future CRON schedule intervals for batch delivery tracking configurations.",
      category: "Marketing",
    },
    {
      id: 3,
      question:
        "What happens if a customer drops connectivity during an operational push dispatch?",
      answer:
        "If a user is offline, the notification payload package is safely cached directly inside our persistent message broker queue. The system retries distribution with backoff tracking flags for up to 72 hours until the client device successfully returns an execution handshake acknowledge state.",
      category: "Infrastructure",
    },
    {
      id: 4,
      question:
        "How can clients alter their global push alerting preference choices?",
      answer:
        "Users can manage their visibility toggles from their profile application settings menu frame. These adjustments modify client settings rows inside your schema database grid, completely filtering out specific sub-categories from future backend notification loops.",
      category: "User Preferences",
    },
  ];

  // State parameters to control expanded accordion frames dynamically
  const [faqs] = useState(initialFAQs);
  const [activeFAQ, setActiveFAQ] = useState(1); // Default first item open

  return (
    <div
      className="container-fluid p-0"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* 1. MANAGEMENT METRICS SEGMENT GRID */}
      <div className="row g-4 mb-4">
        {overviewCards.map((card, idx) => (
          <div className="col-12 col-md-4" key={idx}>
            <div className="card border-0 p-3 rounded-4 shadow-sm bg-white d-flex flex-row justify-content-between align-items-center">
              <div>
                <span
                  className="text-muted d-block mb-1 fw-medium"
                  style={{ fontSize: "0.825rem" }}
                >
                  {card.title}
                </span>
                <h3
                  className="fw-bold mb-1 text-dark tracking-tight"
                  style={{ fontSize: "1.6rem" }}
                >
                  {card.value}
                </h3>
                <span
                  className="text-muted small"
                  style={{ fontSize: "0.75rem" }}
                >
                  {card.suffix}
                </span>
              </div>
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: card.bg,
                  color: card.color,
                }}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 2. CORE WORKSPACE CONTROLS CARD BOARD */}
      <div className="card border-0 rounded-4 shadow-sm bg-white p-4">
        {/* Dynamic Filters Configuration Header Toolbar */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
          <div>
            <h4
              className="fw-bold text-dark mb-1"
              style={{ letterSpacing: "-0.02em" }}
            >
              Notification System FAQs
            </h4>
            <span className="text-muted small" style={{ fontSize: "0.825rem" }}>
              Review internal engineering operational procedures for push
              notifications
            </span>
          </div>

          <button
            className="btn btn-primary d-flex align-items-center gap-2 px-3 rounded-3 fw-medium shadow-none text-nowrap"
            style={{ height: "40px", fontSize: "0.875rem" }}
          >
            <AddIcon sx={{ fontSize: 18 }} />
            <span>Create FAQ Entry</span>
          </button>
        </div>

        {/* Search Filter Bar Row Component */}
        <div
          className="input-group border rounded-3 px-2 bg-light align-items-center mb-4"
          style={{ height: "44px", maxWidth: "450px" }}
        >
          <SearchIcon className="text-muted me-2" sx={{ fontSize: 18 }} />
          <input
            type="text"
            className="form-control border-0 p-0 bg-transparent shadow-none"
            placeholder="Search queries, backend parameters, keywords..."
            style={{ fontSize: "0.875rem" }}
          />
        </div>

        {/* 3. HARDWIRED INTERACTIVE ACCORDION TREE MATRIX */}
        <div className="d-flex flex-column gap-3">
          {faqs.map((faq) => {
            const isExpanded = activeFAQ === faq.id;
            return (
              <div
                key={faq.id}
                className="border rounded-4 transition-all"
                style={{
                  borderColor: isExpanded ? "#0d6efd" : "#e2e8f0",
                  backgroundColor: isExpanded ? "#f8fafc" : "#ffffff",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                {/* Accordion Toggle Trigger Header Frame */}
                <div
                  className="p-3 d-flex justify-content-between align-items-center cursor-pointer"
                  onClick={() => setActiveFAQ(isExpanded ? null : faq.id)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <HelpOutlineOutlinedIcon
                      style={{ color: isExpanded ? "#0d6efd" : "#64748b" }}
                      sx={{ fontSize: 20 }}
                    />
                    <h6
                      className={`mb-0 fw-semibold ${isExpanded ? "text-primary" : "text-dark"}`}
                      style={{ fontSize: "0.925rem" }}
                    >
                      {faq.question}
                    </h6>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <span
                      className="badge bg-light text-secondary border px-2 py-1 rounded-2"
                      style={{ fontSize: "0.725rem", fontWeight: "500" }}
                    >
                      {faq.category}
                    </span>
                    <KeyboardArrowDownIcon
                      style={{
                        transform: isExpanded
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                        color: isExpanded ? "#0d6efd" : "#64748b",
                      }}
                      sx={{ fontSize: 18 }}
                    />
                  </div>
                </div>

                {/* Collapsible Content Body Segment Panel */}
                {isExpanded && (
                  <div
                    className="px-3 pb-3 pt-1 border-top"
                    style={{ borderColor: "rgba(0, 0, 0, 0.03)" }}
                  >
                    <p
                      className="mb-0 text-secondary"
                      style={{ fontSize: "0.875rem", lineHeight: "1.6" }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
