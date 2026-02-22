import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/fundwallet.css";
import korapayLogo from "../assets/korapay.png";

const MIN_AMOUNT = 200;
const MAX_AMOUNT = 500000;

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

      const amountInKobo = Number(data.amount) * 100;

      window.Korapay.initialize({
        key: process.env.REACT_APP_KORAPAY_PUBLIC_KEY,
        reference: data.reference,
        amount: amountInKobo,
        currency: data.currency,
        customer: { name: "John Doe", email: "john@doe.com" },
        callback: () => {
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
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <div className="fund-header">
          <img src={korapayLogo} alt="Korapay" />
          <h3>Fund Wallet</h3>
          <p>Secure payment via Korapay</p>
        </div>
        <div className="fund-body">
          <label>Amount</label>
          <input
            type="number"
            min={MIN_AMOUNT}
            max={MAX_AMOUNT}
            value={amount}
            placeholder="0"
            onChange={(e) => {
              const val = e.target.value.replace(/\D/, "");
              setAmount(val);
              setError("");
            }}
          />
          {error && <p className="error-text">{error}</p>}
          <button
            disabled={isPayDisabled}
            onClick={handlePay}
          >
            {loading ? "Processing..." : "Pay with Korapay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KorapayFund;
