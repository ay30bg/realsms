// // import React, { useState, useEffect, useRef } from "react";
// // import {
// //   FiChevronDown,
// //   FiSettings,
// //   FiLogOut,
// //   FiMenu,
// //   FiMoon,
// //   FiSun,
// //   FiBell,
// // } from "react-icons/fi";

// // import { useNavigate } from "react-router-dom";
// // import { useTheme } from "../context/ThemeContext";

// // import "../styles/topbar.css";

// // const Topbar = ({ toggleSidebar }) => {
// //   const [dropdownOpen, setDropdownOpen] = useState(false);
// //   const [notifOpen, setNotifOpen] = useState(false);

// //   const [userName, setUserName] = useState("");
// //   const [avatarUrl, setAvatarUrl] = useState("");

// //   const { darkMode, toggleTheme } = useTheme();
// //   const navigate = useNavigate();

// //   const notifRef = useRef(null);

// //   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
// //   const toggleNotifications = () => setNotifOpen(!notifOpen);

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     setDropdownOpen(false);
// //     navigate("/");
// //   };

// //   // =========================
// //   // NOTIFICATIONS (WITH READ STATE)
// //   // =========================
// //   const [notifications, setNotifications] = useState({
// //     support: [
// //       {
// //         id: 1,
// //         text: "Support replied to your ticket #2341",
// //         time: "2m ago",
// //         read: false,
// //       },
// //     ],
// //     activity: [
// //       {
// //         id: 2,
// //         text: "Deposit of ₦5,000 successful",
// //         time: "1h ago",
// //         read: false,
// //       },
// //       {
// //         id: 3,
// //         text: "Withdrawal request approved",
// //         time: "3h ago",
// //         read: false,
// //       },
// //     ],
// //     admin: [
// //       {
// //         id: 4,
// //         text: "Site maintenance scheduled tonight 2AM",
// //         time: "1d ago",
// //         read: false,
// //       },
// //     ],
// //   });

// //   // =========================
// //   // UNREAD COUNT
// //   // =========================
// //   const unreadCount = Object.values(notifications)
// //     .flat()
// //     .filter((n) => !n.read).length;

// //   // =========================
// //   // CLICK NOTIFICATION
// //   // =========================
// //   const handleNotificationClick = (section, id) => {
// //     setNotifications((prev) => {
// //       const updated = { ...prev };

// //       updated[section] = updated[section].map((n) =>
// //         n.id === id ? { ...n, read: true } : n
// //       );

// //       return updated;
// //     });

// //     setNotifOpen(false);

// //     // Optional navigation logic
// //     if (section === "activity") navigate("/transaction-history");
// //     if (section === "support") navigate("/support");
// //     if (section === "admin") navigate("/announcements");
// //   };

// //   // Close dropdown when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (notifRef.current && !notifRef.current.contains(event.target)) {
// //         setNotifOpen(false);
// //       }
// //     };

// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // Fetch user
// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         if (!token) return;

// //         const res = await fetch(
// //           `${process.env.REACT_APP_API_URL}/api/auth/me`,
// //           {
// //             headers: { Authorization: `Bearer ${token}` },
// //           }
// //         );

// //         const data = await res.json();

// //         if (data.success && data.user) {
// //           const user = data.user;

// //           setUserName(`${user.firstName} ${user.lastName}`);

// //           setAvatarUrl(
// //             `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
// //               user.email
// //             )}`
// //           );
// //         }
// //       } catch (err) {
// //         console.error("Failed to fetch user:", err);
// //       }
// //     };

// //     fetchUser();
// //   }, []);

// //   const isEmpty =
// //     notifications.support.length === 0 &&
// //     notifications.activity.length === 0 &&
// //     notifications.admin.length === 0;

// //   return (
// //     <div className="topbar">
// //       {/* LEFT */}
// //       <div className="topbar-left">
// //         <div className="hamburger" onClick={toggleSidebar}>
// //           <FiMenu size={24} />
// //         </div>
// //       </div>

// //       {/* RIGHT */}
// //       <div className="topbar-right">
// //         {/* Theme */}
// //         <button className="theme-toggle" onClick={toggleTheme}>
// //           {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
// //         </button>

// //         {/* NOTIFICATIONS */}
// //         <div className="notification-wrapper" ref={notifRef}>
// //           <div className="notification-icon" onClick={toggleNotifications}>
// //             <FiBell size={20} />
// //             {unreadCount > 0 && (
// //               <span className="notification-badge">{unreadCount}</span>
// //             )}
// //           </div>

// //           {notifOpen && (
// //             <div className="notification-dropdown">
// //               <h4>Notifications</h4>

// //               {/* EMPTY STATE */}
// //               {isEmpty && (
// //                 <div className="notif-empty">
// //                   You’re all caught up 🎉
// //                 </div>
// //               )}

