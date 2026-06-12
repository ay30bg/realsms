import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiShoppingCart,
  FiMessageCircle,
  FiClock,
  FiCreditCard,
  FiPlusCircle,
  FiHeadphones,
  FiFileText,
  FiLogOut,
} from "react-icons/fi";

import "../styles/sidebar.css";
import logo from "../assets/logo.png";
import { useUnread } from "../context/UnreadContext";

const UserSidebar = ({ isOpen, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { unreadMessages, setUnreadMessages } = useUnread();

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        console.error(err);
      }
    };

    fetchUnreadMessages();
    const interval = setInterval(fetchUnreadMessages, 30000);
    return () => clearInterval(interval);
  }, [setUnreadMessages]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      {isOpen && isMobile && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <button className="sidebar__close" onClick={toggleSidebar}>
          &times;
        </button>

        {/* Logo */}
        <div className="sidebar__brand">
          <img src={logo} alt="RealSMS" />
        </div>

        {/* Nav */}
        <nav className="sidebar__nav">
          <NavLink to="/dashboard" className="sidebar__link">
            <FiHome />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/buy-numbers" className="sidebar__link">
            <FiShoppingCart />
            <span>Buy Numbers</span>
          </NavLink>

          <NavLink to="/purchase-logs" className="sidebar__link">
            <FiMessageCircle />
            <span>Purchase Logs</span>
          </NavLink>

          <NavLink to="/order-history" className="sidebar__link">
            <FiClock />
            <span>Number History</span>
          </NavLink>

          <NavLink to="/logs-history" className="sidebar__link">
            <FiFileText />
            <span>Logs History</span>
          </NavLink>

          <NavLink to="/transaction-history" className="sidebar__link">
            <FiCreditCard />
            <span>Transaction History</span>
          </NavLink>

          <NavLink to="/fund-wallet" className="sidebar__link">
            <FiPlusCircle />
            <span>Fund Wallet</span>
          </NavLink>

          <NavLink
            to="/support"
            className="sidebar__link sidebar__link--badge"
          >
            <FiHeadphones />
            <span>Support</span>

            {unreadMessages > 0 && (
              <span className="sidebar__badge">{unreadMessages}</span>
            )}
          </NavLink>
        </nav>

        {/* Bottom Signout Card */}
        <div className="sidebar__bottom">
          <button className="sidebar__signout" onClick={handleLogout}>
            <FiLogOut />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default UserSidebar;
