// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/fundwallet-usdt.css";
// import usdtLogo from "../assets/usdt-logo.png";

// const quickAmounts = [50, 100, 500, 1000]; // example quick amounts in USDT
// const MIN_AMOUNT = 10;
// const MAX_AMOUNT = 10000;

// const FundWalletUSDT = () => {
//   const navigate = useNavigate();
//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const trxAddress = "TYourTRXWalletAddressHere"; // Replace with real TRX wallet address

//   useEffect(() => {
//     document.title = "Fund Wallet with USDT - RealSMS";
//   }, []);

//   const isPayDisabled =
//     !amount || Number(amount) < MIN_AMOUNT || Number(amount) > MAX_AMOUNT || loading;

//   const handlePay = async () => {
//     setError("");

//     if (!amount || Number(amount) < MIN_AMOUNT) {
//       setError(`Minimum funding amount is ${MIN_AMOUNT} USDT`);
//       return;
//     }

//     if (Number(amount) > MAX_AMOUNT) {
//       setError(`Maximum funding amount is ${MAX_AMOUNT} USDT`);
//       return;
//     }

//     try {
//       setLoading(true);

//       // If you have a backend API to track deposit, call it here
//       // Example:
//       // const token = localStorage.getItem("token");
//       // await fetch(`${process.env.REACT_APP_API_URL}/api/usdt/init`, {...})

//       alert(`Send ${amount} USDT to the TRX address:\n${trxAddress}`);
//     } catch (err) {
//       setError(err.message || "Funding failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fund-usdt-page">
//       <div className="fund-usdt-card">
//         <button className="back-btn" onClick={() => navigate("/fund-wallet")}>
//           ← Back
//         </button>

//         <div className="fund-header">
//           <img src={usdtLogo} alt="USDT" />
//           <h3>Fund Wallet with USDT</h3>
//           <p>Send USDT (TRX Network) securely</p>
//         </div>

//         <div className="fund-body">
//           <label>Amount</label>
//           <div className="amount-input-wrapper">
//             <div className={`amount-input ${error ? "error" : ""}`}>
//               <span>₮</span>
//               <input
//                 type="number"
//                 placeholder="0.00"
//                 value={amount}
//                 onChange={(e) => {
//                   setAmount(e.target.value);
//                   if (error) setError("");
//                 }}
//               />
//             </div>
//             <p className="min-max-text">
//               Min: {MIN_AMOUNT} • Max: {MAX_AMOUNT} USDT
//             </p>
//           </div>

//           <div className="quick-amounts">
//             {quickAmounts.map((amt) => (
//               <button
//                 key={amt}
//                 type="button"
//                 className={`quick-btn ${Number(amount) === amt ? "active" : ""}`}
//                 onClick={() => {
//                   setAmount(amt);
//                   setError("");
//                 }}
//               >
//                 {amt} ₮
//               </button>
//             ))}
//           </div>

//           {error && <p className="error-text">{error}</p>}

//           <button className="fund-btn" onClick={handlePay} disabled={isPayDisabled}>
//             {loading ? <span className="loader"></span> : "Fund Wallet"}
//           </button>

//           <div className="secure-badge">🔒 TRX Network</div>

//           <div className="trx-address-info">
//             <strong>TRX Wallet Address:</strong>
//             <p>{trxAddress}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FundWalletUSDT;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/fundwallet-usdt.css";
import usdtLogo from "../assets/usdt-logo.png";

const quickAmounts = [50, 100, 500, 1000];
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
            Authorization: `Bearer ${token}`, // 🔐 JWT only
          },
          body: JSON.stringify({
            amount: Number(amount),
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Payment failed");

      // 🔁 Redirect to NowPayments checkout
      window.location.href = data.payment_url;
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
              onChange={(e) => {
                setAmount(e.target.value);
                setError("");
              }}
            />
          </div>

          <p className="min-max">
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
