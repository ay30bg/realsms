import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "../styles/order-history.css";
import {
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";


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
    // const formatDate = (date) => {
    //     if (!date) return "-";
    //     return new Date(date).toLocaleString();
    // };

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
        <div className={`order-history-page ${darkMode ? "dark" : ""}`}>
            <div className="order-history-card">
                {/* HEADER */}
                <div className="history-header">
                    <h1>Number History</h1>
                    <p>View all your purchased numbers and their statuses</p>
                </div>

                {/* FILTERS */}
                <div className="history-filters">
                    <div className="history-search">
                        <input type="text" placeholder="Search by number..." />
                    </div>

                    <select
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="all">All Status</option>
                        <option value="waiting">Waiting</option>
                        <option value="received">Received</option>
                        <option value="refunded">Refunded</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <select>
                        <option>All Time</option>
                        <option>Today</option>
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                    </select>
                </div>

                {loadingPage ? (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
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
                                        <th>Number</th>
                                        <th>Service</th>
                                        <th>Country</th>
                                        <th>OTP</th>
                                        <th>Status</th>
                                        <th>Date & Time</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {paginatedOrders.map((order) => (
                                        <tr key={order._id}>
                                            <td data-label="Number">{order.number}</td>

                                            <td data-label="Service">
                                                {getServiceName(order.service)}
                                            </td>

                                            <td data-label="Country">
                                                {order.country?.code || "-"}
                                            </td>

                                            <td data-label="OTP">
                                                {order.otp ? (
                                                    <span className="otp-success">{order.otp}</span>
                                                ) : (
                                                    <span className="otp-waiting">—</span>
                                                )}
                                            </td>

                                            <td data-label="Status">
                                                <span className={`status-badge ${order.status}`}>
                                                    {order.status}
                                                </span>
                                            </td>

                                            <td data-label="Date">
                                                <div className="date-cell">
                                                    <span className="main-date">
                                                        {formatDate(order.createdAt).formattedDate}
                                                    </span>
                                                    <span className="relative-time">
                                                        {formatDate(order.createdAt).relativeTime}
                                                    </span>
                                                </div>
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

                        {totalPages > 1 && (
                            <div className="pagination">
                                <p>
                                    Showing {(currentPage - 1) * ORDERS_PER_PAGE + 1} to{" "}
                                    {Math.min(currentPage * ORDERS_PER_PAGE, filteredOrders.length)} of{" "}
                                    {filteredOrders.length} results
                                </p>

                                <div className="page-buttons">
                                    <button
                                        onClick={() => changePage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        <FiChevronLeft />
                                    </button>

                                    <button className="active">{currentPage}</button>

                                    <button
                                        onClick={() => changePage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        <FiChevronRight />
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

export default NumberHistory;





