// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { FiSearch, FiCopy } from "react-icons/fi";
// import ServiceCard from "../components/ServiceCard";
// import { useBalance } from "../context/BalanceContext";
// import "../styles/buy-number.css";

// const BuyNumbers = ({ darkMode }) => {
//   const { balance } = useBalance();
//   const [countries, setCountries] = useState([]);
//   const [services, setServices] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [activeOrder, setActiveOrder] = useState(null);
//   const [orderStatus, setOrderStatus] = useState("idle"); // idle, waiting, received, expired
//   const [otp, setOtp] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(300);
//   const [search, setSearch] = useState("");
//   const [loadingCountries, setLoadingCountries] = useState(true);
//   const [loadingServices, setLoadingServices] = useState(false);
//   const [copied, setCopied] = useState(false);

//   const token = localStorage.getItem("token");
//   const API_URL = process.env.REACT_APP_API_URL || "https://realsms-backend.vercel.app";

//   const pollOtp = useRef(null);

//   useEffect(() => {
//     document.title = "Buy Numbers - RealSMS";
//   }, []);

//   // ---------------- FETCH COUNTRIES ----------------
//   useEffect(() => {
//     const fetchCountries = async () => {
//       if (!token) return setLoadingCountries(false);
//       setLoadingCountries(true);
//       try {
//         const res = await axios.get(`${API_URL}/api/smspool/servers`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCountries(Array.isArray(res.data) ? res.data : []);
//       } catch (err) {
//         console.error("Error fetching countries:", err.message);
//         setCountries([]);
//       } finally {
//         setLoadingCountries(false);
//       }
//     };
//     fetchCountries();
//   }, [token, API_URL]);

//   // ---------------- FETCH SERVICES ----------------
//   useEffect(() => {
//     const fetchServices = async () => {
//       if (!selectedCountry || !token) return;
//       setLoadingServices(true);
//       try {
//         const res = await axios.get(`${API_URL}/api/smspool/services`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const data = Array.isArray(res.data) ? res.data : [];
//         const servicesWithPrice = data.map((s) => {
//           const priceObj = s.pricing?.find(
//             (p) => String(p.countryID) === String(selectedCountry.ID)
//           );
//           return {
//             ...s,
//             price: priceObj?.priceNGN || null,
//           };
//         });

//         setServices(servicesWithPrice);
//       } catch (err) {
//         console.error("Error fetching services:", err.message);
//         setServices([]);
//       } finally {
//         setLoadingServices(false);
//       }
//     };
//     fetchServices();
//   }, [selectedCountry, token, API_URL]);

//   // ---------------- HANDLE COUNTRY CHANGE ----------------
//   const handleCountryChange = (e) => {
//     const countryId = e.target.value;
//     const country = countries.find((c) => c.ID.toString() === countryId) || null;
//     setSelectedCountry(country);
//     setActiveOrder(null);
//     setOrderStatus("idle");
//     setOtp(null);
//     setTimeLeft(300);
//     setSearch("");
//     setCopied(false);
//     setServices([]);
//     if (pollOtp.current) clearInterval(pollOtp.current);
//   };

//   // ---------------- HANDLE BUY ----------------
//   const handleBuy = async (service) => {
//     if (!selectedCountry) return alert("Please select a country first!");
//     if (!service.price) return alert("Service not available for this country!");
//     if (balance < service.price) return alert("Insufficient balance");
//     if (orderStatus === "waiting") return alert("You already have an active order!");

//     setOrderStatus("waiting");
//     setActiveOrder(null);
//     setOtp(null);
//     setTimeLeft(300);
//     setCopied(false);

//     try {
//       const res = await axios.post(
//         `${API_URL}/api/smspool/buy`,
//         { country: selectedCountry.ID, service: service.ID },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data.success === 0) {
//         setOrderStatus("idle");
//         return alert(`Purchase failed: ${res.data.message}`);
//       }

//       const { number, orderid, remainingBalance } = res.data.data;

//       setActiveOrder({ ...service, number, orderid });

//       if (remainingBalance !== undefined) {
//         localStorage.setItem("balance", remainingBalance);
//       }

//       // Start OTP polling
//       pollOtp.current = setInterval(async () => {
//         try {
//           const otpRes = await axios.post(
//             `${API_URL}/api/smspool/otp`,
//             { orderid },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );
//           if (otpRes.data?.otp) {
//             setOtp(otpRes.data.otp);
//             setOrderStatus("received");
//             clearInterval(pollOtp.current);
//           }
//         } catch {}
//       }, 2000);
//     } catch (err) {
//       console.error("Buy error:", err.response?.data || err.message);
//       setOrderStatus("idle");
//       alert(`Purchase failed: ${err.response?.data?.message || err.message}`);
//     }
//   };

