// // // components/UserSidebar.jsx
// // import React, { useState, useEffect } from "react";
// // import { NavLink } from "react-router-dom";
// // import { FiHome, FiShoppingCart, FiMessageCircle, FiClock, FiCreditCard, FiPlusCircle, FiHeadphones } from "react-icons/fi";
// // import "../styles/sidebar.css";
// // import logo from "../assets/logo.png";
// // import { useUnread } from "../context/UnreadContext";

// // const UserSidebar = ({ isOpen, toggleSidebar }) => {
// //   const [isMobile, setIsMobile] = useState(false);
// //   const { unreadMessages, setUnreadMessages } = useUnread();

// //   const getToken = () => localStorage.getItem("token");

// //   /* Detect mobile screen */
// //   useEffect(() => {
// //     const handleResize = () => setIsMobile(window.innerWidth <= 768);
// //     handleResize();
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   /* Fetch unread messages */
// //   useEffect(() => {
// //     const fetchUnreadMessages = async () => {
// //       try {
// //         const token = getToken();
// //         if (!token) return;

// //         const res = await fetch(`${process.env.REACT_APP_API_URL}/api/support/user/unread`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });

// //         if (res.ok) {
// //           const data = await res.json();
// //           setUnreadMessages(data.count || 0);
// //         }
// //       } catch (err) {
// //         console.error("Error fetching unread messages:", err);
// //       }
// //     };

// //     fetchUnreadMessages();
// //     const interval = setInterval(fetchUnreadMessages, 30000); // refresh every 30s
// //     return () => clearInterval(interval);
// //   }, [setUnreadMessages]);

// //   return (
// //     <>
// //       {isOpen && isMobile && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

// //       <aside className={`sidebar ${isOpen ? "open" : ""}`}>
// //         <div className="close-btn" onClick={toggleSidebar}>&times;</div>

// //         <div className="sidebar-logo">
// //           <img src={logo} alt="RealSMS" />
// //         </div>

// //         <nav>
// //           <NavLink to="/dashboard" onClick={toggleSidebar}>
// //             <FiHome className="sidebar-icon" /> <span>Dashboard</span>
// //           </NavLink>

// //           <NavLink to="/buy-numbers" onClick={toggleSidebar}>
// //             <FiShoppingCart className="sidebar-icon" /> <span>Buy Numbers</span>
// //           </NavLink>

// //            <NavLink to="/purchase-logs" onClick={toggleSidebar}>
// //             <FiMessageCircle className="sidebar-icon" /> <span>Purchase Logs</span>
// //           </NavLink>

// //           <NavLink to="/order-history" onClick={toggleSidebar}>
// //             <FiClock className="sidebar-icon" /> <span>Number History</span>
// //           </NavLink>

// //           <NavLink to="/logs-history" onClick={toggleSidebar}>
// //             <FiClock className="sidebar-icon" /> <span>Logs History</span>
// //           </NavLink>

// //            <NavLink to="/transaction-history" onClick={toggleSidebar}>
// //             <FiCreditCard className="sidebar-icon" /> <span>Transaction History</span>
// //           </NavLink>

// //           <NavLink to="/fund-wallet" onClick={toggleSidebar}>
// //             <FiPlusCircle className="sidebar-icon" /> <span>Fund Wallet</span>
// //           </NavLink>

// //           <NavLink to="/support" onClick={toggleSidebar} className="nav-with-badge">
// //             <FiHeadphones className="sidebar-icon" /> <span>Support</span>
// //             {unreadMessages > 0 && <span className="badge unread pulse">{unreadMessages}</span>}
// //           </NavLink>
// //         </nav>
// //       </aside>
// //     </>
// //   );
// // };

// // export default UserSidebar;

// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FiHome,
//   FiShoppingCart,
//   FiMessageCircle,
//   FiClock,
//   FiCreditCard,
//   FiPlusCircle,
//   FiHeadphones
// } from "react-icons/fi";

// import "../styles/sidebar.css";
// import logo from "../assets/logo.png";
// import { useUnread } from "../context/UnreadContext";
// import { useBalance } from "../context/BalanceContext";

// const UserSidebar = ({ isOpen, toggleSidebar }) => {
//   const [isMobile, setIsMobile] = useState(false);

//   const { unreadMessages } = useUnread();
//   const { balance } = useBalance();

//   // 👇 get username (adjust if you use AuthContext instead)
//   const username = localStorage.getItem("username") || "User";

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <>
//       {isOpen && isMobile && (
//         <div className="sidebar-overlay" onClick={toggleSidebar}></div>
//       )}

