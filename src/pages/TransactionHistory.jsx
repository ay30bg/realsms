// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import "../styles/transaction-history.css";

// const API_URL = process.env.REACT_APP_API_URL;
// const TRANSACTIONS_PER_PAGE = 10;

// const TransactionHistory = ({ darkMode }) => {
//   const [transactions, setTransactions] = useState([]);
//   const [loadingPage, setLoadingPage] = useState(true);

//   const [filter, setFilter] = useState("all");
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

//       if (res.data.success) {
//         setTransactions(res.data.data);
//       }
//     } catch (err) {
//       console.error("Fetch Transactions Error:", err.response?.data);
//     } finally {
//       setLoadingPage(false);
//     }
//   };

//   const filteredTransactions = useMemo(() => {
//     if (filter === "all") return transactions;
//     return transactions.filter(
//       (t) => t.paymentMethod?.toLowerCase() === filter.toLowerCase()
//     );
//   }, [transactions, filter]);

//   const totalPages = Math.ceil(
//     filteredTransactions.length / TRANSACTIONS_PER_PAGE
//   );

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

//         <div className="transaction-filter">
//           <select
//             value={filter}
//             onChange={(e) => {
//               setFilter(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="all">All</option>
//             <option value="card">Card</option>
//             <option value="bank">Bank Transfer</option>
//             <option value="crypto">Crypto</option>
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

//                      <td data-label="Reference">
//   <span
//     className="value"
//     title={tx.reference || tx.transactionId || tx._id}
//   >
//     {(tx.reference || tx.transactionId || tx._id)?.length > 10
//       ? (tx.reference || tx.transactionId || tx._id).slice(0, 10) + "..."
//       : tx.reference || tx.transactionId || tx._id}
//   </span>
// </td>
                      
//                      <td data-label="Payment Method">
//   <span className={`tx-badge ${tx.provider?.toLowerCase()}`}>
//     {tx.provider?.toUpperCase()}
//   </span>
// </td>

//                       <td data-label="Amount">
//                         ₦{tx.amount?.toLocaleString()}
//                       </td>

//                       <td data-label="Status">
//                         <span className={`tx-badge ${tx.status?.toLowerCase()}`}>
//   {tx.status?.toUpperCase() || "COMPLETED"}
// </span>
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
        <h2 className="transaction-title">Transaction History</h2>

        {/* Status Filter */}
        <div className="transaction-filter">
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">ALL</option>
            <option value="success">SUCCESS</option>
            <option value="pending">PENDING</option>
            <option value="failed">FAILED</option>
          </select>
        </div>

        {loadingPage ? (
          <div className="loading-spinner">
            <div className={`spinner ${darkMode ? "dark" : ""}`}></div>
            <p>Loading transactions...</p>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <p className="no-transactions">No transactions found.</p>
        ) : (
          <>
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
                      <td data-label="Date">{formatDate(tx.createdAt)}</td>

                      <td data-label="Reference">
                        <span
                          className="value"
                          title={tx.reference || tx.transactionId || tx._id}
                        >
                          {(tx.reference || tx.transactionId || tx._id)?.length > 10
                            ? (tx.reference || tx.transactionId || tx._id).slice(0, 10) + "..."
                            : tx.reference || tx.transactionId || tx._id}
                        </span>
                      </td>

                      <td data-label="Payment Method">
                        <span className={`tx-badge ${tx.provider?.toLowerCase()}`}>
                          {tx.provider?.toUpperCase()}
                        </span>
                      </td>

                      <td data-label="Amount">
                        ₦{tx.amount?.toLocaleString()}
                      </td>

                      <td data-label="Status">
                        <span className={`tx-badge ${tx.status?.toLowerCase()}`}>
                          {tx.status?.toUpperCase() || "COMPLETED"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <span>
                  Page {currentPage} of {totalPages || 1}
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

export default TransactionHistory;
