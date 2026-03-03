// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/order-history.css";

// const API_URL = process.env.REACT_APP_API_URL;

// const NumberHistory = ({ darkMode }) => {
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
//       console.error(err);
//       alert("Failed to resend OTP");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   // ✅ Safely get service name (supports old & new orders)
//   const getServiceName = (service) => {
//     if (!service) return "N/A";

//     // New structure { id, name }
//     if (typeof service === "object" && service.name) {
//       return service.name;
//     }

//     // Old structure (string ID)
//     if (typeof service === "string") {
//       return service; // fallback until migrated
//     }

//     return "N/A";
//   };

//   return (
//     <div className={`order-history-page ${darkMode ? "dark" : ""}`}>
//       <div className="order-history-card">
//         <h2 className="order-history-title">Number History</h2>

//         {loadingPage ? (
//           <div className="loading-spinner">
//             <div className={`spinner ${darkMode ? "dark" : ""}`}></div>
//             <p>Loading history...</p>
//           </div>
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
//                   <th>Service</th>
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

//                     <td data-label="Country">
//                       {order.country?.code || order.country}
//                     </td>

//                     {/* ✅ SERVICE NAME DISPLAY */}
//                     <td data-label="Service">
//                       {getServiceName(order.service)}
//                     </td>

//                     <td data-label="Action">
//                       {order.status === "waiting" ? (
//                         <button
//                           className="refund-btn"
//                           disabled={loadingId === order.orderid}
//                           onClick={() => handleRefund(order.orderid)}
//                         >
//                           {loadingId === order.orderid ? (
//                             <span className="button-spinner"></span>
//                           ) : (
//                             "Refund"
//                           )}
//                         </button>
//                       ) : order.status === "received" ? (
//                         <button
//                           className="resend-btn"
//                           disabled={loadingId === order.orderid}
//                           onClick={() => handleResend(order.orderid)}
//                         >
//                           {loadingId === order.orderid
//                             ? "Sending..."
//                             : "Resend OTP"}
//                         </button>
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


import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "../styles/order-history.css";

const API_URL = process.env.REACT_APP_API_URL;

const NumberHistory = ({ darkMode }) => {
  const [orders, setOrders] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ORDERS_PER_PAGE = 8;

  useEffect(() => {
    document.title = "Number History - RealSMS";
    fetchOrders();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // reset page when filter/search changes
  }, [filter, search]);

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
    } catch {
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
        alert("OTP resent successfully!");
        fetchOrders();
      } else {
        alert(res.data.message || "Failed to resend OTP");
      }
    } catch {
      alert("Failed to resend OTP");
    } finally {
      setLoadingId(null);
    }
  };

  // ✅ Safe service name
  const getServiceName = (service) => {
    if (!service) return "N/A";
    if (typeof service === "object" && service.name) return service.name;
    if (typeof service === "string") return service;
    return "N/A";
  };

  // ✅ Safe date formatting
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString();
  };

  // ✅ FILTER + SEARCH (FIXED waiting issue)
  const filteredOrders = useMemo(() => {
    let data = [...orders];

    // Status filter (case-safe)
    if (filter !== "all") {
      data = data.filter(
        (o) => o.status?.toLowerCase().trim() === filter.toLowerCase()
      );
    }

    // Search filter
    if (search.trim()) {
      data = data.filter(
        (o) =>
          o.number?.includes(search) ||
          o.orderid?.includes(search)
      );
    }

    return data;
  }, [orders, filter, search]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  return (
    <div className={`order-history-page ${darkMode ? "dark" : ""}`}>
      <div className="order-history-card">
        <h2 className="order-history-title">Number History</h2>

        {/* FILTERS */}
        <div className="history-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="waiting">Waiting</option>
            <option value="received">Received</option>
            <option value="refunded">Refunded</option>
          </select>

          <input
            type="text"
            placeholder="Search number or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {loadingPage ? (
          <div className="loading-spinner">
            <p>Loading history...</p>
          </div>
        ) : paginatedOrders.length === 0 ? (
          <p className="no-orders">No matching orders.</p>
        ) : (
          <>
            <div className="order-table-scroll">
              <table className="order-history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Number</th>
                    <th>Order ID</th>
                    <th>OTP</th>
                    <th>Country</th>
                    <th>Service</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedOrders.map((order) => (
                    <tr key={order._id}>
                      <td>{formatDate(order.createdAt)}</td>

                      <td>{order.number}</td>

                      <td>{order.orderid}</td>

                      <td>
                        {order.otp ? (
                          <span className="otp-success">{order.otp}</span>
                        ) : (
                          <span className="otp-waiting">Waiting...</span>
                        )}
                      </td>

                      <td>
                        {order.country?.code || order.country}
                      </td>

                      <td>{getServiceName(order.service)}</td>

                      <td>₦{order.amount?.toLocaleString()}</td>

                      <td>
                        {order.status?.toLowerCase() === "waiting" ? (
                          <button
                            className="refund-btn"
                            disabled={loadingId === order.orderid}
                            onClick={() =>
                              handleRefund(order.orderid)
                            }
                          >
                            {loadingId === order.orderid
                              ? "Processing..."
                              : "Refund"}
                          </button>
                        ) : order.status?.toLowerCase() === "received" ? (
                          <button
                            className="resend-btn"
                            disabled={loadingId === order.orderid}
                            onClick={() =>
                              handleResend(order.orderid)
                            }
                          >
                            {loadingId === order.orderid
                              ? "Sending..."
                              : "Resend OTP"}
                          </button>
                        ) : (
                          <span className="status-refunded">
                            {order.status}
                          </span>
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
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => prev - 1)
                  }
                >
                  Prev
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => prev + 1)
                  }
                >
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
