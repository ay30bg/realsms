import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/fundwallet.css";
import korapayLogo from "../assets/korapay.png";

const QUICK_AMOUNTS = [1000, 5000, 10000, 50000];
const MIN_AMOUNT = 100;
const MAX_AMOUNT = 500000;

const KorapayFund = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ PAGE TITLE
  useEffect(() => {
    document.title = "Fund Wallet - Korapay";

    // Dynamically load Korapay script
    const script = document.createElement("script");
    script.src =
      "https://korablobstorage.blob.core.windows.net/modal-bucket/korapay-collections.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // ✅ Disable pay button conditions
  const isPayDisabled =
    loading || !amount || Number(amount) < MIN_AMOUNT || Number(amount) > MAX_AMOUNT;

  // ✅ Handle Korapay payment
  const handlePay = () => {
    setError("");
    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount < MIN_AMOUNT) {
      setError(`Enter a valid amount (minimum ₦${MIN_AMOUNT.toLocaleString()})`);
      return;
    }
    if (numericAmount > MAX_AMOUNT) {
      setError(`Maximum amount is ₦${MAX_AMOUNT.toLocaleString()}`);
      return;
    }

    if (!window.Korapay) {
      setError("Korapay script not loaded yet. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const korapay = new window.Korapay({
        key: process.env.REACT_APP_KORAPAY_PUBLIC_KEY, // ✅ from .env
        amount: numericAmount * 100, // amount in kobo
        email: "user@example.com", // replace with actual logged-in user email
        onClose: () => setLoading(false),
        callback: (response) => {
          console.log("Payment successful:", response);
          setLoading(false);
          alert("Payment successful!");
          // Optional: navigate or update wallet balance
        },
      });

      korapay.show();
    } catch (err) {
      setError(err.message || "Payment failed");
      setLoading(false);
    }
  };

  return (
    <div className="fund-wallet-page">
      <div className="fund-wallet-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="fund-header">
          <img src={korapayLogo} alt="Korapay" className="fund-logo" />
          <h3>Fund Wallet</h3>
          <p>Secure payment via Korapay</p>
        </div>

        <div className="fund-body">
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
                const value = e.target.value.replace(/\D/, ""); // remove non-numbers
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
