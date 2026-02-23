import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/paystack-fund.css";
import flutterwaveLogo from "../assets/flutterwave.png"; // 👈 Add flutterwave logo

const QUICK_AMOUNTS = [1000, 5000, 10000, 50000];
const MIN_AMOUNT = 100;
const MAX_AMOUNT = 500000;

const FlutterwaveFund = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Fund Wallet - Flutterwave";
  }, []);

  const isPayDisabled =
    loading || !amount || Number(amount) < MIN_AMOUNT || Number(amount) > MAX_AMOUNT;

  const handlePay = async () => {
    setError("");

    const numericAmount = Number(amount);

    if (!numericAmount) {
      setError("Enter a valid amount");
      return;
    }

    if (numericAmount < MIN_AMOUNT) {
      setError(`Minimum amount is ₦${MIN_AMOUNT.toLocaleString()}`);
      return;
    }

    if (numericAmount > MAX_AMOUNT) {
      setError(`Maximum amount is ₦${MAX_AMOUNT.toLocaleString()}`);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to fund wallet");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/flutterwave/init`, // 👈 changed endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: numericAmount }),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Payment failed");

      // Redirect user to Flutterwave payment page
      window.location.href = data.paymentUrl;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="paystack-page">
      <div className="paystack-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="paystack-header">
          <img src={flutterwaveLogo} alt="Flutterwave Logo" />
          <h3>Fund Wallet</h3>
          <p>Secure payment via Flutterwave</p>
        </div>

        <div className="paystack-body">
          <label>Amount</label>

          <div className={`amount-input ${error ? "error" : ""}`}>
            <span>₦</span>
            <input
              type="number"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              value={amount}
              placeholder="0"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/, "");
                setAmount(value);
                setError("");
              }}
            />
          </div>

          <p className="min-max-text">
            Min: ₦{MIN_AMOUNT.toLocaleString()} • Max: ₦{MAX_AMOUNT.toLocaleString()}
          </p>

          <div className="quick-amounts">
            {QUICK_AMOUNTS.map((amt) => (
              <button
                key={amt}
                type="button"
                className={`quick-btn ${Number(amount) === amt ? "active" : ""}`}
                onClick={() => setAmount(String(amt))}
                disabled={loading}
              >
                ₦{amt.toLocaleString()}
              </button>
            ))}
          </div>

          {error && <p className="error-text">{error}</p>}

          <button
            className={`fund-btn ${isPayDisabled ? "disabled" : ""}`}
            onClick={handlePay}
            disabled={isPayDisabled}
          >
            {loading ? "Processing..." : "Pay with Flutterwave"}
          </button>

          <div className="secure-badge">🔒 Secured by Flutterwave</div>
        </div>
      </div>
    </div>
  );
};

export default FlutterwaveFund;
