import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import "../styles/marketplace.css";

const SocialCard = ({ listing, onPurchase }) => {
  return (
    <div className="social-card">
      <div className="card-header">
        <h3>{listing.title}</h3>
        <p className="platform">{listing.platform}</p>
      </div>
      <div className="card-body">
        <p className="price">Price: ₦{listing.price.toLocaleString()}</p>
        <p className="details">{listing.details}</p>
      </div>
      <button
        className="purchase-btn"
        onClick={() => onPurchase(listing)}
      >
        <FiShoppingCart style={{ marginRight: "6px" }} />
        Buy
      </button>
    </div>
  );
};

export default SocialCard;
