import React, { useState, useRef, useEffect } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import "../styles/support.css";

const UserSupport = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "support", text: "Hello 👋 How can we help you today?", time: "10:00 AM" }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    document.title = "Customer Support - RealSMS";
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setMessages([...messages, newMsg]);
    setInput("");

    // Auto reply for demo
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "support",
          text: "Thanks for reaching out. Our team will review this shortly.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    }, 1500);
  };

  return (
    <div className="user-support-page">
     <div className="user-support-container">
      <div className="user-support-header">
        <h3>Customer Support</h3>
        <span>We typically reply within minutes</span>
      </div>

      <div className="user-support-body">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.sender}`}>
            <div className="bubble">
              <p>{msg.text}</p>
              <span>{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

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

      <a href="https://t.me/real6ixsms" target="_blank" rel="noopener noreferrer" className="telegram-float">
        <FaTelegramPlane />
      </a>
    </div>
    </div> 
  );
};

export default UserSupport;




