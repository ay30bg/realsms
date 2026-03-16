// // // // components/Sidebar.jsx
// // // import React from "react";
// // // import { NavLink } from "react-router-dom";
// // // import {
// // //   FiHome,
// // //   FiShoppingCart,
// // //   FiClock,
// // //   FiPlusCircle,
// // //   FiHeadphones
// // // } from "react-icons/fi";
// // // import "../styles/sidebar.css";
// // // import logo from "../assets/logo.png";

// // // const Sidebar = ({ isOpen, toggleSidebar }) => {
// // //   return (
// // //     <div className={`sidebar ${isOpen ? "open" : ""}`}>
// // //       {/* Close button for mobile */}
// // //       <div className="close-btn" onClick={toggleSidebar}>
// // //         &times;
// // //       </div>

// // //       <div className="sidebar-logo">
// // //         <img src={logo} alt="SMS Market Logo" />
// // //       </div>

// // //       <nav>
// // //         <NavLink to="/dashboard" onClick={toggleSidebar}>
// // //           <FiHome className="sidebar-icon" /> <span>Dashboard</span>
// // //         </NavLink>
// // //         <NavLink to="/buy-numbers" onClick={toggleSidebar}>
// // //           <FiShoppingCart className="sidebar-icon" /> <span>Buy Numbers</span>
// // //         </NavLink>
// // //         <NavLink to="/order-history" onClick={toggleSidebar}>
// // //           <FiClock className="sidebar-icon" /> <span>Number History</span>
// // //         </NavLink>
// // //         <NavLink to="/fund-wallet" onClick={toggleSidebar}>
// // //           <FiPlusCircle className="sidebar-icon" /> <span>Fund Wallet</span>
// // //         </NavLink>
// // //         <NavLink to="/support" onClick={toggleSidebar}>
// // //           <FiHeadphones className="sidebar-icon" /> <span>Support</span>
// // //         </NavLink>
// // //       </nav>
// // //     </div>
// // //   );
// // // };

// // // export default Sidebar;


// // // components/Sidebar.jsx
// // import React, { useEffect, useState, useCallback } from "react";
// // import { NavLink } from "react-router-dom";
// // import axios from "axios";
// // import {
// //   FiHome,
// //   FiShoppingCart,
// //   FiClock,
// //   FiPlusCircle,
// //   FiHeadphones
// // } from "react-icons/fi";

// // import "../styles/sidebar.css";
// // import logo from "../assets/logo.png";

// // const Sidebar = ({ isOpen, toggleSidebar }) => {

// //   const [unreadCount, setUnreadCount] = useState(0);

// //   const API_URL = process.env.REACT_APP_API_URL;
// //   const token = localStorage.getItem("token");

// //   // =============================
// //   // Fetch unread support messages
// //   // =============================
// //   const fetchUnreadMessages = useCallback(async () => {

// //     if (!token) return;

// //     try {
// //       const res = await axios.get(`${API_URL}/api/support/user`, {
// //         headers: {
// //           Authorization: `Bearer ${token}`
// //         }
// //       });

// //       const messages = res.data || [];

// //       const unread = messages.filter(
// //         (msg) => msg.sender === "admin" && msg.read === false
// //       ).length;

// //       setUnreadCount(unread);

// //     } catch (error) {
// //       console.error(
// //         "Unread support fetch error:",
// //         error.response?.data || error.message
// //       );
// //     }

// //   }, [API_URL, token]);

// //   // =============================
// //   // Load unread messages
// //   // =============================
// //   useEffect(() => {

// //     fetchUnreadMessages();

// //     const interval = setInterval(() => {
// //       fetchUnreadMessages();
// //     }, 10000);

// //     return () => clearInterval(interval);

// //   }, [fetchUnreadMessages]);

// //   return (
// //     <div className={`sidebar ${isOpen ? "open" : ""}`}>

// //       {/* Close button for mobile */}
// //       <div className="close-btn" onClick={toggleSidebar}>
// //         &times;
// //       </div>

// //       <div className="sidebar-logo">
// //         <img src={logo} alt="SMS Market Logo" />
// //       </div>

// //       <nav>

// //         <NavLink to="/dashboard" onClick={toggleSidebar}>
// //           <FiHome className="sidebar-icon" />
// //           <span>Dashboard</span>
// //         </NavLink>

