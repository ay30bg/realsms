// import React, { useState, useEffect } from "react";
// import { FiSearch } from "react-icons/fi";
// import ServiceCard from "../components/ServiceCard";
// import { servers, services } from "../data/services";
// import "../styles/buy-number.css";
// import { useBalance } from "../context/BalanceContext"; // ✅ Import balance context

// const BuyNumbers = ({ darkMode }) => {
//   // PAGE TITLE
//   useEffect(() => {
//     document.title = "Buy Numbers - RealSMS";
//   }, []);

//   const [selectedServer, setSelectedServer] = useState(null);
//   const [activeOrder, setActiveOrder] = useState(null);
//   const [orderStatus, setOrderStatus] = useState("idle");
//   const [otp, setOtp] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(300);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [copied, setCopied] = useState(false);

//   // ✅ Get real balance & wallet functions
//   const { balance, debitWallet } = useBalance();

//   // SERVER CHANGE
//   const handleServerChange = (e) => {
//     const serverId = Number(e.target.value);
//     const server = servers.find((s) => s.id === serverId);

//     setSelectedServer(null);
//     setActiveOrder(null);
//     setOrderStatus("idle");
//     setOtp(null);
//     setTimeLeft(300);
//     setSearch("");
//     setCopied(false);
//     setLoading(true);

//     setTimeout(() => {
//       setSelectedServer(server || null);
//       setLoading(false);
//     }, 1000);
//   };

//   // HANDLE BUY
//   const handleBuy = async (service, stopButtonSpinner) => {
//     // ✅ Check balance first
//     if (balance < service.price) {
//       alert("Insufficient balance to buy this service");
//       if (stopButtonSpinner) stopButtonSpinner();
//       return;
//     }

//     try {
//       // ✅ Deduct balance in backend
//       await debitWallet(service.price);

//       const localNumber = Math.floor(7000000000 + Math.random() * 99999999);
//       const countryCode = "+234";
//       const generatedNumber = `${countryCode}${localNumber}`;

//       setOtp(null);
//       setTimeLeft(300);
//       setOrderStatus("idle");
//       setActiveOrder(null);
//       setCopied(false);

//       setTimeout(() => {
//         if (stopButtonSpinner) stopButtonSpinner();

//         setActiveOrder({ ...service, generatedNumber });
//         setOrderStatus("waiting");

//         setTimeout(() => {
//           const simulatedOtp = Math.floor(100000 + Math.random() * 900000);
//           setOtp(simulatedOtp);
//           setOrderStatus("received");
//         }, 2000);
//       }, 3000);
//     } catch (err) {
//       console.error("Failed to debit wallet", err);
//       alert("Failed to complete purchase. Please try again.");
//       if (stopButtonSpinner) stopButtonSpinner();
//     }
//   };

//   // OTP COUNTDOWN TIMER
//   useEffect(() => {
//     if (orderStatus !== "waiting") return;

//     const timer = setInterval(() => {
//       setTimeLeft((t) => {
//         if (t <= 1) {
//           clearInterval(timer);
//           setOrderStatus("expired");
//           return 0;
//         }
//         return t - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [orderStatus]);

//   // COPY OTP → RESET AFTER 2 SECONDS
//   useEffect(() => {
//     if (!copied) return;

//     const timer = setTimeout(() => {
//       setCopied(false);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [copied]);

//   const filteredServices = selectedServer
//     ? services
//         .filter((s) => s.serverId === selectedServer.id)
//         .filter((s) =>
//           s.name.toLowerCase().includes(search.toLowerCase())
//         )
//     : [];

//   return (
//     <div className={`marketplace ${darkMode ? "dark" : ""}`}>
//       <div className="buy-number-card">
//         <h2>Buy Numbers</h2>

//         {/* SERVER SELECT */}
//         <select
//           className="server-select"
//           value={selectedServer?.id || ""}
//           onChange={handleServerChange}
//         >
//           <option value="">Select Server</option>
//           {servers.map((server) => (
//             <option key={server.id} value={server.id}>
//               {server.name}
//             </option>
//           ))}
//         </select>

//         {/* SEARCH */}
//         <div className="search-container">
//           <input
//             type="text"
//             placeholder="Search service"
//             className="search-input"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             disabled={!selectedServer || loading}
//           />
//           <FiSearch className="search-icon" />
//         </div>

//         {/* SERVICES */}
//         {(selectedServer || loading) && (
//           <div className="services-container">
//             {loading ? (
//               <div className="loading-spinner">
//                 <div className={`spinner ${darkMode ? "dark" : ""}`}></div>
//                 <p>Loading services...</p>
//               </div>
//             ) : filteredServices.length === 0 ? (
//               <p className="empty">No services available</p>
//             ) : (
//               <div className="services-grid">
//                 {filteredServices.map((service) => (
//                   <ServiceCard
//                     key={service.id}
//                     service={service}
//                     onBuy={handleBuy}
//                     darkMode={darkMode}
//                     disabled={balance < service.price} // ✅ disable if not enough balance
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* OTP BOX */}
//         {activeOrder && (
//           <div className="otp-box">
//             <div className="otp-header">
//               <p>
//                 <strong>Number:</strong> {activeOrder.generatedNumber}
//               </p>
//               <button
//                 className="close-btn"
//                 onClick={() => {
//                   setActiveOrder(null);
//                   setCopied(false);
//                 }}
//               >
//                 ×
//               </button>
//             </div>

