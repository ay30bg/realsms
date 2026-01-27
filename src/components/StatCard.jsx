import React from "react";
import "../styles/dashboard.css";

const StatCard = ({ title, value, icon, color, darkMode }) => {
  return (
    <div
      className={`stat-card ${darkMode ? "dark" : ""}`}
      style={{ borderTop: `4px solid ${color}` }}
    >
      <div className="stat-card-header">
        <div className="stat-icon" style={{ backgroundColor: color + "20" }}>
          {icon}
        </div>
        <h4>{title}</h4>
      </div>
      <p className="stat-value">{value}</p>
    </div>
  );
};

export default StatCard;
