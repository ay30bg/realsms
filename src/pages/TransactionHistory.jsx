import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "../styles/transaction-history.css";

const API_URL = process.env.REACT_APP_API_URL;
const TRANSACTIONS_PER_PAGE = 10;

const TransactionHistory = ({ darkMode }) => {
    const [transactions, setTransactions] = useState([]);
    const [loadingPage, setLoadingPage] = useState(true);
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [dateFilter, setDateFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        document.title = "Transaction History - RealSMS";
        fetchTransactions();
    }, []);

    const TransactionTableSkeleton = () => {
    return (
        <div className="desktop-view">
            <div className="transaction-table-scroll">
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Reference</th>
                            <th>Payment Method</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {[...Array(8)].map((_, i) => (
                            <tr key={i}>
                                <td>
                                    <div className="sk tx-reference"></div>
                                </td>

                                <td>
                                    <div className="sk badge"></div>
                                </td>

                                <td>
                                    <div className="sk tx-amount"></div>
                                </td>

                                <td>
                                    <div className="date-skeleton">
                                        <div className="sk date"></div>
                                        <div className="sk time"></div>
                                    </div>
                                </td>

                                <td>
                                    <div className="sk badge"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const TransactionMobileSkeleton = () => {
    return (
        <div className="mobile-view">
            <div className="timeline-list">
                {[...Array(5)].map((_, i) => (
                    <div className="timeline-card skeleton-card" key={i}>
                        <div className="timeline-dot skeleton-dot"></div>

                        <div className="timeline-content">
                            <div className="timeline-top">
                                <div className="sk mobile-amount"></div>
                                <div className="sk badge"></div>
                            </div>

                            <div className="sk mobile-reference"></div>

                            <div className="sk mobile-provider"></div>

                            <div className="timeline-bottom">
                                <div className="sk mobile-time"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

    const fetchTransactions = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/transactions`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (res.data.success) {
                setTransactions(res.data.data);
            }
        } catch (err) {
            console.error("Fetch Transactions Error:", err.response?.data);
        } finally {
            setLoadingPage(false);
        }
    };

    const filteredTransactions = useMemo(() => {
        let filtered = transactions;

        // Search
        if (searchTerm.trim()) {
            const query = searchTerm.toLowerCase();

            filtered = filtered.filter((tx) => {
                const ref = (tx.reference || tx.transactionId || tx._id || "")
                    .toString()
                    .toLowerCase();

                const provider = tx.provider?.toLowerCase() || "";
                const amount = tx.amount?.toString() || "";

                return (
                    ref.includes(query) ||
                    provider.includes(query) ||
                    amount.includes(query)
                );
            });
        }

        // Status filter
        if (filter !== "all") {
            filtered = filtered.filter(
                (tx) => tx.status?.toLowerCase() === filter.toLowerCase()
            );
        }

        // Date filter
        if (dateFilter !== "all") {
            const now = new Date();

            filtered = filtered.filter((tx) => {
                const created = new Date(tx.createdAt);
                const diffDays = (now - created) / (1000 * 60 * 60 * 24);

                if (dateFilter === "today") {
                    return created.toDateString() === now.toDateString();
                }

                if (dateFilter === "7days") {
                    return diffDays <= 7;
                }

                if (dateFilter === "30days") {
                    return diffDays <= 30;
                }

                return true;
            });
        }

        return filtered;
    }, [transactions, searchTerm, filter, dateFilter]);

    const totalPages = Math.ceil(
        filteredTransactions.length / TRANSACTIONS_PER_PAGE
    );

    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * TRANSACTIONS_PER_PAGE,
        currentPage * TRANSACTIONS_PER_PAGE
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

        if (diffMins < 1) {
            relativeTime = "Just now";
        } else if (diffMins < 60) {
            relativeTime = `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
        } else if (diffHours < 24) {
            relativeTime = `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`;
        } else {
            relativeTime = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
        }

        const formattedDate = created.toLocaleDateString();

        return { formattedDate, relativeTime };
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
                    <div className="history-search">
                        <input
                            type="text"
                            placeholder="Search by reference, provider, amount..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

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

                    <select
                        value={dateFilter}
                        onChange={(e) => {
                            setDateFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="7days">Last 7 Days</option>
                        <option value="30days">Last 30 Days</option>
                    </select>
                </div>

               {loadingPage ? (
    <>
        <TransactionTableSkeleton />
        <TransactionMobileSkeleton />
    </>
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
                                            <th>Reference</th>
                                            <th>Payment Method</th>
                                            <th>Amount</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {paginatedTransactions.map((tx) => (
                                            <tr key={tx._id}>
                                                <td>
                                                    <span
                                                        title={tx.reference || tx.transactionId || tx._id}
                                                    >
                                                        {(tx.reference || tx.transactionId || tx._id)
                                                            ?.length > 12
                                                            ? (tx.reference || tx.transactionId || tx._id).slice(
                                                                0,
                                                                12
                                                            ) + "..."
                                                            : tx.reference || tx.transactionId || tx._id}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span
                                                        className={`tx-badge ${tx.provider?.toLowerCase()}`}
                                                    >
                                                        {tx.provider?.toUpperCase() || "-"}
                                                    </span>
                                                </td>

                                                <td>₦{tx.amount?.toLocaleString() || 0}</td>

                                                <td>
                                                    {(() => {
                                                        const dateInfo = formatDate(tx.createdAt);
                                                        return (
                                                            <div className="date-cell">
                                                                <span className="main-date">{dateInfo.formattedDate}</span>
                                                                <span className="relative-time">{dateInfo.relativeTime}</span>
                                                            </div>
                                                        );
                                                    })()}
                                                </td>

                                                <td>
                                                    <span
                                                        className={`tx-badge ${tx.status?.toLowerCase()}`}
                                                    >
                                                        {tx.status?.toUpperCase() || "UNKNOWN"}
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
                                        <div
                                            className={`timeline-dot ${tx.status?.toLowerCase()}`}
                                        ></div>

                                        <div className="timeline-content">
                                            <div className="timeline-top">
                                                <h3>₦{tx.amount?.toLocaleString() || 0}</h3>

                                                <span
                                                    className={`tx-badge ${tx.status?.toLowerCase()}`}
                                                >
                                                    {tx.status?.toUpperCase()}
                                                </span>
                                            </div>

                                            <p className="timeline-number">
                                                {tx.reference || tx.transactionId || tx._id}
                                            </p>

                                            <p className="timeline-country">
                                                {tx.provider?.toUpperCase() || "-"}
                                            </p>

                                            <div className="timeline-bottom">
                                                <span>{formatDate(tx.createdAt).relativeTime}</span>
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
};

export default TransactionHistory;
