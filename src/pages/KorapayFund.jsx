// // // import React, { useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import "../styles/fundwallet.css";
// // // import korapayLogo from "../assets/korapay.png";

// // // const QUICK_AMOUNTS = [200, 500, 1000, 5000, 10000, 50000];
// // // const MIN_AMOUNT = 200;
// // // const MAX_AMOUNT = 500000;

// // // const KorapayFund = () => {
// // //   const navigate = useNavigate();
// // //   const [amount, setAmount] = useState("");
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState("");

// // //   const isPayDisabled =
// // //     loading || !amount || Number(amount) < MIN_AMOUNT || Number(amount) > MAX_AMOUNT;

// // //   const handlePay = async () => {
// // //     setError("");
// // //     const numericAmount = Number(amount);

// // //     if (numericAmount < MIN_AMOUNT) {
// // //       setError(`Minimum amount is ₦${MIN_AMOUNT.toLocaleString()}`);
// // //       return;
// // //     }

// // //     if (numericAmount > MAX_AMOUNT) {
// // //       setError(`Maximum amount is ₦${MAX_AMOUNT.toLocaleString()}`);
// // //       return;
// // //     }

// // //     setLoading(true);

// // //     try {
// // //       const token = localStorage.getItem("token");

// // //       const response = await fetch(
// // //         `${process.env.REACT_APP_API_URL}/api/korapay/init`,
// // //         {
// // //           method: "POST",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             Authorization: token ? `Bearer ${token}` : "",
// // //           },
// // //           body: JSON.stringify({ amount: numericAmount }),
// // //         }
// // //       );

// // //       const data = await response.json();
// // //       if (!response.ok) throw new Error(data.message);

// // //       // ✅ Redirect to Korapay hosted checkout
// // //       window.location.href = data.checkout_url;

// // //     } catch (err) {
// // //       setError(err.message);
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="fund-wallet-page">
// // //       <div className="fund-wallet-card">
// // //         <button className="back-btn" onClick={() => navigate(-1)}>
// // //           ← Back
// // //         </button>

// // //         <div className="fund-header">
// // //           <img src={korapayLogo} alt="Korapay" className="fund-logo" />
// // //           <h3>Fund Wallet</h3>
// // //           <p>Secure payment via Korapay</p>
// // //         </div>

// // //         <div className="fund-body">
// // //           <label>Amount</label>
// // //           <div className={`amount-input ${error ? "error" : ""}`}>
// // //             <span>₦</span>
// // //             <input
// // //               type="number"
// // //               min={MIN_AMOUNT}
// // //               max={MAX_AMOUNT}
// // //               value={amount}
// // //               onChange={(e) => {
// // //                 const val = e.target.value.replace(/\D/g, "");
// // //                 setAmount(val);
// // //                 setError("");
// // //               }}
// // //               placeholder="0"
// // //             />
// // //           </div>

// // //           <p className="min-max-text">
// // //             Min: ₦{MIN_AMOUNT.toLocaleString()} • Max: ₦{MAX_AMOUNT.toLocaleString()}
// // //           </p>

// // //           <div className="quick-amounts">
// // //             {QUICK_AMOUNTS.map((amt) => (
// // //               <button
// // //                 key={amt}
// // //                 type="button"
// // //                 className={Number(amount) === amt ? "active" : ""}
// // //                 onClick={() => setAmount(String(amt))}
// // //                 disabled={loading}
// // //               >
// // //                 ₦{amt.toLocaleString()}
// // //               </button>
// // //             ))}
// // //           </div>

// // //           {error && <p className="error-text">{error}</p>}

// // //           <button
// // //             className={`fund-btn ${isPayDisabled ? "disabled" : ""}`}
// // //             onClick={handlePay}
// // //             disabled={isPayDisabled}
// // //           >
// // //             {loading ? "Processing..." : "Pay with Korapay"}
// // //           </button>

// // //           <div className="secure-badge">🔒 Secured by Korapay</div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default KorapayFund;


// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "../styles/fundwallet.css";
// // import korapayLogo from "../assets/korapay.png";

// // const QUICK_AMOUNTS = [200, 500, 1000, 5000, 10000, 50000];
// // const MIN_AMOUNT = 200;
// // const MAX_AMOUNT = 500000;

// // const KorapayFund = () => {
// //   const navigate = useNavigate();
// //   const [amount, setAmount] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const isPayDisabled =
// //     loading || !amount || Number(amount) < MIN_AMOUNT || Number(amount) > MAX_AMOUNT;

