// import React, { useState, useRef, useEffect } from "react";
// import { FaTelegramPlane } from "react-icons/fa";
// import "../styles/support.css";

// const UserSupport = () => {
//   const [messages, setMessages] = useState([
//     { id: 1, sender: "support", text: "Hello 👋 How can we help you today?", time: "10:00 AM" }
//   ]);
//   const [input, setInput] = useState("");
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     document.title = "Customer Support - RealSMS";
//     scrollToBottom();
//   }, []);

//   const scrollToBottom = () => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSend = () => {
//     if (!input.trim()) return;
//     const newMsg = {
//       id: Date.now(),
//       sender: "user",
//       text: input,
//       time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//     };
//     setMessages([...messages, newMsg]);
//     setInput("");

//     // Auto reply for demo
//     setTimeout(() => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           sender: "support",
//           text: "Thanks for reaching out. Our team will review this shortly.",
//           time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//         }
//       ]);
//     }, 1500);
//   };

//   return (
//     <div className="user-support-page">
//      <div className="user-support-container">
//       <div className="user-support-header">
//         <h3>Customer Support</h3>
//         <span>We typically reply within minutes</span>
//       </div>

//       <div className="user-support-body">
//         {messages.map((msg) => (
//           <div key={msg.id} className={`chat-message ${msg.sender}`}>
//             <div className="bubble">
//               <p>{msg.text}</p>
//               <span>{msg.time}</span>
//             </div>
//           </div>
//         ))}
//         <div ref={chatEndRef}></div>
//       </div>

//       <div className="user-support-input">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>

//       <a href="https://t.me/real6ixsms" target="_blank" rel="noopener noreferrer" className="telegram-float">
//         <FaTelegramPlane />
//       </a>
//     </div>
//     </div> 
//   );
// };

// export default UserSupport;

import React, { useState, useRef, useEffect } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import "../styles/support.css";

const UserSupport = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_API_URL;

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ===============================
  // Fetch Messages
  // ===============================
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_URL}/api/support/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          setMessages([]);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    document.title = "Customer Support - RealSMS";
    fetchMessages();
  }, [API_URL, token]);

  // ===============================
  // Scroll to latest message
  // ===============================
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ===============================
  // Send Message
  // ===============================
  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/support/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      const data = await res.json();

      if (data) {
        setMessages((prev) => [...prev, data]);
      }

      setInput("");
    } catch (err) {
      console.error("Send message error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Handle Enter key
  // ===============================
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="user-support-page">
      <div className="user-support-container">

        {/* Header */}
        <div className="user-support-header">
          <h3>Customer Support</h3>
          <span>We typically reply within minutes</span>
        </div>

        {/* Messages */}
        <div className="user-support-body">
          {messages.length === 0 && (
            <div className="no-messages">
              Start a conversation with support
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`chat-message ${
                msg.sender === "user" ? "user" : "support"
              }`}
            >
              <div className="bubble">
                <p>{msg.message}</p>
                <span>
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
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
            onKeyDown={handleKeyDown}
            disabled={loading}
          />

          <button onClick={handleSend} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </div>

        {/* Telegram floating button */}
        <a
          href="https://t.me/real6ixsms"
          target="_blank"
          rel="noopener noreferrer"
          className="telegram-float"
        >
          <FaTelegramPlane />
        </a>

      </div>
    </div>
  );
};

export default UserSupport;
