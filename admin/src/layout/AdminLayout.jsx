import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      {/* SIDEBAR WRAPPER LAYER */}
      <div
        style={{
          width: isSidebarOpen ? "260px" : "0px",
          minWidth: isSidebarOpen ? "260px" : "0px",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
          background: "#0A1128",
        }}
      >
        <Sidebar isOpen={isSidebarOpen} />
      </div>

      {/* MAIN CONTENT LAYER - Flex-Grow handles the expansion automatically */}
      <div
        className="d-flex flex-column flex-grow-1"
        style={{
          minWidth: 0, // CRITICAL: Allows flexbox to shrink/expand fluidly inside the viewport
          background: "#f5f7fb",
        }}
      >
        {/* Navbar sits safely out here in the fluid main layout area */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Page Content Injection Area */}
        <div
          className="container-fluid p-4 flex-grow-1"
          style={{ minHeight: "calc(100vh - 70px)" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
