// import React, { useState, useEffect } from "react";
// import { mockOrders } from "../data/mockOrders";
// import "../styles/order-history.css";

// const NumberHistory = () => {
//   const [numbers] = useState(mockOrders || []);

//   // ✅ PAGE TITLE
//   useEffect(() => {
//     document.title = "Number History - RealSMS";
//   }, []);

//   const handleResendOTP = (orderId) => {
//     console.log("Resend OTP for:", orderId);

//     // 🔥 Replace this with your backend API call
//     // axios.post("/api/resend-otp", { orderId })
//   };

//   return (
//     <div className="order-history-page">
//       <div className="order-history-card">
//         <h2 className="order-history-title">Number History</h2>

//         {numbers.length === 0 ? (
//           <p className="no-orders">No numbers yet.</p>
//         ) : (
//           <div className="order-table-scroll">
//             <table className="order-history-table">
//               <thead>
//                 <tr>
//                   <th>Number</th>
//                   <th>Order ID</th>
//                   <th>OTP</th>
//                   <th>Country</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {numbers.map((item) => (
//                   <tr key={item.id}>
//                     <td>{item.number || "+1234567890"}</td>
//                     <td>{item.orderId || item.id}</td>
//                     <td className="otp-cell">
//                       {item.otp || "Waiting..."}
//                     </td>
//                     <td>{item.country || "N/A"}</td>
//                     <td>
//                       <button
//                         className="resend-btn"
//                         onClick={() => handleResendOTP(item.orderId || item.id)}
//                       >
//                         Resend OTP
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NumberHistory;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/order-history.css";

const API_URL = process.env.REACT_APP_API_URL;

const NumberHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    document.title = "Number History - RealSMS";
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err.response?.data);
    } finally {
      setLoadingPage(false);
    }
  };

  const handleCheckOTP = async (orderid) => {
    try {
      setLoadingId(orderid);

      const res = await axios.post(
        `${API_URL}/api/otp`,
        { orderid },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        fetchOrders(); // refresh table
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Failed to check OTP");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="order-history-page">
      <div className="order-history-card">
        <h2 className="order-history-title">Number History</h2>

        {loadingPage ? (
          <p className="no-orders">Loading...</p>
        ) : orders.length === 0 ? (
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
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.number}</td>
                    <td>{order.orderid}</td>

                    <td>
                      {order.otp ? (
                        <span className="otp-success">
                          {order.otp}
                        </span>
                      ) : (
                        <span className="otp-waiting">
                          Waiting...
                        </span>
                      )}
                    </td>

                    <td>{order.country}</td>

                    <td>
                      <button
                        className="resend-btn"
                        disabled={
                          order.otp || loadingId === order.orderid
                        }
                        onClick={() =>
                          handleCheckOTP(order.orderid)
                        }
                      >
                        {loadingId === order.orderid
                          ? "Checking..."
                          : order.otp
                          ? "Received"
                          : "Check OTP"}
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
