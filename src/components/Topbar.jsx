import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiCreditCard,
} from "react-icons/fi";
import {
  FaBell,
} from "react-icons/fa";
import { useBalance } from "../context/BalanceContext";
import "../styles/topbar.css";

const Topbar = ({ toggleSidebar }) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [firstName, setFirstName] = useState("");

  const notifRef = useRef(null);
  const { balance } = useBalance();
  const navigate = useNavigate();

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

 const handleNotificationClick = (notification, type) => {
  // Remove clicked notification
  setNotifications((prev) => ({
    ...prev,
    [type]: prev[type].filter(
      (n) =>
        n._id !== notification._id &&
        n.time !== notification.time
    ),
  }));

  setNotifOpen(false);

  // Route by notification category
  if (type === "support") {
    navigate("/support");
  } else if (type === "activity") {
    navigate("/transaction-history");
  }
};

  return (
    <div className="topbar">
      {/* LEFT */}
      <div className="topbar-left">
        <div className="hamburger" onClick={toggleSidebar}>
          <FiMenu size={22} />
        </div>

        <div className="topbar-greeting">
  <span className="greeting-text">{getGreeting()},</span>
  <span className="greeting-name">{firstName}</span>
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
            <FaBell size={20} />
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

             {[
  ...notifications.support.map((n) => ({
    ...n,
    type: "support",
  })),
  ...notifications.activity.map((n) => ({
    ...n,
    type: "activity",
  })),
  ...notifications.admin.map((n) => ({
    ...n,
    type: "admin",
  })),
].map((n, i) => (
  <div
    key={n._id || i}
    className="notif-item"
    onClick={() => handleNotificationClick(n, n.type)}
  >
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