//   // ---------------- OTP COUNTDOWN ----------------
//   useEffect(() => {
//     if (orderStatus !== "waiting") return;
//     const timer = setInterval(() => {
//       setTimeLeft((t) => {
//         if (t <= 1) {
//           clearInterval(timer);
//           setOrderStatus("expired");
//           if (pollOtp.current) clearInterval(pollOtp.current);
//           return 0;
//         }
//         return t - 1;
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [orderStatus]);

//   // ---------------- RESET COPIED ----------------
//   useEffect(() => {
//     if (!copied) return;
//     const timer = setTimeout(() => setCopied(false), 2000);
//     return () => clearTimeout(timer);
//   }, [copied]);

//   const filteredServices = services.filter((s) =>
//     s.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className={`marketplace ${darkMode ? "dark" : ""}`}>
//       <div className="buy-number-card">
//         <h2>Buy Numbers</h2>

//         {/* COUNTRY SELECT */}
//         {loadingCountries ? (
//           <p>Loading countries...</p>
//         ) : (
//           <select
//             className="server-select"
//             value={selectedCountry?.ID || ""}
//             onChange={handleCountryChange}
//           >
//             <option value="">Select Country</option>
//             {countries.map((c) => (
//               <option key={c.ID} value={c.ID}>
//                 {c.name}
//               </option>
//             ))}
//           </select>
//         )}

//         {/* SEARCH */}
//         <div className="search-container">
//           <input
//             type="text"
//             placeholder="Search service"
//             className="search-input"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             disabled={!selectedCountry || loadingServices}
//           />
//           <FiSearch className="search-icon" />
//         </div>

//         {/* SERVICES */}
//         {(selectedCountry || loadingServices) && (
//           <div className="services-container">
//             {loadingServices ? (
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
//                     key={service.ID || service.id}
//                     service={service}
//                     onBuy={handleBuy}
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
//                 <strong>Number:</strong> {activeOrder.number}{" "}
//                 <FiCopy
//                   className="copy-icon"
//                   onClick={() => {
//                     navigator.clipboard.writeText(activeOrder.number);
//                     setCopied(true);
//                   }}
//                   style={{ cursor: "pointer", marginLeft: "8px" }}
//                 />
//                 {copied && <span style={{ marginLeft: "6px", color: "#28a745" }}>Copied ✓</span>}
//               </p>
//               <button
//                 className="close-btn"
//                 onClick={() => {
//                   setActiveOrder(null);
//                   setCopied(false);
//                   setOrderStatus("idle");
//                   setOtp(null);
//                   if (pollOtp.current) clearInterval(pollOtp.current);
//                 }}
//               >
//                 ×
//               </button>
//             </div>

//             {orderStatus === "waiting" && (
//               <>
//                 <p>Waiting for OTP...</p>
//                 <p className="timer">
//                   {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
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

//             {orderStatus === "expired" && <p className="error">OTP expired</p>}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BuyNumbers;


import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FiSearch, FiCopy } from "react-icons/fi";
import ServiceCard from "../components/ServiceCard";
import { useBalance } from "../context/BalanceContext";
import "../styles/buy-number.css";