//             {orderStatus === "waiting" && (
//               <>
//                 <p>Waiting for OTP...</p>
//                 <p className="timer">
//                   {Math.floor(timeLeft / 60)}:
//                   {String(timeLeft % 60).padStart(2, "0")}
//                 </p>
//               </>
//             )}

//             {orderStatus === "received" && (
//               <>
//                 <h2>{otp}</h2>
//                 <button
//                   className={`copy-btn ${copied ? "copied" : ""}`}
//                   onClick={() => {
//                     navigator.clipboard.writeText(otp);
//                     setCopied(true);
//                   }}
//                 >
//                   {copied ? "Copied ✓" : "Copy OTP"}
//                 </button>
//               </>
//             )}

//             {orderStatus === "expired" && (
//               <p className="error">OTP expired</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BuyNumbers;

import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import ServiceCard from "../components/ServiceCard";
import { servers, services } from "../data/services";
import "../styles/buy-number.css";
import { useBalance } from "../context/BalanceContext";

const API_URL = process.env.REACT_APP_API_URL;

const BuyNumbers = ({ darkMode }) => {
  useEffect(() => {
    document.title = "Buy Numbers - RealSMS";
  }, []);

  const [selectedServer, setSelectedServer] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState("idle");
  const [otp, setOtp] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const { balance } = useBalance();

  const handleServerChange = (e) => {
    const serverId = Number(e.target.value);
    const server = servers.find((s) => s.id === serverId);

    setSelectedServer(server || null);
    setActiveOrder(null);
    setOrderStatus("idle");
    setOtp(null);
    setTimeLeft(300);
    setSearch("");
  };

  // ===========================
  // BUY NUMBER FROM BACKEND
  // ===========================
  const handleBuy = async (service, stopSpinner) => {
    if (balance < service.price) {
      alert("Insufficient balance");
      if (stopSpinner) stopSpinner();
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/5sim/buy-number`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          country: "nigeria", // adjust to your 5sim country code
          service: service.slug, // ensure your service has slug for 5sim
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to buy number");

      setActiveOrder({
        id: data.numberData.id,
        number: data.numberData.phone,
        service,
      });

      setOrderStatus("waiting");
      setTimeLeft(300);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
      if (stopSpinner) stopSpinner();
    }
  };

  // ===========================
  // POLL FOR OTP
  // ===========================
  useEffect(() => {
    if (orderStatus !== "waiting" || !activeOrder) return;

    const token = localStorage.getItem("token");

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_URL}/api/5sim/check-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ orderId: activeOrder.id }),
        });

        const data = await res.json();

        if (data.otp) {
          setOtp(data.otp);
          setOrderStatus("received");
          clearInterval(interval);
        }
      } catch (err) {
        console.error("OTP check failed");
      }
    }, 5000); // check every 5 seconds

    return () => clearInterval(interval);
  }, [orderStatus, activeOrder]);

  // ===========================
  // COUNTDOWN TIMER
  // ===========================
  useEffect(() => {
    if (orderStatus !== "waiting") return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setOrderStatus("expired");
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [orderStatus]);

  const filteredServices = selectedServer
    ? services
        .filter((s) => s.serverId === selectedServer.id)
        .filter((s) =>
          s.name.toLowerCase().includes(search.toLowerCase())
        )
    : [];

  return (
    <div className={`marketplace ${darkMode ? "dark" : ""}`}>
      <div className="buy-number-card">
        <h2>Buy Numbers</h2>

        <select
          className="server-select"
          value={selectedServer?.id || ""}
          onChange={handleServerChange}
        >
          <option value="">Select Server</option>
          {servers.map((server) => (
            <option key={server.id} value={server.id}>
              {server.name}
            </option>
          ))}
        </select>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search service"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={!selectedServer}
          />
          <FiSearch className="search-icon" />
        </div>

        {selectedServer && (
          <div className="services-grid">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBuy={handleBuy}
                darkMode={darkMode}
                disabled={balance < service.price || loading}
              />
            ))}
          </div>
        )}

        {/* OTP BOX */}
        {activeOrder && (
          <div className="otp-box">
            <div className="otp-header">
              <p>
                <strong>Number:</strong> {activeOrder.number}
              </p>
              <button
                className="close-btn"
                onClick={() => setActiveOrder(null)}
              >
                ×
              </button>
            </div>

            {orderStatus === "waiting" && (
              <>
                <p>Waiting for OTP...</p>
                <p className="timer">
                  {Math.floor(timeLeft / 60)}:
                  {String(timeLeft % 60).padStart(2, "0")}
                </p>
              </>
            )}

            {orderStatus === "received" && (
              <>
                <h2>{otp}</h2>
                <button
                  className={`copy-btn ${copied ? "copied" : ""}`}
                  onClick={() => {
                    navigator.clipboard.writeText(otp);
                    setCopied(true);
                  }}
                >
                  {copied ? "Copied ✓" : "Copy OTP"}
                </button>
              </>
            )}

            {orderStatus === "expired" && (
              <p className="error">OTP expired</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyNumbers;
