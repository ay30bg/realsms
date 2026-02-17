import React, { useState, useEffect } from "react";
import {
  FiCreditCard,
  FiChevronDown,
  FiSettings,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/topbar.css";
import { useBalance } from "../context/BalanceContext";

const Topbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [displayBalance, setDisplayBalance] = useState(0);

  const navigate = useNavigate();
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    setDropdownOpen(false);
    navigate("/");
  };

  // ✅ Get balance & loading from context
  const { balance = 0, loading } = useBalance();

  // Animate balance count-up after it loads
  useEffect(() => {
    if (loading) return; // don't animate while loading

    let start = 0;
    const end = balance;
    const duration = 1000; // 1s
    const increment = end / (duration / 20);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setDisplayBalance(Math.floor(start));
    }, 20);

    return () => clearInterval(counter);
  }, [balance, loading]);

  // ✅ Avatar URL
  const avatarUrl = "https://i.pravatar.cc/40";

  return (
    <div className="topbar">
      {/* Left section: Hamburger */}
      <div className="topbar-left">
        <div className="hamburger" onClick={toggleSidebar}>
          <FiMenu size={24} />
        </div>
      </div>

      {/* Right section: Balance and Profile */}
      <div className="topbar-right">
        {/* Balance */}
        <div className="balance">
          <FiCreditCard className="balance-icon" />
          <div className="balance-text">
            <span>Balance</span>
            <strong>
              ₦
              {loading
                ? "..." // placeholder while loading
                : displayBalance.toLocaleString()}
            </strong>
          </div>
        </div>

        {/* Profile / Avatar */}
        <div
          className="profile"
          onClick={toggleDropdown}
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <img
            src={avatarUrl}
            alt="User Avatar"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              marginRight: "2px",
            }}
          />

          <div
            className="username-container"
            style={{
              display: "inline-flex",
              alignItems: "center",
              margin: 0,
            }}
          >
            <span className="username-text">Ayomide Yekeen</span>
            <FiChevronDown
              className="username-arrow"
              size={16}
              style={{
                marginLeft: "5px",
                position: "relative",
                top: "2px",
                transition: "transform 0.3s",
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <p style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <FiSettings /> ACCOUNT
              </p>
              <p
                className="logout"
                onClick={handleLogout}
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
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



