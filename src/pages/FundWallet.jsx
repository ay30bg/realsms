// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/fundwallet.css";

// import usdtLogo from "../assets/usdt-logo.png";
// import paystackLogo from "../assets/paystack.png";
// import flutterwaveLogo from "../assets/flutterwave.png";
// import korapayLogo from "../assets/korapay.png"; // ✅ added

// const FundWallet = () => {
//   const navigate = useNavigate();

//   // 🔥 Toggle payment methods here
//   const usdtEnabled = true;
//   const paystackEnabled = false;
//   const flutterwaveEnabled = true;
//   const korapayEnabled = true; 

//   useEffect(() => {
//     document.title = "Fund Wallet - RealSMS";
//   }, []);

//   return (
//     <div className="fund-wallet-page">
//       <div className="fund-wallet-card">
//         <h2 className="fund-title">Fund Wallet</h2>

//         {/* USDT */}
//         <div
//           className={`payment-option ${usdtEnabled ? "clickable" : "disabled"}`}
//           onClick={() => usdtEnabled && navigate("/fund-wallet/usdt")}
//         >
//           <div className="payment-left">
//             <img src={usdtLogo} alt="USDT" className="payment-icon" />
//             <div className="payment-text">
//               <h4>USDT</h4>
//               <span>
//                 {usdtEnabled ? "TRC 20 Network" : "Temporarily Unavailable"}
//               </span>
//             </div>
//           </div>
//           <span className="payment-arrow">{usdtEnabled ? "→" : "—"}</span>
//         </div>

//         {/* Flutterwave */}
//         <div
//           className={`payment-option ${flutterwaveEnabled ? "clickable" : "disabled"}`}
//           onClick={() =>
//             flutterwaveEnabled && navigate("/fund-wallet/flutterwave")
//           }
//         >
//           <div className="payment-left">
//             <img
//               src={flutterwaveLogo}
//               alt="Flutterwave"
//               className="payment-icon"
//             />
//             <div className="payment-text">
//               <h4>Pay with Flutterwave</h4>
//               <span>
//                 {flutterwaveEnabled
//                   ? "Card · Bank Transfer · USSD"
//                   : "Temporarily Unavailable"}
//               </span>
//             </div>
//           </div>
//           <span className="payment-arrow">
//             {flutterwaveEnabled ? "→" : "—"}
//           </span>
//         </div>

//         {/* Paystack */}
//         <div
//           className={`payment-option ${paystackEnabled ? "clickable" : "disabled"}`}
//           onClick={() =>
//             paystackEnabled && navigate("/fund-wallet/paystack")
//           }
//         >
//           <div className="payment-left">
//             <img src={paystackLogo} alt="Paystack" className="payment-icon" />
//             <div className="payment-text">
//               <h4>Pay with Paystack</h4>
//               <span>
//                 {paystackEnabled
//                   ? "Wallet · Bank Transfer"
//                   : "Temporarily Unavailable"}
//               </span>
//             </div>
//           </div>
//           <span className="payment-arrow">
//             {paystackEnabled ? "→" : "—"}
//           </span>
//         </div>

//         {/* Korapay ✅ NEW */}
//         <div
//           className={`payment-option ${korapayEnabled ? "clickable" : "disabled"}`}
//           onClick={() =>
//             korapayEnabled && navigate("/fund-wallet/korapay")
//           }
//         >
//           <div className="payment-left">
//             <img
//               src={korapayLogo}
//               alt="Korapay"
//               className="payment-icon"
//             />
//             <div className="payment-text">
//               <h4>Pay with Korapay</h4>
//               <span>
//                 {korapayEnabled
//                   ? "Card · Bank Transfer · Virtual Accounts"
//                   : "Temporarily Unavailable"}
//               </span>
//             </div>
//           </div>
//           <span className="payment-arrow">
//             {korapayEnabled ? "→" : "—"}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FundWallet;

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/fundwallet.css";

// import usdtLogo from "../assets/usdt-logo.png";
// import paystackLogo from "../assets/paystack.png";
// import flutterwaveLogo from "../assets/flutterwave.png";
// import korapayLogo from "../assets/korapay.png"; // ✅ added

// const FundWallet = () => {
//   const navigate = useNavigate();

//   // 🔥 Toggle payment methods here
//   const usdtEnabled = true;
//   const paystackEnabled = false;
//   const flutterwaveEnabled = true;
//   const korapayEnabled = true; 

//   useEffect(() => {
//     document.title = "Fund Wallet - RealSMS";
//   }, []);

//   return (
//     <div className="fund-wallet-page">
//       <div className="fund-wallet-card">
//         <h2 className="fund-title">Fund Wallet</h2>

//         {/* USDT */}
//         <div
//           className={`payment-option ${usdtEnabled ? "clickable" : "disabled"}`}
//           onClick={() => usdtEnabled && navigate("/fund-wallet/usdt")}
//         >
//           <div className="payment-left">
//             <img src={usdtLogo} alt="USDT" className="payment-icon" />
//             <div className="payment-text">
//               <h4>USDT</h4>
//               <span>
//                 {usdtEnabled ? "TRC 20 Network" : "Temporarily Unavailable"}
//               </span>
//             </div>
//           </div>
//           <span className="payment-arrow">{usdtEnabled ? "→" : "—"}</span>
//         </div>

