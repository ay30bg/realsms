// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import StatCard from "../components/StatCard";
// import { FiCreditCard, FiArrowDownCircle, FiShoppingBag } from "react-icons/fi";
// import { useBalance } from "../context/BalanceContext";
// import "../styles/dashboard.css";

// const API_URL =
//   process.env.REACT_APP_API_URL || "https://realsms-backend.vercel.app";

// const Dashboard = ({ darkMode }) => {
//   const navigate = useNavigate();
//   const { balance, loading } = useBalance();

//   const [transactionStats, setTransactionStats] = useState({
//     totalAmount: 0,
//     totalTransactions: 0,
//   });

//   const [loadingStats, setLoadingStats] = useState(true);
//   const [showNotice, setShowNotice] = useState(false);

//   useEffect(() => {
//     document.title = "Dashboard - RealSMS";
//     setShowNotice(true);

//     const fetchTransactionStats = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const { data } = await axios.get(
//           `${API_URL}/api/transactions/stats`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setTransactionStats({
//           totalAmount: data?.totalAmount ?? 0,
//           totalTransactions: data?.totalTransactions ?? 0,
//         });
//       } catch (err) {
//         console.error("Failed to fetch transaction stats:", err.response?.data || err.message);
//         setTransactionStats({ totalAmount: 0, totalTransactions: 0 });
//       } finally {
//         setLoadingStats(false);
//       }
//     };

//     fetchTransactionStats();
//   }, []);

//   const handleFundWallet = () => navigate("/fund-wallet");

//   const formattedBalance =
//     balance !== undefined ? balance.toLocaleString() : "0";

//   const formattedDeposits = (
//     transactionStats.totalAmount ?? 0
//   ).toLocaleString();

//   const formattedTransactions =
//     transactionStats.totalTransactions ?? 0;

//   const stats = [
//     {
//       title: "Wallet Balance",
//       value: `₦${formattedBalance}`,
//       icon: <FiCreditCard />,
//       color: "#10b981",
//     },
//     {
//       title: "Total Deposits",
//       value: `₦${formattedDeposits}`,
//       icon: <FiArrowDownCircle />,
//       color: "#f59e0b",
//     },
//     {
//       title: "Total Transactions",
//       value: formattedTransactions,
//       icon: <FiShoppingBag />,
//       color: "#3b82f6",
//     },
//   ];

//   // ✅ Spinner Loading State
//   if (loading || loadingStats) {
//     return (
//       <div className={`dashboard ${darkMode ? "dark" : ""}`}>
//         <div className="loading-spinner">
//           <div className={`spinner ${darkMode ? "dark" : ""}`}></div>
//           <p>Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`dashboard ${darkMode ? "dark" : ""}`}>
//       {showNotice && (
//         <div className="notice-overlay">
//           <div className="notice-modal">
//             <button
//               className="notice-close"
//               onClick={() => setShowNotice(false)}
//             >
//               ×
//             </button>

//             <h2>Welcome to Real SMS Store</h2>
//             <p>Message us for any complaint via Telegram:</p>

//             <p>
//               <a
//                 href="https://t.me/realsms_store"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="notice-highlight notice-link"
//               >
//                 @realsms_store
//               </a>
//             </p>

//             <p>Our only response channel is Telegram.</p>

//             <p>
//               Our only official channel:
//               <br />
//               <a
//                 href="https://t.me/realsms_store"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="notice-link"
//               >
//                 https://t.me/realsms_store
//               </a>
//             </p>

//             <p>
//               You will be notified once any upgrade is made on the website. 
//             </p>

//             <p className="notice-highlight">
//              Kindly contact the support team for any transaction or log-related issues. Also note that any issue not reported within 24 hours will not be attended to.
//             </p>

//             <p>You can fund your wallet using Flutterwave & Korapay.</p>

//             <p>
//               Thank you — <strong>realsms.store</strong>
//             </p>
//           </div>
//         </div>
//       )}

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
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiChevronLeft,
  FiChevronRight,
  FiArrowDownCircle,
  FiFileText,
  FiSmartphone,
  FiGlobe,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import { FaWallet } from "react-icons/fa";
import { useBalance } from "../context/BalanceContext";
import banner1 from "../assets/support-banner.png";
import banner2 from "../assets/number-banner.png";
import banner3 from "../assets/vpn-banner.png";
import "../styles/dashboard.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://realsms-backend.vercel.app";


const slides = [
  { image: banner1 },
  { image: banner2 },
  { image: banner3 },
];

const activities = [
  {
    text: "OTP sent to +234 810 123 4567",
    status: "Delivered",
    time: "2 mins ago",
    success: true,
  },
  {
    text: "Purchased 1 number from United States",
    status: "Completed",
    time: "10 mins ago",
    success: true,
  },
  {
    text: "Wallet funded successfully",
    status: "Success",
    time: "1 hour ago",
    success: true,
  },
];

