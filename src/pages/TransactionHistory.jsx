// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import "../styles/transaction-history.css";

// const API_URL = process.env.REACT_APP_API_URL;
// const TRANSACTIONS_PER_PAGE = 10;

// const TransactionHistory = ({ darkMode }) => {
//   const [transactions, setTransactions] = useState([]);
//   const [loadingPage, setLoadingPage] = useState(true);
//   const [filter, setFilter] = useState("all"); // status filter
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     document.title = "Transaction History - RealSMS";
//     fetchTransactions();
//   }, []);

//   const fetchTransactions = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/transactions`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       if (res.data.success) setTransactions(res.data.data);
//     } catch (err) {
//       console.error("Fetch Transactions Error:", err.response?.data);
//     } finally {
//       setLoadingPage(false);
//     }
//   };

//   // Filter transactions by status
//   const filteredTransactions = useMemo(() => {
//     if (filter === "all") return transactions;
//     return transactions.filter(
//       (t) => t.status?.toLowerCase() === filter.toLowerCase()
//     );
//   }, [transactions, filter]);

//   const totalPages = Math.ceil(filteredTransactions.length / TRANSACTIONS_PER_PAGE);

//   const paginatedTransactions = filteredTransactions.slice(
//     (currentPage - 1) * TRANSACTIONS_PER_PAGE,
//     currentPage * TRANSACTIONS_PER_PAGE
//   );

//   const changePage = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   const formatDate = (date) => {
//     if (!date) return "-";
//     return new Date(date).toLocaleString();
//   };

//   return (
//     <div className={`transaction-page ${darkMode ? "dark" : ""}`}>
//       <div className="transaction-card">
//         <h2 className="transaction-title">Transaction History</h2>

//         {/* Status Filter */}
//         <div className="transaction-filter">
//           <select
//             value={filter}
//             onChange={(e) => {
//               setFilter(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="all">ALL</option>
//             <option value="success">SUCCESS</option>
//             <option value="pending">PENDING</option>
//             <option value="failed">FAILED</option>
//           </select>
//         </div>

//         {loadingPage ? (
//           <div className="loading-spinner">
//             <div className={`spinner ${darkMode ? "dark" : ""}`}></div>
//             <p>Loading transactions...</p>
//           </div>
//         ) : filteredTransactions.length === 0 ? (
//           <p className="no-transactions">No transactions found.</p>
//         ) : (
//           <>
//             <div className="transaction-table-scroll">
//               <table className="transaction-table">
//                 <thead>
//                   <tr>
//                     <th>Date</th>
//                     <th>Reference</th>
//                     <th>Payment Method</th>
//                     <th>Amount</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {paginatedTransactions.map((tx) => (
//                     <tr key={tx._id}>
//                       <td data-label="Date">{formatDate(tx.createdAt)}</td>

//                       <td data-label="Reference">
//                         <span
//                           className="value"
//                           title={tx.reference || tx.transactionId || tx._id}
//                         >
//                           {(tx.reference || tx.transactionId || tx._id)?.length > 10
//                             ? (tx.reference || tx.transactionId || tx._id).slice(0, 10) + "..."
//                             : tx.reference || tx.transactionId || tx._id}
//                         </span>
//                       </td>

//                       <td data-label="Payment Method">
//                         <span className={`tx-badge ${tx.provider?.toLowerCase()}`}>
//                           {tx.provider?.toUpperCase()}
//                         </span>
//                       </td>

//                       <td data-label="Amount">
//                         ₦{tx.amount?.toLocaleString()}
//                       </td>

//                       <td data-label="Status">
//                         <span className={`tx-badge ${tx.status?.toLowerCase()}`}>
//                           {tx.status?.toUpperCase() || "COMPLETED"}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {totalPages > 1 && (
//               <div className="pagination">
//                 <button
//                   onClick={() => changePage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                 >
//                   Prev
//                 </button>
//                 <span>
//                   Page {currentPage} of {totalPages || 1}
//                 </span>
//                 <button
//                   onClick={() => changePage(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TransactionHistory;

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "../styles/transaction-history.css";

