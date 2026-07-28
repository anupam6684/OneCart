import React, { useState, useEffect, useMemo } from "react";
import EditOrderModal from "./EditOrderModal";
import OrderDetails from "./OrderDetails";
import { orderService } from "../../services/orderService";
import { toast } from "react-toastify";

// Material UI Icons
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SortIcon from "@mui/icons-material/Sort";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOrderToEdit, setSelectedOrderToEdit] = useState(null);

  // Search, Filter & Sort States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("NEWEST");

  // Fetch All Orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getAllOrders();
      if (response.data?.success) {
        setOrders(response.data.orders || []);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Modal Actions
  const handleOpenEditModal = (order) => {
    setSelectedOrderToEdit(order);
    setShowEditModal(true);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  // Save Order Edits
  const handleSaveOrderUpdate = async (orderId, updatedData) => {
    try {
      const response = await orderService.updateOrder(orderId, updatedData);
      if (response.data?.success || response.status === 200) {
        toast.success("Order updated successfully!");

        setOrders((prevOrders) =>
          prevOrders.map((ord) =>
            ord._id === orderId ? { ...ord, ...updatedData } : ord,
          ),
        );

        setShowEditModal(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to save updates");
    }
  };

  // Quick Status Dropdown Handler
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await orderService.updateOrderStatus(orderId, newStatus);

      if (response.data?.success || response.status === 200) {
        toast.success(
          `Order status updated to ${formatStatusLabel(newStatus)}`,
        );

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, orderStatus: newStatus }
              : order,
          ),
        );

        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder((prev) => ({ ...prev, orderStatus: newStatus }));
        }
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error(error.message || "Failed to update order status");
    }
  };

  // Status Style Helper
  const getStatusStyle = (status) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
        return { bg: "#fffbeb", color: "#f59e0b" };
      case "CONFIRMED":
        return { bg: "#eff6ff", color: "#3b82f6" };
      case "PACKED":
        return { bg: "#f3e8ff", color: "#9333ea" };
      case "SHIPPED":
        return { bg: "#e0f2fe", color: "#0284c7" };
      case "OUT_FOR_DELIVERY":
        return { bg: "#f0fdfa", color: "#0d9488" };
      case "DELIVERED":
        return { bg: "#ecfdf5", color: "#10b981" };
      case "CANCELLED":
        return { bg: "#fef2f2", color: "#ef4444" };
      default:
        return { bg: "#f8fafc", color: "#64748b" };
    }
  };

  const formatStatusLabel = (status) => {
    if (!status) return "";
    return status
      .toLowerCase()
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const formatDate = (dateString, includeTime = true) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";

    if (includeTime) {
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Filter & Sort Pipeline
  const filteredAndSortedOrders = useMemo(() => {
    return orders
      .filter((order) => {
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          order._id?.toLowerCase().includes(query) ||
          order.customer?.toLowerCase().includes(query) ||
          order.email?.toLowerCase().includes(query) ||
          order.items?.some((item) => item.name?.toLowerCase().includes(query));

        const orderStatus = order.orderStatus?.toUpperCase();
        let matchesStatus = true;
        if (statusFilter === "IN_TRANSIT") {
          matchesStatus = [
            "PENDING",
            "CONFIRMED",
            "PACKED",
            "SHIPPED",
            "OUT_FOR_DELIVERY",
          ].includes(orderStatus);
        } else if (statusFilter !== "ALL") {
          matchesStatus = orderStatus === statusFilter;
        }

        let matchesDate = true;
        if (dateFilter !== "ALL" && order.createdAt) {
          const orderDate = new Date(order.createdAt);
          const now = new Date();

          if (dateFilter === "30_DAYS") {
            const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
            matchesDate = orderDate >= thirtyDaysAgo;
          } else if (dateFilter === "6_MONTHS") {
            const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
            matchesDate = orderDate >= sixMonthsAgo;
          } else if (dateFilter === "2026") {
            matchesDate = orderDate.getFullYear() === 2026;
          }
        }

        return matchesSearch && matchesStatus && matchesDate;
      })
      .sort((a, b) => {
        if (sortBy === "NEWEST")
          return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === "OLDEST")
          return new Date(a.createdAt) - new Date(b.createdAt);
        if (sortBy === "PRICE_LOW_HIGH")
          return (a.totalAmount || 0) - (b.totalAmount || 0);
        if (sortBy === "PRICE_HIGH_LOW")
          return (b.totalAmount || 0) - (a.totalAmount || 0);
        return 0;
      });
  }, [orders, searchQuery, statusFilter, dateFilter, sortBy]);

  // Counts for Metric Cards
  const totalOrdersCount = orders.length;
  const pendingCount = orders.filter((o) =>
    ["PENDING", "CONFIRMED", "PACKED", "SHIPPED", "OUT_FOR_DELIVERY"].includes(
      o.orderStatus?.toUpperCase(),
    ),
  ).length;
  const completedCount = orders.filter(
    (o) => o.orderStatus?.toUpperCase() === "DELIVERED",
  ).length;
  const cancelledCount = orders.filter(
    (o) => o.orderStatus?.toUpperCase() === "CANCELLED",
  ).length;

  const summaryCards = [
    {
      title: "Total Orders",
      value: totalOrdersCount,
      suffix: "all time records",
      icon: <ShoppingBagOutlinedIcon sx={{ fontSize: 22 }} />,
      color: "#3b82f6",
      bg: "#eff6ff",
      filterKey: "ALL",
    },
    {
      title: "In-Transit / Active",
      value: pendingCount,
      suffix: "awaiting completion",
      icon: <AutorenewOutlinedIcon sx={{ fontSize: 22 }} />,
      color: "#f59e0b",
      bg: "#fffbeb",
      filterKey: "IN_TRANSIT",
    },
    {
      title: "Completed Deliveries",
      value: completedCount,
      suffix: "dispatched safely",
      icon: <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 22 }} />,
      color: "#10b981",
      bg: "#ecfdf5",
      filterKey: "DELIVERED",
    },
    {
      title: "Cancelled Orders",
      value: cancelledCount,
      suffix: "refunded fully",
      icon: <BlockOutlinedIcon sx={{ fontSize: 22 }} />,
      color: "#ef4444",
      bg: "#fef2f2",
      filterKey: "CANCELLED",
    },
  ];

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("ALL");
    setDateFilter("ALL");
    setSortBy("NEWEST");
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center py-5"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container-fluid p-0 position-relative"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* 1. SUMMARY STATS CARDS */}
      <div className="row g-4 mb-4">
        {summaryCards.map((card, idx) => (
          <div className="col-12 col-sm-6 col-xl-3" key={idx}>
            <div
              onClick={() => setStatusFilter(card.filterKey)}
              className={`card border-0 p-3 rounded-4 shadow-sm cursor-pointer transition-all d-flex flex-row justify-content-between align-items-center ${
                statusFilter === card.filterKey
                  ? "border border-2 border-dark bg-light"
                  : "bg-white"
              }`}
            >
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

      {/* 2. TOOLBAR (Search, Filter, Sort) */}
      <div className="card border-0 rounded-4 shadow-sm bg-white p-4">
        <div className="row align-items-center g-3 mb-4">
          {/* Title */}
          <div className="col-12 col-xl-3">
            <h4
              className="fw-bold text-dark mb-0"
              style={{ letterSpacing: "-0.02em" }}
            >
              Orders Log
            </h4>
          </div>

          {/* Controls Grid Container */}
          <div className="col-12 col-xl-9">
            <div className="row g-2 align-items-center justify-content-xl-end">
              {/* 1. Search Box */}
              <div className="col-12 col-sm-6 col-md-4 col-lg-4">
                <div
                  className="input-group border rounded-3 px-2 bg-light align-items-center w-100"
                  style={{ height: "40px" }}
                >
                  <SearchIcon
                    className="text-muted me-2"
                    sx={{ fontSize: 18 }}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control border-0 p-0 bg-transparent shadow-none"
                    placeholder="Search ID, Customer..."
                    style={{ fontSize: "0.85rem" }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="btn btn-sm btn-link text-muted p-0 border-0 text-decoration-none ms-1"
                      onClick={() => setSearchQuery("")}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* 2. Status Filter */}
              <div className="col-6 col-sm-6 col-md-3 col-lg-3">
                <div
                  className="input-group border rounded-3 px-2 bg-white align-items-center w-100"
                  style={{ height: "40px" }}
                >
                  <FilterListIcon
                    className="text-secondary me-1"
                    sx={{ fontSize: 16 }}
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="form-select border-0 p-0 bg-transparent shadow-none cursor-pointer"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="IN_TRANSIT">In Transit</option>
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="PACKED">Packed</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* 3. Date Filter */}
              <div className="col-6 col-sm-6 col-md-2 col-lg-2">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="form-select border rounded-3 shadow-none cursor-pointer w-100"
                  style={{ height: "40px", fontSize: "0.85rem" }}
                >
                  <option value="ALL">All Time</option>
                  <option value="30_DAYS">30 Days</option>
                  <option value="6_MONTHS">6 Months</option>
                  <option value="2026">2026</option>
                </select>
              </div>

              {/* 4. Sort Filter */}
              <div className="col-12 col-sm-6 col-md-3 col-lg-3">
                <div
                  className="input-group border rounded-3 px-2 bg-white align-items-center w-100"
                  style={{ height: "40px" }}
                >
                  <SortIcon
                    className="text-secondary me-1"
                    sx={{ fontSize: 16 }}
                  />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="form-select border-0 p-0 bg-transparent shadow-none cursor-pointer"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <option value="NEWEST">Newest First</option>
                    <option value="OLDEST">Oldest First</option>
                    <option value="PRICE_LOW_HIGH">Price: Low-High</option>
                    <option value="PRICE_HIGH_LOW">Price: High-Low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. ORDERS TABLE */}
        <div className="table-responsive">
          <table
            className="table align-middle mb-0"
            style={{ borderColor: "#f1f5f9" }}
          >
            <thead>
              <tr
                className="text-muted"
                style={{
                  fontSize: "0.825rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                }}
              >
                <th className="border-bottom pb-3">Order ID</th>
                <th className="border-bottom pb-3">Customer</th>
                <th className="border-bottom pb-3">Products</th>
                <th className="border-bottom pb-3">Date</th>
                <th className="border-bottom pb-3">Items</th>
                <th className="border-bottom pb-3">Price Total</th>
                <th className="border-bottom pb-3">Payment</th>
                <th className="border-bottom pb-3">Status</th>
                <th
                  className="border-bottom pb-3 text-end"
                  style={{ width: "120px" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "0.9rem" }}>
              {filteredAndSortedOrders.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-5 text-muted">
                    <p className="mb-2">
                      No orders match your filter criteria.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="btn btn-outline-dark btn-sm rounded-3 d-inline-flex align-items-center gap-1 shadow-none"
                    >
                      <RestartAltIcon sx={{ fontSize: 16 }} /> Reset Filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredAndSortedOrders.map((order) => {
                  const statusStyles = getStatusStyle(order.orderStatus);
                  const itemCount = order.items
                    ? order.items.reduce(
                        (acc, item) => acc + (item.quantity || 1),
                        0,
                      )
                    : 0;

                  return (
                    <tr key={order._id}>
                      {/* Order ID */}
                      <td
                        className="fw-semibold text-primary py-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleViewOrder(order)}
                      >
                        #{order._id.slice(-6).toUpperCase()}
                      </td>

                      {/* Customer Info */}
                      <td>
                        <div>
                          <h6
                            className="mb-0 fw-semibold text-dark text-capitalize"
                            style={{ fontSize: "0.875rem" }}
                          >
                            {order.customer}
                          </h6>
                          <span
                            className="text-muted"
                            style={{ fontSize: "0.75rem" }}
                          >
                            {order.email}
                          </span>
                        </div>
                      </td>

                      {/* Product Thumbnails Stack */}
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          {order.items && order.items.length > 0 ? (
                            <>
                              {order.items.slice(0, 3).map((item, idx) => {
                                const imgSrc = Array.isArray(item.image)
                                  ? item.image[0]
                                  : item.image ||
                                    "https://via.placeholder.com/38";

                                return (
                                  <img
                                    key={idx}
                                    src={imgSrc}
                                    alt={item.name || "Product"}
                                    className="rounded-2 border object-fit-cover shadow-sm"
                                    style={{
                                      width: "38px",
                                      height: "38px",
                                      backgroundColor: "#f8fafc",
                                    }}
                                    title={`${item.name || "Item"} (x${item.quantity || 1})`}
                                  />
                                );
                              })}
                              {order.items.length > 3 && (
                                <span
                                  className="badge bg-light text-dark border rounded-2 d-flex align-items-center justify-content-center small fw-semibold"
                                  style={{
                                    width: "38px",
                                    height: "38px",
                                    fontSize: "0.75rem",
                                  }}
                                >
                                  +{order.items.length - 3}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-muted small">No items</span>
                          )}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="text-muted">
                        {formatDate(order.createdAt)}
                      </td>

                      {/* Item Count */}
                      <td className="text-muted">
                        {itemCount} {itemCount === 1 ? "item" : "items"}
                      </td>

                      {/* Total Amount */}
                      <td className="fw-semibold text-dark">
                        ₹{order.totalAmount}
                      </td>

                      {/* Payment Method */}
                      <td>
                        <span
                          className="text-secondary small bg-light px-2 py-1 rounded-2 fw-medium"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {order.paymentMethod}
                        </span>
                      </td>

                      {/* Status Selector */}
                      <td>
                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className="form-select form-select-sm border-0 fw-semibold cursor-pointer shadow-none text-center px-3 py-1"
                          style={{
                            fontSize: "0.75rem",
                            width: "auto",
                            backgroundColor: statusStyles.bg,
                            color: statusStyles.color,
                            borderRadius: "20px",
                            appearance: "none",
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                            backgroundImage: "none",
                            paddingRight: "12px",
                          }}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Confirmed</option>
                          <option value="PACKED">Packed</option>
                          <option value="SHIPPED">Shipped</option>
                          <option value="OUT_FOR_DELIVERY">
                            Out for Delivery
                          </option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </td>

                      {/* Action Buttons */}
                      <td className="text-end">
                        <div className="d-inline-flex gap-2">
                          <button
                            onClick={() => handleOpenEditModal(order)}
                            className="btn p-2 border rounded-3 text-primary bg-light-hover d-flex align-items-center shadow-none"
                            style={{ borderColor: "#e2e8f0" }}
                            title="Edit Order"
                          >
                            <EditOutlinedIcon sx={{ fontSize: 16 }} />
                          </button>
                          <button
                            onClick={() => handleViewOrder(order)}
                            className="btn p-2 border rounded-3 text-secondary bg-light-hover d-flex align-items-center shadow-none"
                            style={{ borderColor: "#e2e8f0" }}
                            title="View Full Details"
                          >
                            <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
                          </button>
                          {order.orderStatus === "PENDING" && (
                            <button
                              onClick={() =>
                                handleStatusChange(order._id, "SHIPPED")
                              }
                              className="btn p-2 border rounded-3 text-primary bg-light-hover d-flex align-items-center shadow-none"
                              style={{ borderColor: "#e2e8f0" }}
                              title="Mark As Dispatched"
                            >
                              <LocalShippingOutlinedIcon
                                sx={{ fontSize: 16 }}
                              />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT ORDER MODAL */}
      <EditOrderModal
        show={showEditModal}
        selectedOrder={selectedOrderToEdit}
        handleClose={() => setShowEditModal(false)}
        handleSave={handleSaveOrderUpdate}
      />

      {/* ORDER DETAILS OVERLAY MODAL */}
      <OrderDetails
        showModal={showModal}
        selectedOrder={selectedOrder}
        handleCloseModal={handleCloseModal}
        getStatusStyle={getStatusStyle}
        formatStatusLabel={formatStatusLabel}
        formatDate={formatDate}
      />
    </div>
  );
}
