import React, { useState } from "react";
import "../styles/service-card.css";

const formatNaira = (amount) => {
  if (amount == null) return "N/A";
  return `₦${Number(amount).toLocaleString()}`;
};

const ServiceCard = ({ service, onBuy, disabled }) => {
  const [buying, setBuying] = useState(false);

  const unavailable = service.price == null;
  const isDisabled = disabled || unavailable || buying;

  const handleBuyClick = async () => {
    if (isDisabled) return;

    setBuying(true);

    try {
      await onBuy(service);
    } finally {
      setBuying(false);
    }
  };

  return (
    <div className={`service-card ${isDisabled ? "disabled" : ""}`}>
      <div className="service-left">
        {service.icon ? (
          <img src={service.icon} alt={service.name} className="service-icon" />
        ) : (
          <div className="service-icon-placeholder">
            {service.name?.charAt(0)}
          </div>
        )}

        <div className="service-info">
          <h4>{service.name}</h4>

          {service.stock !== undefined && (
            <span className="stock-badge">
              {service.stock} available
            </span>
          )}
        </div>
      </div>

      <div className="service-right">
        <span className="price">{formatNaira(service.price)}</span>

        <button
          onClick={handleBuyClick}
          disabled={isDisabled}
          className="buy-btn"
        >
          {buying ? "..." : unavailable ? "N/A" : "Buy"}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