// //         <NavLink to="/buy-numbers" onClick={toggleSidebar}>
// //           <FiShoppingCart className="sidebar-icon" />
// //           <span>Buy Numbers</span>
// //         </NavLink>

// //         <NavLink to="/order-history" onClick={toggleSidebar}>
// //           <FiClock className="sidebar-icon" />
// //           <span>Number History</span>
// //         </NavLink>

// //         <NavLink to="/fund-wallet" onClick={toggleSidebar}>
// //           <FiPlusCircle className="sidebar-icon" />
// //           <span>Fund Wallet</span>
// //         </NavLink>

// //         <NavLink
// //           to="/support"
// //           onClick={toggleSidebar}
// //           className="support-link"
// //         >
// //           <FiHeadphones className="sidebar-icon" />
// //           <span>Support</span>

// //           {unreadCount > 0 && (
// //             <span className="support-badge">
// //               {unreadCount}
// //             </span>
// //           )}
// //         </NavLink>

// //       </nav>
// //     </div>
// //   );
// // };

// // export default Sidebar;

// // components/Sidebar.jsx
// import React, { useEffect, useState, useCallback } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import axios from "axios";
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

//   const [unreadCount, setUnreadCount] = useState(0);

//   const API_URL = process.env.REACT_APP_API_URL;
//   const token = localStorage.getItem("token");

//   const location = useLocation();

//   // =============================
//   // Fetch unread support messages
//   // =============================
//   const fetchUnreadMessages = useCallback(async () => {

//     if (!token) return;

//     try {
//       const res = await axios.get(`${API_URL}/api/support/user`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       const messages = res.data || [];

//       const unread = messages.filter(
//         (msg) => msg.sender === "admin" && msg.read === false
//       ).length;

//       setUnreadCount(unread);

//     } catch (error) {
//       console.error(
//         "Unread support fetch error:",
//         error.response?.data || error.message
//       );
//     }

//   }, [API_URL, token]);

//   // =============================
//   // Poll unread messages
//   // =============================
//   useEffect(() => {

//     fetchUnreadMessages();

//     const interval = setInterval(() => {
//       fetchUnreadMessages();
//     }, 10000);

//     return () => clearInterval(interval);

//   }, [fetchUnreadMessages]);

//   // =============================
//   // Remove badge when support page is open
//   // =============================
//   useEffect(() => {

//     if (location.pathname === "/support") {
//       setUnreadCount(0);
//     }

//   }, [location]);

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
//           <FiHome className="sidebar-icon" />
//           <span>Dashboard</span>
//         </NavLink>

//         <NavLink to="/buy-numbers" onClick={toggleSidebar}>
//           <FiShoppingCart className="sidebar-icon" />
//           <span>Buy Numbers</span>
//         </NavLink>

//         <NavLink to="/order-history" onClick={toggleSidebar}>
//           <FiClock className="sidebar-icon" />
//           <span>Number History</span>
//         </NavLink>

//         <NavLink to="/fund-wallet" onClick={toggleSidebar}>
//           <FiPlusCircle className="sidebar-icon" />
//           <span>Fund Wallet</span>
//         </NavLink>

//         <NavLink
//           to="/support"
//           onClick={toggleSidebar}
//           className="support-link"
//         >
//           <FiHeadphones className="sidebar-icon" />
//           <span>Support</span>

//           {unreadCount > 0 && (
//             <span className="support-badge">
//               {unreadCount}
//             </span>
//           )}
//         </NavLink>

//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

// // components/Sidebar.jsx
// import React, { useEffect, useState, useCallback } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import axios from "axios";
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

//   const [unreadCount, setUnreadCount] = useState(0);

//   const API_URL = process.env.REACT_APP_API_URL;
//   const token = localStorage.getItem("token");

//   const location = useLocation();

//   // =============================
//   // Fetch unread messages
//   // =============================
//   const fetchUnreadMessages = useCallback(async () => {

//     if (!token) return;

//     try {

//       const res = await axios.get(`${API_URL}/api/support/user`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       const messages = res.data || [];

//       const unread = messages.filter(
//         (msg) => msg.sender === "admin" && msg.read === false
//       ).length;

//       setUnreadCount(unread);

