// import React, { useState, useEffect } from "react";
// import {
//   FiChevronDown,
//   FiSettings,
//   FiLogOut,
//   FiMenu,
//   FiMoon,
//   FiSun,
//   FiBell,
// } from "react-icons/fi";

// import { useNavigate } from "react-router-dom";
// import { useTheme } from "../context/ThemeContext";

// import "../styles/topbar.css";

// const Topbar = ({ toggleSidebar }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [avatarUrl, setAvatarUrl] = useState("");

//   const { darkMode, toggleTheme } = useTheme();

//   const navigate = useNavigate();

//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

//   // Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setDropdownOpen(false);
//     navigate("/");
//   };

//   // Fetch user
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

//           setAvatarUrl(
//             `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
//               user.email
//             )}`
//           );
//         }
//       } catch (err) {
//         console.error("Failed to fetch user:", err);
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <div className="topbar">
//       {/* Left */}
//       <div className="topbar-left">
//         <div className="hamburger" onClick={toggleSidebar}>
//           <FiMenu size={24} />
//         </div>
//       </div>

//       {/* Right */}
//       <div className="topbar-right">
//         {/* Theme Toggle */}
//         <button className="theme-toggle" onClick={toggleTheme}>
//           {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
//         </button>

//         {/* Notifications */}
//         <div className="notification-icon">
//           <FiBell size={20} />

//           <span className="notification-badge">3</span>
//         </div>

//         {/* Profile */}
//         <div
//           className="profile"
//           onClick={toggleDropdown}
//           style={{
//             cursor: "pointer",
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           <img
//             src={avatarUrl || "https://i.pravatar.cc/40"}
//             alt="User Avatar"
//             style={{
//               borderRadius: "50%",
//               marginRight: "8px",
//               objectFit: "cover",
//               border: "2px solid var(--border-color)",
//             }}
//           />

//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               margin: 0,
//             }}
//           >
//             <span className="username-text">
//               {userName || "Loading..."}
//             </span>

//             <FiChevronDown
//               className="username-arrow"
//               size={16}
//               style={{
//                 marginLeft: "5px",
//                 position: "relative",
//                 top: "2px",
//                 transition: "transform 0.3s",
//                 transform: dropdownOpen
//                   ? "rotate(180deg)"
//                   : "rotate(0deg)",
//               }}
//             />
//           </div>

//           {dropdownOpen && (
//             <div className="dropdown-menu">
//               <p
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "8px",
//                 }}
//               >
//                 <FiSettings /> ACCOUNT
//               </p>

//               <p
//                 className="logout"
//                 onClick={handleLogout}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "8px",
//                 }}
//               >
//                 <FiLogOut /> LOGOUT
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Topbar;

import React, { useState, useEffect, useRef } from "react";
import {
  FiChevronDown,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiSun,
  FiBell,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import "../styles/topbar.css";

const Topbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const [userName, setUserName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const notifRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleNotifications = () => setNotifOpen(!notifOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setDropdownOpen(false);
    navigate("/");
  };

  // 🔔 Mock notifications (replace with API later)
  const notifications = {
    support: [
      { id: 1, text: "Support replied to your ticket #2341", time: "2m ago" },
    ],
    activity: [
      { id: 2, text: "Deposit of ₦5,000 successful", time: "1h ago" },
      { id: 3, text: "Withdrawal request approved", time: "3h ago" },
    ],
    admin: [
      { id: 4, text: "Site maintenance scheduled tonight 2AM", time: "1d ago" },
    ],
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/auth/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

        if (data.success && data.user) {
          const user = data.user;

          setUserName(`${user.firstName} ${user.lastName}`);

          setAvatarUrl(
            `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
              user.email
            )}`
          );
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="topbar">
      {/* LEFT */}
      <div className="topbar-left">
        <div className="hamburger" onClick={toggleSidebar}>
          <FiMenu size={24} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="topbar-right">
        {/* Theme */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        {/* NOTIFICATIONS */}
        <div className="notification-wrapper" ref={notifRef}>
          <div className="notification-icon" onClick={toggleNotifications}>
            <FiBell size={20} />
            <span className="notification-badge">3</span>
          </div>

          {notifOpen && (
            <div className="notification-dropdown">
              <h4>Notifications</h4>

              {/* Support */}
              <div className="notif-section">
                <p className="notif-title">Support</p>
                {notifications.support.map((n) => (
                  <div key={n.id} className="notif-item">
                    <span>{n.text}</span>
                    <small>{n.time}</small>
                  </div>
                ))}
              </div>

              {/* Activity */}
              <div className="notif-section">
                <p className="notif-title">Activity</p>
                {notifications.activity.map((n) => (
                  <div key={n.id} className="notif-item">
                    <span>{n.text}</span>
                    <small>{n.time}</small>
                  </div>
                ))}
              </div>

              {/* Admin */}
              <div className="notif-section">
                <p className="notif-title">Admin</p>
                {notifications.admin.map((n) => (
                  <div key={n.id} className="notif-item">
                    <span>{n.text}</span>
                    <small>{n.time}</small>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div className="profile" onClick={toggleDropdown}>
          <img
            src={avatarUrl || "https://i.pravatar.cc/40"}
            alt="User Avatar"
          />

          <div className="profile-info">
            <span className="username-text">
              {userName || "Loading..."}
            </span>

            <FiChevronDown
              size={16}
              style={{
                transform: dropdownOpen
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              }}
            />
          </div>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <p>
                <FiSettings /> ACCOUNT
              </p>

              <p className="logout" onClick={handleLogout}>
                <FiLogOut /> LOGOUT
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
