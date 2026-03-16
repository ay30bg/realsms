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


// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { FiHome, FiShoppingCart, FiClock, FiPlusCircle, FiHeadphones } from "react-icons/fi";
// import "../styles/sidebar.css";
// import logo from "../assets/logo.png";

// const UserSidebar = ({ isOpen, toggleSidebar }) => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [unreadMessages, setUnreadMessages] = useState(0);

//   const getToken = () => localStorage.getItem("token"); // adjust if your key is different

//   /* Detect mobile screen */
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   /* Fetch unread messages */
//   useEffect(() => {
//     const fetchUnreadMessages = async () => {
//       try {
//         const token = getToken();
//         if (!token) return;

//         const res = await fetch(`${process.env.REACT_APP_API_URL}/api/support/user/unread`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setUnreadMessages(data.count || 0);
//         } else {
//           console.error("Failed to fetch unread messages:", res.status);
//         }
//       } catch (err) {
//         console.error("Error fetching unread messages:", err);
//       }
//     };

//     fetchUnreadMessages();

//     // Refresh every 30s
//     const interval = setInterval(fetchUnreadMessages, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isOpen && isMobile && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

//       <aside className={`sidebar ${isOpen ? "open" : ""}`}>
//         {/* Close button */}
//         <div className="close-btn" onClick={toggleSidebar}>&times;</div>

//         {/* Logo */}
//         <div className="sidebar-logo">
//           <img src={logo} alt="RealSMS" />
//         </div>

//         {/* Navigation */}
//         <nav>
//           <NavLink to="/dashboard" onClick={toggleSidebar}>
//             <FiHome className="sidebar-icon" />
//             <span>Dashboard</span>
//           </NavLink>

//           <NavLink to="/buy-numbers" onClick={toggleSidebar}>
//             <FiShoppingCart className="sidebar-icon" />
//             <span>Buy Numbers</span>
//           </NavLink>

//           <NavLink to="/order-history" onClick={toggleSidebar}>
//             <FiClock className="sidebar-icon" />
//             <span>Number History</span>
//           </NavLink>

//           <NavLink to="/fund-wallet" onClick={toggleSidebar}>
//             <FiPlusCircle className="sidebar-icon" />
//             <span>Fund Wallet</span>
//           </NavLink>

//           <NavLink to="/support" onClick={toggleSidebar} className="nav-with-badge">
//             <FiHeadphones className="sidebar-icon" />
//             <span>Support</span>

//             {unreadMessages > 0 && (
//               <span className="badge unread pulse">{unreadMessages}</span>
//             )}
//           </NavLink>
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default UserSidebar;

// components/UserSidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiShoppingCart, FiClock, FiPlusCircle, FiHeadphones } from "react-icons/fi";
import "../styles/sidebar.css";
import logo from "../assets/logo.png";
import { useUnread } from "../context/UnreadContext";

const UserSidebar = ({ isOpen, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { unreadMessages, setUnreadMessages } = useUnread();

  const getToken = () => localStorage.getItem("token");

  /* Detect mobile screen */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Fetch unread messages */
  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        const token = getToken();
        if (!token) return;

        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/support/user/unread`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUnreadMessages(data.count || 0);
        }
      } catch (err) {
        console.error("Error fetching unread messages:", err);
      }
    };

    fetchUnreadMessages();
    const interval = setInterval(fetchUnreadMessages, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, [setUnreadMessages]);

  return (
    <>
      {isOpen && isMobile && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="close-btn" onClick={toggleSidebar}>&times;</div>

        <div className="sidebar-logo">
          <img src={logo} alt="RealSMS" />
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

          <NavLink to="/support" onClick={toggleSidebar} className="nav-with-badge">
            <FiHeadphones className="sidebar-icon" /> <span>Support</span>
            {unreadMessages > 0 && <span className="badge unread pulse">{unreadMessages}</span>}
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default UserSidebar;
