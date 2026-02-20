import React, { useState, useEffect } from "react";
import { mockOrders } from "../data/mockOrders";
import "../styles/order-history.css";

const NumberHistory = () => {
  const [numbers] = useState(mockOrders || []);

  // ✅ PAGE TITLE
  useEffect(() => {
    document.title = "Number History - RealSMS";
  }, []);

  const handleResendOTP = (orderId) => {
    console.log("Resend OTP for:", orderId);

    // 🔥 Replace this with your backend API call
    // axios.post("/api/resend-otp", { orderId })
  };

  return (
    <div className="order-history-page">
      <div className="order-history-card">
        <h2 className="order-history-title">Number History</h2>

        {numbers.length === 0 ? (
          <p className="no-orders">No numbers yet.</p>
        ) : (
          <div className="order-table-scroll">
            <table className="order-history-table">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Order ID</th>
                  <th>OTP</th>
                  <th>Country</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {numbers.map((item) => (
                  <tr key={item.id}>
                    <td>{item.number || "+1234567890"}</td>
                    <td>{item.orderId || item.id}</td>
                    <td className="otp-cell">
                      {item.otp || "Waiting..."}
                    </td>
                    <td>{item.country || "N/A"}</td>
                    <td>
                      <button
                        className="resend-btn"
                        onClick={() => handleResendOTP(item.orderId || item.id)}
                      >
                        Resend OTP
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberHistory;
