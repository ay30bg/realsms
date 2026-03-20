import React, { useEffect } from "react";
import { FiShoppingBag, FiClock } from "react-icons/fi";
import "../styles/coming-soon.css";

const PurchaseLogs = () => {
  useEffect(() => {
    document.title = "Social Media Logs - RealSMS";
  }, []);

  return (
    <div className="coming-soon-page">
      <div className="coming-soon-card">
        <FiShoppingBag className="coming-icon" />

        <h2>Social Media Logs Marketplace</h2>

        <p className="coming-main">
          Buy verified social media logs — coming soon 🚀
        </p>

        <div className="coming-features">
          <div className="feature">
            <FiClock /> <span>Fresh & Active Accounts</span>
          </div>
          <div className="feature">
            <FiClock /> <span>Multiple Platforms (Gmail, Facebook, etc.)</span>
          </div>
          <div className="feature">
            <FiClock /> <span>Instant Delivery</span>
          </div>
        </div>

        <span className="coming-subtext">
          This marketplace is currently under development. Stay tuned.
        </span>

        <button className="coming-btn">Coming Soon</button>
      </div>
    </div>
  );
};

export default PurchaseLogs;