// //               {/* SUPPORT */}
// //               {notifications.support.length > 0 && (
// //                 <div className="notif-section">
// //                   <p className="notif-title">Support</p>

// //                   {notifications.support.map((n) => (
// //                     <div
// //                       key={n.id}
// //                       className={`notif-item ${!n.read ? "unread" : ""}`}
// //                       onClick={() =>
// //                         handleNotificationClick("support", n.id)
// //                       }
// //                     >
// //                       <span>{n.text}</span>
// //                       <small>{n.time}</small>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}

// //               {/* ACTIVITY */}
// //               {notifications.activity.length > 0 && (
// //                 <div className="notif-section">
// //                   <p className="notif-title">Activity</p>

// //                   {notifications.activity.map((n) => (
// //                     <div
// //                       key={n.id}
// //                       className={`notif-item ${!n.read ? "unread" : ""}`}
// //                       onClick={() =>
// //                         handleNotificationClick("activity", n.id)
// //                       }
// //                     >
// //                       <span>{n.text}</span>
// //                       <small>{n.time}</small>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}

// //               {/* ADMIN */}
// //               {notifications.admin.length > 0 && (
// //                 <div className="notif-section">
// //                   <p className="notif-title">Admin</p>

// //                   {notifications.admin.map((n) => (
// //                     <div
// //                       key={n.id}
// //                       className={`notif-item ${!n.read ? "unread" : ""}`}
// //                       onClick={() =>
// //                         handleNotificationClick("admin", n.id)
// //                       }
// //                     >
// //                       <span>{n.text}</span>
// //                       <small>{n.time}</small>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         {/* PROFILE */}
// //         <div className="profile" onClick={toggleDropdown}>
// //           <img
// //             src={avatarUrl || "https://i.pravatar.cc/40"}
// //             alt="User Avatar"
// //           />

// //           <div className="profile-info">
// //             <span className="username-text">
// //               {userName || "Loading..."}
// //             </span>

// //             <FiChevronDown
// //               size={16}
// //               style={{
// //                 position: "relative",
// //                 top: "2px",
// //                 transition: "transform 0.3s",
// //                 transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
// //               }}
// //             />
// //           </div>

// //           {dropdownOpen && (
// //             <div className="dropdown-menu">
// //               <p>
// //                 <FiSettings /> ACCOUNT
// //               </p>

// //               <p className="logout" onClick={handleLogout}>
// //                 <FiLogOut /> LOGOUT
// //               </p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Topbar;


// import React, { useState, useEffect, useRef } from "react";
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
//   const [notifOpen, setNotifOpen] = useState(false);

//   const [userName, setUserName] = useState("");
//   const [avatarUrl, setAvatarUrl] = useState("");

//   const { darkMode, toggleTheme } = useTheme();
//   const navigate = useNavigate();

//   const notifRef = useRef(null);

//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
//   const toggleNotifications = () => setNotifOpen(!notifOpen);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setDropdownOpen(false);
//     navigate("/");
//   };

//   // =========================
//   // NOTIFICATIONS STATE
//   // =========================
//   const [notifications, setNotifications] = useState({
//     support: [],
//     activity: [
//       { id: 1, text: "Deposit successful", time: "1h ago", read: false },
//     ],
//     admin: [],
//   });

//   // =========================
//   // UNREAD COUNT
//   // =========================
//   const unreadCount =
//     notifications.support.filter((n) => !n.read).length +
//     notifications.activity.filter((n) => !n.read).length +
//     notifications.admin.filter((n) => !n.read).length;

//   // =========================
//   // FETCH SUPPORT NOTIFICATIONS
//   // =========================
//   useEffect(() => {
//     const fetchSupportNotifications = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await fetch(
//           `${process.env.REACT_APP_API_URL}/api/support/notifications`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await res.json();

//         if (data.success) {
//           setNotifications((prev) => ({
//             ...prev,
//             support: data.notifications,
//           }));
//         }
//       } catch (err) {
//         console.error("Support notifications error:", err);
//       }
//     };

//     fetchSupportNotifications();
//   }, []);

//   // =========================
//   // CLICK NOTIFICATION (SUPPORT)
//   // =========================
//   const handleSupportClick = async (id) => {
//     try {
//       const token = localStorage.getItem("token");

//       await fetch(
//         `${process.env.REACT_APP_API_URL}/api/support/notifications`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setNotifications((prev) => ({
//         ...prev,
//         support: prev.support.map((n) =>
//           n.id === id ? { ...n, read: true } : n
//         ),
//       }));

//       setNotifOpen(false);
//       navigate("/support");
//     } catch (err) {
//       console.error("Mark as read error:", err);
//     }
//   };

