import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

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
  FiChevronDown,
  FiSettings,
} from "react-icons/fi";

import "../styles/sidebar.css";
import logo from "../assets/logo.png";
import { useUnread } from "../context/UnreadContext";

const UserSidebar = ({ isOpen, toggleSidebar }) => {
  const [isMobile, setIsMobile] =
    useState(false);

  const [showMenu, setShowMenu] =
    useState(false);

  const { unreadMessages, setUnreadMessages } =
    useUnread();

  const navigate = useNavigate();

  const getToken = () =>
    localStorage.getItem("token");

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.innerWidth <= 768);

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  useEffect(() => {
    const fetchUnreadMessages =
      async () => {
        try {
          const token = getToken();

          if (!token) return;

          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/api/support/user/unread`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.ok) {
            const data =
              await res.json();

            setUnreadMessages(
              data.count || 0
            );
          }
        } catch (err) {
          console.error(err);
        }
      };

    fetchUnreadMessages();

    const interval = setInterval(
      fetchUnreadMessages,
      30000
    );

    return () =>
      clearInterval(interval);
  }, [setUnreadMessages]);

  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  const handleNavClick = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  const handleNavigate = (path) => {
    navigate(path);

    if (isMobile) {
      toggleSidebar();
    }

    setShowMenu(false);
  };

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  return (
    <>
      {isOpen && isMobile && (
        <div
          className="sidebar-overlay"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`sidebar ${
          isOpen
            ? "sidebar--open"
            : ""
        }`}
      >
        {/* Mobile Close */}
        <button
          className="sidebar__close"
          onClick={toggleSidebar}
        >
          &times;
        </button>

        {/* Logo */}
        <div className="sidebar__brand">
          <img
            src={logo}
            alt="RealSMS"
          />
        </div>

        {/* Navigation */}
        <nav className="sidebar__nav">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "sidebar__link active"
                : "sidebar__link"
            }
            onClick={handleNavClick}
          >
            <FiHome />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/buy-numbers"
            className={({ isActive }) =>
              isActive
                ? "sidebar__link active"
                : "sidebar__link"
            }
            onClick={handleNavClick}
          >
            <FiShoppingCart />
            <span>Buy Numbers</span>
          </NavLink>

          <NavLink
            to="/purchase-logs"
            className={({ isActive }) =>
              isActive
                ? "sidebar__link active"
                : "sidebar__link"
            }
            onClick={handleNavClick}
          >
            <FiMessageCircle />
            <span>
              Purchase Logs
            </span>
          </NavLink>

          <NavLink
            to="/order-history"
            className={({ isActive }) =>
              isActive
                ? "sidebar__link active"
                : "sidebar__link"
            }
            onClick={handleNavClick}
          >
            <FiClock />
            <span>
              Number History
            </span>
          </NavLink>

          <NavLink
            to="/logs-history"
            className={({ isActive }) =>
              isActive
                ? "sidebar__link active"
                : "sidebar__link"
            }
            onClick={handleNavClick}
          >
            <FiFileText />
            <span>
              Logs History
            </span>
          </NavLink>

          <NavLink
            to="/transaction-history"
            className={({ isActive }) =>
              isActive
                ? "sidebar__link active"
                : "sidebar__link"
            }
            onClick={handleNavClick}
          >
            <FiCreditCard />
            <span>
              Transactions
            </span>
          </NavLink>

          <NavLink
            to="/fund-wallet"
            className={({ isActive }) =>
              isActive
                ? "sidebar__link active"
                : "sidebar__link"
            }
            onClick={handleNavClick}
          >
            <FiPlusCircle />
            <span>
              Fund Wallet
            </span>
          </NavLink>

          <NavLink
            to="/support"
            className={({ isActive }) =>
              isActive
                ? "sidebar__link active sidebar__link--badge"
                : "sidebar__link sidebar__link--badge"
            }
            onClick={handleNavClick}
          >
            <FiHeadphones />
            <span>Support</span>

            {unreadMessages >
              0 && (
              <span className="sidebar__badge">
                {unreadMessages}
              </span>
            )}
          </NavLink>
        </nav>

        {/* User Section */}
        <div className="sidebar-user">
          <div className="user-info">
            {/* <div className="user-avatar">
              <FiUser />
            </div>

            <div className="user-details">
              <div className="user-name">
                {user.username ||
                  user.name ||
                  "User"}

                <span className="pro-badge">
                  Pro
                </span>
              </div>

              <p>
                {user.email ||
                  "user@realsms.com"}
              </p>
            </div> */}

            <div className="avatar-circle">
  {(
    user.username ||
    user.name ||
    "User"
  )
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()}
</div>

<div className="user-details">
  <div className="display-name">
    {user.username ||
      user.name ||
      "User"}

    <span className="pro-badge">
      Pro
    </span>
  </div>

  <p>
    {user.email ||
      "user@realsms.com"}
  </p>
</div>

            <button
              className="user-settings"
              onClick={() =>
                setShowMenu(
                  !showMenu
                )
              }
            >
              <FiChevronDown
                className={
                  showMenu
                    ? "chevron-open"
                    : ""
                }
              />
            </button>
          </div>

          {showMenu && (
            <div className="account-menu">
              <button
                className="account-item"
                onClick={() =>
                  handleNavigate(
                    "/settings"
                  )
                }
              >
                <FiSettings />
                Settings
              </button>

              <button
                className="account-item signout"
                onClick={
                  handleLogout
                }
              >
                <FiLogOut />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default UserSidebar;
