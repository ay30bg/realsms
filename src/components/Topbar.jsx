import React, { useState, useEffect, useRef } from "react";
import {
  FiCreditCard,
  FiChevronDown,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiSun,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { useBalance } from "../context/BalanceContext";
import { useTheme } from "../context/ThemeContext";

import "../styles/topbar.css";

const Topbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const { balance, loading, fetchBalance } = useBalance();

  const { darkMode, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Animated balance
  const [displayBalance, setDisplayBalance] = useState(0);
  const previousBalance = useRef(0);

  useEffect(() => {
    if (loading) return;

    let start = previousBalance.current;
    const end = balance;

    const duration = 800;
    const incrementTime = 20;
    const steps = duration / incrementTime;

    const increment = (end - start) / steps;

    let current = start;

    const counter = setInterval(() => {
      current += increment;

      if (
        (increment > 0 && current >= end) ||
        (increment < 0 && current <= end)
      ) {
        current = end;
        clearInterval(counter);
      }

      setDisplayBalance(Math.floor(current));
    }, incrementTime);

    previousBalance.current = end;

    return () => clearInterval(counter);
  }, [balance, loading]);

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
    fetchBalance();
  }, [fetchBalance]);

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

        {/* Balance */}
        <div className="balance">
          <FiCreditCard className="balance-icon" />

          <div className="balance-text">
            <span>Balance</span>

            <strong>
              {loading ? "₦..." : `₦${displayBalance.toLocaleString()}`}
            </strong>
          </div>
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
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              marginRight: "5px",
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
                  gap: "5px",
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
                  gap: "5px",
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
