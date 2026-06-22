import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "../styles/order-history.css";

const ORDERS_PER_PAGE = 10;
const API_URL = process.env.REACT_APP_API_URL;

const LogsHistory = ({ darkMode }) => {
  const [logs, setLogs] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [platformFilter, setPlatformFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = "Logs History - RealSMS";
    fetchLogs();
  }, []);

  const LogsTableSkeleton = () => {
  return (
    <div className="desktop-view">
      <div className="order-table-scroll">
        <table className="order-history-table">
          <thead>
            <tr>
              <th>Platform</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Date & Time</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            {[...Array(8)].map((_, i) => (
              <tr key={i}>
                <td>
                  <div className="sk log-platform"></div>
                </td>

                <td>
                  <div className="sk log-product"></div>
                </td>

                <td>
                  <div className="sk log-price"></div>
                </td>

                <td>
                  <div className="sk log-qty"></div>
                </td>

                <td>
                  <div className="date-skeleton">
                    <div className="sk date"></div>
                    <div className="sk time"></div>
                  </div>
                </td>

                <td>
                  <div className="sk button"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const LogsMobileSkeleton = () => {
  return (
    <div className="mobile-view">
      <div className="timeline-list">
        {[...Array(5)].map((_, i) => (
          <div className="timeline-card skeleton-card" key={i}>
            <div className="timeline-dot skeleton-dot"></div>

            <div className="timeline-content">
              <div className="timeline-top">
                <div className="sk mobile-title"></div>
              </div>

              <div className="sk mobile-product"></div>

              <div className="sk mobile-price"></div>

              <div className="sk mobile-details"></div>

              <div className="timeline-bottom">
                <div className="sk mobile-time"></div>

                <div className="sk button"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

  const fetchLogs = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoadingPage(false);
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/api/log/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.data) {
        setLogs(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPage(false);
    }
  };

  const normalize = (str) => str?.toLowerCase().replace(/\s+/g, "");

  const filteredLogs = useMemo(() => {
    let filtered = logs;

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();

      filtered = filtered.filter((log) => {
        const platform = log.platform?.toLowerCase() || "";
        const product = (log.product || log.name || "").toLowerCase();
        const details = log.details?.toLowerCase() || "";

        return (
          platform.includes(query) ||
          product.includes(query) ||
          details.includes(query)
        );
      });
    }

    if (platformFilter !== "all") {
      filtered = filtered.filter(
        (log) => normalize(log.platform) === normalize(platformFilter)
      );
    }

    return filtered;
  }, [logs, platformFilter, searchTerm]);

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
    if (!date) return { formattedDate: "-", relativeTime: "-" };

    const created = new Date(date);
    const now = new Date();

    const diffMs = now - created;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    let relativeTime = "";

    if (diffMins < 1) relativeTime = "Just now";
    else if (diffMins < 60) relativeTime = `${diffMins} mins ago`;
    else if (diffHours < 24) relativeTime = `${diffHours} hrs ago`;
    else relativeTime = `${diffDays} days ago`;

    return {
      formattedDate: created.toLocaleDateString(),
      relativeTime,
    };
  };

  const truncateLines = (text, max = 40) => {
    if (!text) return "-";
    return text.length > max ? text.slice(0, max) + "..." : text;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text || "");
    alert("Copied!");
  };

  return (
    <div className={`order-history-page ${darkMode ? "dark" : ""}`}>
      <div className="history-header">
        <h1>Logs History</h1>
        <p>View all purchased logs and account details</p>
      </div>

      <div className="history-filters">
        <div className="history-search">
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

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
  <>
    <LogsTableSkeleton />
    <LogsMobileSkeleton />
  </>
) : filteredLogs.length === 0 ? (
        <div className="no-orders">
          <div className="no-orders-icon">📄</div>
          <h3>No Logs Found</h3>
          <p>No logs match your current filter.</p>
        </div>
      ) : (
        <>
          <div className="desktop-view">
            <div className="order-table-scroll">
              <table className="order-history-table">
                <thead>
                  <tr>
                    <th>Platform</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Date & Time</th>
                    <th>Details</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedLogs.map((log) => {
                    const dateInfo = formatDate(log.createdAt);

                    return (
                      <tr key={log._id}>
                        <td>{log.platform || "-"}</td>
                        <td>{log.product || log.name || "-"}</td>
                        <td>₦{log.price?.toLocaleString() || 0}</td>
                        <td>{log.quantity || "-"}</td>

                        <td>
                          <div className="date-cell">
                            <span className="main-date">
                              {dateInfo.formattedDate}
                            </span>
                            <span className="relative-time">
                              {dateInfo.relativeTime}
                            </span>
                          </div>
                        </td>

                        <td>
                          <button
                            className="resend-btn"
                            onClick={() => copyToClipboard(log.details)}
                          >
                            Copy Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mobile-view">
            <div className="timeline-list">
              {paginatedLogs.map((log) => (
                <div className="timeline-card" key={log._id}>
                  <div className="timeline-dot received"></div>

                  <div className="timeline-content">
                    <div className="timeline-top">
                      <h3>{log.platform}</h3>
                    </div>

                    <p className="timeline-number">
                      {log.product || log.name}
                    </p>

                    <p className="timeline-country">
                      ₦{log.price?.toLocaleString() || 0}
                    </p>

                    <p className="timeline-otp">
                      {truncateLines(log.details)}
                    </p>

                    <div className="timeline-bottom">
                      <span>
                        {formatDate(log.createdAt).relativeTime}
                      </span>

                      <button
                        className="resend-btn"
                        onClick={() => copyToClipboard(log.details)}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <p>
                Showing {(currentPage - 1) * ORDERS_PER_PAGE + 1} to{" "}
                {Math.min(
                  currentPage * ORDERS_PER_PAGE,
                  filteredLogs.length
                )}{" "}
                of {filteredLogs.length} results
              </p>

              <div className="page-buttons">
                <button
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>

                <button className="active">{currentPage}</button>

                <button
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LogsHistory;
