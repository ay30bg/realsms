import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/fundwallet-usdt.css";
import usdtLogo from "../assets/usdt-logo.png";

const quickAmounts = [50, 100, 500, 1000]; // example quick amounts in USDT
const MIN_AMOUNT = 10;
const MAX_AMOUNT = 10000;

const FundWalletUSDT = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const trxAddress = "TYourTRXWalletAddressHere"; // Replace with real TRX wallet address

  useEffect(() => {
    document.title = "Fund Wallet with USDT - RealSMS";
  }, []);

  const isPayDisabled =
    !amount || Number(amount) < MIN_AMOUNT || Number(amount) > MAX_AMOUNT || loading;

  const handlePay = async () => {
    setError("");

    if (!amount || Number(amount) < MIN_AMOUNT) {
      setError(`Minimum funding amount is ${MIN_AMOUNT} USDT`);
      return;
    }

    if (Number(amount) > MAX_AMOUNT) {
      setError(`Maximum funding amount is ${MAX_AMOUNT} USDT`);
      return;
    }

    try {
      setLoading(true);

      // If you have a backend API to track deposit, call it here
      // Example:
      // const token = localStorage.getItem("token");
      // await fetch(`${process.env.REACT_APP_API_URL}/api/usdt/init`, {...})

      alert(`Send ${amount} USDT to the TRX address:\n${trxAddress}`);
    } catch (err) {
      setError(err.message || "Funding failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fund-usdt-page">
      <div className="fund-usdt-card">
        <button className="back-btn" onClick={() => navigate("/fund-wallet")}>
          ← Back
        </button>

        <div className="fund-header">
          <img src={usdtLogo} alt="USDT" />
          <h3>Fund Wallet with USDT</h3>
          <p>Send USDT (TRX Network) securely</p>
        </div>

        <div className="fund-body">
          <label>Amount</label>
          <div className="amount-input-wrapper">
            <div className={`amount-input ${error ? "error" : ""}`}>
              <span>₮</span>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (error) setError("");
                }}
              />
            </div>
            <p className="min-max-text">
              Min: {MIN_AMOUNT} • Max: {MAX_AMOUNT} USDT
            </p>
          </div>

          <div className="quick-amounts">
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                className={`quick-btn ${Number(amount) === amt ? "active" : ""}`}
                onClick={() => {
                  setAmount(amt);
                  setError("");
                }}
              >
                {amt} ₮
              </button>
            ))}
          </div>

          {error && <p className="error-text">{error}</p>}

          <button className="fund-btn" onClick={handlePay} disabled={isPayDisabled}>
            {loading ? <span className="loader"></span> : "Fund Wallet"}
          </button>

          <div className="secure-badge">🔒 TRX Network</div>

          <div className="trx-address-info">
            <strong>TRX Wallet Address:</strong>
            <p>{trxAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundWalletUSDT;
