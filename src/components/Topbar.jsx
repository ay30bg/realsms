// import React, { useState, useEffect, useRef } from "react";
// import {
//   FiChevronDown,
//   FiSettings,
//   FiLogOut,
//   FiMenu,
//   FiBell,
//   FiCreditCard,
// } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { useBalance } from "../context/BalanceContext";
// import "../styles/topbar.css";

// const Topbar = ({ toggleSidebar }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [notifOpen, setNotifOpen] = useState(false);
//   const [userName, setUserName] = useState("");

//   const navigate = useNavigate();
//   const notifRef = useRef(null);
//   const { balance } = useBalance();

//   const [notifications, setNotifications] = useState({
//     support: [],
//     activity: [],
//     admin: [],
//   });

//   const formatBalance = (value) => {
//     return Number(value || 0).toLocaleString(undefined, {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });
//   };

//   const formatNotifDate = (date) => {
//     if (!date) return "";
//     const d = new Date(date);

//     const datePart = d.toLocaleString("en-US", {
//       month: "long",
//       day: "numeric",
//     });

//     const timePart = d.toLocaleString("en-US", {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     });

//     return `${datePart}, ${timePart}`;
//   };

//   const unreadCount =
//     notifications.support.filter((n) => !n.read).length +
//     notifications.activity.filter((n) => !n.read).length +
//     notifications.admin.filter((n) => !n.read).length;

//   const toggleDropdown = () => setDropdownOpen((prev) => !prev);
//   const toggleNotifications = () => setNotifOpen((prev) => !prev);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setDropdownOpen(false);
//     navigate("/");
//   };

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
//           setUserName(
//             `${data.user.firstName} ${data.user.lastName}`
//           );
//         }
//       } catch (err) {
//         console.error("User fetch error:", err);
//       }
//     };

//     fetchUser();
//   }, []);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         const [supportRes, activityRes] = await Promise.all([
//           fetch(
//             `${process.env.REACT_APP_API_URL}/api/support/notifications`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           ),
//           fetch(
//             `${process.env.REACT_APP_API_URL}/api/transactions/notifications`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           ),
//         ]);

//         const supportData = await supportRes.json();
//         const activityData = await activityRes.json();

//         setNotifications({
//           support: supportData.notifications || [],
//           activity: activityData.notifications || [],
//           admin: [],
//         });
//       } catch (err) {
//         console.error("Notification fetch error:", err);
//       }
//     };

//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 15000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         notifRef.current &&
//         !notifRef.current.contains(event.target)
//       ) {
//         setNotifOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () =>
//       document.removeEventListener(
//         "mousedown",
//         handleClickOutside
//       );
//   }, []);

//   return (
//     <div className="topbar">
//       {/* LEFT */}
//       <div className="topbar-left">
//         <div className="hamburger" onClick={toggleSidebar}>
//           <FiMenu size={22} />
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className="topbar-right">
//         {/* Wallet */}
//         <div className="wallet-card">
//           <div className="wallet-icon">
//             <FiCreditCard />
//           </div>

//           <div className="wallet-info">
//             <small>Wallet Balance</small>
//             <span>₦{formatBalance(balance)}</span>
//           </div>
//         </div>

//         {/* Notifications */}
//         <div className="notification-wrapper" ref={notifRef}>
//           <div
//             className="notification-icon"
//             onClick={toggleNotifications}
//           >
//             <FiBell size={20} />
//             {unreadCount > 0 && (
//               <span className="notification-badge">
//                 {unreadCount}
//               </span>
//             )}
//           </div>

//           {notifOpen && (
//             <div className="notification-dropdown">
//               <div className="notif-header">
//                 <h4>Notifications</h4>
//               </div>

//               {notifications.support.length === 0 &&
//                 notifications.activity.length === 0 &&
//                 notifications.admin.length === 0 && (
//                   <div className="notif-empty">
//                     You're all caught up 🎉
//                   </div>
//                 )}

