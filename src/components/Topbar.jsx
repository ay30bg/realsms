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

//   // =========================
//   // NOTIFICATIONS STATE
//   // =========================
//   const [notifications, setNotifications] = useState({
//     support: [],
//     activity: [],
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
//   // TOGGLE FUNCTIONS
//   // =========================
//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const toggleNotifications = () => {
//     setNotifOpen(!notifOpen);
//   };

//   // =========================
//   // LOGOUT
//   // =========================
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setDropdownOpen(false);
//     navigate("/");
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
//         console.error("User fetch error:", err);
//       }
//     };

//     fetchUser();
//   }, []);

//   // =========================
//   // FETCH SUPPORT NOTIFICATIONS
//   // =========================
//   useEffect(() => {
//     const fetchSupportNotifications = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) return;

//         const res = await fetch(
//           `${process.env.REACT_APP_API_URL}/api/support/notifications`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await res.json();

//         console.log("SUPPORT NOTIFICATIONS:", data);

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

//     // AUTO REFRESH EVERY 10s
//     const interval = setInterval(fetchSupportNotifications, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   // =========================
//   // FETCH DEPOSIT NOTIFICATIONS
//   // =========================
//   useEffect(() => {
//     const fetchDepositNotifications = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) return;

//         const res = await fetch(
//           `${process.env.REACT_APP_API_URL}/api/transactions/notifications`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await res.json();

//         console.log("DEPOSIT NOTIFICATIONS:", data);

//         if (data.success) {
//           setNotifications((prev) => ({
//             ...prev,
//             activity: data.notifications,
//           }));
//         }
//       } catch (err) {
//         console.error("Deposit notifications error:", err);
//       }
//     };

//     fetchDepositNotifications();

//     // AUTO REFRESH EVERY 15s
//     const interval = setInterval(fetchDepositNotifications, 15000);

//     return () => clearInterval(interval);
//   }, []);

//   // =========================
//   // HANDLE SUPPORT CLICK
//   // =========================
//   const handleSupportClick = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       await fetch(
//         `${process.env.REACT_APP_API_URL}/api/support/user/read`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // MARK LOCALLY
//       setNotifications((prev) => ({
//         ...prev,
//         support: prev.support.map((n) => ({
//           ...n,
//           read: true,
//         })),
//       }));

//       setNotifOpen(false);

//       navigate("/support");
//     } catch (err) {
//       console.error("Support read error:", err);
//     }
//   };

//   // =========================
//   // HANDLE ACTIVITY CLICK
//   // =========================
//   const handleActivityClick = () => {
//     setNotifications((prev) => ({
//       ...prev,
//       activity: prev.activity.map((n) => ({
//         ...n,
//         read: true,
//       })),
//     }));

//     setNotifOpen(false);

//     navigate("/transaction-history");
//   };

//   // =========================
//   // CLOSE ON OUTSIDE CLICK
//   // =========================
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         notifRef.current &&
//         !notifRef.current.contains(event.target)
//       ) {
//         setNotifOpen(false);
//       }
//     };

//     document.addEventListener(
//       "mousedown",
//       handleClickOutside
//     );

//     return () => {
//       document.removeEventListener(
//         "mousedown",
//         handleClickOutside
//       );
//     };
//   }, []);

//   return (
//     <div className="topbar">
//       {/* LEFT */}
//       <div className="topbar-left">
//         <div
//           className="hamburger"
//           onClick={toggleSidebar}
//         >
//           <FiMenu size={24} />
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className="topbar-right">
//         {/* THEME TOGGLE */}
//         <button
//           className="theme-toggle"
//           onClick={toggleTheme}
//         >
//           {darkMode ? (
//             <FiSun size={18} />
//           ) : (
//             <FiMoon size={18} />
//           )}
//         </button>

//         {/* NOTIFICATIONS */}
//         <div
//           className="notification-wrapper"
//           ref={notifRef}
//         >
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

//                 {unreadCount > 0 && (
//                   <span className="notif-count">
//                     {unreadCount} New
//                   </span>
//                 )}
//               </div>

//               {/* SUPPORT */}
//               {notifications.support.length > 0 && (
//                 <div className="notif-section">
//                   <p className="notif-title">
//                     Support
//                   </p>

//                   {notifications.support.map((n) => (
//                     <div
//                       key={n.id}
//                       className={`notif-item ${
//                         !n.read ? "unread" : ""
//                       }`}
//                       onClick={handleSupportClick}
//                     >
//                       <div className="notif-content">
//                         <span>{n.text}</span>

//                         <small>
//                           {new Date(
//                             n.time
//                           ).toLocaleString()}
//                         </small>
//                       </div>

//                       {!n.read && (
//                         <div className="notif-dot" />
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* ACTIVITY */}
//               {notifications.activity.length > 0 && (
//                 <div className="notif-section">
//                   <p className="notif-title">
//                     Activity
//                   </p>

