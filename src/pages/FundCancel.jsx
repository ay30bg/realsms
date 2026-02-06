import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import "../styles/fund-cancel.css";

const FundCancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Payment Cancelled - RealSMS";

    // ⏳ Auto redirect after 8 seconds
    const timer = setTimeout(() => {
      navigate("/fund-wallet");
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fund-status-page">
      <div className="fund-status-card cancel">
        <FaTimesCircle className="status-icon cancel-icon" />

        <h2>❌ Payment Cancelled</h2>
        <p>
          Your payment was cancelled or not completed.
          <br />
          Redirecting you to fund wallet...
        </p>

        <button
          className="back-btn cancel-btn"
          onClick={() => navigate("/fund-wallet")}
        >
          Try Again Now
        </button>
      </div>
    </div>
  );
};

export default FundCancel;
