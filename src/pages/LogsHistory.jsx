import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "../styles/order-history.css";

const ORDERS_PER_PAGE = 10;

const LogsHistory = ({ darkMode }) => {
  const [logs, setLogs] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [platformFilter, setPlatformFilter] = useState("all");

  const API_URL = process.env.REACT_APP_API_URL;

  /* ================================
     FETCH ORDER HISTORY (USER)
  ================================ */
  useEffect(() => {
    document.title = "Logs History - RealSMS";

    const fetchLogs = async () => {
      const token = localStorage.getItem("token"); // ✅ correct key
      if (!token) {
        console.error("No user token found. Please log in.");
        setLogs([]);
        setLoadingPage(false);
        return;
      }

      try {
        setLoadingPage(true);
        // Set Axios default Authorization header
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const res = await axios.get(`${API_URL}/api/log/orders`);

        if (res.data?.data) {
          setLogs(res.data.data);
        } else {
          console.error("Failed to fetch logs:", res.data);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          console.error("Unauthorized request. Please log in again.");
        } else {
          console.error("Error fetching logs:", err);
        }
        setLogs([]);
      } finally {
        setLoadingPage(false);
      }
    };

    fetchLogs();
  }, [API_URL]);

  /* ================================
     NORMALIZE STRING
  ================================ */
  const normalize = (str) => str?.toLowerCase().replace(/\s+/g, "");

  /* ================================
     FILTER LOGS
  ================================ */
  const filteredLogs = useMemo(() => {
    if (platformFilter === "all") return logs;

    return logs.filter(
      (log) => normalize(log.platform) === normalize(platformFilter)
    );
  }, [logs, platformFilter]);

  /* ================================
     PAGINATION
  ================================ */
  const totalPages = Math.ceil(filteredLogs.length / ORDERS_PER_PAGE);

  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  /* ================================
     FORMAT DATE
  ================================ */
  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "-");

  /* ================================
     TRUNCATE DETAILS
  ================================ */
  const truncateLines = (text, maxLines = 2, maxCharsPerLine = 40) => {
    if (!text) return "-";

    const lines = text.split("\n");
    const truncated = lines.slice(0, maxLines).map((line) =>
      line.length > maxCharsPerLine ? line.slice(0, maxCharsPerLine) + "..." : line
    );

    if (lines.length > maxLines) truncated.push("...");
    return truncated.join("\n");
  };

  /* ================================
     COPY TO CLIPBOARD
  ================================ */
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Copied!"))
      .catch(() => alert("Failed to copy"));
  };

  return (
    <div className={`order-history-page ${darkMode ? "dark" : ""}`}>
      <div className="order-history-card">
        <h2 className="order-history-title">Logs History</h2>

        {/* FILTER */}
        <div className="order-filter">
          <select
            value={platformFilter}
            onChange={(e) => {
              setPlatformFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Platforms</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="twitter">Twitter</option>
            <option value="tiktok">TikTok</option>
            <option value="mail">Mail</option>
            <option value="google voice">Google Voice</option>
            <option value="netflix">Netflix</option>
            <option value="texting app">Texting App</option>
            <option value="vpn">VPN</option>
          </select>
        </div>

        {loadingPage ? (
          <div className="loading-spinner">
            <div className={`spinner ${darkMode ? "dark" : ""}`}></div>
            <p>Loading logs...</p>
          </div>
        ) : filteredLogs.length === 0 ? (
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
                    <th>Quantity</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLogs.map((log) => (
                    <tr key={log._id}>
                      <td data-label="Date">{formatDate(log.createdAt)}</td>
                      <td data-label="Platform">{log.platform || "-"}</td>
                      <td data-label="Product">{log.product || log.name || "-"}</td>
                      <td data-label="Price">₦{log.price?.toLocaleString() || "0"}</td>
                      <td data-label="Quantity">{log.quantity || "-"}</td>
                      <td data-label="Details">
                        <div className="details-box">
                          <pre className="details-text">{truncateLines(log.details)}</pre>
                          <button
                            className="copy-btn"
                            onClick={() => copyToClipboard(log.details)}
                          >
                            Copy
                          </button>
                        </div>
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
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
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

export default LogsHistory;