//         {/* Flutterwave */}
//         <div
//           className={`payment-option ${flutterwaveEnabled ? "clickable" : "disabled"}`}
//           onClick={() =>
//             flutterwaveEnabled && navigate("/fund-wallet/flutterwave")
//           }
//         >
//           <div className="payment-left">
//             <img
//               src={flutterwaveLogo}
//               alt="Flutterwave"
//               className="payment-icon"
//             />
//             <div className="payment-text">
//               <h4>Pay with Flutterwave</h4>
//               <span>
//                 {flutterwaveEnabled
//                   ? "Card · Bank Transfer · USSD"
//                   : "Temporarily Unavailable"}
//               </span>
//             </div>
//           </div>
//           <span className="payment-arrow">
//             {flutterwaveEnabled ? "→" : "—"}
//           </span>
//         </div>

//         {/* Paystack */}
//         <div
//           className={`payment-option ${paystackEnabled ? "clickable" : "disabled"}`}
//           onClick={() =>
//             paystackEnabled && navigate("/fund-wallet/paystack")
//           }
//         >
//           <div className="payment-left">
//             <img src={paystackLogo} alt="Paystack" className="payment-icon" />
//             <div className="payment-text">
//               <h4>Pay with Paystack</h4>
//               <span>
//                 {paystackEnabled
//                   ? "Wallet · Bank Transfer"
//                   : "Temporarily Unavailable"}
//               </span>
//             </div>
//           </div>
//           <span className="payment-arrow">
//             {paystackEnabled ? "→" : "—"}
//           </span>
//         </div>

//         {/* Korapay ✅ NEW */}
//         <div
//           className={`payment-option ${korapayEnabled ? "clickable" : "disabled"}`}
//           onClick={() =>
//             korapayEnabled && navigate("/fund-wallet/korapay")
//           }
//         >
//           <div className="payment-left">
//             <img
//               src={korapayLogo}
//               alt="Korapay"
//               className="payment-icon"
//             />
//             <div className="payment-text">
//               <h4>Pay with Korapay</h4>
//               <span>
//                 {korapayEnabled
//                   ? "Card · Bank Transfer · Virtual Accounts"
//                   : "Temporarily Unavailable"}
//               </span>
//             </div>
//           </div>
//           <span className="payment-arrow">
//             {korapayEnabled ? "→" : "—"}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FundWallet;

import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

import flutterwaveLogo from "../assets/flutterwave.png";
import korapayLogo from "../assets/korapay.png";

import "../styles/fundwallet.css";

const quickAmounts = [1000, 5000, 10000, 50000];

const FundWallet = () => {
    const [amount, setAmount] = useState(5000);
    const [payment, setPayment] = useState("flutterwave");

    return (
        <div className="fund-page">

            <div className="fund-wallet-header">
                <h1>Fund Wallet</h1>
                <p>
                    Top up your wallet instantly using a payment method of your choice.
                </p>
            </div>

            <div className="fund-grid">

                {/* LEFT SIDE */}

                <div>

                    <div className="fund-card">

                        <h3 className="section-heading">
                            Instant Top-Up
                        </h3>

                        <div className="step-title">
                            <span>1</span>
                            Enter Amount
                        </div>

                        <div className="amount-box">
                            <span>₦</span>

                            <input
                                type="number"
                                value={amount}
                                placeholder="Enter amount"
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>

                        <div className="quick-amounts">
                            {quickAmounts.map((amt) => (
                                <button
                                    key={amt}
                                    className={
                                        Number(amount) === amt
                                            ? "amount-btn active"
                                            : "amount-btn"
                                    }
                                    onClick={() => setAmount(amt)}
                                >
                                    ₦{amt.toLocaleString()}
                                </button>
                            ))}
                        </div>

                        <p className="limit">
                            Min: ₦1,000 • Max: ₦500,000
                        </p>

                        <hr />

                        <div className="step-title">
                            <span>2</span>
                            Select Payment Method
                        </div>

                        <div
                            className={`payment-item ${payment === "flutterwave" ? "selected" : ""
                                }`}
                            onClick={() => setPayment("flutterwave")}
                        >
                            <div className="payment-left">

                                <img
                                    src={flutterwaveLogo}
                                    alt="Flutterwave"
                                    className="payment-logo"
                                />

                                <div>
                                    <h4>Flutterwave</h4>
                                    <small>
                                        Cards • Bank Transfer • USSD
                                    </small>
                                </div>

                            </div>

                            <input
                                type="radio"
                                checked={payment === "flutterwave"}
                                readOnly
                            />
                        </div>


                        <div
                            className={`payment-item ${payment === "korapay" ? "selected" : ""
                                }`}
                            onClick={() => setPayment("korapay")}
                        >
                            <div className="payment-left">

                                <img
                                    src={korapayLogo}
                                    alt="Korapay"
                                    className="payment-logo"
                                />

                                <div>
                                    <h4>Korapay</h4>
                                    <small>
                                        Cards • Bank Transfer
                                    </small>
                                </div>

                            </div>

                            <input
                                type="radio"
                                checked={payment === "korapay"}
                                readOnly
                            />
                        </div>

                        <hr />

                        <div className="step-title">
                            <span>3</span>
                            Top-Up Summary
                        </div>

                        <div className="summary-box">

                            <div className="summary-row">
                                <span>Amount</span>
                                <strong>
                                    ₦{Number(amount).toLocaleString()}
                                </strong>
                            </div>

                            <div className="summary-row">
                                <span>Processing Fee</span>
                                <strong>₦0</strong>
                            </div>

                            <hr />

                            <div className="summary-row total">
                                <span>You will receive</span>

                                <h2>
                                    ₦{Number(amount).toLocaleString()}
                                </h2>
                            </div>

                        </div>

                        <button className="payment-btn">
                            Continue To Payment
                            <FiArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FundWallet;