const BuyNumbers = ({ darkMode }) => {
  const { balance, setBalance } = useBalance();

  const [countries, setCountries] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState("idle");
  const [otp, setOtp] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [search, setSearch] = useState("");
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingServices, setLoadingServices] = useState(false);
  const [copied, setCopied] = useState(false);

  const token = localStorage.getItem("token");
  const API_URL =
    process.env.REACT_APP_API_URL ||
    "https://realsms-backend.vercel.app";

  const pollOtp = useRef(null);

  useEffect(() => {
    document.title = "Buy Numbers - RealSMS";
  }, []);

  /* ================= FETCH COUNTRIES ================= */
  useEffect(() => {
    const fetchCountries = async () => {
      if (!token) return setLoadingCountries(false);
      try {
        const res = await axios.get(`${API_URL}/api/smspool/servers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCountries(Array.isArray(res.data) ? res.data : []);
      } catch {
        setCountries([]);
      } finally {
        setLoadingCountries(false);
      }
    };
    fetchCountries();
  }, [token, API_URL]);

  /* ================= FETCH SERVICES ================= */
  useEffect(() => {
    const fetchServices = async () => {
      if (!selectedCountry || !token) return;
      setLoadingServices(true);

      try {
        const res = await axios.get(`${API_URL}/api/smspool/services`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = Array.isArray(res.data) ? res.data : [];

        const servicesWithPrice = data
          .map((s) => {
            const priceObj = s.pricing?.find(
              (p) => String(p.countryID) === String(selectedCountry.ID)
            );

            if (!priceObj) return null;

            return {
              ...s,
              price: priceObj.priceNGN,
              stock: priceObj.stock,
            };
          })
          .filter(Boolean);

        setServices(servicesWithPrice);
      } catch {
        setServices([]);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, [selectedCountry, token, API_URL]);

  /* ================= HANDLE COUNTRY CHANGE ================= */
  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    const country =
      countries.find((c) => c.ID.toString() === countryId) || null;

    setSelectedCountry(country);
    setActiveOrder(null);
    setOrderStatus("idle");
    setOtp(null);
    setTimeLeft(300);
    setSearch("");
    setCopied(false);
    setServices([]);

    if (pollOtp.current) clearInterval(pollOtp.current);
  };

  /* ================= HANDLE BUY ================= */
  const handleBuy = async (service) => {
    if (!selectedCountry) return alert("Select a country first");
    if (!service.price) return alert("Service unavailable");
    if (service.stock <= 0) return alert("Out of stock");
    if (balance < service.price) return alert("Insufficient balance");
    if (orderStatus === "waiting")
      return alert("You already have an active order");

    setOrderStatus("waiting");
    setOtp(null);
    setTimeLeft(300);
    setCopied(false);

    try {
      const res = await axios.post(
        `${API_URL}/api/smspool/buy`,
        { country: selectedCountry.ID, service: service.ID },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success === 0) {
        setOrderStatus("idle");
        return alert(res.data.message);
      }

      const { number, orderid, pricePaid } = res.data.data;

      setActiveOrder({
        ...service,
        number,
        orderid,
        pricePaid,
      });

      if (res.data.remainingBalance !== undefined) {
        setBalance(res.data.remainingBalance);
      }

      /* OTP POLLING */
      pollOtp.current = setInterval(async () => {
        try {
          const otpRes = await axios.post(
            `${API_URL}/api/smspool/otp`,
            { orderid },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (otpRes.data?.otp) {
            setOtp(otpRes.data.otp);
            setOrderStatus("received");
            clearInterval(pollOtp.current);
          }
        } catch {}
      }, 2000);
    } catch (err) {
      setOrderStatus("idle");
      alert(err.response?.data?.message || "Purchase failed");
    }
  };

  /* ================= COUNTDOWN ================= */
  useEffect(() => {
    if (orderStatus !== "waiting") return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setOrderStatus("expired");
          if (pollOtp.current) clearInterval(pollOtp.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [orderStatus]);

  /* ================= FILTER ================= */
  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`marketplace ${darkMode ? "dark" : ""}`}>
      <div className="buy-number-card">
        <h2>Buy Numbers</h2>

        {loadingCountries ? (
          <p>Loading countries...</p>
        ) : (
          <select
            className="server-select"
            value={selectedCountry?.ID || ""}
            onChange={handleCountryChange}
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c.ID} value={c.ID}>
                {c.name}
              </option>
            ))}
          </select>
        )}

        <div className="search-container">
          <input
            type="text"
            placeholder="Search service"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={!selectedCountry}
          />
          <FiSearch className="search-icon" />
        </div>

        <div className="services-grid">
          {loadingServices ? (
            <p>Loading services...</p>
          ) : filteredServices.length === 0 ? (
            <p>No services available</p>
          ) : (
            filteredServices.map((service) => (
              <ServiceCard
                key={service.ID}
                service={service}
                onBuy={handleBuy}
              />
            ))
          )}
        </div>

        {activeOrder && (
          <div className="otp-box">
            <p>
              <strong>Number:</strong> {activeOrder.number}
            </p>

            <p>
              <strong>Amount Paid:</strong> ₦{activeOrder.pricePaid}
            </p>

            {orderStatus === "waiting" && (
              <p>
                Waiting for OTP...{" "}
                {Math.floor(timeLeft / 60)}:
                {String(timeLeft % 60).padStart(2, "0")}
              </p>
            )}

            {orderStatus === "received" && (
              <>
                <h2>{otp}</h2>

                <button
                  className={`copy-btn ${copied ? "copied" : ""}`}
                  onClick={() => {
                    navigator.clipboard.writeText(otp);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                >
                  <FiCopy />
                  {copied ? "Copied!" : "Copy OTP"}
                </button>
              </>
            )}

            {orderStatus === "expired" && (
              <p style={{ color: "red" }}>OTP expired</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyNumbers;
