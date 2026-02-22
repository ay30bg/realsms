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

  // Dynamically load Korapay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://korablobstorage.blob.core.windows.net/modal-bucket/korapay-collections.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  const isPayDisabled =
    loading || !amount || Number(amount) < MIN_AMOUNT || Number(amount) > MAX_AMOUNT;

  // Handle Korapay payment via backend
  const handlePay = async () => {
    setError("");
    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount < MIN_AMOUNT) {
      setError(`Enter a valid amount ≥ ₦${MIN_AMOUNT.toLocaleString()}`);
      return;
    }
    if (numericAmount > MAX_AMOUNT) {
      setError(`Maximum amount is ₦${MAX_AMOUNT.toLocaleString()}`);
      return;
    }

    if (!window.Korapay || !window.Korapay.initialize) {
      setError("Korapay script not loaded yet");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // if using auth
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/korapay/init`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          amount: numericAmount,
          email: "john@doe.com", // replace with logged-in user email
          name: "John Doe",       // replace with logged-in user name
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Payment initialization failed");

      // Initialize Korapay checkout with server-generated reference
      window.Korapay.initialize({
        key: process.env.REACT_APP_KORAPAY_PUBLIC_KEY,
        reference: data.reference,
        amount: data.amount,
        currency: data.currency,
        customer: {
          name: "John Doe",
          email: "john@doe.com",
        },
        notification_url: `${process.env.REACT_APP_API_URL}/api/korapay/webhook`, // optional
        callback: (res) => {
          console.log("Payment success:", res);
          alert("Payment successful!");
          setLoading(false);
        },
        onClose: () => {
          console.log("Payment closed");
          setLoading(false);
        },
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
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
