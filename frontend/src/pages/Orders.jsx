import React, { useContext, useState, useEffect, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import { orderService } from "../services/orderService";
import { toast } from "react-toastify";
import TrackOrderModal from "../components/TrackOrderModal";

// Material UI Icons
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function Orders() {
  const { currency, token } = useContext(ShopContext);

  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  // Search, Filter & Sort States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("NEWEST");

  // Modal State
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [selectedTrackItem, setSelectedTrackItem] = useState(null);

  const handleOpenTrackModal = (item) => {
    setSelectedTrackItem(item);
    setShowTrackModal(true);
  };

  // Status Colors
  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "DELIVERED":
        return "#10b981";
      case "SHIPPED":
      case "OUT_FOR_DELIVERY":
        return "#0d9488";
      case "PACKED":
      case "CONFIRMED":
        return "#3b82f6";
      case "PENDING":
        return "#f59e0b";
      case "CANCELLED":
        return "#ef4444";
      default:
        return "#64748b";
    }
  };

  const formatStatusText = (status) => {
    if (!status) return "Order Placed";
    return status
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Fetch Orders
  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getMyOrders();

      if (response.data?.success) {
        let allItems = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allItems.push({
              ...order,
              ...item,
              orderId: order._id,
            });
          });
        });

        setOrderItems(allItems);
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
      toast.error(error.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // CANCEL ORDER HANDLER
  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?",
    );
    if (!confirmCancel) return;

    try {
      setCancellingId(orderId);
      const response = await orderService.cancelOrder(orderId);

      if (response.data?.success) {
        toast.success(response.data.message || "Order cancelled successfully!");

        setOrderItems((prevItems) =>
          prevItems.map((item) =>
            item.orderId === orderId
              ? { ...item, orderStatus: "CANCELLED" }
              : item,
          ),
        );
      } else {
        toast.error(response.data?.message || "Failed to cancel order");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Error cancelling order",
      );
    } finally {
      setCancellingId(null);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [token]);

  // Derived Filtered & Sorted Orders
  const filteredAndSortedOrders = useMemo(() => {
    return orderItems
      .filter((item) => {
        // 1. Search Filter (Matches Item Name, Order ID, or Price)
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          item.name?.toLowerCase().includes(query) ||
          item.orderId?.toLowerCase().includes(query) ||
          String(item.price).includes(query);

        // 2. Status Filter
        const itemStatus = item.orderStatus?.toUpperCase();
        let matchesStatus = true;
        if (statusFilter === "IN_TRANSIT") {
          matchesStatus = [
            "PENDING",
            "CONFIRMED",
            "PACKED",
            "SHIPPED",
            "OUT_FOR_DELIVERY",
          ].includes(itemStatus);
        } else if (statusFilter !== "ALL") {
          matchesStatus = itemStatus === statusFilter;
        }

        // 3. Date Range Filter
        let matchesDate = true;
        if (dateFilter !== "ALL" && item.createdAt) {
          const orderDate = new Date(item.createdAt);
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
        // Sort Handlers
        if (sortBy === "NEWEST") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        if (sortBy === "OLDEST") {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
        if (sortBy === "PRICE_LOW_HIGH") {
          return (a.price || 0) - (b.price || 0);
        }
        if (sortBy === "PRICE_HIGH_LOW") {
          return (b.price || 0) - (a.price || 0);
        }
        return 0;
      });
  }, [orderItems, searchQuery, statusFilter, dateFilter, sortBy]);

  // Dynamic Metric Counts for Summary Cards
  const totalCount = orderItems.length;
  const inTransitCount = orderItems.filter((i) =>
    ["PENDING", "CONFIRMED", "PACKED", "SHIPPED", "OUT_FOR_DELIVERY"].includes(
      i.orderStatus?.toUpperCase(),
    ),
  ).length;
  const deliveredCount = orderItems.filter(
    (i) => i.orderStatus?.toUpperCase() === "DELIVERED",
  ).length;
  const cancelledCount = orderItems.filter(
    (i) => i.orderStatus?.toUpperCase() === "CANCELLED",
  ).length;

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
        style={{ minHeight: "50vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Orders...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container py-4"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* HEADER TITLE */}
      <div className="mb-4">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {/* 1. TOP SUMMARY METRIC CARDS (Interactive Quick Filters) */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div
            onClick={() => setStatusFilter("ALL")}
            className={`card border-0 p-3 rounded-4 shadow-sm cursor-pointer transition-all ${
              statusFilter === "ALL"
                ? "border border-dark border-2 bg-light"
                : "bg-white"
            }`}
          >
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="text-muted small fw-semibold">Total Orders</span>
              <ShoppingBagOutlinedIcon
                className="text-primary"
                sx={{ fontSize: 20 }}
              />
            </div>
            <h4 className="fw-bold text-dark mb-0">{totalCount}</h4>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div
            onClick={() => setStatusFilter("IN_TRANSIT")}
            className={`card border-0 p-3 rounded-4 shadow-sm cursor-pointer transition-all ${
              statusFilter === "IN_TRANSIT"
                ? "border border-warning border-2 bg-light"
                : "bg-white"
            }`}
          >
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="text-muted small fw-semibold">In Transit</span>
              <LocalShippingOutlinedIcon
                className="text-warning"
                sx={{ fontSize: 20 }}
              />
            </div>
            <h4 className="fw-bold text-dark mb-0">{inTransitCount}</h4>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div
            onClick={() => setStatusFilter("DELIVERED")}
            className={`card border-0 p-3 rounded-4 shadow-sm cursor-pointer transition-all ${
              statusFilter === "DELIVERED"
                ? "border border-success border-2 bg-light"
                : "bg-white"
            }`}
          >
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="text-muted small fw-semibold">Delivered</span>
              <CheckCircleOutlineIcon
                className="text-success"
                sx={{ fontSize: 20 }}
              />
            </div>
            <h4 className="fw-bold text-dark mb-0">{deliveredCount}</h4>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div
            onClick={() => setStatusFilter("CANCELLED")}
            className={`card border-0 p-3 rounded-4 shadow-sm cursor-pointer transition-all ${
              statusFilter === "CANCELLED"
                ? "border border-danger border-2 bg-light"
                : "bg-white"
            }`}
          >
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="text-muted small fw-semibold">Cancelled</span>
              <CancelOutlinedIcon
                className="text-danger"
                sx={{ fontSize: 20 }}
              />
            </div>
            <h4 className="fw-bold text-dark mb-0">{cancelledCount}</h4>
          </div>
        </div>
      </div>

      {/* 2. SEARCH, FILTER & SORT TOOLBAR */}
      <div className="card border-0 shadow-sm p-3 rounded-4 bg-white mb-4">
        <div className="row g-2 align-items-center">
          {/* Search Box */}
          <div className="col-12 col-md-4">
            <div
              className="input-group border rounded-3 px-2 bg-light align-items-center"
              style={{ height: "42px" }}
            >
              <SearchIcon className="text-muted me-2" sx={{ fontSize: 20 }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control border-0 p-0 bg-transparent shadow-none small"
                placeholder="Search by product, Order ID..."
              />
              {searchQuery && (
                <button
                  type="button"
                  className="btn btn-sm btn-link text-muted p-0 border-0 text-decoration-none"
                  onClick={() => setSearchQuery("")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Status Filter */}
          <div className="col-6 col-md-3">
            <div
              className="input-group border rounded-3 px-2 bg-white align-items-center"
              style={{ height: "42px" }}
            >
              <FilterListIcon
                className="text-secondary me-1"
                sx={{ fontSize: 18 }}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-select border-0 p-0 bg-transparent shadow-none cursor-pointer small"
              >
                <option value="ALL">All Statuses</option>
                <option value="IN_TRANSIT">In Transit / Active</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Date Filter */}
          <div className="col-6 col-md-2">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="form-select border rounded-3 shadow-none cursor-pointer small"
              style={{ height: "42px" }}
            >
              <option value="ALL">All Time</option>
              <option value="30_DAYS">Last 30 Days</option>
              <option value="6_MONTHS">Last 6 Months</option>
              <option value="2026">Year 2026</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="col-12 col-md-3">
            <div
              className="input-group border rounded-3 px-2 bg-white align-items-center"
              style={{ height: "42px" }}
            >
              <SortIcon className="text-secondary me-1" sx={{ fontSize: 18 }} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select border-0 p-0 bg-transparent shadow-none cursor-pointer small"
              >
                <option value="NEWEST">Newest First</option>
                <option value="OLDEST">Oldest First</option>
                <option value="PRICE_LOW_HIGH">Price: Low to High</option>
                <option value="PRICE_HIGH_LOW">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ORDER ITEMS LIST */}
      <div className="col-12">
        {filteredAndSortedOrders.length === 0 ? (
          <div className="text-center py-5 bg-light rounded-4 border">
            <h5 className="text-muted mb-2">No matching orders found</h5>
            <p className="text-secondary small mb-3">
              Try adjusting your search queries or active filters.
            </p>
            <button
              onClick={resetFilters}
              className="btn btn-outline-dark btn-sm px-4 rounded-3 d-inline-flex align-items-center gap-1 shadow-none"
            >
              <RestartAltIcon sx={{ fontSize: 18 }} /> Reset Filters
            </button>
          </div>
        ) : (
          filteredAndSortedOrders.map((item, index) => {
            const statusColor = getStatusColor(item.orderStatus);

            // Check if order can still be cancelled
            const canCancel = ["PENDING", "CONFIRMED", "PACKED"].includes(
              item.orderStatus?.toUpperCase(),
            );

            return (
              <div
                key={`${item.orderId}-${item._id || index}`}
                className="card mb-3 shadow-sm border-0 rounded-4 overflow-hidden bg-white hover-shadow transition-all"
              >
                <div className="row g-3 align-items-center p-3">
                  {/* Left: Product Info */}
                  <div className="col-12 col-md-5">
                    <div className="d-flex gap-3 align-items-center">
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-decoration-none flex-shrink-0"
                      >
                        <img
                          src={
                            Array.isArray(item.image)
                              ? item.image[0]
                              : item.image || "https://via.placeholder.com/100"
                          }
                          alt={item.name}
                          className="rounded-3 object-fit-cover border"
                          style={{
                            width: "85px",
                            height: "85px",
                            backgroundColor: "#f8fafc",
                          }}
                        />
                      </Link>

                      <div className="d-flex flex-column gap-1">
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-decoration-none text-dark"
                        >
                          <h6
                            className="mb-0 fw-bold text-dark text-truncate"
                            style={{ maxWidth: "240px" }}
                          >
                            {item.name}
                          </h6>
                        </Link>

                        <div className="d-flex align-items-center gap-2 text-secondary small flex-wrap">
                          <span>
                            <strong>Amount:</strong> {currency}
                            {item.price}
                          </span>
                          <span>&bull;</span>
                          <span>
                            <strong>Qty:</strong> {item.quantity}
                          </span>
                          <span>&bull;</span>
                          <span>
                            <strong>Size:</strong>{" "}
                            <span className="badge bg-light text-dark border">
                              {item.size || "Free"}
                            </span>
                          </span>
                        </div>

                        <div className="text-muted extra-small">
                          Order ID:{" "}
                          <span className="font-monospace text-dark">
                            #{item.orderId?.slice(-8).toUpperCase()}
                          </span>
                          <span className="mx-1">&bull;</span>
                          Date: {formatDate(item.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Order Status */}
                  <div className="col-6 col-md-3 text-start text-md-center">
                    <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 bg-light rounded-pill border">
                      <span
                        className="rounded-circle"
                        style={{
                          height: "10px",
                          width: "10px",
                          backgroundColor: statusColor,
                          display: "inline-block",
                        }}
                      ></span>
                      <span className="fw-semibold small text-dark">
                        {formatStatusText(item.orderStatus)}
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions (Track & Cancel Buttons) */}
                  <div className="col-6 col-md-4 text-end text-md-center">
                    <div className="d-inline-flex gap-2 flex-wrap justify-content-end justify-content-md-center">
                      <button
                        onClick={() => handleOpenTrackModal(item)}
                        className="btn btn-outline-dark btn-sm rounded-3 px-3 shadow-none fw-medium"
                      >
                        Track Order
                      </button>

                      {canCancel && (
                        <button
                          onClick={() => handleCancelOrder(item.orderId)}
                          disabled={cancellingId === item.orderId}
                          className="btn btn-outline-danger btn-sm rounded-3 px-3 shadow-none fw-medium"
                        >
                          {cancellingId === item.orderId
                            ? "Cancelling..."
                            : "Cancel Order"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* TRACK ORDER MODAL */}
      <TrackOrderModal
        show={showTrackModal}
        item={selectedTrackItem}
        handleClose={() => setShowTrackModal(false)}
      />
    </div>
  );
}
