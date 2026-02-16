// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import StatCard from "../components/StatCard";
// import { FiCreditCard, FiArrowDownCircle, FiShoppingBag } from "react-icons/fi";
// import { useBalance } from "../context/BalanceContext";

// const Dashboard = ({ darkMode }) => {
//   const navigate = useNavigate();
//   const { balance, loading } = useBalance(); // ✅ get loading

//   useEffect(() => {
//     document.title = "Dashboard - RealSMS";
//   }, []);

//   const handleFundWallet = () => {
//     navigate("/fund-wallet");
//   };

//   // Safe formatting for balance
//   const formattedBalance = balance !== undefined ? balance.toLocaleString() : "0";

//   const stats = [
//     {
//       title: "Wallet Balance",
//       value: `₦${formattedBalance}`, // ✅ safe
//       icon: <FiCreditCard />,
//       color: "#10b981",
//     },
//     {
//       title: "Total Deposits",
//       value: 3,
//       icon: <FiArrowDownCircle />,
//       color: "#f59e0b",
//     },
//     {
//       title: "Total Purchases",
//       value: 12,
//       icon: <FiShoppingBag />,
//       color: "#3b82f6",
//     },
//   ];

//   if (loading) {
//     return (
//       <div className={`dashboard ${darkMode ? "dark" : ""}`}>
//         <p>Loading wallet...</p>
//       </div>
//     );
//   }

//   return (
//     <div className={`dashboard ${darkMode ? "dark" : ""}`}>
//       <div className="welcome-card">
//         <div>
//           <h2>Welcome Back, User!</h2>
//           <p>Here's a quick overview of your account.</p>
//         </div>
//         <button onClick={handleFundWallet}>Fund Wallet</button>
//       </div>

//       <div className="stats-container">
//         {stats.map((stat, idx) => (
//           <StatCard
//             key={idx}
//             title={stat.title}
//             value={stat.value}
//             icon={stat.icon}
//             color={stat.color}
//             darkMode={darkMode}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StatCard from "../components/StatCard";
import { FiCreditCard, FiArrowDownCircle, FiShoppingBag } from "react-icons/fi";
import { useBalance } from "../context/BalanceContext";

const Dashboard = ({ darkMode }) => {
  const navigate = useNavigate();
  const { balance, loading } = useBalance(); // Wallet balance
  const [transactionStats, setTransactionStats] = useState({
    totalAmount: 0,
    totalTransactions: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    document.title = "Dashboard - RealSMS";

    const fetchTransactionStats = async () => {
      try {
        const userId = "USER_ID_HERE"; // Replace with actual logged-in user ID
        const { data } = await axios.get(`/api/transactions/stats/${userId}`);

        setTransactionStats({
          totalAmount: data.totalAmount ?? 0,
          totalTransactions: data.totalTransactions ?? 0,
        });
      } catch (err) {
        console.error("Failed to fetch transaction stats:", err);
        setTransactionStats({ totalAmount: 0, totalTransactions: 0 });
      } finally {
        setLoadingStats(false);
      }
    };

    fetchTransactionStats();
  }, []);

  const handleFundWallet = () => {
    navigate("/fund-wallet");
  };

  // Safe formatting
  const formattedBalance = balance !== undefined ? balance.toLocaleString() : "0";
  const formattedDeposits = (transactionStats.totalAmount ?? 0).toLocaleString();
  const formattedTransactions = transactionStats.totalTransactions ?? 0;

  // Stats array for mapping
  const stats = [
    {
      title: "Wallet Balance",
      value: `₦${formattedBalance}`,
      icon: <FiCreditCard />,
      color: "#10b981",
    },
    {
      title: "Total Deposits",
      value: `₦${formattedDeposits}`,
      icon: <FiArrowDownCircle />,
      color: "#f59e0b",
    },
    {
      title: "Total Transactions",
      value: formattedTransactions,
      icon: <FiShoppingBag />,
      color: "#3b82f6",
    },
  ];

  // Show loading state if wallet or stats are loading
  if (loading || loadingStats) {
    return (
      <div className={`dashboard ${darkMode ? "dark" : ""}`}>
        <p>Loading dashboard...</p>
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
