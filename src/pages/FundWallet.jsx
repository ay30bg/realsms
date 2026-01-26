import React from "react";
import "../styles/fundwallet.css";
import usdtLogo from "../assets/usdt-logo.png";
import flutterwaveLogo from "../assets/flutterwave.png";

const FundWallet = () => {
  return (
    <div className="fund-wallet-page">
      
      <div className="fund-wallet-card">
        <h2 className="fund-title">Fund Wallet</h2>

        {/* USDT */}
        <div className="payment-option">
          <div className="payment-left">
            <img
              src={usdtLogo}
              alt="USDT"
              className="payment-icon"
            />
            <div className="payment-text">
              <h4>USDT</h4>
              <span>SOL Network</span>
            </div>
          </div>
          <span className="payment-arrow">→</span>
        </div>

        {/* Flutterwave */}
        <div className="payment-option">
          <div className="payment-left">
            <img
              src={flutterwaveLogo}
              alt="Flutterwave"
              className="payment-icon"
            />
            <div className="payment-text">
              <h4>Flutterwave</h4>
              <span>Card · Bank · Transfer</span>
            </div>
          </div>
          <span className="payment-arrow">→</span>
        </div>
      </div>
    </div>
  );
};

export default FundWallet;
