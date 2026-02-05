'import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import { FiCreditCard, FiShoppingCart, FiCheckCircle } from "react-icons/fi";
import { useBalance } from "../context/BalanceContext"; // ✅ import

const Dashboard = ({ darkMode }) => {
  const navigate = useNavigate();
  const { balance } = useBalance(); // ✅ real balance

  useEffect(() => {
    document.title = "Dashboard - RealSMS";
  }, []);

  const stats = [
    {
      title: "Wallet Balance",
      value: `₦${balance.toLocaleString()}`, // ✅ dynamic
      icon: <FiCreditCard />,
      color: "#10b981",
    },
    {
      title: "Total Deposits",
      value: 3,
      icon: <FiShoppingCart />,
      color: "#f59e0b",
    },
    {
      title: "Total Purchases",
      value: 12,
      icon: <FiCheckCircle />,
      color: "#3b82f6",
    },
  ];

  const handleFundWallet = () => {
    navigate("/fund-wallet");
  };

  return (
    <div className={`dashboard ${darkMode ? "dark" : ""}`}>
      <div className="welcome-card">
        <div>
          <h2>Welcome Back, User!</h2>
          <p>Here's a quick overview of your account.</p>
        </div>
        <button onClick={handleFundWallet}>Fund Wallet</button>
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


