import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/fundwallet.css";
import korapayLogo from "../assets/korapay.png";

const QUICK_AMOUNTS = [1000, 5000, 10000, 50000];
const MIN_AMOUNT = 1000;
const MAX_AMOUNT = 500000;

const KorapayFund = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const numericAmount = Number(amount);

  const isValidAmount =
    numericAmount &&
    numericAmount >= MIN_AMOUNT &&
    numericAmount <= MAX_AMOUNT;

  const isPayDisabled = loading || !isValidAmount;

  const handlePay = async () => {
    if (loading) return;

    setError("");

    if (!isValidAmount) {
      if (!numericAmount || numericAmount < MIN_AMOUNT) {
        setError(`Minimum amount is ₦${MIN_AMOUNT.toLocaleString()}`);
      } else if (numericAmount > MAX_AMOUNT) {
        setError(`Maximum amount is ₦${MAX_AMOUNT.toLocaleString()}`);
      }
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/korapay/init`,
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

      // 🔥 IMPORTANT DEBUG LOG (KEEP THIS UNTIL FIX IS DONE)
      console.log("🔥 BACKEND RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || data.detail || "Payment initialization failed"
        );
      }

      if (!data.checkout_url) {
        console.error("❌ INVALID CHECKOUT RESPONSE:", data);
        throw new Error("Missing checkout_url from backend");
      }

      // 🔥 FINAL CHECK BEFORE REDIRECT
      console.log("🚀 Redirecting to Korapay:", data.checkout_url);

      window.location.href = data.checkout_url;
    } catch (err) {
      console.error("❌ Korapay Init Error:", err);
      setError(err.message || "Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fund-wallet-page">
      <div className="fund-wallet-card">
        <button className="back-btn" onClick={() => !loading && navigate(-1)}>
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
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value.replace(/\D/g, ""));
                setError("");
              }}
              placeholder="0"
              disabled={loading}
            />
          </div>

          <p className="min-max-text">
            Min: ₦{MIN_AMOUNT.toLocaleString()} • Max: ₦{MAX_AMOUNT.toLocaleString()}
          </p>

          <div className="quick-amounts">
            {QUICK_AMOUNTS.map((amt) => (
              <button
                key={amt}
                  className={`quick-btn ${
        numericAmount === amt ? "active" : ""
      }`}
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
            {loading ? "Redirecting..." : "Pay with Korapay"}
          </button>

          <div className="secure-badge">🔒 Secured by Korapay</div>
        </div>
      </div>
    </div>
  );
};

export default KorapayFund;