//               {[
//                 ...notifications.support,
//                 ...notifications.activity,
//                 ...notifications.admin,
//               ].map((n, i) => (
//                 <div key={i} className="notif-item">
//                   <div className="notif-content">
//                     <span>{n.text}</span>
//                     <small>{formatNotifDate(n.time)}</small>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Profile */}
//         <div className="profile" onClick={toggleDropdown}>
//           <div className="avatar-circle">
//             {userName
//               ? userName
//                   .split(" ")
//                   .map((word) => word[0])
//                   .slice(0, 2)
//                   .join("")
//                   .toUpperCase()
//               : "YE"}
//           </div>

//           <div className="profile-info">
//             <span>{userName || "Loading..."}</span>
//             <FiChevronDown
//               className={dropdownOpen ? "rotate" : ""}
//             />
//           </div>

//           {dropdownOpen && (
//             <div className="dropdown-menu">
//               <p>
//                 <FiSettings />
//                 Account
//               </p>

//               <p className="logout" onClick={handleLogout}>
//                 <FiLogOut />
//                 Logout
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
  FiMenu,
  FiBell,
  FiCreditCard,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useBalance } from "../context/BalanceContext";
import "../styles/topbar.css";

const Topbar = ({ toggleSidebar }) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [firstName, setFirstName] = useState("");

  const navigate = useNavigate();
  const notifRef = useRef(null);
  const { balance } = useBalance();

  const [notifications, setNotifications] = useState({
    support: [],
    activity: [],
    admin: [],
  });

  // GET USER
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
          setFirstName(data.user.firstName || "User");
        }
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };

    fetchUser();
  }, []);

  // GREETING LOGIC
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const formatBalance = (value) => {
    return Number(value || 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatNotifDate = (date) => {
    if (!date) return "";
    const d = new Date(date);

    return `${d.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
    })}, ${d.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  };

  const unreadCount =
    notifications.support.filter((n) => !n.read).length +
    notifications.activity.filter((n) => !n.read).length +
    notifications.admin.filter((n) => !n.read).length;

  const toggleNotifications = () => setNotifOpen((prev) => !prev);

  // NOTIFICATIONS FETCH
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const [supportRes, activityRes] = await Promise.all([
          fetch(
            `${process.env.REACT_APP_API_URL}/api/support/notifications`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          fetch(
            `${process.env.REACT_APP_API_URL}/api/transactions/notifications`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        const supportData = await supportRes.json();
        const activityData = await activityRes.json();

        setNotifications({
          support: supportData.notifications || [],
          activity: activityData.notifications || [],
          admin: [],
        });
      } catch (err) {
        console.error("Notification fetch error:", err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  // CLOSE OUTSIDE NOTIF
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target)
      ) {
        setNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="topbar">
      {/* LEFT */}
      <div className="topbar-left">
        <div className="hamburger" onClick={toggleSidebar}>
          <FiMenu size={22} />
        </div>

        {/* GREETING */}
        <div className="topbar-greeting">
          {getGreeting()}, <span>{firstName}</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="topbar-right">
        {/* WALLET */}
        <div className="wallet-card">
          <div className="wallet-icon">
            <FiCreditCard />
          </div>

          <div className="wallet-info">
            <small>Wallet Balance</small>
            <span>₦{formatBalance(balance)}</span>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="notification-wrapper" ref={notifRef}>
          <div
            className="notification-icon"
            onClick={toggleNotifications}
          >
            <FiBell size={20} />
            {unreadCount > 0 && (
              <span className="notification-badge">
                {unreadCount}
              </span>
            )}
          </div>

          {notifOpen && (
            <div className="notification-dropdown">
              <div className="notif-header">
                <h4>Notifications</h4>
              </div>

              {notifications.support.length === 0 &&
                notifications.activity.length === 0 &&
                notifications.admin.length === 0 && (
                  <div className="notif-empty">
                    You're all caught up 🎉
                  </div>
                )}

              {[...notifications.support,
                ...notifications.activity,
                ...notifications.admin
              ].map((n, i) => (
                <div key={i} className="notif-item">
                  <div className="notif-content">
                    <span>{n.text}</span>
                    <small>{formatNotifDate(n.time)}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
