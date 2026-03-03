// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import "../styles/order-history.css";

// const API_URL = process.env.REACT_APP_API_URL;
// const ORDERS_PER_PAGE = 10;

// const NumberHistory = ({ darkMode }) => {
//   const [orders, setOrders] = useState([]);
//   const [loadingId, setLoadingId] = useState(null);
//   const [loadingPage, setLoadingPage] = useState(true);

//   const [filter, setFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     document.title = "Number History - RealSMS";
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/smspool/orders`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });

//       if (res.data.success) {
//         setOrders(res.data.data);
//       }
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

//   const handleResend = async (orderid) => {
//     try {
//       setLoadingId(orderid);

//       const res = await axios.post(
//         `${API_URL}/api/smspool/resend`,
//         { orderid },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );

//       if (res.data.success) {
//         alert("OTP resent successfully! Check your number.");
//         fetchOrders();
//       } else {
//         alert(res.data.message || "Failed to resend OTP");
//       }
//     } catch (err) {
//       alert("Failed to resend OTP");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   const getServiceName = (service) => {
//     if (!service) return "N/A";
//     if (typeof service === "object" && service.name) return service.name;
//     if (typeof service === "string") return service;
//     return "N/A";
//   };

//   /* =============================
//      FILTERED ORDERS
//   ============================= */
//   const filteredOrders = useMemo(() => {
//     if (filter === "all") return orders;
//     return orders.filter((o) => o.status === filter);
//   }, [orders, filter]);

//   /* =============================
//      PAGINATION LOGIC
//   ============================= */
//   const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);

//   const paginatedOrders = filteredOrders.slice(
//     (currentPage - 1) * ORDERS_PER_PAGE,
//     currentPage * ORDERS_PER_PAGE
//   );

//   const changePage = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   /* =============================
//      DATE FORMATTER
//   ============================= */
//   const formatDate = (date) => {
//     if (!date) return "-";
//     return new Date(date).toLocaleString();
//   };

//   return (
//     <div className={`order-history-page ${darkMode ? "dark" : ""}`}>
//       <div className="order-history-card">
//         <h2 className="order-history-title">Number History</h2>

//         {/* FILTER */}
//         <div className="order-filter">
//           <select
//             value={filter}
//             onChange={(e) => {
//               setFilter(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="all">All</option>
//             <option value="waiting">Waiting</option>
//             <option value="received">Received</option>
//             <option value="refunded">Refunded</option>
//             <option value="cancelled">Cancelled</option>
//           </select>
//         </div>

//         {loadingPage ? (
//           <p>Loading history...</p>
//         ) : filteredOrders.length === 0 ? (
//           <p className="no-orders">No orders found.</p>
//         ) : (
//           <>
//             <div className="order-table-scroll">
//               <table className="order-history-table">
//                 <thead>
//                   <tr>
//                     <th>Date</th>
//                     <th>Number</th>
//                     <th>Order ID</th>
//                     <th>Service</th>
//                     <th>Country</th>
//                     <th>Amount</th>
//                     <th>OTP</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {paginatedOrders.map((order) => (
//                     <tr key={order._id}>
//                       <td data-label="Date">
//                         {formatDate(order.createdAt)}
//                       </td>

//                       <td data-label="Number">{order.number}</td>

//                       <td data-label="Order ID">{order.orderid}</td>

//                       <td data-label="Service">
//                         {getServiceName(order.service)}
//                       </td>

//                       <td data-label="Country">
//                         {order.country?.code}
//                       </td>

//                       <td data-label="Amount">
//                         ₦{order.priceCharged?.toLocaleString()}
//                       </td>

//                       <td data-label="OTP">
//                         {order.otp ? (
//                           <span className="otp-success">{order.otp}</span>
//                         ) : (
//                           <span className="otp-waiting">Waiting...</span>
//                         )}
//                       </td>

//                       <td data-label="Status">
//                         <span className={`status-badge ${order.status}`}>
//                           {order.status}
//                         </span>
//                       </td>

//                       <td data-label="Action">
//                         {order.status === "waiting" ? (
//                           <button
//                             className="refund-btn"
//                             disabled={loadingId === order.orderid}
//                             onClick={() => handleRefund(order.orderid)}
//                           >
//                             {loadingId === order.orderid
//                               ? "Processing..."
//                               : "Refund"}
//                           </button>
//                         ) : order.status === "received" ? (
//                           <button
//                             className="resend-btn"
//                             disabled={loadingId === order.orderid}
//                             onClick={() => handleResend(order.orderid)}
//                           >
//                             {loadingId === order.orderid
//                               ? "Sending..."
//                               : "Resend"}
//                           </button>
//                         ) : (
//                           "-"
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* PAGINATION CONTROLS */}
//             <div className="pagination">
//               <button onClick={() => changePage(currentPage - 1)}>
//                 Prev
//               </button>

//               <span>
//                 Page {currentPage} of {totalPages || 1}
//               </span>

//               <button onClick={() => changePage(currentPage + 1)}>
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NumberHistory;


import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "../styles/order-history.css";

const API_URL = process.env.REACT_APP_API_URL;
const ORDERS_PER_PAGE = 10;

const NumberHistory = ({ darkMode }) => {
  const [orders, setOrders] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);

  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = "Number History - RealSMS";
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/smspool/orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.data.success) {
        setOrders(res.data.data);
      }
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

  const handleResend = async (orderid) => {
    try {
      setLoadingId(orderid);

      const res = await axios.post(
        `${API_URL}/api/smspool/resend`,
        { orderid },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.data.success) {
        alert("OTP resent successfully! Check your number.");
        fetchOrders();
      } else {
        alert(res.data.message || "Failed to resend OTP");
      }
    } catch (err) {
      alert("Failed to resend OTP");
    } finally {
      setLoadingId(null);
    }
  };

  const getServiceName = (service) => {
    if (!service) return "N/A";
    if (typeof service === "object" && service.name) return service.name;
    if (typeof service === "string") return service;
    return "N/A";
  };

  // ================================
  // FILTERED ORDERS
  // ================================
  const filteredOrders = useMemo(() => {
    if (filter === "all") return orders;
    return orders.filter((o) => o.status?.toLowerCase() === filter.toLowerCase());
  }, [orders, filter]);

  // ================================
  // PAGINATION
  // ================================
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // ================================
  // DATE FORMATTER
  // ================================
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString();
  };

  return (
    <div className={`order-history-page ${darkMode ? "dark" : ""}`}>
      <div className="order-history-card">
        <h2 className="order-history-title">Number History</h2>

        {/* FILTER */}
        <div className="order-filter">
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All</option>
            <option value="waiting">Waiting</option>
            <option value="received">Received</option>
            <option value="refunded">Refunded</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {loadingPage ? (
          <div className="loading-spinner">
            <div className={`spinner ${darkMode ? "dark" : ""}`}></div>
            <p>Loading history...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          <>
            <div className="order-table-scroll">
              <table className="order-history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Number</th>
                    <th>Order ID</th>
                    <th>Service</th>
                    <th>Country</th>
                    <th>Amount</th>
                    <th>OTP</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedOrders.map((order) => (
                    <tr key={order._id}>
                      <td data-label="Date">{formatDate(order.createdAt)}</td>
                      <td data-label="Number">{order.number}</td>
                      <td data-label="Order ID">{order.orderid}</td>
                      <td data-label="Service">{getServiceName(order.service)}</td>
                      <td data-label="Country">{order.country?.code}</td>
                      <td data-label="Amount">₦{order.priceCharged?.toLocaleString()}</td>
                      <td data-label="OTP">
                        {order.otp ? (
                          <span className="otp-success">{order.otp}</span>
                        ) : (
                          <span className="otp-waiting">Waiting...</span>
                        )}
                      </td>
                      <td data-label="Status">
                        <span className={`status-badge ${order.status}`}>
                          {order.status}
                        </span>
                      </td>
                      <td data-label="Action">
                        {order.status === "waiting" ? (
                          <button
                            className="refund-btn"
                            disabled={loadingId === order.orderid}
                            onClick={() => handleRefund(order.orderid)}
                          >
                            {loadingId === order.orderid
                              ? "Processing..."
                              : "Refund"}
                          </button>
                        ) : order.status === "received" ? (
                          <button
                            className="resend-btn"
                            disabled={loadingId === order.orderid}
                            onClick={() => handleResend(order.orderid)}
                          >
                            {loadingId === order.orderid
                              ? "Sending..."
                              : "Resend"}
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="pagination">
                <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
                  Prev
                </button>
                <span>
                  Page {currentPage} of {totalPages || 1}
                </span>
                <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NumberHistory;
