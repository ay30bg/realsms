import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/fundwallet-usdt.css";
import usdtLogo from "../assets/usdt-logo.png";

const quickAmounts = [10, 20, 35, 50];
const MIN_AMOUNT = 10;
const MAX_AMOUNT = 10000;

const FundWalletUSDT = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Fund Wallet with USDT - RealSMS";
  }, []);

  const handlePay = async () => {
    setError("");

    if (!amount || Number(amount) < MIN_AMOUNT) {
      setError(`Minimum amount is ${MIN_AMOUNT} USDT`);
      return;
    }

    if (Number(amount) > MAX_AMOUNT) {
      setError(`Maximum amount is ${MAX_AMOUNT} USDT`);
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Session expired. Please login again.");
      }

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/usdt/init`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: Number(amount),
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Payment failed");

      // 🔁 Redirect to NowPayments checkout
      window.location.href = data.invoice_url;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fund-usdt-page">
      <div className="fund-usdt-card">
        <button
          className="back-btn"
          onClick={() => navigate("/fund-wallet")}
        >
          ← Back
        </button>

        <div className="fund-header">
          <img src={usdtLogo} alt="USDT" />
          <h3>Fund Wallet with USDT</h3>
          <p>TRC20 • Powered by NowPayments</p>
        </div>

        <div className="fund-body">
          <label>Amount (USDT)</label>

          <div className={`amount-input ${error ? "error" : ""}`}>
            <span>₮</span>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              min={MIN_AMOUNT}
              onChange={(e) => {
                setAmount(e.target.value);
                setError("");
              }}
            />
          </div>

          <p className="min-max-text">
            Min: {MIN_AMOUNT} • Max: {MAX_AMOUNT} USDT
          </p>

          <div className="quick-amounts">
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                className={`quick-btn ${
                  Number(amount) === amt ? "active" : ""
                }`}
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

          <button
            className="fund-btn"
            onClick={handlePay}
            disabled={loading}
          >
            {loading ? "Redirecting..." : "Proceed to Payment"}
          </button>

          <div className="secure-badge">
            🔒 Secured by NowPayments
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundWalletUSDT;