// //   const handlePay = async () => {
// //     setError("");
// //     const numericAmount = Number(amount);

// //     if (numericAmount < MIN_AMOUNT) {
// //       setError(`Minimum amount is ₦${MIN_AMOUNT.toLocaleString()}`);
// //       return;
// //     }

// //     if (numericAmount > MAX_AMOUNT) {
// //       setError(`Maximum amount is ₦${MAX_AMOUNT.toLocaleString()}`);
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const token = localStorage.getItem("token");

// //       // 1️⃣ Initialize payment via backend
// //       const response = await fetch(
// //         `${process.env.REACT_APP_API_URL}/api/korapay/init`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: token ? `Bearer ${token}` : "",
// //           },
// //           body: JSON.stringify({ amount: numericAmount }),
// //         }
// //       );

// //       const data = await response.json();
// //       if (!response.ok) throw new Error(data.message || "Payment initialization failed");

// //       // 2️⃣ Redirect to Korapay hosted checkout
// //       // Korapay internally handles amount in kobo, user sees amount in Naira
// //       window.location.href = data.checkout_url;

// //     } catch (err) {
// //       console.error("Korapay Init Error:", err);
// //       setError(err.message);
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="fund-wallet-page">
// //       <div className="fund-wallet-card">
// //         <button className="back-btn" onClick={() => navigate(-1)}>
// //           ← Back
// //         </button>

// //         <div className="fund-header">
// //           <img src={korapayLogo} alt="Korapay" className="fund-logo" />
// //           <h3>Fund Wallet</h3>
// //           <p>Secure payment via Korapay</p>
// //         </div>

// //         <div className="fund-body">
// //           <label>Amount</label>
// //           <div className={`amount-input ${error ? "error" : ""}`}>
// //             <span>₦</span>
// //             <input
// //               type="number"
// //               min={MIN_AMOUNT}
// //               max={MAX_AMOUNT}
// //               value={amount}
// //               onChange={(e) => {
// //                 const val = e.target.value.replace(/\D/g, "");
// //                 setAmount(val);
// //                 setError("");
// //               }}
// //               placeholder="0"
// //             />
// //           </div>

// //           <p className="min-max-text">
// //             Min: ₦{MIN_AMOUNT.toLocaleString()} • Max: ₦{MAX_AMOUNT.toLocaleString()}
// //           </p>

// //           <div className="quick-amounts">
// //             {QUICK_AMOUNTS.map((amt) => (
// //               <button
// //                 key={amt}
// //                 type="button"
// //                 className={Number(amount) === amt ? "active" : ""}
// //                 onClick={() => setAmount(String(amt))}
// //                 disabled={loading}
// //               >
// //                 ₦{amt.toLocaleString()}
// //               </button>
// //             ))}
// //           </div>

// //           {error && <p className="error-text">{error}</p>}

// //           <button
// //             className={`fund-btn ${isPayDisabled ? "disabled" : ""}`}
// //             onClick={handlePay}
// //             disabled={isPayDisabled}
// //           >
// //             {loading ? "Processing..." : "Pay with Korapay"}
// //           </button>

// //           <div className="secure-badge">🔒 Secured by Korapay</div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default KorapayFund;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/fundwallet.css";
// import korapayLogo from "../assets/korapay.png";

// const QUICK_AMOUNTS = [200, 500, 1000, 5000, 10000, 50000];
// const MIN_AMOUNT = 200;
// const MAX_AMOUNT = 500000;

// const KorapayFund = () => {
//   const navigate = useNavigate();
//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const numericAmount = Number(amount);

//   const isValidAmount =
//     numericAmount &&
//     numericAmount >= MIN_AMOUNT &&
//     numericAmount <= MAX_AMOUNT;

//   const isPayDisabled = loading || !isValidAmount;

//   const handlePay = async () => {
//     if (loading) return;

//     setError("");

//     if (!isValidAmount) {
//       if (!numericAmount || numericAmount < MIN_AMOUNT) {
//         setError(`Minimum amount is ₦${MIN_AMOUNT.toLocaleString()}`);
//       } else if (numericAmount > MAX_AMOUNT) {
//         setError(`Maximum amount is ₦${MAX_AMOUNT.toLocaleString()}`);
//       }
//       return;
//     }

//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/api/korapay/init`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ amount: numericAmount }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Payment initialization failed");
//       }

//       if (!data.checkout_url) {
//         throw new Error("Invalid payment response");
//       }

