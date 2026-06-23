import React, { useState } from "react";
import axios from "axios";
import { FiArrowRight } from "react-icons/fi";

import flutterwaveLogo from "../assets/flutterwave.png";
import korapayLogo from "../assets/korapay.png";

import "../styles/fundwallet.css";

const API_URL = process.env.REACT_APP_API_URL;

const quickAmounts = [1000, 5000, 10000, 50000];

const FundWallet = () => {
    const [amount, setAmount] = useState(5000);
    const [payment, setPayment] = useState("flutterwave");
    const [loading, setLoading] = useState(false);

const handlePayment = async () => {
    try {
        if (!amount || Number(amount) < 1000) {
            return alert("Minimum funding amount is ₦1,000");
        }

        setLoading(true);

        const token = localStorage.getItem("token");

        let endpoint = "";

        if (payment === "flutterwave") {
            endpoint = "/api/flutterwave/init";
        }

        if (payment === "korapay") {
            endpoint = "/api/korapay/init";
        }

        const response = await axios.post(
            `${API_URL}${endpoint}`,
            {
                amount: Number(amount)
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log("Payment Response:", response.data);

        // Match your current backend controllers
        let checkoutUrl = "";

        if (payment === "flutterwave") {
            checkoutUrl = response.data.paymentUrl;
        }

        if (payment === "korapay") {
            checkoutUrl = response.data.checkout_url;
        }

        if (!checkoutUrl) {
            throw new Error("Checkout URL missing");
        }

        window.location.href = checkoutUrl;

    } catch (err) {
        console.log(err);

        alert(
            err?.response?.data?.message ||
            "Payment initialization failed"
        );
    } finally {
        setLoading(false);
    }
};
   
    
    return (
        <div className="fund-page">

            <div className="fund-wallet-header">
                <h1>Fund Wallet</h1>

                <p>
                    Top up your wallet instantly using a payment method of your choice.
                </p>
            </div>

            <div className="fund-grid">
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
                                onChange={(e) =>
                                    setAmount(e.target.value)
                                }
                            />
                        </div>

                        <div className="quick-amounts">
                            {quickAmounts.map((amt) => (
                                <button
                                    key={amt}
                                    type="button"
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

                        {/* Flutterwave */}

                        <div
                            className={`payment-item ${
                                payment === "flutterwave"
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() =>
                                setPayment("flutterwave")
                            }
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
                                checked={
                                    payment === "flutterwave"
                                }
                                readOnly
                            />
                        </div>

                        {/* Korapay */}

                        <div
                            className={`payment-item ${
                                payment === "korapay"
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() =>
                                setPayment("korapay")
                            }
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
                                    ₦{Number(
                                        amount
                                    ).toLocaleString()}
                                </strong>
                            </div>

                            <div className="summary-row">
                                <span>
                                    Processing Fee
                                </span>

                                <strong>₦0</strong>
                            </div>

                            <hr />

                            <div className="summary-row total">

                                <span>
                                    You will receive
                                </span>

                                <h2>
                                    ₦{Number(
                                        amount
                                    ).toLocaleString()}
                                </h2>

                            </div>

                        </div>

                       <button
    className="payment-btn"
    onClick={handlePayment}
    disabled={loading}
>
    {loading
        ? "Redirecting..."
        : "Continue To Payment"}

    <FiArrowRight />
</button>

                    </div>

                </div>
            </div>

        </div>
    );
};

export default FundWallet;
