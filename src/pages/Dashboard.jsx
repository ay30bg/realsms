import React, { useEffect } from "react";
import StatCard from "../components/StatCard";
import { FiCreditCard, FiShoppingCart, FiCheckCircle } from "react-icons/fi";

const Dashboard = ({ darkMode }) => {

  useEffect(() => {
    document.title = "Dashboard - RealSMS";
  }, []);

  const stats = [
    { title: "Wallet Balance", value: "₦25,000", icon: <FiCreditCard />, color: "#10b981" },
    { title: "Active Orders", value: 3, icon: <FiShoppingCart />, color: "#f59e0b" },
    { title: "Completed Orders", value: 12, icon: <FiCheckCircle />, color: "#3b82f6" },
  ];

  return (
    <div className={`dashboard ${darkMode ? "dark" : ""}`}>
      <div className="welcome-card">
        <div>
          <h2>Welcome Back, User!</h2>
          <p>Here's a quick overview of your account.</p>
        </div>
        <button>Fund Wallet</button>
      </div>

      <div className="stats-container">
        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
