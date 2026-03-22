// import React, { useEffect } from "react";
// import { FiShoppingBag, FiClock } from "react-icons/fi";
// import "../styles/purchase-logs.css";

// const PurchaseLogs = () => {
//   useEffect(() => {
//     document.title = "Social Media Logs - RealSMS";
//   }, []);

//   return (
//     <div className="coming-soon-page">
//       <div className="coming-soon-card">
//         <FiShoppingBag className="coming-icon" />

//         <h2>Social Media Logs Marketplace</h2>

//         <p className="coming-main">
//           Buy verified social media logs — coming soon 🚀
//         </p>

//         <div className="coming-features">
//           <div className="feature">
//             <FiClock /> <span>Fresh & Active Accounts</span>
//           </div>
//           <div className="feature">
//             <FiClock /> <span>Multiple Platforms (Gmail, Facebook, etc.)</span>
//           </div>
//           <div className="feature">
//             <FiClock /> <span>Instant Delivery</span>
//           </div>
//         </div>

//         <span className="coming-subtext">
//           This marketplace is currently under development. Stay tuned.
//         </span>

//         <button className="coming-btn">Coming Soon</button>
//       </div>
//     </div>
//   );
// };

// export default PurchaseLogs;

// pages/PurchaseLogs.jsx
import React, { useState, useEffect } from "react";
import { FiSearch, FiCopy } from "react-icons/fi";
import "../styles/purchase-logs.css";

const PurchaseLogs = ({ darkMode }) => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Purchase Logs - RealSMS";

    // Mocked purchase logs
    setLogs([
      { id: 1, platform: "Instagram", username: "@john_doe", purchasedAt: "2026-03-21T12:45:00Z", amount: 500 },
      { id: 2, platform: "Twitter", username: "@janedoe", purchasedAt: "2026-03-20T09:30:00Z", amount: 300 },
      { id: 3, platform: "Facebook", username: "@alex_smith", purchasedAt: "2026-03-19T18:15:00Z", amount: 200 },
    ]);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const filteredLogs = logs.filter(
    (log) =>
      log.username.toLowerCase().includes(search.toLowerCase()) ||
      log.platform.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`purchase-logs ${darkMode ? "dark" : ""}`}>
      <div className="logs-card">
        <h2>Social Media Purchase Logs</h2>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by username or platform"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FiSearch className="search-icon" />
        </div>

        <div className="logs-container">
          {filteredLogs.length === 0 ? (
            <p className="empty">No purchase logs found</p>
          ) : (
            <table className="logs-table">
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>Username</th>
                  <th>Purchased At</th>
                  <th>Amount (NGN)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.platform}</td>
                    <td>{log.username}</td>
                    <td>{new Date(log.purchasedAt).toLocaleString()}</td>
                    <td>{log.amount}</td>
                    <td>
                      <FiCopy
                        onClick={() => {
                          navigator.clipboard.writeText(log.username);
                          setCopied(true);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {copied && <p className="copied-msg">Copied to clipboard!</p>}
      </div>
    </div>
  );
};

export default PurchaseLogs;
