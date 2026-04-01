import React, { useEffect, useState, useMemo } from "react";
import "../styles/order-history.css";

const ORDERS_PER_PAGE = 10;

const LogsHistory = ({ darkMode }) => {
  const [logs, setLogs] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  // ================================
  // FETCH ORDER HISTORY
  // ================================
  useEffect(() => {
    document.title = "Logs History - RealSMS";

    const fetchLogs = async () => {
      try {
        setLoadingPage(true);

        const res = await fetch(`${API_URL}/api/log/orders`);
        const data = await res.json();

        if (data.success && data.data) {
          setLogs(data.data);
        } else {
          console.error("Failed to fetch logs:", data);
        }
      } catch (err) {
        console.error("Error fetching logs:", err);
      } finally {
        setLoadingPage(false);
      }
    };

    fetchLogs();
  }, [API_URL]);

  // ================================
  // SEARCH FILTER
  // ================================
  const filteredLogs = useMemo(() => {
    return logs.filter((log) =>
      log.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [logs, search]);

  // ================================
  // PAGINATION
  // ================================
  const totalPages = Math.ceil(filteredLogs.length / ORDERS_PER_PAGE);

  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString();
  };

  // ================================
  // HELPER: Truncate text
  // ================================
  const truncate = (text, length = 20) =>
    text && text.length > length ? text.slice(0, length) + "..." : text;

  const truncateLines = (text, maxLines = 3) => {
    if (!text) return "";
    const lines = text.split("\n");
    return lines.length > maxLines
      ? lines.slice(0, maxLines).join("\n") + "..."
      : text;
  };

  // ================================
  // COPY TO CLIPBOARD
  // ================================
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Details copied!"))
      .catch((err) => console.error("Copy failed:", err));
  };

  return (
    <div className={`order-history-page ${darkMode ? "dark" : ""}`}>
      <div className="order-history-card">
        <h2 className="order-history-title">Logs History</h2>

        {/* SEARCH */}
        <div className="order-filter">
          <input
            type="text"
            placeholder="Search logs..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              width: "100%",
              maxWidth: "250px",
            }}
          />
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
                      <td data-label="Platform">{log.platform}</td>
                      <td data-label="Product">{truncate(log.name, 20)}</td>
                      <td data-label="Price">₦{log.price?.toLocaleString()}</td>
                      <td data-label="Quantity">{log.quantity}</td>
                      <td data-label="Details">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            maxHeight: 80,
                          }}
                        >
                          <pre
                            style={{
                              overflow: "auto",
                              margin: 0,
                              flexGrow: 1,
                            }}
                          >
                            {truncateLines(log.details, 3)}
                          </pre>
                          <button
                            style={{
                              marginTop: 4,
                              padding: "2px 6px",
                              fontSize: 12,
                              borderRadius: 4,
                              cursor: "pointer",
                              backgroundColor: darkMode ? "#444" : "#f0f0f0",
                              border: "1px solid #ccc",
                            }}
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
