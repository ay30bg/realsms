import React from "react";
import "../styles/support.css";

const Support = () => {
  const telegramLink = "https://t.me/real6ixsms"; 

  const handleRedirect = () => {
    window.location.href = telegramLink; 
  };

  return (
    <div className="support-page">
      <div className="support-card">
        <h1>Need Help?</h1>
        <p>Contact us directly on Telegram for support.</p>
        <button className="telegram-btn" onClick={handleRedirect}>
          Go to Telegram
        </button>
      </div>
    </div>
  );
};

export default Support;