//                   {notifications.activity.map((n) => (
//                     <div
//                       key={n.id}
//                       className={`notif-item ${
//                         !n.read ? "unread" : ""
//                       }`}
//                       onClick={handleActivityClick}
//                     >
//                       <div className="notif-content">
//                         <span>{n.text}</span>

//                         <small className="notif-time">
//   {new Date(n.time).toLocaleString("en-US", {
//     month: "short",
//     day: "numeric",
//     hour: "numeric",
//     minute: "2-digit",
//   })}
// </small>
//                       </div>

//                       {!n.read && (
//                         <div className="notif-dot" />
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* ADMIN */}
//               {notifications.admin.length > 0 && (
//                 <div className="notif-section">
//                   <p className="notif-title">
//                     Admin
//                   </p>

//                   {notifications.admin.map((n) => (
//                     <div
//                       key={n.id}
//                       className={`notif-item ${
//                         !n.read ? "unread" : ""
//                       }`}
//                     >
//                       <div className="notif-content">
//                         <span>{n.text}</span>

//                         <small>
//                           {new Date(
//                             n.time
//                           ).toLocaleString()}
//                         </small>
//                       </div>

//                       {!n.read && (
//                         <div className="notif-dot" />
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* EMPTY */}
//               {notifications.support.length === 0 &&
//                 notifications.activity.length === 0 &&
//                 notifications.admin.length === 0 && (
//                   <div className="notif-empty">
//                     You're all caught up 🎉
//                   </div>
//                 )}
//             </div>
//           )}
//         </div>

//         {/* PROFILE */}
//         <div
//           className="profile"
//           onClick={toggleDropdown}
//         >
//           <img
//             src={
//               avatarUrl ||
//               "https://i.pravatar.cc/40"
//             }
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

//               <p
//                 className="logout"
//                 onClick={handleLogout}
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

  // =========================
  // FORMAT DATE
  // =========================
  const formatNotifDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // =========================
  // NOTIFICATIONS STATE
  // =========================
  const [notifications, setNotifications] = useState({
    support: [],
    activity: [],
    admin: [],
  });

  const unreadCount =
    notifications.support.filter((n) => !n.read).length +
    notifications.activity.filter((n) => !n.read).length +
    notifications.admin.filter((n) => !n.read).length;

  // =========================
  // TOGGLES
  // =========================
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleNotifications = () => setNotifOpen(!notifOpen);

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
        console.error("User fetch error:", err);
      }
    };

    fetchUser();
  }, []);

  // =========================
  // SUPPORT NOTIFICATIONS
  // =========================
  useEffect(() => {
    const fetchSupportNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/support/notifications`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

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
    const interval = setInterval(fetchSupportNotifications, 10000);

    return () => clearInterval(interval);
  }, []);

  // =========================
  // ACTIVITY NOTIFICATIONS
  // =========================
  useEffect(() => {
    const fetchDepositNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/transactions/notifications`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

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
    const interval = setInterval(fetchDepositNotifications, 15000);

    return () => clearInterval(interval);
  }, []);

  // =========================
  // MARK SUPPORT READ
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

      setNotifications((prev) => ({
        ...prev,
        support: prev.support.map((n) => ({ ...n, read: true })),
      }));

      setNotifOpen(false);
      navigate("/support");
    } catch (err) {
      console.error("Support read error:", err);
    }
  };

  // =========================
  // ACTIVITY CLICK
  // =========================
  const handleActivityClick = () => {
    setNotifications((prev) => ({
      ...prev,
      activity: prev.activity.map((n) => ({ ...n, read: true })),
    }));

    setNotifOpen(false);
    navigate("/transaction-history");
  };

  // =========================
  // OUTSIDE CLICK CLOSE
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

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
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
        {/* THEME */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

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
                {unreadCount > 0 && (
                  <span className="notif-count">
                    {unreadCount} New
                  </span>
                )}
              </div>

              {/* SUPPORT */}
              {notifications.support.length > 0 && (
                <div className="notif-section">
                  <p className="notif-title">Support</p>

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
                          {formatNotifDate(n.time)}
                        </small>
                      </div>

                      {!n.read && <div className="notif-dot" />}
                    </div>
                  ))}
                </div>
              )}

              {/* ACTIVITY */}
              {notifications.activity.length > 0 && (
                <div className="notif-section">
                  <p className="notif-title">Activity</p>

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
                        <small className="notif-time">
                          {formatNotifDate(n.time)}
                        </small>
                      </div>

                      {!n.read && <div className="notif-dot" />}
                    </div>
                  ))}
                </div>
              )}

              {/* ADMIN */}
              {notifications.admin.length > 0 && (
                <div className="notif-section">
                  <p className="notif-title">Admin</p>

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
                          {formatNotifDate(n.time)}
                        </small>
                      </div>

                      {!n.read && <div className="notif-dot" />}
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
        <div className="profile" onClick={toggleDropdown}>
          <img
            src={avatarUrl || "https://i.pravatar.cc/40"}
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