//   // =========================
//   // FETCH USER
//   // =========================
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         const res = await fetch(
//           `${process.env.REACT_APP_API_URL}/api/auth/me`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
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
//         console.error(err);
//       }
//     };

//     fetchUser();
//   }, []);

//   // =========================
//   // CLOSE ON OUTSIDE CLICK
//   // =========================
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (notifRef.current && !notifRef.current.contains(event.target)) {
//         setNotifOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="topbar">
//       {/* LEFT */}
//       <div className="topbar-left">
//         <div className="hamburger" onClick={toggleSidebar}>
//           <FiMenu size={24} />
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className="topbar-right">
//         {/* THEME */}
//         <button className="theme-toggle" onClick={toggleTheme}>
//           {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
//         </button>

//         {/* NOTIFICATIONS */}
//         <div className="notification-wrapper" ref={notifRef}>
//           <div className="notification-icon" onClick={toggleNotifications}>
//             <FiBell size={20} />
//             {unreadCount > 0 && (
//               <span className="notification-badge">{unreadCount}</span>
//             )}
//           </div>

//           {notifOpen && (
//             <div className="notification-dropdown">
//               <h4>Notifications</h4>

//               {/* SUPPORT */}
//               {notifications.support.length > 0 && (
//                 <div className="notif-section">
//                   <p className="notif-title">Support</p>

//                   {notifications.support.map((n) => (
//                     <div
//                       key={n.id}
//                       className={`notif-item ${!n.read ? "unread" : ""}`}
//                       onClick={() => handleSupportClick(n.id)}
//                     >
//                       <span>{n.text}</span>
//                       <small>
//                         {new Date(n.time).toLocaleString()}
//                       </small>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* ACTIVITY */}
//               <div className="notif-section">
//                 <p className="notif-title">Activity</p>

//                 {notifications.activity.map((n) => (
//                   <div
//                     key={n.id}
//                     className={`notif-item ${!n.read ? "unread" : ""}`}
//                   >
//                     <span>{n.text}</span>
//                     <small>{n.time}</small>
//                   </div>
//                 ))}
//               </div>

//               {/* ADMIN */}
//               {notifications.admin.length > 0 && (
//                 <div className="notif-section">
//                   <p className="notif-title">Admin</p>

//                   {notifications.admin.map((n) => (
//                     <div
//                       key={n.id}
//                       className={`notif-item ${!n.read ? "unread" : ""}`}
//                     >
//                       <span>{n.text}</span>
//                       <small>{n.time}</small>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* EMPTY STATE */}
//               {notifications.support.length === 0 &&
//                 notifications.activity.length === 0 &&
//                 notifications.admin.length === 0 && (
//                   <div className="notif-empty">
//                     You’re all caught up 🎉
//                   </div>
//                 )}
//             </div>
//           )}
//         </div>

//         {/* PROFILE */}
//         <div className="profile" onClick={toggleDropdown}>
//           <img
//             src={avatarUrl || "https://i.pravatar.cc/40"}
//             alt="User"
//           />

//           <div className="profile-info">
//             <span className="username-text">
//               {userName || "Loading..."}
//             </span>

//             <FiChevronDown
//               size={16}
//               style={{
//                 transform: dropdownOpen
//                   ? "rotate(180deg)"
//                   : "rotate(0deg)",
//                 transition: "0.3s",
//               }}
//             />
//           </div>

//           {dropdownOpen && (
//             <div className="dropdown-menu">
//               <p>
//                 <FiSettings /> ACCOUNT
//               </p>

//               <p className="logout" onClick={handleLogout}>
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

  // =========================
  // NOTIFICATIONS STATE
  // =========================
  const [notifications, setNotifications] = useState({
    support: [],
    activity: [],
    admin: [],
  });

  // =========================
  // UNREAD COUNT
  // =========================
  const unreadCount =
    notifications.support.filter((n) => !n.read).length +
    notifications.activity.filter((n) => !n.read).length +
    notifications.admin.filter((n) => !n.read).length;

  // =========================
  // TOGGLE FUNCTIONS
  // =========================
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleNotifications = () => {
    setNotifOpen(!notifOpen);
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("token");
    setDropdownOpen(false);
    navigate("/");
  };

  // =========================
  // FETCH USER
  // =========================
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

          setAvatarUrl(
            `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
              user.email
            )}`
          );
        }
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };

    fetchUser();
  }, []);

  // =========================
  // FETCH SUPPORT NOTIFICATIONS
  // =========================
  useEffect(() => {
    const fetchSupportNotifications = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/support/notifications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        console.log("SUPPORT NOTIFICATIONS:", data);

        if (data.success) {
          setNotifications((prev) => ({
            ...prev,
            support: data.notifications,
          }));
        }
      } catch (err) {
        console.error("Support notifications error:", err);
      }
    };

    fetchSupportNotifications();

    // AUTO REFRESH EVERY 10s
    const interval = setInterval(fetchSupportNotifications, 10000);

    return () => clearInterval(interval);
  }, []);

  // =========================
  // FETCH DEPOSIT NOTIFICATIONS
  // =========================
  useEffect(() => {
    const fetchDepositNotifications = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/transactions/notifications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        console.log("DEPOSIT NOTIFICATIONS:", data);

        if (data.success) {
          setNotifications((prev) => ({
            ...prev,
            activity: data.notifications,
          }));
        }
      } catch (err) {
        console.error("Deposit notifications error:", err);
      }
    };

    fetchDepositNotifications();

    // AUTO REFRESH EVERY 15s
    const interval = setInterval(fetchDepositNotifications, 15000);

    return () => clearInterval(interval);
  }, []);

  // =========================
  // HANDLE SUPPORT CLICK
  // =========================
  const handleSupportClick = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        `${process.env.REACT_APP_API_URL}/api/support/user/read`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // MARK LOCALLY
      setNotifications((prev) => ({
        ...prev,
        support: prev.support.map((n) => ({
          ...n,
          read: true,
        })),
      }));

      setNotifOpen(false);

      navigate("/support");
    } catch (err) {
      console.error("Support read error:", err);
    }
  };

  // =========================
  // HANDLE ACTIVITY CLICK
  // =========================
  const handleActivityClick = () => {
    setNotifications((prev) => ({
      ...prev,
      activity: prev.activity.map((n) => ({
        ...n,
        read: true,
      })),
    }));

    setNotifOpen(false);

    navigate("/wallet");
  };

  // =========================
  // CLOSE ON OUTSIDE CLICK
  // =========================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target)
      ) {
        setNotifOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div className="topbar">
      {/* LEFT */}
      <div className="topbar-left">
        <div
          className="hamburger"
          onClick={toggleSidebar}
        >
          <FiMenu size={24} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="topbar-right">
        {/* THEME TOGGLE */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
        >
          {darkMode ? (
            <FiSun size={18} />
          ) : (
            <FiMoon size={18} />
          )}
        </button>

        {/* NOTIFICATIONS */}
        <div
          className="notification-wrapper"
          ref={notifRef}
        >
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

                {unreadCount > 0 && (
                  <span className="notif-count">
                    {unreadCount} New
                  </span>
                )}
              </div>

              {/* SUPPORT */}
              {notifications.support.length > 0 && (
                <div className="notif-section">
                  <p className="notif-title">
                    Support
                  </p>

                  {notifications.support.map((n) => (
                    <div
                      key={n.id}
                      className={`notif-item ${
                        !n.read ? "unread" : ""
                      }`}
                      onClick={handleSupportClick}
                    >
                      <div className="notif-content">
                        <span>{n.text}</span>

                        <small>
                          {new Date(
                            n.time
                          ).toLocaleString()}
                        </small>
                      </div>

                      {!n.read && (
                        <div className="notif-dot" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ACTIVITY */}
              {notifications.activity.length > 0 && (
                <div className="notif-section">
                  <p className="notif-title">
                    Activity
                  </p>

                  {notifications.activity.map((n) => (
                    <div
                      key={n.id}
                      className={`notif-item ${
                        !n.read ? "unread" : ""
                      }`}
                      onClick={handleActivityClick}
                    >
                      <div className="notif-content">
                        <span>{n.text}</span>

                        <small>
                          {new Date(
                            n.time
                          ).toLocaleString()}
                        </small>
                      </div>

                      {!n.read && (
                        <div className="notif-dot" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ADMIN */}
              {notifications.admin.length > 0 && (
                <div className="notif-section">
                  <p className="notif-title">
                    Admin
                  </p>

                  {notifications.admin.map((n) => (
                    <div
                      key={n.id}
                      className={`notif-item ${
                        !n.read ? "unread" : ""
                      }`}
                    >
                      <div className="notif-content">
                        <span>{n.text}</span>

                        <small>
                          {new Date(
                            n.time
                          ).toLocaleString()}
                        </small>
                      </div>

                      {!n.read && (
                        <div className="notif-dot" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* EMPTY */}
              {notifications.support.length === 0 &&
                notifications.activity.length === 0 &&
                notifications.admin.length === 0 && (
                  <div className="notif-empty">
                    You're all caught up 🎉
                  </div>
                )}
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div
          className="profile"
          onClick={toggleDropdown}
        >
          <img
            src={
              avatarUrl ||
              "https://i.pravatar.cc/40"
            }
            alt="User"
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
                transition: "0.3s",
              }}
            />
          </div>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <p>
                <FiSettings /> ACCOUNT
              </p>

              <p
                className="logout"
                onClick={handleLogout}
              >
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
