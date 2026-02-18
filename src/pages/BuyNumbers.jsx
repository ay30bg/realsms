// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FiSearch } from "react-icons/fi";
// import ServiceCard from "../components/ServiceCard";
// import { useBalance } from "../context/BalanceContext";
// import "../styles/buy-number.css";

// const BuyNumbers = ({ darkMode }) => {
//   const [countries, setCountries] = useState([]);
//   const [services, setServices] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [activeOrder, setActiveOrder] = useState(null);
//   const [orderStatus, setOrderStatus] = useState("idle");
//   const [otp, setOtp] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(300);
//   const [search, setSearch] = useState("");
//   const [loadingCountries, setLoadingCountries] = useState(true);
//   const [loadingServices, setLoadingServices] = useState(false);
//   const [copied, setCopied] = useState(false);

//   const { balance, debitWallet } = useBalance();
//   const token = localStorage.getItem("token");

//   // Backend URL from env
//   const API_URL =
//     process.env.REACT_APP_API_URL || "https://realsms-backend.vercel.app";

//   useEffect(() => {
//     document.title = "Buy Numbers - RealSMS";
//   }, []);

//   // ---------------- FETCH COUNTRIES ----------------
//   useEffect(() => {
//     const fetchCountries = async () => {
//       if (!token) {
//         console.warn("No JWT token found. Please login first.");
//         setLoadingCountries(false);
//         return;
//       }

//       setLoadingCountries(true);
//       try {
//         console.log("Fetching countries...");
//         const res = await axios.get(`${API_URL}/api/smspool/servers`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log("Countries response:", res.data);

//         setCountries(Array.isArray(res.data) ? res.data : []);
//       } catch (err) {
//         console.error("Failed to load countries:", err.response?.data || err);
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
//         console.log("Services response:", res.data);

//         let allServices = Array.isArray(res.data) ? res.data : [];
//         // Optional: filter by country if your API supports it
//         // allServices = allServices.filter(s => s.countryID === selectedCountry.ID);
//         setServices(allServices);
//       } catch (err) {
//         console.error("Failed to fetch services:", err.response?.data || err);
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
//   };

//   // ---------------- HANDLE BUY ----------------
//   const handleBuy = async (service) => {
//     if (!selectedCountry) return alert("Please select a country first!");
//     if (balance < service.price) return alert("Insufficient balance");

//     await debitWallet(service.price);

//     setActiveOrder(null);
//     setOtp(null);
//     setTimeLeft(300);
//     setOrderStatus("waiting");
//     setCopied(false);

//     try {
//       const res = await axios.post(
//         `${API_URL}/api/smspool/buy`,
//         {
//           country: selectedCountry.short_name || selectedCountry.ID,
//           service: service.name,
//           pool: "default",
//           max_price: service.price,
//           quantity: 1,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const orderid = res.data?.orderid || res.data?.number;
//       setActiveOrder({ ...service, generatedNumber: orderid });

//       // Poll OTP every 2s
//       const pollOtp = setInterval(async () => {
//         try {
//           const otpRes = await axios.post(
//             `${API_URL}/api/smspool/otp`,
//             { orderid },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );
//           if (otpRes.data?.otp) {
//             setOtp(otpRes.data.otp);
//             setOrderStatus("received");
//             clearInterval(pollOtp);
//           }
//         } catch {
//           // ignore errors while polling
//         }
//       }, 2000);
//     } catch (err) {
//       console.error("Failed to buy number:", err.response?.data || err);
//       alert("Failed to complete purchase");
//       setOrderStatus("idle");
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

//   const filteredServices = (Array.isArray(services) ? services : []).filter((s) =>
//     s.name.toLowerCase().includes(search.toLowerCase())
//   );

//   // ---------------- RENDER ----------------
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
//                     darkMode={darkMode}
//                     disabled={balance < service.price}
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
//                 <strong>Number / OrderID:</strong> {activeOrder.generatedNumber}
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import ServiceCard from "../components/ServiceCard"; // your service card component
import "../styles/buy-number.css";
import { useBalance } from "../context/BalanceContext";

const BuyNumbers = ({ darkMode }) => {
  const [countries, setCountries] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);

  const { balance, debitWallet } = useBalance();
  const API_URL = process.env.REACT_APP_API_URL;

  // ---------------- Fetch countries ----------------
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoadingCountries(true);
        console.log("Fetching countries...");
        const res = await axios.get(`${API_URL}/api/smspool/servers`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log("Countries response:", res.data);
        setCountries(res.data);
      } catch (err) {
        console.error("Failed to fetch countries:", err.response?.data || err.message);
      } finally {
        setLoadingCountries(false);
      }
    };
    fetchCountries();
  }, [API_URL]);

  // ---------------- Fetch services ----------------
  useEffect(() => {
    const fetchServices = async () => {
      if (!selectedCountry) return;

      try {
        setLoadingServices(true);
        console.log(`Fetching services for country ID ${selectedCountry.ID}...`);
        const res = await axios.get(`${API_URL}/api/smspool/services/${selectedCountry.ID}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log("Services response:", res.data);

        // Filter services by selected country (if API returns all)
        const filteredServices = res.data
          .map((s) => ({
            ID: s.ID || s.id,
            name: s.name || s.service_name || "Unknown Service",
            price: s.price || s.cost || (s.prices?.[0]?.price || 0),
            countryID: s.countryID || s.country_id || (s.country?.ID || null),
          }))
          .filter((s) => s.countryID === selectedCountry.ID);

        setServices(filteredServices);
      } catch (err) {
        console.error("Failed to fetch services:", err.response?.data || err.message);
        setServices([]);
      } finally {
        setLoadingServices(false);
      }
    };
    fetchServices();
  }, [selectedCountry, API_URL]);

  // ---------------- Handle Buy Number ----------------
  const handleBuyNumber = async (service) => {
    if (service.price > balance) {
      alert("Insufficient balance");
      return;
    }

    try {
      await debitWallet(service.price); // deduct from wallet

      const res = await axios.post(
        `${API_URL}/api/smspool/buy`,
        {
          country: selectedCountry.short_name,
          service: service.ID,
          quantity: 1,
          max_price: service.price,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      alert(`Number purchased successfully: ${res.data.number || "Check dashboard"}`);
    } catch (err) {
      console.error("Failed to buy number:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to buy number");
    }
  };

  return (
    <div className="buy-numbers-wrapper">
      {/* Country Selector */}
      <div className="country-selector">
        {loadingCountries ? (
          <p>Loading countries...</p>
        ) : (
          <select
            value={selectedCountry?.ID || ""}
            onChange={(e) => {
              const country = countries.find((c) => c.ID === Number(e.target.value));
              setSelectedCountry(country);
            }}
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c.ID} value={c.ID}>
                {c.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Services List */}
      <div className="services-list">
        {loadingServices ? (
          <p>Loading services...</p>
        ) : services.length > 0 ? (
          services.map((service) => (
            <ServiceCard
              key={service.ID}
              service={service}
              onBuy={() => handleBuyNumber(service)}
            />
          ))
        ) : (
          <p>No services available for this country</p>
        )}
      </div>
    </div>
  );
};

export default BuyNumbers;

