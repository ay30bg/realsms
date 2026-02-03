// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/opay-fund.css";
// import opayLogo from "../assets/opay.png";

// const quickAmounts = [1000, 5000, 10000, 50000];
// const MIN_AMOUNT = 100;
// const MAX_AMOUNT = 500000;

// const OpayFund = () => {
//   const navigate = useNavigate();
//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ✅ PAGE TITLE
//   useEffect(() => {
//     document.title = "Opay Fund - RealSMS";
//   }, []);

//   // Disable button conditions
//   const isPayDisabled =
//     !amount ||
//     Number(amount) < MIN_AMOUNT ||
//     Number(amount) > MAX_AMOUNT ||
//     loading;

//   const handlePay = () => {
//     setError("");

//     if (!amount || Number(amount) < MIN_AMOUNT) {
//       setError(`Minimum funding amount is ₦${MIN_AMOUNT}`);
//       return;
//     }

//     if (Number(amount) > MAX_AMOUNT) {
//       setError(`Maximum funding amount is ₦${MAX_AMOUNT}`);
//       return;
//     }

//     setLoading(true);

//     // Simulate backend call
//     setTimeout(() => {
//       setLoading(false);
//       alert("Redirecting to Opay...");
//     }, 1800);
//   };

//   return (
//     <div className="opay-page">
//       <div className="opay-card">
//         {/* Back button */}
//         <button className="back-btn" onClick={() => navigate("/fund-wallet")}>
//           ← Back
//         </button>

//         {/* Header */}
//         <div className="opay-header">
//           <img src={opayLogo} alt="Opay" />
//           <h3>Fund Wallet</h3>
//           <p>Pay securely with Opay</p>
//         </div>

//         {/* Body */}
//         <div className="opay-body">
//           <label>Amount</label>

//           {/* Amount input + min/max */}
//           <div className="amount-input-wrapper">
//             <div className={`amount-input ${error ? "error" : ""}`}>
//               <span>₦</span>
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
//               Min: ₦{MIN_AMOUNT.toLocaleString()} • Max: ₦{MAX_AMOUNT.toLocaleString()}
//             </p>
//           </div>

//           {/* Quick Amount Buttons */}
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
//                 ₦{amt.toLocaleString()}
//               </button>
//             ))}
//           </div>

//           {/* Error message */}
//           {error && <p className="error-text">{error}</p>}

//           {/* Pay button */}
//           <button
//             className="fund-btn"
//             onClick={handlePay}
//             disabled={isPayDisabled}
//           >
//             {loading ? <span className="loader"></span> : "Pay with Opay"}
//           </button>

//           {/* Security badge */}
//           <div className="secure-badge">
//             🔒 Secured by Opay
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OpayFund;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/opay-fund.css";
import opayLogo from "../assets/opay.png";

const quickAmounts = [1000, 5000, 10000, 50000];
const MIN_AMOUNT = 100;
const MAX_AMOUNT = 500000;

const OpayFund = ({ userId }) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Opay Fund - RealSMS";
  }, []);

  const isPayDisabled =
    !amount || Number(amount) < MIN_AMOUNT || Number(amount) > MAX_AMOUNT || loading;

  const handlePay = async () => {
    setError("");

    if (!amount || Number(amount) < MIN_AMOUNT) {
      setError(`Minimum funding amount is ₦${MIN_AMOUNT}`);
      return;
    }

    if (Number(amount) > MAX_AMOUNT) {
      setError(`Maximum funding amount is ₦${MAX_AMOUNT}`);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/opay/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount),
          userId, // pass the logged-in user's ID
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Payment failed");

      // ✅ Redirect user to Opay cashier page
      window.location.href = data.paymentUrl;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="opay-page">
      <div className="opay-card">
        {/* Back button */}
        <button className="back-btn" onClick={() => navigate("/fund-wallet")}>
          ← Back
        </button>

        {/* Header */}
        <div className="opay-header">
          <img src={opayLogo} alt="Opay" />
          <h3>Fund Wallet</h3>
          <p>Pay securely with Opay</p>
        </div>

        {/* Body */}
        <div className="opay-body">
          <label>Amount</label>

          <div className="amount-input-wrapper">
            <div className={`amount-input ${error ? "error" : ""}`}>
              <span>₦</span>
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
              Min: ₦{MIN_AMOUNT.toLocaleString()} • Max: ₦{MAX_AMOUNT.toLocaleString()}
            </p>
          </div>

          {/* Quick Amount Buttons */}
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
                ₦{amt.toLocaleString()}
              </button>
            ))}
          </div>

          {error && <p className="error-text">{error}</p>}

          {/* Pay button */}
          <button
            className="fund-btn"
            onClick={handlePay}
            disabled={isPayDisabled}
          >
            {loading ? <span className="loader"></span> : "Pay with Opay"}
          </button>

          <div className="secure-badge">🔒 Secured by Opay</div>
        </div>
      </div>
    </div>
  );
};

export default OpayFund;