//       <aside className={`sidebar ${isOpen ? "open" : ""}`}>
//         <div className="close-btn" onClick={toggleSidebar}>
//           &times;
//         </div>

//         <div className="sidebar-logo">
//           <img src={logo} alt="RealSMS" />
//         </div>

//         {/* ================= USER HEADER (NEW) ================= */}
//         <div className="sidebar-user-card">
//           <div className="user-name">{username}</div>
//           <div className="user-balance">
//             Balance: <span>${balance.toFixed(2)}</span>
//           </div>
//         </div>

//         <nav>
//           <NavLink to="/dashboard" onClick={toggleSidebar}>
//             <FiHome className="sidebar-icon" /> <span>Dashboard</span>
//           </NavLink>

//           <NavLink to="/buy-numbers" onClick={toggleSidebar}>
//             <FiShoppingCart className="sidebar-icon" /> <span>Buy Numbers</span>
//           </NavLink>

//           <NavLink to="/purchase-logs" onClick={toggleSidebar}>
//             <FiMessageCircle className="sidebar-icon" /> <span>Purchase Logs</span>
//           </NavLink>

//           <NavLink to="/order-history" onClick={toggleSidebar}>
//             <FiClock className="sidebar-icon" /> <span>Number History</span>
//           </NavLink>

//           <NavLink to="/logs-history" onClick={toggleSidebar}>
//             <FiClock className="sidebar-icon" /> <span>Logs History</span>
//           </NavLink>

//           <NavLink to="/transaction-history" onClick={toggleSidebar}>
//             <FiCreditCard className="sidebar-icon" /> <span>Transaction History</span>
//           </NavLink>

//           <NavLink to="/fund-wallet" onClick={toggleSidebar}>
//             <FiPlusCircle className="sidebar-icon" /> <span>Fund Wallet</span>
//           </NavLink>

//           <NavLink to="/support" onClick={toggleSidebar} className="nav-with-badge">
//             <FiHeadphones className="sidebar-icon" /> <span>Support</span>
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

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiShoppingCart,
  FiMessageCircle,
  FiClock,
  FiCreditCard,
  FiPlusCircle,
  FiHeadphones,
} from "react-icons/fi";

import "../styles/sidebar.css";
import logo from "../assets/logo.png";
import { useUnread } from "../context/UnreadContext";
import { useBalance } from "../context/BalanceContext";

const UserSidebar = ({ isOpen, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(false);

  const { unreadMessages } = useUnread();
  const { balance } = useBalance();

  // user state
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch user (same as Topbar, but only name)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (data.success && data.user) {
          const user = data.user;
          setUserName(`${user.firstName} ${user.lastName}`);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

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

        {/* USER HEADER */}
        <div className="sidebar-user-card">
          <div className="user-name">{userName || "Loading..."}</div>

          <div className="user-balance">
            Balance: <span>${balance.toFixed(2)}</span>
          </div>
        </div>

        <nav>
          <NavLink to="/dashboard" onClick={toggleSidebar}>
            <FiHome className="sidebar-icon" /> <span>Dashboard</span>
          </NavLink>

          <NavLink to="/buy-numbers" onClick={toggleSidebar}>
            <FiShoppingCart className="sidebar-icon" /> <span>Buy Numbers</span>
          </NavLink>

          <NavLink to="/purchase-logs" onClick={toggleSidebar}>
            <FiMessageCircle className="sidebar-icon" /> <span>Purchase Logs</span>
          </NavLink>

          <NavLink to="/order-history" onClick={toggleSidebar}>
            <FiClock className="sidebar-icon" /> <span>Number History</span>
          </NavLink>

          <NavLink to="/logs-history" onClick={toggleSidebar}>
            <FiClock className="sidebar-icon" /> <span>Logs History</span>
          </NavLink>

          <NavLink to="/transaction-history" onClick={toggleSidebar}>
            <FiCreditCard className="sidebar-icon" /> <span>Transaction History</span>
          </NavLink>

          <NavLink to="/fund-wallet" onClick={toggleSidebar}>
            <FiPlusCircle className="sidebar-icon" /> <span>Fund Wallet</span>
          </NavLink>

          <NavLink
            to="/support"
            onClick={toggleSidebar}
            className="nav-with-badge"
          >
            <FiHeadphones className="sidebar-icon" /> <span>Support</span>
            {unreadMessages > 0 && (
              <span className="badge unread pulse">{unreadMessages}</span>
            )}
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default UserSidebar;
