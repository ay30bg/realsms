import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/paystack-fund.css"; // You can reuse the same styles
import korapayLogo from "../assets/korapay.png"; // Add Korapay logo

const QUICK_AMOUNTS = [1000, 5000, 10000, 50000];
const MIN_AMOUNT = 100;
const MAX_AMOUNT = 500000;

const KorapayFund = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Fund Wallet - Korapay";
  }, []);

  const isPayDisabled =
    loading || !amount || Number(amount) < MIN_AMOUNT || Number(amount) > MAX_AMOUNT;

  // Frontend-only Korapay integration
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

    setLoading(true);

    try {
      // Korapay checkout options
      const options = {
        key: process.env.REACT_APP_KORAPAY_PUBLIC_KEY, // your public key
        amount: numericAmount * 100, // Korapay expects amount in kobo
        email: "user@example.com", // Replace with actual user email if available
        onClose: () => setLoading(false),
        callback: (response) => {
          // You can verify payment on your backend
          console.log("Payment successful:", response);
          setLoading(false);
          alert("Payment successful!");
        },
      };

      // Open Korapay checkout
      if (window.Korapay) {
        window.Korapay(options);
      } else {
        setError("Korapay script not loaded");
      }
    } catch (err) {
      setError(err.message || "Payment failed");
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
          <img src={korapayLogo} alt="Korapay Logo" />
          <h3>Fund Wallet</h3>
          <p>Secure payment via Korapay</p>
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
            {loading ? "Processing..." : "Pay with Korapay"}
          </button>

          <div className="secure-badge">🔒 Secured by Korapay</div>
        </div>
      </div>
    </div>
  );
};

export default KorapayFund;
