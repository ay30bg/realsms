import React, { useState, useEffect } from "react";
import { mockOrders } from "../data/mockOrders";
import { formatMoney } from "../utils/formatMoney";
import "../styles/order-history.css";

const OrderHistory = () => {
  const [orders] = useState(mockOrders || []);

  // ✅ PAGE TITLE
  useEffect(() => {
    document.title = "Number History - RealSMS";
  }, []);

  return (
    <div className="order-history-page">
      <div className="order-history-card">
        <h2 className="order-history-title">Order History</h2>

        {orders.length === 0 ? (
          <p className="no-orders">No orders yet.</p>
        ) : (
          <div className="order-table-scroll">
            <table className="order-history-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Number</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.service}</td>
                    <td>{order.number}</td>
                    <td>{formatMoney(order.price || 150)}</td>
                    <td
                      className={`status ${
                        order.status?.toLowerCase() || "completed"
                      }`}
                    >
                      {order.status || "Completed"}
                    </td>
                    <td>{order.date || "2026-01-22"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;

