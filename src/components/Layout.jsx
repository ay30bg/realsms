// components/Layout.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../styles/layout.css";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <Topbar toggleSidebar={toggleSidebar} />
        <div className="page-content">{children}</div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

export default Layout;
