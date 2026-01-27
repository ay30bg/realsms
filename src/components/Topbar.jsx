import React, { useState, useEffect } from "react";
import {
  FiUser,
  FiSun,
  FiMoon,
  FiCreditCard,
  FiChevronDown,
  FiSettings,
  FiLogOut,
  FiMenu
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/topbar.css";

const Topbar = ({ balance = 25000, toggleSidebar }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [displayBalance, setDisplayBalance] = useState(0);

  const navigate = useNavigate();
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    setDropdownOpen(false);
    navigate("/login");
  };

  // Animate balance count-up
  useEffect(() => {
    let start = 0;
    const end = balance;
    const duration = 1000;
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
  }, [balance]);

  return (
    <div className={`topbar ${darkMode ? "dark" : ""}`}>
      {/* Left section: Hamburger + optional logo/title */}
      <div className="topbar-left">
        <div className="hamburger" onClick={toggleSidebar}>
          <FiMenu size={24} />
        </div>
      </div>

      {/* Right section: Balance, Dark Mode, Profile */}
      <div className="topbar-right">
        {/* Balance */}
        <div className="balance">
          <FiCreditCard className="balance-icon" />
          <div className="balance-text">
            <span>Balance</span>
            <strong>₦{displayBalance.toLocaleString()}</strong>
          </div>
        </div>

        {/* Dark mode toggle */}
        <div className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </div>

        {/* Profile */}
        <div className="profile" onClick={toggleDropdown} style={{ cursor: "pointer" }}>
          <FiUser size={20} style={{ marginRight: "5px" }} />
          <p className="username" style={{ display: "inline-flex", alignItems: "center", margin: 0 }}>
            Ayomide Yekeen
            <FiChevronDown
              size={16}
              style={{
                marginLeft: "5px",
                position: "relative",
                top: "2px",
                transition: "transform 0.3s",
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)"
              }}
            />
          </p>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <p style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <FiSettings /> ACCOUNT
              </p>
              <p className="logout" onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
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
