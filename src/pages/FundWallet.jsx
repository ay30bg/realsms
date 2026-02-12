import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/fundwallet.css";
import usdtLogo from "../assets/usdt-logo.png";
import paystackLogo from "../assets/paystack.png";

const FundWallet = () => {
  const navigate = useNavigate();

  // ✅ PAGE TITLE
  useEffect(() => {
    document.title = "Fund Wallet - RealSMS";
  }, []);

  return (
    <div className="fund-wallet-page">
      <div className="fund-wallet-card">
        <h2 className="fund-title">Fund Wallet</h2>

        {/* USDT */}
        <div
          className="payment-option clickable"
          onClick={() => navigate("/fund-wallet/usdt")} // ✅ updated route
        >
          <div className="payment-left">
            <img src={usdtLogo} alt="USDT" className="payment-icon" />
            <div className="payment-text">
              <h4>USDT</h4>
              <span>TRC 20 Network</span>
            </div>
          </div>
          <span className="payment-arrow">→</span>
        </div>

        {/* Opay */}
        <div
          className="payment-option clickable"
          onClick={() => navigate("/fund-wallet/opay")}
        >
          <div className="payment-left">
            <img src={paystackLogo} alt="Opay" className="payment-icon" />
            <div className="payment-text">
              <h4>Pay with Paystack</h4>
              <span>Wallet · Bank Transfer</span>
            </div>
          </div>
          <span className="payment-arrow">→</span>
        </div>
      </div>
    </div>
  );
};

export default FundWallet;



