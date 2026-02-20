// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/order-history.css";

// const API_URL = process.env.REACT_APP_API_URL;

// const NumberHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const [loadingId, setLoadingId] = useState(null);
//   const [loadingPage, setLoadingPage] = useState(true);

//   useEffect(() => {
//     document.title = "Number History - RealSMS";
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/smspool/orders`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       if (res.data.success) setOrders(res.data.data);
//     } catch (err) {
//       console.error("Fetch Orders Error:", err.response?.data);
//     } finally {
//       setLoadingPage(false);
//     }
//   };

//   const handleRefund = async (orderid) => {
//     try {
//       setLoadingId(orderid);
//       const res = await axios.post(
//         `${API_URL}/api/smspool/cancel`,
//         { orderid },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );

//       if (res.data.success) {
//         alert(`Refunded ₦${res.data.refundedAmount}`);
//         fetchOrders();
//       } else {
//         alert(res.data.message);
//       }
//     } catch (err) {
//       alert("Failed to refund order");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   return (
//     <div className="order-history-page">
//       <div className="order-history-card">
//         <h2 className="order-history-title">Number History</h2>

//         {loadingPage ? (
//           <p className="no-orders">Loading...</p>
//         ) : orders.length === 0 ? (
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
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {orders.map((order) => (
//                   <tr key={order._id}>
//                     <td data-label="Number">{order.number}</td>
//                     <td data-label="Order ID">{order.orderid}</td>
//                     <td data-label="OTP">
//                       {order.otp ? (
//                         <span className="otp-success">{order.otp}</span>
//                       ) : (
//                         <span className="otp-waiting">Waiting...</span>
//                       )}
//                     </td>
//                     <td data-label="Country">{order.country}</td>
//                     <td data-label="Status">{order.status}</td>
//                     <td data-label="Action">
//                       {order.status === "waiting" ? (
//                         <button
//                           className="refund-btn"
//                           disabled={loadingId === order.orderid}
//                           onClick={() => handleRefund(order.orderid)}
//                         >
//                           {loadingId === order.orderid
//                             ? "Refunding..."
//                             : "Refund"}
//                         </button>
//                       ) : order.status === "received" ? (
//                         <span className="status-success">Received</span>
//                       ) : (
//                         <span className="status-refunded">Refunded</span>
//                       )}
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

const NumberHistory = ({ darkMode }) => {
  const [orders, setOrders] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    document.title = "Number History - RealSMS";
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/smspool/orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.success) setOrders(res.data.data);
    } catch (err) {
      console.error("Fetch Orders Error:", err.response?.data);
    } finally {
      setLoadingPage(false);
    }
  };

  const handleRefund = async (orderid) => {
    try {
      setLoadingId(orderid);
      const res = await axios.post(
        `${API_URL}/api/smspool/cancel`,
        { orderid },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.data.success) {
        alert(`Refunded ₦${res.data.refundedAmount}`);
        fetchOrders();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Failed to refund order");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className={`order-history-page ${darkMode ? "dark" : ""}`}>
      <div className="order-history-card">
        <h2 className="order-history-title">Number History</h2>

        {loadingPage ? (
          <div className="loading-spinner">
            <div className={`spinner ${darkMode ? "dark" : ""}`}></div>
            <p>Loading history...</p>
          </div>
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
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td data-label="Number">{order.number}</td>
                    <td data-label="Order ID">{order.orderid}</td>
                    <td data-label="OTP">
                      {order.otp ? (
                        <span className="otp-success">{order.otp}</span>
                      ) : (
                        <span className="otp-waiting">Waiting...</span>
                      )}
                    </td>
                    <td data-label="Country">{order.country}</td>
                    <td data-label="Status">{order.status}</td>
                    <td data-label="Action">
                      {order.status === "waiting" ? (
                        <button
                          className="refund-btn"
                          disabled={loadingId === order.orderid}
                          onClick={() => handleRefund(order.orderid)}
                        >
                          {loadingId === order.orderid ? (
                            <span className="button-spinner"></span>
                          ) : (
                            "Refund"
                          )}
                        </button>
                      ) : order.status === "received" ? (
                        <span className="status-success">Received</span>
                      ) : (
                        <span className="status-refunded">Refunded</span>
                      )}
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
