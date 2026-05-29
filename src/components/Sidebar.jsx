// import React, { useState, useEffect, useRef } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FiHome,
//   FiShoppingCart,
//   FiMessageCircle,
//   FiClock,
//   FiCreditCard,
//   FiPlusCircle,
//   FiHeadphones,
// } from "react-icons/fi";

// import "../styles/sidebar.css";
// import logo from "../assets/logo.png";
// import { useUnread } from "../context/UnreadContext";
// import { useBalance } from "../context/BalanceContext";

// /* =========================
//    FORMAT BALANCE
// ========================= */
// const formatBalance = (value) => {
//   if (value === null || value === undefined) return "0.00";

//   return Number(value).toLocaleString(undefined, {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });
// };

// const UserSidebar = ({ isOpen, toggleSidebar }) => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [userName, setUserName] = useState("");

//   /* =========================
//      ANIMATED BALANCE
//   ========================= */
//   const [animatedBalance, setAnimatedBalance] = useState(0);
//   const previousBalanceRef = useRef(0);

//   const { unreadMessages } = useUnread();
//   const { balance } = useBalance();

//   /* =========================
//      RESPONSIVE CHECK
//   ========================= */
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     handleResize();

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   /* =========================
//      FETCH USER
//   ========================= */
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         const res = await fetch(
//           `${process.env.REACT_APP_API_URL}/api/auth/me`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await res.json();

//         if (data.success && data.user) {
//           const user = data.user;
//           setUserName(`${user.firstName} ${user.lastName}`);
//         }
//       } catch (err) {
//         console.error("Failed to fetch user:", err);
//       }
//     };

//     fetchUser();
//   }, []);

//   /* =========================
//      BALANCE COUNTER ANIMATION
//   ========================= */
//   useEffect(() => {
//     const start = previousBalanceRef.current;
//     const end = Number(balance) || 0;

//     if (start === end) return;

//     const duration = 1000;
//     const startTime = performance.now();

//     const animate = (currentTime) => {
//       const elapsed = currentTime - startTime;
//       const progress = Math.min(elapsed / duration, 1);

//       // easeOut effect
//       const easeOut = 1 - Math.pow(1 - progress, 3);

//       const currentValue =
//         start + (end - start) * easeOut;

//       setAnimatedBalance(currentValue);

//       if (progress < 1) {
//         requestAnimationFrame(animate);
//       } else {
//         previousBalanceRef.current = end;
//       }
//     };

//     requestAnimationFrame(animate);
//   }, [balance]);

//   return (
//     <>
//       {isOpen && isMobile && (
//         <div className="sidebar-overlay" onClick={toggleSidebar} />
//       )}

//       <aside className={`sidebar ${isOpen ? "open" : ""}`}>
//         <div className="close-btn" onClick={toggleSidebar}>
//           &times;
//         </div>

//         {/* ================= LOGO ================= */}
//         <div className="sidebar-logo">
//           <img src={logo} alt="Logo" />
//         </div>

//         {/* ================= USER CARD ================= */}
//          <div className="sidebar-user-card">
//           <div className="user-name">
//             {userName || "Loading..."}
//           </div>

//           <div className="user-balance">
//             Balance:{" "}
//             <span>
//               ₦{formatBalance(animatedBalance)}
//             </span>
//           </div>
//         </div> 

//         {/* ================= NAVIGATION ================= */}
//         <nav>
//           <NavLink to="/dashboard" onClick={toggleSidebar}>
//             <FiHome className="sidebar-icon" /> <span>Dashboard</span>
//           </NavLink>

//           <NavLink to="/buy-numbers" onClick={toggleSidebar}>
//             <FiShoppingCart className="sidebar-icon" />{" "}
//             <span>Buy Numbers</span>
//           </NavLink>

//           <NavLink to="/purchase-logs" onClick={toggleSidebar}>
//             <FiMessageCircle className="sidebar-icon" />{" "}
//             <span>Purchase Logs</span>
//           </NavLink>

//           <NavLink to="/order-history" onClick={toggleSidebar}>
//             <FiClock className="sidebar-icon" />{" "}
//             <span>Number History</span>
//           </NavLink>

//           <NavLink to="/logs-history" onClick={toggleSidebar}>
//             <FiClock className="sidebar-icon" />{" "}
//             <span>Logs History</span>
//           </NavLink>

//           <NavLink
//             to="/transaction-history"
//             onClick={toggleSidebar}
//           >
//             <FiCreditCard className="sidebar-icon" />{" "}
//             <span>Transaction History</span>
//           </NavLink>

//           <NavLink to="/fund-wallet" onClick={toggleSidebar}>
//             <FiPlusCircle className="sidebar-icon" />{" "}
//             <span>Fund Wallet</span>
//           </NavLink>

//           <NavLink
//             to="/support"
//             onClick={toggleSidebar}
//             className="nav-with-badge"
//           >
//             <FiHeadphones className="sidebar-icon" />
//             <span>Support</span>

//             {unreadMessages > 0 && (
//               <span className="badge unread pulse">
//                 {unreadMessages}
//               </span>
//             )}
//           </NavLink>
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default UserSidebar;

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

import React, { useState, useEffect, useRef } from "react";
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

/* =========================
   FORMAT BALANCE
========================= */
const formatBalance = (value) => {
  if (value === null || value === undefined) return "0.00";

  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const UserSidebar = ({ isOpen, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [userName, setUserName] = useState("");

  const { unreadMessages, setUnreadMessages } = useUnread();
  const { balance } = useBalance();

  /* =========================
     ANIMATED BALANCE
  ========================= */
  const [animatedBalance, setAnimatedBalance] = useState(0);
  const previousBalanceRef = useRef(0);

  const getToken = () => localStorage.getItem("token");

  /* Detect mobile screen */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Fetch user */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getToken();
        if (!token) return;

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/auth/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

        if (data.success && data.user) {
          setUserName(`${data.user.firstName} ${data.user.lastName}`);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  /* Fetch unread messages */
  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        const token = getToken();
        if (!token) return;

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/support/user/unread`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setUnreadMessages(data.count || 0);
        }
      } catch (err) {
        console.error("Error fetching unread messages:", err);
      }
    };

    fetchUnreadMessages();
    const interval = setInterval(fetchUnreadMessages, 30000);
    return () => clearInterval(interval);
  }, [setUnreadMessages]);

  /* Balance animation */
  useEffect(() => {
    const start = previousBalanceRef.current;
    const end = Number(balance) || 0;

    if (start === end) return;

    const duration = 1000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentValue = start + (end - start) * easeOut;
      setAnimatedBalance(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        previousBalanceRef.current = end;
      }
    };

    requestAnimationFrame(animate);
  }, [balance]);

  return (
    <>
      {isOpen && isMobile && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="close-btn" onClick={toggleSidebar}>
          &times;
        </div>

        <div className="sidebar-logo">
          <img src={logo} alt="RealSMS" />
        </div>

        {/* ================= USER CARD ================= */}
        <div className="sidebar-user-card">
          <div className="user-name">
            {userName || "Loading..."}
          </div>

          <div className="user-balance">
            Balance:{" "}
            <span>₦{formatBalance(animatedBalance)}</span>
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
            <FiHeadphones className="sidebar-icon" />
            <span>Support</span>

            {unreadMessages > 0 && (
              <span className="badge unread pulse">
                {unreadMessages}
              </span>
            )}
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default UserSidebar;
