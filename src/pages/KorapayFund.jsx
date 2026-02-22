import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/fundwallet.css";
import korapayLogo from "../assets/korapay.png";

const QUICK_AMOUNTS = [200, 500, 1000, 5000, 10000, 50000];
const MIN_AMOUNT = 200;      // Korapay live minimum
const MAX_AMOUNT = 500000;   // Your max

const KorapayFund = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load Korapay script once
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

  const handlePay = async () => {
    setError("");
    const numericAmount = Number(amount);

    // Validate amount
    if (numericAmount < MIN_AMOUNT) {
      setError(`Minimum amount is ₦${MIN_AMOUNT.toLocaleString()}`);
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
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/korapay/init`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ amount: numericAmount }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Payment failed");

      // ✅ Convert amount to kobo for Korapay
      const amountInKobo = Number(data.amount) * 100;

      window.Korapay.initialize({
        key: process.env.REACT_APP_KORAPAY_PUBLIC_KEY,
        reference: data.reference,
        amount: amountInKobo,
        currency: data.currency,
        customer: {
          name: "John Doe", // replace with real user
          email: "john@doe.com",
        },
        callback: () => {
          alert("Payment successful!");
          setLoading(false);
          navigate("/fund-success");
        },
        onClose: () => {
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
              onChange={(e) => {
                const val = e.target.value.replace(/\D/, ""); // remove non-numbers
                setAmount(val);
                setError("");
              }}
              placeholder="0"
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
                className={Number(amount) === amt ? "active" : ""}
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