const Dashboard = ({ darkMode }) => {
  // const navigate = useNavigate();
  const { balance, loading } = useBalance();

  const [transactionStats, setTransactionStats] = useState({
    totalAmount: 0,
    totalTransactions: 0,
  });

  const [loadingStats, setLoadingStats] = useState(true);
  const [showNotice, setShowNotice] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    document.title = "Dashboard - RealSMS";
    setShowNotice(true);

    const fetchTransactionStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          `${API_URL}/api/transactions/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTransactionStats({
          totalAmount: data?.totalAmount ?? 0,
          totalTransactions: data?.totalTransactions ?? 0,
        });
      } catch (err) {
        console.error(
          "Failed to fetch transaction stats:",
          err.response?.data || err.message
        );

        setTransactionStats({
          totalAmount: 0,
          totalTransactions: 0,
        });
      } finally {
        setLoadingStats(false);
      }
    };

    fetchTransactionStats();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  // const handleFundWallet = () => navigate("/fund-wallet");

  if (loading || loadingStats) {
    return (
      <div className={`dashboard ${darkMode ? "dark" : ""}`}>
        <div className={`spinner ${darkMode ? "dark" : ""}`}>
          Loading dashboard...
        </div>
      </div>
    );
  }

  const current = slides[currentSlide];

  return (
    <div className={`dashboard-page ${darkMode ? "dark" : ""}`}>
      {/* Notice Modal */}
      {showNotice && (
        <div className="notice-overlay">
          <div className="notice-modal">
            <button
              className="notice-close"
              onClick={() => setShowNotice(false)}
            >
              ×
            </button>

            <h2>Welcome to Real SMS Store</h2>
            <p>Message us for complaints via Telegram:</p>

            <p>
              <a
                href="https://t.me/realsms_store"
                target="_blank"
                rel="noopener noreferrer"
                className="notice-link"
              >
                @realsms_store
              </a>
            </p>

            <p>
              Kindly contact support for transaction or log-related issues.
            </p>

            <p className="notice-highlight">
              Any issue not reported within 24 hours may not be attended to.
            </p>

            <p>Wallet funding available via Flutterwave & Korapay.</p>
          </div>
        </div>
      )}

     {/* Hero Carousel */}
<div className="hero-banner">
  <div
    className="hero-bg"
    style={{
      backgroundImage: `url(${current.image})`,
    }}
  />

  <button
    className="banner-arrow left"
    onClick={prevSlide}
    aria-label="Previous banner"
  >
    <FiChevronLeft />
  </button>

  <button
    className="banner-arrow right"
    onClick={nextSlide}
    aria-label="Next banner"
  >
    <FiChevronRight />
  </button>

  <div className="slider-dots">
    {slides.map((_, index) => (
      <span
        key={index}
        className={index === currentSlide ? "dot active" : "dot"}
        onClick={() => setCurrentSlide(index)}
      />
    ))}
  </div>
</div>
      
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">
            <FaWallet />
          </div>
          <div>
            <p>Wallet Balance</p>
            <h2>₦{balance?.toLocaleString() || 0}</h2>
            <span>Available Balance</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <FiArrowDownCircle />
          </div>
          <div>
            <p>Total Deposits</p>
            <h2>₦{transactionStats.totalAmount.toLocaleString()}</h2>
            <span>All time</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <FiFileText />
          </div>
          <div>
            <p>Total Transactions</p>
            <h2>{transactionStats.totalTransactions}</h2>
            <span>All time</span>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="bottom-grid">
        <div className="activities-card">
          <div className="section-header">
            <h3>Live Activities</h3>
          </div>

          {activities.map((activity, index) => (
            <div key={index} className="activity-row">
              <div className="activity-left">
                <div className="activity-icon">✈</div>
                <p>{activity.text}</p>
              </div>

              <div className="activity-right">
                <span
                  className={
                    activity.success ? "status success" : "status failed"
                  }
                >
                  {activity.status}
                </span>
                <small>{activity.time}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="overview-card">
          <div className="section-header">
            <h3>Account Overview</h3>
          </div>

          <div className="overview-grid">
            <div className="overview-box">
              <FiSmartphone />
              <h2>3</h2>
              <p>Numbers Owned</p>
            </div>

            <div className="overview-box">
              <FiGlobe />
              <h2>5</h2>
              <p>Countries Covered</p>
            </div>

            <div className="overview-box">
              <FiTrendingUp />
              <h2>98.7%</h2>
              <p>Success Rate</p>
            </div>

            <div className="overview-box">
              <FiZap />
              <h2>8.4s</h2>
              <p>Avg Delivery Time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
