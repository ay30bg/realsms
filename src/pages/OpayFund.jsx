// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/opay-fund.css";
// import paystackLogo from "../assets/paystack.png";

// const quickAmounts = [1000, 5000, 10000, 50000];
// const MIN_AMOUNT = 100;
// const MAX_AMOUNT = 500000;

// const OpayFund = () => {
//   const navigate = useNavigate();
//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     document.title = "Fund Wallet with Paystack - RealSMS";
//   }, []);

//   const isPayDisabled =
//     !amount || Number(amount) < MIN_AMOUNT || Number(amount) > MAX_AMOUNT || loading;

//   const handlePay = async () => {
//     setError("");

//     if (!amount || Number(amount) < MIN_AMOUNT) {
//       setError(`Minimum funding amount is ₦${MIN_AMOUNT}`);
//       return;
//     }

//     if (Number(amount) > MAX_AMOUNT) {
//       setError(`Maximum funding amount is ₦${MAX_AMOUNT}`);
//       return;
//     }

//     const token = localStorage.getItem("token"); // ✅ must have JWT stored after login
//     if (!token) {
//       setError("You must be logged in to fund your wallet.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch(`${process.env.REACT_APP_API_URL}/api/opay/init`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // ✅ send JWT here
//         },
//         body: JSON.stringify({ amount: Number(amount) }), // no userId needed
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Payment failed");

//       // Redirect to Opay cashier page
//       window.location.href = data.paymentUrl;
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="opay-page">
//       <div className="opay-card">
//         <button className="back-btn" onClick={() => navigate("/fund-wallet")}>
//           ← Back
//         </button>

//         <div className="opay-header">
//           <img src={paystackLogo} alt="Opay" />
//           <h3>Fund Wallet</h3>
//           <p>Pay securely with Opay</p>
//         </div>

//         <div className="opay-body">
//           <label>Amount</label>
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

//           {error && <p className="error-text">{error}</p>}

//           <button className="fund-btn" onClick={handlePay} disabled={isPayDisabled}>
//             {loading ? <span className="loader"></span> : "Pay with Opay"}
//           </button>

//           <div className="secure-badge">🔒 Secured by Opay</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OpayFund;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/paystack-fund.css";
import paystackLogo from "../assets/paystack.png"; // Paystack logo

const quickAmounts = [1000, 5000, 10000, 50000];
const MIN_AMOUNT = 100;
const MAX_AMOUNT = 500000;

const PaystackFund = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Fund Wallet with Paystack - RealSMS";
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

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to fund your wallet.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/paystack/init`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Payment initialization failed");

      // Redirect user to Paystack payment page
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
        <button className="back-btn" onClick={() => navigate("/fund-wallet")}>
          ← Back
        </button>

        <div className="paystack-header">
          <img src={paystackLogo} alt="Paystack" />
          <h3>Fund Wallet</h3>
          <p>Pay securely with Paystack</p>
        </div>

        <div className="paystack-body">
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

          <button className="fund-btn" onClick={handlePay} disabled={isPayDisabled}>
            {loading ? <span className="loader"></span> : "Pay with Paystack"}
          </button>

          <div className="secure-badge">🔒 Secured by Paystack</div>
        </div>
      </div>
    </div>
  );
};

export default PaystackFund;



