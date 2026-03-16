// // components/Sidebar.jsx
// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FiHome,
//   FiShoppingCart,
//   FiClock,
//   FiPlusCircle,
//   FiHeadphones
// } from "react-icons/fi";
// import "../styles/sidebar.css";
// import logo from "../assets/logo.png";

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   return (
//     <div className={`sidebar ${isOpen ? "open" : ""}`}>
//       {/* Close button for mobile */}
//       <div className="close-btn" onClick={toggleSidebar}>
//         &times;
//       </div>

//       <div className="sidebar-logo">
//         <img src={logo} alt="SMS Market Logo" />
//       </div>

//       <nav>
//         <NavLink to="/dashboard" onClick={toggleSidebar}>
//           <FiHome className="sidebar-icon" /> <span>Dashboard</span>
//         </NavLink>
//         <NavLink to="/buy-numbers" onClick={toggleSidebar}>
//           <FiShoppingCart className="sidebar-icon" /> <span>Buy Numbers</span>
//         </NavLink>
//         <NavLink to="/order-history" onClick={toggleSidebar}>
//           <FiClock className="sidebar-icon" /> <span>Number History</span>
//         </NavLink>
//         <NavLink to="/fund-wallet" onClick={toggleSidebar}>
//           <FiPlusCircle className="sidebar-icon" /> <span>Fund Wallet</span>
//         </NavLink>
//         <NavLink to="/support" onClick={toggleSidebar}>
//           <FiHeadphones className="sidebar-icon" /> <span>Support</span>
//         </NavLink>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;


// components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiShoppingCart, FiClock, FiPlusCircle, FiHeadphones } from "react-icons/fi";
import "../styles/sidebar.css";
import logo from "../assets/logo.png";
import axios from "axios";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread admin messages
  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        const { data } = await axios.get("/api/support/user/unread"); // adjust base URL if needed
        setUnreadCount(data.count);
      } catch (err) {
        console.error("Error fetching unread messages:", err);
      }
    };

    fetchUnreadMessages();

    // Optional: poll every 30 seconds
    const interval = setInterval(fetchUnreadMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="close-btn" onClick={toggleSidebar}>
        &times;
      </div>

      <div className="sidebar-logo">
        <img src={logo} alt="SMS Market Logo" />
      </div>

      <nav>
        <NavLink to="/dashboard" onClick={toggleSidebar}>
          <FiHome className="sidebar-icon" /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/buy-numbers" onClick={toggleSidebar}>
          <FiShoppingCart className="sidebar-icon" /> <span>Buy Numbers</span>
        </NavLink>
        <NavLink to="/order-history" onClick={toggleSidebar}>
          <FiClock className="sidebar-icon" /> <span>Number History</span>
        </NavLink>
        <NavLink to="/fund-wallet" onClick={toggleSidebar}>
          <FiPlusCircle className="sidebar-icon" /> <span>Fund Wallet</span>
        </NavLink>
        <NavLink to="/support" onClick={toggleSidebar} className="support-link">
          <FiHeadphones className="sidebar-icon" /> <span>Support</span>
          {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
