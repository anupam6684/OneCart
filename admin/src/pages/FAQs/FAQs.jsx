import React, { useState, useEffect } from "react";

// notification
import { toast } from "react-toastify";

// Material UI Icons
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailIcon from "@mui/icons-material/Mail";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { contactService } from "../../services/contactService";
import { subscriberService } from "../../services/subscriberService";

export default function MessagesAndSubscribers() {
  // Navigation State (Active Tab)
  const [activeTab, setActiveTab] = useState("contact"); // "contact" | "subscribers"
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [loadingSubscribers, setLoadingSubscribers] = useState(true);

  // ================= 1. DUMMY DATA MATRICES =================

  // Contact Form Data ("SEND US" submissions matching your screenshot fields)
  const [contactMessages, setContactMessages] = useState([]);

  // Newsletter Subscribers Data (matching your 20% off subscription form)
  const [subscribers, setSubscribers] = useState([{}]);

  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const data = await contactService.getAll();

      if (data.data.success) {
        setContactMessages(data.data.contacts);
        console.log(data.data.contacts);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const fetchSubscribers = async () => {
    try {
      setLoadingSubscribers(true);
      const data = await subscriberService.getAll();

      if (data.data.success) {
        // setContactMessages(data.data.contacts);
        setSubscribers(data.data.subscribers);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSubscribers(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchSubscribers();
  }, []);

  // Accordion open/close state for contact messages
  const [expandedMessageId, setExpandedMessageId] = useState(1);

  // ================= 2. HANDLER FUNCTIONS =================

  const handleDeleteMessage = async (id) => {
    try {
      const data = await contactService.deleteOne(id);

      if (data.data.success) {
        toast.success(data.data.message);
        fetchMessages();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete message");
    }
  };

  const handleDeleteSubscriber = async (id) => {
    try {
      const data = await subscriberService.deleteOne(id);

      if (data.data.success) {
        toast.success(data.data.message);
        fetchSubscribers(); // Reload latest data from DB
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete subscriber");
    }
  };

  const toggleReadStatus = async (id) => {
    try {
      const data = await contactService.updateStatus(id);

      if (data.data.success) {
        toast.success(data.data.message);
        fetchMessages();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  // Filter lists based on search bar
  const filteredMessages = contactMessages.filter(
    (m) =>
      m?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m?.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m?.mobile?.includes(searchTerm),
  );

  const filteredSubscribers = subscribers.filter((subscriber) =>
    (subscriber.email || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );
  // Stats calculation
  const totalMessages = contactMessages.length;
  const unreadMessages = contactMessages.filter(
    (m) => m.status === "Unread",
  ).length;
  const totalSubscribers = subscribers.length;

  return (
    <div
      className="container-fluid p-0"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ================= TOP ANALYTICS OVERVIEW CARDS ================= */}
      <div className="row g-4 mb-4">
        {/* Card 1: Contact Messages */}
        <div className="col-12 col-md-4">
          <div className="card border-0 p-3 rounded-4 shadow-sm bg-white d-flex flex-row justify-content-between align-items-center">
            <div>
              <span
                className="text-muted d-block mb-1 fw-medium"
                style={{ fontSize: "0.825rem" }}
              >
                Total Messages
              </span>
              <h3
                className="fw-bold mb-1 text-dark"
                style={{ fontSize: "1.6rem" }}
              >
                {totalMessages}
              </h3>
              <span
                className="text-danger small fw-semibold"
                style={{ fontSize: "0.75rem" }}
              >
                {unreadMessages} Unread Response
                {unreadMessages !== 1 ? "s" : ""}
              </span>
            </div>
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#eff6ff",
                color: "#3b82f6",
              }}
            >
              <ContactSupportOutlinedIcon sx={{ fontSize: 24 }} />
            </div>
          </div>
        </div>

        {/* Card 2: Newsletter Subscribers */}
        <div className="col-12 col-md-4">
          <div className="card border-0 p-3 rounded-4 shadow-sm bg-white d-flex flex-row justify-content-between align-items-center">
            <div>
              <span
                className="text-muted d-block mb-1 fw-medium"
                style={{ fontSize: "0.825rem" }}
              >
                Newsletter Subscribers
              </span>
              <h3
                className="fw-bold mb-1 text-dark"
                style={{ fontSize: "1.6rem" }}
              >
                {totalSubscribers}
              </h3>
              <span
                className="text-success small fw-semibold"
                style={{ fontSize: "0.75rem" }}
              >
                Active coupon claims (20% OFF)
              </span>
            </div>
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#ecfdf5",
                color: "#10b981",
              }}
            >
              <MarkEmailReadOutlinedIcon sx={{ fontSize: 24 }} />
            </div>
          </div>
        </div>

        {/* Card 3: Quick Status */}
        <div className="col-12 col-md-4">
          <div className="card border-0 p-3 rounded-4 shadow-sm bg-white d-flex flex-row justify-content-between align-items-center">
            <div>
              <span
                className="text-muted d-block mb-1 fw-medium"
                style={{ fontSize: "0.825rem" }}
              >
                Support Health
              </span>
              <h3
                className="fw-bold mb-1 text-dark"
                style={{ fontSize: "1.6rem" }}
              >
                100%
              </h3>
              <span
                className="text-muted small"
                style={{ fontSize: "0.75rem" }}
              >
                All forms active & receiving data
              </span>
            </div>
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#f5f3ff",
                color: "#8b5cf6",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 24 }} />
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT WORKSPACE ================= */}
      <div className="card border-0 rounded-4 shadow-sm bg-white p-4">
        {/* TAB SWITCHER & HEADER */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4 border-bottom pb-3">
          <div>
            <h4
              className="fw-bold text-dark mb-1"
              style={{ letterSpacing: "-0.02em" }}
            >
              Customer Interactions
            </h4>
            <span className="text-muted small" style={{ fontSize: "0.825rem" }}>
              Manage incoming contact queries and newsletter leads
            </span>
          </div>

          {/* Navigation Tab Pills */}
          <div className="d-flex bg-light p-1 rounded-3 border">
            <button
              className={`btn btn-sm rounded-2 fw-medium px-3 transition-all ${
                activeTab === "contact"
                  ? "btn-white bg-white text-dark shadow-sm"
                  : "text-secondary border-0"
              }`}
              style={{ fontSize: "0.85rem" }}
              onClick={() => setActiveTab("contact")}
            >
              📩 Contact Messages ({totalMessages})
            </button>
            <button
              className={`btn btn-sm rounded-2 fw-medium px-3 transition-all ${
                activeTab === "subscribers"
                  ? "btn-white bg-white text-dark shadow-sm"
                  : "text-secondary border-0"
              }`}
              style={{ fontSize: "0.85rem" }}
              onClick={() => setActiveTab("subscribers")}
            >
              📧 Subscribers ({totalSubscribers})
            </button>
          </div>
        </div>

        {/* SEARCH BAR ROW */}
        <div
          className="input-group border rounded-3 px-2 bg-light align-items-center mb-4"
          style={{ height: "42px", maxWidth: "420px" }}
        >
          <SearchIcon className="text-muted me-2" sx={{ fontSize: 18 }} />
          <input
            type="text"
            className="form-control border-0 p-0 bg-transparent shadow-none"
            placeholder={
              activeTab === "contact"
                ? "Search by name, email, subject, mobile..."
                : "Search subscribers by email..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ fontSize: "0.875rem" }}
          />
        </div>

        {/* ================= TAB 1: CONTACT FORM ("SEND US") MESSAGES ================= */}
        {activeTab === "contact" &&
          (loadingMessages ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "300px" }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {filteredMessages.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <ContactSupportOutlinedIcon
                    sx={{ fontSize: 40 }}
                    className="mb-2 opacity-50"
                  />
                  <p className="mb-0">No contact messages found.</p>
                </div>
              ) : (
                filteredMessages.map((msg) => {
                  const isExpanded = expandedMessageId === msg._id;
                  const isUnread = msg.status === "Unread";

                  return (
                    <div
                      key={msg._id}
                      className="border rounded-4 transition-all"
                      style={{
                        borderColor: isExpanded ? "#0d6efd" : "#e2e8f0",
                        backgroundColor: isUnread ? "#f8fafc" : "#ffffff",
                      }}
                    >
                      {/* Message Accordion Header */}
                      <div
                        className="p-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 cursor-pointer"
                        onClick={() =>
                          setExpandedMessageId(isExpanded ? null : msg._id)
                        }
                        style={{ cursor: "pointer", userSelect: "none" }}
                      >
                        {/* Left Meta Info */}
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                            style={{
                              width: "38px",
                              height: "38px",
                              backgroundColor: isUnread ? "#212529" : "#6c757d",
                              fontSize: "0.85rem",
                            }}
                          >
                            {msg.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="d-flex align-items-center gap-2">
                              <h6
                                className={`mb-0 fw-bold ${isUnread ? "text-dark" : "text-secondary"}`}
                                style={{ fontSize: "0.925rem" }}
                              >
                                {msg.name}
                              </h6>
                              {isUnread && (
                                <span
                                  className="badge bg-danger rounded-pill px-2 py-1"
                                  style={{ fontSize: "0.65rem" }}
                                >
                                  NEW
                                </span>
                              )}
                            </div>
                            <span
                              className="text-muted extra-small d-block mt-0.5"
                              style={{ fontSize: "0.8rem" }}
                            >
                              Subject:{" "}
                              <strong className="text-dark">
                                {msg.subject}
                              </strong>
                            </span>
                          </div>
                        </div>

                        {/* Right Date and Actions */}
                        <div className="d-flex align-items-center gap-3 ms-auto ms-md-0">
                          <span
                            className="text-muted small font-monospace"
                            style={{ fontSize: "0.775rem" }}
                          >
                            {}
                          </span>

                          <KeyboardArrowDownIcon
                            style={{
                              transform: isExpanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.2s ease",
                              color: isExpanded ? "#0d6efd" : "#64748b",
                            }}
                            sx={{ fontSize: 20 }}
                          />
                        </div>
                      </div>

                      {/* Message Body Details */}
                      {isExpanded && (
                        <div
                          className="px-3 pb-3 pt-2 border-top bg-white rounded-bottom-4"
                          style={{ borderColor: "#f1f5f9" }}
                        >
                          {/* Customer Contact Badges */}
                          <div className="d-flex flex-wrap gap-3 mb-3 p-2 bg-light rounded-3 text-muted small">
                            <span className="d-flex align-items-center gap-1">
                              <MailIcon
                                sx={{ fontSize: 16 }}
                                className="text-primary"
                              />
                              <strong>Email:</strong> {msg.email}
                            </span>

                            <span className="d-flex align-items-center gap-1">
                              <PhoneIphoneIcon
                                sx={{ fontSize: 16 }}
                                className="text-success"
                              />
                              <strong>Mobile:</strong> {msg.mobile}
                            </span>

                            <span className="d-flex align-items-center gap-1">
                              🕒 <strong>Created:</strong>{" "}
                              {new Date(msg.createdAt).toLocaleString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>

                            <span className="d-flex align-items-center gap-1">
                              ✏️ <strong>Last Updated:</strong>{" "}
                              {new Date(msg.updatedAt).toLocaleString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>

                          {/* Message Content Text */}
                          <div className="mb-3">
                            <label
                              className="form-label text-muted extra-small fw-semibold text-uppercase mb-1"
                              style={{ fontSize: "0.7rem" }}
                            >
                              Message Body
                            </label>
                            <p
                              className="p-3 bg-light rounded-3 text-dark mb-0 lh-base"
                              style={{ fontSize: "0.875rem" }}
                            >
                              "{msg.message}"
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="d-flex justify-content-between align-items-center pt-2">
                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-sm rounded-2 d-flex align-items-center gap-1"
                              onClick={() => toggleReadStatus(msg._id)}
                              style={{ fontSize: "0.775rem" }}
                            >
                              Mark as{" "}
                              {msg.status === "Unread" ? "Read" : "Unread"}
                            </button>

                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm rounded-2 d-flex align-items-center gap-1"
                              onClick={() => handleDeleteMessage(msg._id)}
                              style={{ fontSize: "0.775rem" }}
                            >
                              <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                              Delete Query
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          ))}
        {/* ================= TAB 2: NEWSLETTER SUBSCRIBERS TABLE ================= */}
        {activeTab === "subscribers" &&
          (loadingSubscribers ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "300px" }}
            >
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive rounded-3 border">
              <table className="table table-hover align-middle mb-0">
                <thead
                  className="bg-light text-muted"
                  style={{ fontSize: "0.8rem", textTransform: "uppercase" }}
                >
                  <tr>
                    <th className="py-3 ps-3">#</th>
                    <th className="py-3">Subscriber Email</th>
                    <th className="py-3">Subscription Date</th>
                    <th className="py-3">Discount Code</th>
                    <th className="py-3 text-end pe-3">Action</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: "0.875rem" }}>
                  {filteredSubscribers.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        No subscribers found.
                      </td>
                    </tr>
                  ) : (
                    filteredSubscribers.map((sub, index) => (
                      <tr key={sub._id}>
                        <td className="ps-3 fw-medium text-muted">
                          {index + 1}
                        </td>
                        <td>
                          <span className="fw-semibold text-dark d-flex align-items-center gap-2">
                            <MailIcon
                              sx={{ fontSize: 18 }}
                              className="text-primary"
                            />
                            {sub.email}
                          </span>
                        </td>
                        <td className="text-muted">
                          {new Date(sub.createdAt).toLocaleString("en-IN")}
                        </td>
                        <td>
                          <span
                            className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1 fw-medium"
                            style={{ fontSize: "0.75rem" }}
                          >
                            🎁 {sub.discountClaimed}
                          </span>
                        </td>
                        <td className="text-end pe-3">
                          <button
                            type="button"
                            className="btn btn-link text-danger p-0 border-0 shadow-none"
                            onClick={() => handleDeleteSubscriber(sub._id)}
                            title="Remove subscriber"
                          >
                            <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ))}
      </div>
    </div>
  );
}
