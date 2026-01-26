// import React, { useState, useEffect } from "react";
// import { FiSearch } from "react-icons/fi"; // Search icon
// import ServiceCard from "../components/ServiceCard";
// import { servers, services } from "../data/services";
// import "../styles/buy-number.css";

// const BuyNumbers = ({ darkMode }) => {
//   const [selectedServer, setSelectedServer] = useState(null);
//   const [activeOrder, setActiveOrder] = useState(null);
//   const [orderStatus, setOrderStatus] = useState("idle");
//   const [otp, setOtp] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(300);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleServerChange = (e) => {
//     const serverId = Number(e.target.value);
//     const server = servers.find((s) => s.id === serverId);

//     // Reset everything
//     setSelectedServer(null);
//     setActiveOrder(null);
//     setOrderStatus("idle");
//     setOtp(null);
//     setTimeLeft(300);
//     setSearch("");
//     setLoading(true); // start spinner

//     // Simulate fetching services
//     setTimeout(() => {
//       setSelectedServer(server || null);
//       setLoading(false); // stop spinner
//     }, 1000); // spinner shows for 1 second
//   };

//   const handleBuy = (service) => {
//     const localNumber = Math.floor(7000000000 + Math.random() * 99999999);
//     const countryCode = "+234";
//     const generatedNumber = `${countryCode}${localNumber}`;

//     setActiveOrder({ ...service, generatedNumber });
//     setOrderStatus("waiting");
//     setTimeLeft(300);

//     setTimeout(() => {
//       const simulatedOtp = Math.floor(100000 + Math.random() * 900000);
//       setOtp(simulatedOtp);
//       setOrderStatus("received");
//     }, 3000);
//   };

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

//   const filteredServices =
//     selectedServer
//       ? services
//           .filter((s) => s.serverId === selectedServer.id)
//           .filter((s) =>
//             s.name.toLowerCase().includes(search.toLowerCase())
//           )
//       : [];

//   return (
//     <div className={`marketplace ${darkMode ? "dark" : ""}`}>
//       <h2>Buy Numbers</h2>

//       {/* SERVER SELECT */}
//       <select
//         className="server-select"
//         value={selectedServer?.id || ""}
//         onChange={handleServerChange}
//       >
//         <option value="">Select Server</option>
//         {servers.map((server) => (
//           <option key={server.id} value={server.id}>
//             {server.name}
//           </option>
//         ))}
//       </select>

//       {/* SEARCH INPUT WITH ICON */}
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search service"
//           className="search-input"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           disabled={!selectedServer || loading}
//         />
//         <FiSearch className="search-icon" />
//       </div>

//       {/* SERVICES OR LOADING AREA */}
//       {(selectedServer || loading) && (
//         <div className="services-container">
//           {loading ? (
//             <div className="loading-spinner">
//               <div className={`spinner ${darkMode ? "dark" : ""}`}></div>
//               <p>Loading services...</p>
//             </div>
//           ) : filteredServices.length === 0 ? (
//             <p className="empty">No services available</p>
//           ) : (
//             <div className="services-grid">
//               {filteredServices.map((service) => (
//                 <ServiceCard
//                   key={service.id}
//                   service={service}
//                   onBuy={handleBuy}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {/* OTP BOX */}
//       {activeOrder && (
//         <div className="otp-box">
//           <div className="otp-header">
//             <p>
//               <strong>Number:</strong> {activeOrder.generatedNumber}
//             </p>
//             <button className="close-btn" onClick={() => setActiveOrder(null)}>
//               ×
//             </button>
//           </div>

//           {orderStatus === "waiting" && (
//             <>
//               <p>Waiting for OTP...</p>
//               <p className="timer">
//                 {Math.floor(timeLeft / 60)}:
//                 {String(timeLeft % 60).padStart(2, "0")}
//               </p>
//             </>
//           )}

