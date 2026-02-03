import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import successImg from "../assets/success.png"; // optional success illustration
import "../styles/fund-success.css";

const FundSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Funding Successful - RealSMS";
  }, []);

  return (
    <div className="fund-status-page">
      <div className="fund-status-card success">
        <img src={successImg} alt="Success" className="status-img" />
        <h2>🎉 Payment Successful!</h2>
        <p>Your wallet has been funded successfully.</p>

        <button className="back-btn" onClick={() => navigate("/wallet")}>
          Go to Wallet
        </button>
      </div>
    </div>
  );
};

export default FundSuccess;
