import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "../styles/fund-success.css";

const FundSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Funding Successful - RealSMS";

    // ⏳ Auto redirect to fund-wallet after 8 seconds
    const timer = setTimeout(() => {
      navigate("/fund-wallet");
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fund-status-page">
      <div className="fund-status-card success">
        <FaCheckCircle className="status-icon success-icon" />

        <h2>🎉 Payment Successful!</h2>
        <p>
          Your wallet has been funded successfully.
          <br />
          Redirecting you to fund wallet...
        </p>

        <button className="back-btn" onClick={() => navigate("/fund-wallet")}>
          Go to Fund Wallet Now
        </button>
      </div>
    </div>
  );
};

export default FundSuccess;
