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
    const [dateFilter, setDateFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
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

    // ================================
    //  HANDLE RESEND
    // ================================
    // const handleResend = async (orderid) => {
    //     try {
    //         setLoadingId(orderid);

    //         const res = await axios.post(
    //             `${API_URL}/api/smspool/resend`,
    //             { orderid },
    //             {
    //                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    //             }
    //         );

    //         if (res.data.success) {
    //             alert("OTP resent successfully! Check your number.");
    //             fetchOrders();
    //         } else {
    //             alert(res.data.message || "Failed to resend OTP");
    //         }
    //     } catch (err) {
    //         alert("Failed to resend OTP");
    //     } finally {
    //         setLoadingId(null);
    //     }
    // };

    const TableSkeleton = () => {
    return (
        <div className="desktop-view">
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
                        {[...Array(8)].map((_, i) => (
                            <tr key={i}>
                                <td><div className="sk number"></div></td>
                                <td><div className="sk service"></div></td>
                                <td><div className="sk country"></div></td>
                                <td><div className="sk otp"></div></td>
                                <td><div className="sk badge"></div></td>
                                <td>
                                    <div className="date-skeleton">
                                        <div className="sk date"></div>
                                        <div className="sk time"></div>
                                    </div>
                                </td>
                                <td><div className="sk button"></div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

    
const MobileSkeleton = () => {
    return (
        <div className="mobile-view">
            <div className="timeline-list">
                {[...Array(5)].map((_, i) => (
                    <div className="timeline-card skeleton-card" key={i}>
                        <div className="timeline-dot skeleton-dot"></div>

                        <div className="timeline-content">
                            <div className="timeline-top">
                                <div className="sk mobile-title"></div>
                                <div className="sk badge"></div>
                            </div>

                            <div className="sk mobile-number"></div>
                            <div className="sk mobile-country"></div>

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

    const handleResend = async (orderid) => {
        try {
            setLoadingId(orderid);

            const res = await axios.post(
                `${API_URL}/api/smspool/resend`,
                { orderid },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (res.data.success) {
                if (res.data.otp) {
                    alert(`New OTP: ${res.data.otp}`);
                } else {
                    alert(res.data.message);
                }

                fetchOrders();
            }
        } catch (err) {
            alert("Failed to resend OTP");
        } finally {
            setLoadingId(null);
        }
    };

    // ================================
    //  GET SERVICE NAME
    // ================================
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
        let filtered = orders;

        // Search filter
        if (searchTerm.trim()) {
            const query = searchTerm.toLowerCase();

            filtered = filtered.filter((order) => {
                const number = order.number?.toString().toLowerCase() || "";
                const service = getServiceName(order.service).toLowerCase();
                const country =
                    order.country?.code?.toLowerCase() ||
                    order.country?.name?.toLowerCase() ||
                    "";

                return (
                    number.includes(query) ||
                    service.includes(query) ||
                    country.includes(query)
                );
            });
        }

        // Status filter
        if (filter !== "all") {
            filtered = filtered.filter(
                (o) => o.status?.toLowerCase() === filter.toLowerCase()
            );
        }

        // Date filter
        if (dateFilter !== "all") {
            const now = new Date();

            filtered = filtered.filter((order) => {
                const created = new Date(order.createdAt);
                const diffMs = now - created;
                const diffDays = diffMs / (1000 * 60 * 60 * 24);

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
    }, [orders, searchTerm, filter, dateFilter]);

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
                        <input
                            type="text"
                            placeholder="Search by number, service, country..."
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
                        <option value="waiting">Waiting</option>
                        <option value="received">Received</option>
                        <option value="refunded">Refunded</option>
                        <option value="cancelled">Cancelled</option>
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
    <TableSkeleton />
    <MobileSkeleton />
</>
): filteredOrders.length === 0 ? (
                    <div className="no-orders">
                        <div className="no-orders-icon">📭</div>
                        <h3>No Orders Found</h3>
                        <p>
                            We couldn’t find any orders matching your current filters or search.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* DESKTOP TABLE */}
                        <div className="desktop-view">
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
                                        {paginatedOrders.map((order) => {
                                            const dateInfo = formatDate(order.createdAt);

                                            return (
                                                <tr key={order._id}>
                                                    <td>{order.number}</td>

                                                    <td>{getServiceName(order.service)}</td>

                                                    <td>{order.country?.code || "-"}</td>

                                                    <td>
                                                        {order.otp ? (
                                                            <span className="otp-success">{order.otp}</span>
                                                        ) : (
                                                            <span className="otp-waiting">—</span>
                                                        )}
                                                    </td>

                                                    <td>
                                                        <span className={`status-badge ${order.status}`}>
                                                            {order.status}
                                                        </span>
                                                    </td>

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
                                                        {["waiting", "received"].includes(order.status) ? (
                                                            <button
                                                                className="resend-btn"
                                                                disabled={loadingId === order.orderid}
                                                                onClick={() => handleResend(order.orderid)}
                                                            >
                                                                {loadingId === order.orderid ? "Sending..." : "Resend"}
                                                            </button>
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* MOBILE TIMELINE */}
                        <div className="mobile-view">
                            <div className="timeline-list">
                                {paginatedOrders.map((order) => {
                                    const dateInfo = formatDate(order.createdAt);

                                    return (
                                        <div className="timeline-card" key={order._id}>
                                            <div className={`timeline-dot ${order.status}`}></div>

                                            <div className="timeline-content">
                                                <div className="timeline-top">
                                                    <h3>{getServiceName(order.service)}</h3>

                                                    <span className={`status-badge ${order.status}`}>
                                                        {order.status}
                                                    </span>
                                                </div>

                                                <p className="timeline-number">
                                                    {order.number}
                                                </p>

                                                <p className="timeline-country">
                                                    {order.country?.code || "-"}
                                                </p>

                                                {order.otp && (
                                                    <p className="timeline-otp">
                                                        OTP: <strong>{order.otp}</strong>
                                                    </p>
                                                )}

                                                <div className="timeline-bottom">
                                                    <span>{dateInfo.relativeTime}</span>

                                                    {["waiting", "received"].includes(order.status) && (
                                                        <button
                                                            className="resend-btn"
                                                            disabled={loadingId === order.orderid}
                                                            onClick={() => handleResend(order.orderid)}
                                                        >
                                                            {loadingId === order.orderid ? "Sending..." : "Resend"}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* PAGINATION */}
                        {totalPages > 1 && (
                            <div className="pagination">
                                <p>
                                    Showing {(currentPage - 1) * ORDERS_PER_PAGE + 1} to{" "}
                                    {Math.min(
                                        currentPage * ORDERS_PER_PAGE,
                                        filteredOrders.length
                                    )}{" "}
                                    of {filteredOrders.length} results
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