//     } catch (error) {
//       console.error(
//         "Support unread fetch error:",
//         error.response?.data || error.message
//       );
//     }

//   }, [API_URL, token]);

//   // =============================
//   // Poll unread messages
//   // =============================
//   useEffect(() => {

//     // If support page is open, unread should be 0
//     if (location.pathname === "/support") {
//       setUnreadCount(0);
//       return;
//     }

//     fetchUnreadMessages();

//     const interval = setInterval(() => {
//       fetchUnreadMessages();
//     }, 10000);

//     return () => clearInterval(interval);

//   }, [fetchUnreadMessages, location]);

//   return (
//     <div className={`sidebar ${isOpen ? "open" : ""}`}>

//       <div className="close-btn" onClick={toggleSidebar}>
//         &times;
//       </div>

//       <div className="sidebar-logo">
//         <img src={logo} alt="SMS Market Logo" />
//       </div>

//       <nav>

//         <NavLink to="/dashboard" onClick={toggleSidebar}>
//           <FiHome className="sidebar-icon" />
//           <span>Dashboard</span>
//         </NavLink>

//         <NavLink to="/buy-numbers" onClick={toggleSidebar}>
//           <FiShoppingCart className="sidebar-icon" />
//           <span>Buy Numbers</span>
//         </NavLink>

//         <NavLink to="/order-history" onClick={toggleSidebar}>
//           <FiClock className="sidebar-icon" />
//           <span>Number History</span>
//         </NavLink>

//         <NavLink to="/fund-wallet" onClick={toggleSidebar}>
//           <FiPlusCircle className="sidebar-icon" />
//           <span>Fund Wallet</span>
//         </NavLink>

//         <NavLink
//           to="/support"
//           onClick={toggleSidebar}
//           className="support-link"
//         >
//           <FiHeadphones className="sidebar-icon" />
//           <span>Support</span>

//           {unreadCount > 0 && (
//             <span className="support-badge">
//               {unreadCount}
//             </span>
//           )}

//         </NavLink>

//       </nav>

//     </div>
//   );
// };

// export default Sidebar;

// components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FiHome,
  FiShoppingCart,
  FiClock,
  FiPlusCircle,
  FiHeadphones,
} from "react-icons/fi";
import "../styles/sidebar.css";
import logo from "../assets/logo.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);

  const location = useLocation();
  const getToken = () => localStorage.getItem("token"); // user token

  /* ==============================
     Detect Mobile Screen
  ============================== */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ==============================
     Fetch Unread Support Messages
  ============================== */
  const fetchUnreadMessages = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/support/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) return;

      const messages = await res.json();
      let unread = messages.filter(
        (msg) => msg.sender === "admin" && !msg.read
      ).length;

      // If user is on /support, consider messages read
      if (location.pathname === "/support") unread = 0;

      setUnreadMessages(unread);
    } catch (err) {
      console.error("Sidebar unread messages error:", err);
    }
  };

  useEffect(() => {
    fetchUnreadMessages();

    // Poll every 30 seconds
    const interval = setInterval(fetchUnreadMessages, 30000);
    return () => clearInterval(interval);
  }, [location.pathname]);

  return (
    <>
      {isOpen && isMobile && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="close-btn" onClick={toggleSidebar}>
          &times;
        </div>

        <div className="sidebar-logo">
          <img src={logo} alt="RealSMS" />
        </div>

        <nav>
          <NavLink to="/dashboard" onClick={toggleSidebar}>
            <FiHome className="sidebar-icon" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/buy-numbers" onClick={toggleSidebar}>
            <FiShoppingCart className="sidebar-icon" />
            <span>Buy Numbers</span>
          </NavLink>

          <NavLink to="/order-history" onClick={toggleSidebar}>
            <FiClock className="sidebar-icon" />
            <span>Number History</span>
          </NavLink>

          <NavLink to="/fund-wallet" onClick={toggleSidebar}>
            <FiPlusCircle className="sidebar-icon" />
            <span>Fund Wallet</span>
          </NavLink>

          <NavLink
            to="/support"
            onClick={toggleSidebar}
            className="nav-with-badge"
          >
            <FiHeadphones className="sidebar-icon" />
            <span>Support</span>
            {unreadMessages > 0 && (
              <span className="badge unread pulse">{unreadMessages}</span>
            )}
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
