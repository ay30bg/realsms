import React, { useState, useEffect, useRef } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import "../styles/support.css";

const UserSupport = ({ setUnreadMessages }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_API_URL;

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_URL}/api/support/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };

    const markAsRead = async () => {
      try {
        await fetch(`${API_URL}/api/support/user/read`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (setUnreadMessages) setUnreadMessages(0); // remove badge
      } catch (err) {
        console.error(err);
      }
    };

    document.title = "Customer Support - RealSMS";
    fetchMessages();
    markAsRead();
  }, [API_URL, token, setUnreadMessages]);

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/support/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, data]);
      setInput("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSend(); };

  return (
    <div className="user-support-page">
      <div className="user-support-container">
        <div className="user-support-header">
          <h3>Customer Support</h3>
          <span>We typically reply within minutes</span>
        </div>

        <div className="user-support-body">
          {messages.length === 0 && <div className="no-messages">Start a conversation with support</div>}
          {messages.map((msg) => (
            <div key={msg._id} className={`chat-message ${msg.sender === "user" ? "user" : "support"}`}>
              <div className="bubble">
                <p>{msg.message}</p>
                <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        <div className="user-support-input">
          <input type="text" placeholder="Type your message..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} disabled={loading} />
          <button onClick={handleSend} disabled={loading}>{loading ? "Sending..." : "Send"}</button>
        </div>

        <a href="https://t.me/real6ixsms" target="_blank" rel="noopener noreferrer" className="telegram-float"><FaTelegramPlane /></a>
      </div>
    </div>
  );
};

export default UserSupport;
