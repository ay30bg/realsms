import React, { useState, useRef, useEffect } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import "../styles/support.css"; // reuse same support.css

const dummyMessages = [
  {
    id: 1,
    sender: "support",
    text: "Hello 👋 How can we help you today?",
    time: "10:00 AM",
  },
];

const UserSupport = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMsg]);
    setInput("");

    // Fake support auto reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "support",
          text: "Thanks for reaching out. Our team will review this shortly.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1500);
  };

  return (
    <div className="support-container">
      {/* Sidebar */}
      <div className={`support-sidebar ${sidebarOpen ? "mobile-hide" : ""}`}>
        <div className="sidebar-header">
          <h2>Support Inbox</h2>
        </div>
        <div className="message-list">
          {messages.map((msg) => (
            <div key={msg.id} className={`support-item ${msg.sender === "user" ? "user" : ""}`}>
              <div className="support-item-top">
                <strong>{msg.sender}</strong>
                <span>{msg.time}</span>
              </div>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className={`support-chat ${sidebarOpen ? "mobile-show" : ""}`}>
        <div className="chat-header">
          <button className="back-btn" onClick={() => setSidebarOpen(false)}>
            ←
          </button>
          <h3>Customer Support</h3>
        </div>

        <div className="chat-body">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-bubble ${msg.sender === "user" ? "user-message" : "support-message"}`}>
              {msg.text}
              <span>{msg.time}</span>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        <div className="chat-reply">
          <textarea
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>

      {/* Floating Telegram */}
      <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer" className="telegram-float">
        <FaTelegramPlane />
      </a>
    </div>
  );
};

export default UserSupport;
