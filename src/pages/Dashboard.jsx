import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import { FiCreditCard, FiArrowDownCircle, FiShoppingBag } from "react-icons/fi";
import { useBalance } from "../context/BalanceContext";

const Dashboard = ({ darkMode }) => {
  const navigate = useNavigate();
  const { balance, loading } = useBalance(); // ✅ get loading

  useEffect(() => {
    document.title = "Dashboard - RealSMS";
  }, []);

  const handleFundWallet = () => {
    navigate("/fund-wallet");
  };

  // Safe formatting for balance
  const formattedBalance = balance !== undefined ? balance.toLocaleString() : "0";

  const stats = [
    {
      title: "Wallet Balance",
      value: `₦${formattedBalance}`, // ✅ safe
      icon: <FiCreditCard />,
      color: "#10b981",
    },
    {
      title: "Total Deposits",
      value: 3,
      icon: <FiArrowDownCircle />,
      color: "#f59e0b",
    },
    {
      title: "Total Purchases",
      value: 12,
      icon: <FiShoppingBag />,
      color: "#3b82f6",
    },
  ];

  if (loading) {
    return (
      <div className={`dashboard ${darkMode ? "dark" : ""}`}>
        <p>Loading wallet...</p>
      </div>
    );
  }

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








