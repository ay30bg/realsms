// import React, { useEffect } from "react";
// import "../styles/support.css";
// import telegramIcon from "../assets/telegram.png";

// const Support = () => {
//   const telegramLink = "https://t.me/real6ixsms";

//   // ✅ PAGE TITLE
//   useEffect(() => {
//     document.title = "Support - RealSMS";
//   }, []);

//   const handleRedirect = () => {
//     window.location.href = telegramLink;
//   };

//   return (
//     <div className="support-page">
//       <div className="support-card">
//         <h1>Need Help?</h1>
//         <p>Contact us directly on Telegram for instant support.</p>
//         <button className="telegram-btn" onClick={handleRedirect}>
//           {telegramIcon && (
//             <img src={telegramIcon} alt="Telegram" className="btn-icon" />
//           )}
//           Go to Telegram
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Support;


import React, { useState, useRef, useEffect } from "react";
import "../styles/userSupport.css";

const UserSupport = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "support",
      text: "Hello 👋 How can we help you today?",
      time: "10:00 AM",
    },
  ]);

  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // Fake support auto reply (for demo)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "support",
          text: "Thanks for reaching out. Our team will review this shortly.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 1500);
  };

  return (
    <div className="user-support-container">
      {/* Header */}
      <div className="user-support-header">
        <h3>Customer Support</h3>
        <span>We typically reply within minutes</span>
      </div>

      {/* Chat Body */}
      <div className="user-support-body">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${
              msg.sender === "user" ? "user" : "support"
            }`}
          >
            <div className="bubble">
              <p>{msg.text}</p>
              <span>{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input */}
      <div className="user-support-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default UserSupport;
