import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiChevronLeft,
  FiChevronRight,
  FiArrowDownCircle,
  FiFileText,
  FiMessageSquare,
  FiSmartphone,
  FiGlobe,
  FiShield,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import { FaWallet } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { useBalance } from "../context/BalanceContext";
import banner1 from "../assets/support-banner.png";
import banner2 from "../assets/number-banner.png";
import banner3 from "../assets/vpn-banner.png";
import "../styles/dashboard.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://realsms-backend.vercel.app";

const maskEmail = (email) => {
  if (!email || !email.includes("@")) return "*****";

  const [name, domain] = email.split("@");

  if (name.length <= 2) {
    return `${name[0]}***@${domain}`;
  }

  return `${name.slice(0, 2)}${"*".repeat(
    Math.max(2, name.length - 3)
  )}${name.slice(-1)}@${domain}`;
};

const slides = [
  { image: banner1 },
  { image: banner2 },
  { image: banner3 },
];

const activities = [
  {
    icon: <FiMessageSquare />,
    iconClass: "sms-icon",
    email: "johndoe@gmail.com",
    action: "purchased Signal Number from United States",
    status: "Completed",
    time: "20 mins ago",
    success: true,
  },
  {
    icon: <FiShield />,
    iconClass: "vpn-icon",
    email: "marysmith@yahoo.com",
    action: "purchased IP Vanish Logs",
    status: "Completed",
    time: "30 mins ago",
    success: true,
  },
  {
    icon: <FiMessageSquare />,
    iconClass: "sms-icon",
    email: "alexbrown@hotmail.com",
    action: "purchased WhatsApp Number from United States",
    status: "Completed",
    time: "50 mins ago",
    success: true,
  },
  {
    icon: <FaWallet />,
    iconClass: "wallet-icon",
    email: "samwilson@gmail.com",
    action: "funded wallet successfully",
    status: "Success",
    time: "1 hour ago",
    success: true,
  },
];

const Dashboard = ({ darkMode }) => {
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
        <img
          src={current.image}
          alt={`Banner ${currentSlide + 1}`}
          className="hero-image"
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
              className={`dot ${index === currentSlide ? "active" : ""}`}
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

        <div className="stat-card">
          <div className="stat-icon orange">
            <FiMessageSquare />
          </div>
          <div>
            <p>SMS Received</p>
            <h2>1,284</h2>
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
                <div className={`activity-icon ${activity.iconClass}`}>
                  {activity.icon}
                </div>
                
                <div className="activity-content">
        <p className="activity-text">
          <span className="activity-email-inline">
            {maskEmail(activity.email)}
          </span>{" "}
          {activity.action}
        </p>
      </div>
              </div>

              <div className="activity-right">
                <span
                  className={
                    activity.success ? "status success" : "status failed"
                  }
                >
                  {activity.status}
                </span>
                <small className="activity-time">{activity.time}</small>
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

      {/* ADD TELEGRAM BUTTON HERE */}
      <a
        href="https://t.me/realsms_store"
        target="_blank"
        rel="noopener noreferrer"
        className="telegram-float"
      >
        <FaTelegramPlane />
      </a>

    </div>
  );
};

export default Dashboard;