const API_URL = process.env.REACT_APP_API_URL;
const TRANSACTIONS_PER_PAGE = 10;

const TransactionHistory = ({ darkMode }) => {
  const [transactions, setTransactions] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const [filter, setFilter] = useState("all"); // status filter
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = "Transaction History - RealSMS";
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/transactions`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.success) setTransactions(res.data.data);
    } catch (err) {
      console.error("Fetch Transactions Error:", err.response?.data);
    } finally {
      setLoadingPage(false);
    }
  };

  // Filter transactions by status
  const filteredTransactions = useMemo(() => {
    if (filter === "all") return transactions;
    return transactions.filter(
      (t) => t.status?.toLowerCase() === filter.toLowerCase()
    );
  }, [transactions, filter]);

  const totalPages = Math.ceil(filteredTransactions.length / TRANSACTIONS_PER_PAGE);

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * TRANSACTIONS_PER_PAGE,
    currentPage * TRANSACTIONS_PER_PAGE
  );

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString();
  };

 return (
  <div className={`transaction-page ${darkMode ? "dark" : ""}`}>
    <div className="transaction-card">
      {/* HEADER */}
      <div className="history-header">
        <h1>Transaction History</h1>
        <p>View all your wallet funding and payment records</p>
      </div>

      {/* FILTER */}
      <div className="history-filters">
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All Status</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {loadingPage ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading transactions...</p>
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="no-transactions">
          <div className="no-orders-icon">💳</div>
          <h3>No Transactions Found</h3>
          <p>No transactions match your current filter.</p>
        </div>
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <div className="desktop-view">
            <div className="transaction-table-scroll">
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Reference</th>
                    <th>Payment Method</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedTransactions.map((tx) => (
                    <tr key={tx._id}>
                      <td>{formatDate(tx.createdAt)}</td>

                      <td>
                        <span title={tx.reference || tx.transactionId || tx._id}>
                          {(tx.reference || tx.transactionId || tx._id)?.length > 12
                            ? (tx.reference || tx.transactionId || tx._id).slice(0, 12) + "..."
                            : tx.reference || tx.transactionId || tx._id}
                        </span>
                      </td>

                      <td>
                        <span className={`tx-badge ${tx.provider?.toLowerCase()}`}>
                          {tx.provider?.toUpperCase()}
                        </span>
                      </td>

                      <td>₦{tx.amount?.toLocaleString()}</td>

                      <td>
                        <span className={`tx-badge ${tx.status?.toLowerCase()}`}>
                          {tx.status?.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* MOBILE VIEW */}
          <div className="mobile-view">
            <div className="timeline-list">
              {paginatedTransactions.map((tx) => (
                <div className="timeline-card" key={tx._id}>
                  <div className={`timeline-dot ${tx.status?.toLowerCase()}`}></div>

                  <div className="timeline-content">
                    <div className="timeline-top">
                      <h3>₦{tx.amount?.toLocaleString()}</h3>

                      <span className={`tx-badge ${tx.status?.toLowerCase()}`}>
                        {tx.status?.toUpperCase()}
                      </span>
                    </div>

                    <p className="timeline-number">
                      {tx.reference || tx.transactionId || tx._id}
                    </p>

                    <p className="timeline-country">
                      {tx.provider?.toUpperCase()}
                    </p>

                    <div className="timeline-bottom">
                      <span>{formatDate(tx.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="pagination">
              <p>
                Showing {(currentPage - 1) * TRANSACTIONS_PER_PAGE + 1} to{" "}
                {Math.min(
                  currentPage * TRANSACTIONS_PER_PAGE,
                  filteredTransactions.length
                )}{" "}
                of {filteredTransactions.length} results
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
  </div>
);

export default TransactionHistory;

