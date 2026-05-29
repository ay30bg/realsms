import React, { useState, useEffect } from "react";
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
  const [userName, setUserName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const { darkMode, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setDropdownOpen(false);
    navigate("/");
  };

  // Fetch user
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
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="topbar">
      {/* Left */}
      <div className="topbar-left">
        <div className="hamburger" onClick={toggleSidebar}>
          <FiMenu size={24} />
        </div>
      </div>

      {/* Right */}
      <div className="topbar-right">
        {/* Theme Toggle */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        {/* Notifications */}
        <div className="notification-icon">
          <FiBell size={20} />

          <span className="notification-badge">3</span>
        </div>

        {/* Profile */}
        <div
          className="profile"
          onClick={toggleDropdown}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={avatarUrl || "https://i.pravatar.cc/40"}
            alt="User Avatar"
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              marginRight: "8px",
              objectFit: "cover",
              border: "2px solid var(--border-color)",
            }}
          />

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              margin: 0,
            }}
          >
            <span className="username-text">
              {userName || "Loading..."}
            </span>

            <FiChevronDown
              className="username-arrow"
              size={16}
              style={{
                marginLeft: "5px",
                position: "relative",
                top: "2px",
                transition: "transform 0.3s",
                transform: dropdownOpen
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              }}
            />
          </div>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FiSettings /> ACCOUNT
              </p>

              <p
                className="logout"
                onClick={handleLogout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
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
