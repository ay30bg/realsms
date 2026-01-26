import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiShoppingCart,
  FiClock,
  FiPlusCircle,
  FiHeadphones
} from "react-icons/fi";
import "../styles/sidebar.css";
import logo from "../assets/logo.png"; // adjust path if needed

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="SMS Market Logo" />
      </div>

      <nav>
        <NavLink to="/">
          <FiHome className="sidebar-icon" /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/buy-numbers">
          <FiShoppingCart className="sidebar-icon" /> <span>Buy Numbers</span>
        </NavLink>
        <NavLink to="/order-history">
          <FiClock className="sidebar-icon" /> <span>Order History</span>
        </NavLink>
        <NavLink to="/fund-wallet">
          <FiPlusCircle className="sidebar-icon" /> <span>Fund Wallet</span>
        </NavLink>
        <NavLink to="/support">
          <FiHeadphones className="sidebar-icon" /> <span>Support</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
