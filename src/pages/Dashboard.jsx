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

const Dashboard = ({ darkMode }) => {
    const { balance, loading } = useBalance();

    const [transactionStats, setTransactionStats] = useState({
        totalAmount: 0,
        totalTransactions: 0,
    });

    const [smsStats, setSmsStats] = useState({
    smsReceived: 0,
});

    const [accountOverview, setAccountOverview] = useState({
    numbersOwned: 0,
    countriesCovered: 0,
    successRate: 0,
});

    const [loadingStats, setLoadingStats] = useState(true);
    const [showNotice, setShowNotice] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [liveActivities, setLiveActivities] = useState([]);
    const [loadingActivities, setLoadingActivities] = useState(true);

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
    const fetchSmsStats = async () => {
        try {
            const token = localStorage.getItem("token");

            const { data } = await axios.get(
                `${API_URL}/api/smspool/stats`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSmsStats(data);
        } catch (err) {
            console.error("SMS stats error:", err);
        }
    };

    fetchSmsStats();
}, []);

    useEffect(() => {
    const fetchOverview = async () => {
        try {
            const token = localStorage.getItem("token");

            const { data } = await axios.get(
                `${API_URL}/api/smspool/overview`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setAccountOverview({
                numbersOwned: data?.numbersOwned ?? 0,
                countriesCovered: data?.countriesCovered ?? 0,
                successRate: data?.successRate ?? 0,
            });
        } catch (err) {
            console.error("Overview error:", err);
        }
    };

    fetchOverview();
}, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const token = localStorage.getItem("token");

                const { data } = await axios.get(
                    `${API_URL}/api/activity/live`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setLiveActivities(data || []);
            } catch (err) {
                console.error(err);
                setLiveActivities([]);
            } finally {
                setLoadingActivities(false);
            }
        };

        // initial fetch
        fetchActivities();

        // 🔥 auto refresh every 5 seconds
        const interval = setInterval(fetchActivities, 5000);

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () =>
        setCurrentSlide((prev) => (prev + 1) % slides.length);

    const prevSlide = () =>
        setCurrentSlide((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );

    const timeAgo = (date) => {
        const now = new Date();
        const past = new Date(date);
        const diff = Math.floor((now - past) / 1000); // seconds

        if (diff < 60) return `${diff}s ago`;

        const mins = Math.floor(diff / 60);
        if (mins < 60) return `${mins}m ago`;

        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;

        const days = Math.floor(hrs / 24);
        return `${days}d ago`;
    };

    if (loading || loadingStats) {
        return (
            <div className={`dashboard-page ${darkMode ? "dark" : ""}`}>
                {/* Hero Banner */}
                <div className="hero-banner skeleton-block"></div>

                {/* Stats */}
                <div className="stats-grid">
                    {[1, 2, 3, 4].map((item) => (
                        <div className="stat-card" key={item}>
                            <div className="stat-icon skeleton-circle"></div>

                            <div>
                                <div className="skeleton-line text-sm"></div>
                                <div className="skeleton-line text-lg"></div>
                                <div className="skeleton-line text-xs"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Grid */}
                <div className="bottom-grid">
                    <div className="activities-card">
                        <div className="section-header">
                            <div className="skeleton-line heading"></div>
                        </div>

                        {[1, 2, 3, 4].map((item) => (
                            <div className="activity-row" key={item}>
                                <div className="activity-left">
                                    <div className="activity-icon skeleton-circle"></div>

                                    <div className="activity-content">
                                        <div className="skeleton-line activity-main"></div>
                                        <div className="skeleton-line activity-sub"></div>
                                    </div>
                                </div>

                                <div className="activity-right">
                                    <div className="skeleton-pill"></div>
                                    <div className="skeleton-line time"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="overview-card">
                        <div className="section-header">
                            <div className="skeleton-line heading overview-heading"></div>
                        </div>

                        <div className="overview-grid">
                            {[1, 2, 3, 4].map((item) => (
                                <div className="overview-box" key={item}>
                                    <div className="skeleton-overview-icon"></div>
                                    <div className="skeleton-line stat-number"></div>
                                    <div className="skeleton-line stat-label"></div>
                                </div>
                            ))}
                        </div>
                    </div>
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

                        <div className="notice-channel">
                            <p>Join our Telegram channel for updates and announcements:</p>

                            <a
                                href="https://t.me/realsms_store1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="notice-channel-link"
                            >
                                <FaTelegramPlane />
                                <span>Join Telegram Channel</span>
                            </a>


                        </div>

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
                        <h2>{smsStats.smsReceived.toLocaleString()}</h2>
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
                    {loadingActivities ? (
                        <p className="loading-text">Loading activities...</p>
                    ) : liveActivities.length === 0 ? (
                        <p className="empty-text">No recent activities</p>
                    ) : (
                        <>
                            {liveActivities.slice(0, 4).map((activity, index) => (
                                <div key={index} className="activity-row">
                                    <div className="activity-left">
                                        <div
                                            className={`activity-icon ${activity.type === "wallet"
                                                    ? "wallet-icon"
                                                    : activity.type === "sms"
                                                        ? "sms-icon"
                                                        : "vpn-icon"
                                                }`}
                                        >
                                            {activity.type === "wallet" && <FaWallet />}
                                            {activity.type === "sms" && <FiMessageSquare />}
                                            {activity.type === "vpn" && <FiShield />}
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
                                                activity.success
                                                    ? "status success"
                                                    : "status failed"
                                            }
                                        >
                                            {activity.status}
                                        </span>

                                        <small className="activity-time">
                                            {timeAgo(activity.createdAt)}
                                        </small>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                <div className="overview-card">
                    <div className="section-header">
                        <h3>Account Overview</h3>
                    </div>

                    <div className="overview-grid">
                            <div className="overview-box">
        <FiSmartphone />
        <h2>{accountOverview.numbersOwned}</h2>
        <p>Numbers Owned</p>
    </div>

    <div className="overview-box">
        <FiGlobe />
        <h2>{accountOverview.countriesCovered}</h2>
        <p>Countries Covered</p>
    </div>

    <div className="overview-box">
        <FiTrendingUp />
        <h2>{accountOverview.successRate}%</h2>
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
