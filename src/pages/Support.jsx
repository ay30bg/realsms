import React from "react";
import "../styles/support.css";
import telegramIcon from "../assets/telegram.png"; // optional: small Telegram icon

const Support = () => {
  const telegramLink = "https://t.me/real6ixsms"; 

  const handleRedirect = () => {
    window.location.href = telegramLink; 
  };

  return (
    <div className="support-page">
      <div className="support-card">
        <h1>Need Help?</h1>
        <p>Contact us directly on Telegram for instant support.</p>
        <button className="telegram-btn" onClick={handleRedirect}>
          {telegramIcon && (
            <img src={telegramIcon} alt="Telegram" className="btn-icon" />
          )}
          Go to Telegram
        </button>
      </div>
    </div>
  );
};

export default Support;