//       // Redirect to Korapay hosted checkout
//       window.location.assign(data.checkout_url);
//     } catch (err) {
//       console.error("Korapay Init Error:", err);
//       setError(err.message || "Something went wrong. Try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fund-wallet-page">
//       <div className="fund-wallet-card">
//         <button
//           className="back-btn"
//           onClick={() => !loading && navigate(-1)}
//         >
//           ← Back
//         </button>

//         <div className="fund-header">
//           <img src={korapayLogo} alt="Korapay" className="fund-logo" />
//           <h3>Fund Wallet</h3>
//           <p>Secure payment via Korapay</p>
//         </div>

//         <div className="fund-body">
//           <label>Amount</label>

//           <div className={`amount-input ${error ? "error" : ""}`}>
//             <span>₦</span>
//             <input
//               type="number"
//               inputMode="numeric"
//               min={MIN_AMOUNT}
//               max={MAX_AMOUNT}
//               value={amount}
//               onChange={(e) => {
//                 const val = e.target.value.replace(/\D/g, "");
//                 setAmount(val);
//                 setError("");
//               }}
//               placeholder="0"
//               disabled={loading}
//             />
//           </div>

//           <p className="min-max-text">
//             Min: ₦{MIN_AMOUNT.toLocaleString()} • Max: ₦
//             {MAX_AMOUNT.toLocaleString()}
//           </p>

//           <div className="quick-amounts">
//             {QUICK_AMOUNTS.map((amt) => (
//               <button
//                 key={amt}
//                 type="button"
//                 className={numericAmount === amt ? "active" : ""}
//                 onClick={() => setAmount(String(amt))}
//                 disabled={loading}
//               >
//                 ₦{amt.toLocaleString()}
//               </button>
//             ))}
//           </div>

//           {error && <p className="error-text">{error}</p>}

//           <button
//             className={`fund-btn ${isPayDisabled ? "disabled" : ""}`}
//             onClick={handlePay}
//             disabled={isPayDisabled}
//           >
//             {loading ? "Redirecting..." : "Pay with Korapay"}
//           </button>

//           <div className="secure-badge">
//             🔒 Secured by Korapay
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KorapayFund;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/fundwallet.css";
import korapayLogo from "../assets/korapay.png";

const QUICK_AMOUNTS = [200, 500, 1000, 5000, 10000, 50000];
const MIN_AMOUNT = 200;
const MAX_AMOUNT = 500000;

const KorapayFund = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const numericAmount = Number(amount);

  const isValidAmount =
    numericAmount && numericAmount >= MIN_AMOUNT && numericAmount <= MAX_AMOUNT;

  const isPayDisabled = loading || !isValidAmount;

  const handlePay = async () => {
    if (loading) return;

    setError("");

    // Validate amount first
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

      // POST to backend
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
      console.log("Korapay Init Response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || data.detail || "Payment initialization failed"
        );
      }

      if (!data.checkout_url) {
        throw new Error("Invalid payment response from backend");
      }

      // Redirect user to Korapay checkout
      window.location.assign(data.checkout_url);
    } catch (err) {
      console.error("Korapay Init Error:", err);
      setError(err.message || "Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fund-wallet-page">
      <div className="fund-wallet-card">
        {/* Back button */}
        <button className="back-btn" onClick={() => !loading && navigate(-1)}>
          ← Back
        </button>

        {/* Header */}
        <div className="fund-header">
          <img src={korapayLogo} alt="Korapay" className="fund-logo" />
          <h3>Fund Wallet</h3>
          <p>Secure payment via Korapay</p>
        </div>

        {/* Body */}
        <div className="fund-body">
          <label>Amount</label>
          <div className={`amount-input ${error ? "error" : ""}`}>
            <span>₦</span>
            <input
              type="number"
              inputMode="numeric"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              value={amount}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setAmount(val);
                setError("");
              }}
              placeholder="0"
              disabled={loading}
            />
          </div>

          <p className="min-max-text">
            Min: ₦{MIN_AMOUNT.toLocaleString()} • Max: ₦{MAX_AMOUNT.toLocaleString()}
          </p>

          {/* Quick amounts */}
          <div className="quick-amounts">
            {QUICK_AMOUNTS.map((amt) => (
              <button
                key={amt}
                type="button"
                className={numericAmount === amt ? "active" : ""}
                onClick={() => setAmount(String(amt))}
                disabled={loading}
              >
                ₦{amt.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Error message */}
          {error && <p className="error-text">{error}</p>}

          {/* Pay button */}
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
