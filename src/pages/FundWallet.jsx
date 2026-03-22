import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/fundwallet.css";
import usdtLogo from "../assets/usdt-logo.png";
import paystackLogo from "../assets/paystack.png";
import flutterwaveLogo from "../assets/flutterwave.png"; // ✅ NEW

const FundWallet = () => {
  const navigate = useNavigate();

  // 🔥 Toggle payment methods here
  const usdtEnabled = true;
  const paystackEnabled = false;     
  const flutterwaveEnabled = true;  

  useEffect(() => {
    document.title = "Fund Wallet - RealSMS";
  }, []);

  return (
    <div className="fund-wallet-page">
      <div className="fund-wallet-card">
        <h2 className="fund-title">Fund Wallet</h2>

        {/* USDT */}
        <div
          className={`payment-option ${usdtEnabled ? "clickable" : "disabled"}`}
          onClick={() => usdtEnabled && navigate("/fund-wallet/usdt")}
        >
          <div className="payment-left">
            <img src={usdtLogo} alt="USDT" className="payment-icon" />
            <div className="payment-text">
              <h4>USDT</h4>
              <span>
                {usdtEnabled ? "TRC 20 Network" : "Temporarily Unavailable"}
              </span>
            </div>
          </div>
          <span className="payment-arrow">{usdtEnabled ? "→" : "—"}</span>
        </div>

        {/* Flutterwave */}
        <div
          className={`payment-option ${flutterwaveEnabled ? "clickable" : "disabled"}`}
          onClick={() => flutterwaveEnabled && navigate("/fund-wallet/flutterwave")}
        >
          <div className="payment-left">
            <img src={flutterwaveLogo} alt="Flutterwave" className="payment-icon" />
            <div className="payment-text">
              <h4>Pay with Flutterwave</h4>
              <span>
                {flutterwaveEnabled
                  ? "Card · Bank Transfer · USSD"
                  : "Temporarily Unavailable"}
              </span>
            </div>
          </div>
          <span className="payment-arrow">{flutterwaveEnabled ? "→" : "—"}</span>
        </div>

        {/* Paystack */}
        <div
          className={`payment-option ${paystackEnabled ? "clickable" : "disabled"}`}
          onClick={() => paystackEnabled && navigate("/fund-wallet/paystack")}
        >
          <div className="payment-left">
            <img src={paystackLogo} alt="Paystack" className="payment-icon" />
            <div className="payment-text">
              <h4>Pay with Paystack</h4>
              <span>
                {paystackEnabled
                  ? "Wallet · Bank Transfer"
                  : "Temporarily Unavailable"}
              </span>
            </div>
          </div>
          <span className="payment-arrow">{paystackEnabled ? "→" : "—"}</span>
        </div>
      </div>
    </div>
  );
};

export default FundWallet;


