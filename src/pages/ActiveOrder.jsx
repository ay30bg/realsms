// pages/ActiveOrder.jsx
import React, { useState, useEffect } from "react";
import { mockOrders } from "../data/mockOrders";

const ActiveOrder = () => {
  const [orders, setOrders] = useState(mockOrders);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prev) =>
        prev.map((o) => ({
          ...o,
          timeLeft: o.timeLeft > 0 ? o.timeLeft - 1 : 0,
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="active-orders">
      <h2>Active Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <p>
            Service: {order.service} | Number: {order.number}
          </p>
          <p>Time Left: {order.timeLeft}s</p>
        </div>
      ))}
    </div>
  );
};

export default ActiveOrder;
