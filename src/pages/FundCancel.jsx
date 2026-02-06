import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import "../styles/fund-cancel.css";

const FundCancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Payment Cancelled - RealSMS";
  }, []);

  return (
    <div className="fund-status-page">
      <div className="fund-status-card cancel">
        {/* ❌ Cancel Icon */}
        <FaTimesCircle className="status-icon cancel-icon" />

        <h2>❌ Payment Cancelled</h2>
        <p>
          Your payment was cancelled or not completed.
          <br />
          No money was deducted from your wallet.
        </p>

        <button
          className="back-btn cancel-btn"
          onClick={() => navigate("/fund-wallet")}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default FundCancel;
