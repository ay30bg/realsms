import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "../styles/order-history.css"; // reuse the Number History CSS
import { useBalance } from "../context/BalanceContext";

const API_URL = process.env.REACT_APP_API_URL;
const ORDERS_PER_PAGE = 10;

const platformIcons = {
  Instagram: "/assets/instagram.png",
  Facebook: "/assets/facebook.png",
  Twitter: "/assets/twitter.png",
  "Twitter (X)": "/assets/twitter.png",
  TikTok: "/assets/tiktok.png",
};

const OrderHistory = ({ darkMode }) => {
  const { balance } = useBalance(); // optional: show balance if needed

  const [orders, setOrders] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = "Order History - RealSMS";
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoadingPage(true);
      const res = await axios.get(`${API_URL}/api/log/orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.success) setOrders(res.data.data);
    } catch (err) {
      console.error("Fetch Orders Error:", err.response?.data || err);
    } finally {
      setLoadingPage(false);
    }
  };

  const handleResend = async (orderId) => {
    try {
      setLoadingId(orderId);
      const res = await axios.post(
        `${API_URL}/api/log/resend/${orderId}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (res.data.success) alert("OTP resent successfully!");
      else alert(res.data.message || "Failed to resend OTP");
      fetchOrders();
    } catch (err) {
      alert("Failed to resend OTP");
    } finally {
      setLoadingId(null);
    }
  };

  const filteredOrders = useMemo(() => {
    if (filter === "all") return orders;
    return orders.filter((o) => o.status?.toLowerCase() === filter.toLowerCase());
  }, [orders, filter]);

  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "-");

  return (
    <div className={`order-history-page ${darkMode ? "dark" : ""}`}>
      <div className="order-history-card">
        <h2 className="order-history-title">Purchase Logs</h2>

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
            <p>Loading purchase logs...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <p className="no-orders">No logs found.</p>
        ) : (
          <>
            <div className="order-table-scroll">
              <table className="order-history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Platform</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Details</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((order) => (
                    <tr key={order._id}>
                      <td data-label="Date">{formatDate(order.createdAt)}</td>
                      <td data-label="Platform">
                        <img
                          src={platformIcons[order.platform] || platformIcons["Instagram"]}
                          alt={order.platform}
                          style={{ width: 24, height: 24 }}
                        />
                        {order.platform}
                      </td>
                      <td data-label="Product">{order.name}</td>
                      <td data-label="Price">₦{order.price?.toLocaleString()}</td>
                      <td data-label="Stock">{order.stock}</td>
                      <td data-label="Details">
                        <pre>{order.details}</pre>
                      </td>
                      <td data-label="Status">
                        <span className={`status-badge ${order.status}`}>
                          {order.status}
                        </span>
                      </td>
                      <td data-label="Action">
                        {order.status === "received" ? (
                          <button
                            className="resend-btn"
                            disabled={loadingId === order._id}
                            onClick={() => handleResend(order._id)}
                          >
                            {loadingId === order._id ? "Sending..." : "Resend"}
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
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
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

export default OrderHistory;