//           {orderStatus === "received" && (
//             <>
//               <h2>{otp}</h2>
//               <button
//                 className="copy-btn"
//                 onClick={() => navigator.clipboard.writeText(otp)}
//               >
//                 Copy OTP
//               </button>
//             </>
//           )}

//           {orderStatus === "expired" && <p className="error">OTP expired</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BuyNumbers;

import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import ServiceCard from "../components/ServiceCard";
import { servers, services } from "../data/services";
import "../styles/buy-number.css";

const BuyNumbers = ({ darkMode }) => {
  const [selectedServer, setSelectedServer] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState("idle");
  const [otp, setOtp] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // SERVER CHANGE
  const handleServerChange = (e) => {
    const serverId = Number(e.target.value);
    const server = servers.find((s) => s.id === serverId);

    // Reset everything
    setSelectedServer(null);
    setActiveOrder(null);
    setOrderStatus("idle");
    setOtp(null);
    setTimeLeft(300);
    setSearch("");
    setLoading(true);

    // Simulate fetching services
    setTimeout(() => {
      setSelectedServer(server || null);
      setLoading(false);
    }, 1000);
  };

  // HANDLE BUY
  const handleBuy = (service, stopButtonSpinner) => {
  const localNumber = Math.floor(7000000000 + Math.random() * 99999999);
  const countryCode = "+234";
  const generatedNumber = `${countryCode}${localNumber}`;

  // Reset previous OTP/order
  setOtp(null);
  setTimeLeft(300);
  setOrderStatus("idle");
  setActiveOrder(null);

  // Spinner delay first
  setTimeout(() => {
    // Stop button spinner
    if (stopButtonSpinner) stopButtonSpinner();

    // Show OTP box and start waiting
    setActiveOrder({ ...service, generatedNumber });
    setOrderStatus("waiting");

    // Simulate OTP received after 2 seconds
    setTimeout(() => {
      const simulatedOtp = Math.floor(100000 + Math.random() * 900000);
      setOtp(simulatedOtp);
      setOrderStatus("received");
    }, 2000); // OTP delay
  }, 3000); // spinner duration
};

  // TIMER FOR WAITING OTP
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

  const filteredServices =
    selectedServer
      ? services
          .filter((s) => s.serverId === selectedServer.id)
          .filter((s) =>
            s.name.toLowerCase().includes(search.toLowerCase())
          )
      : [];

  return (
    <div className={`marketplace ${darkMode ? "dark" : ""}`}>
      <h2>Buy Numbers</h2>

      {/* SERVER SELECT */}
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

      {/* SEARCH INPUT */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search service"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={!selectedServer || loading}
        />
        <FiSearch className="search-icon" />
      </div>

      {/* SERVICES */}
      {(selectedServer || loading) && (
        <div className="services-container">
          {loading ? (
            <div className="loading-spinner">
              <div className={`spinner ${darkMode ? "dark" : ""}`}></div>
              <p>Loading services...</p>
            </div>
          ) : filteredServices.length === 0 ? (
            <p className="empty">No services available</p>
          ) : (
            <div className="services-grid">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onBuy={handleBuy}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* OTP BOX */}
      {activeOrder && (
        <div className="otp-box">
          <div className="otp-header">
            <p>
              <strong>Number:</strong> {activeOrder.generatedNumber}
            </p>
            <button className="close-btn" onClick={() => setActiveOrder(null)}>
              ×
            </button>
          </div>

          {orderStatus === "waiting" && (
            <>
              <p>Waiting for OTP...</p>
              <p className="timer">
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
              </p>
            </>
          )}

          {orderStatus === "received" && (
            <>
              <h2>{otp}</h2>
              <button
                className="copy-btn"
                onClick={() => navigator.clipboard.writeText(otp)}
              >
                Copy OTP
              </button>
            </>
          )}

          {orderStatus === "expired" && <p className="error">OTP expired</p>}
        </div>
      )}
    </div>
  );
};

export default BuyNumbers;
