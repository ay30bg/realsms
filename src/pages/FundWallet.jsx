import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/fundwallet.css";
import usdtLogo from "../assets/usdt-logo.png";
import opayLogo from "../assets/opay.png";

const FundWallet = () => {
  const navigate = useNavigate();

  return (
    <div className="fund-wallet-page">
      <div className="fund-wallet-card">
        <h2 className="fund-title">Fund Wallet</h2>

        {/* USDT */}
        <div className="payment-option">
          <div className="payment-left">
            <img src={usdtLogo} alt="USDT" className="payment-icon" />
            <div className="payment-text">
              <h4>USDT</h4>
              <span>SOL Network</span>
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
            <img src={opayLogo} alt="Opay" className="payment-icon" />
            <div className="payment-text">
              <h4>Pay with Opay</h4>
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
