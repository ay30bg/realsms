import React, { useState } from "react";

const ServiceCard = ({ service, onBuy }) => {
  const [buying, setBuying] = useState(false);

  const handleBuyClick = () => {
    setBuying(true); // start spinner
    onBuy(service, () => setBuying(false)); // callback to stop spinner
  };

  return (
    <div className="service-card">
      <div className="service-left">
        <img
          src={service.icon}
          alt={service.name}
          style={{ width: "42px", height: "42px", objectFit: "contain" }}
        />
        <div>
          <h4>{service.name}</h4>
          <span className="stock">{service.stock} Stocks</span>
        </div>
      </div>

      <div className="service-right">
        <span className="price">₦{service.price}</span>
        <button onClick={handleBuyClick} disabled={buying}>
          {buying ? <div className="button-spinner"></div> : "Buy Number"}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
