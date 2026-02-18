// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { FiSearch } from "react-icons/fi";
// // import ServiceCard from "../components/ServiceCard";
// // import { useBalance } from "../context/BalanceContext";
// // import "../styles/buy-number.css";

// // const BuyNumbers = ({ darkMode }) => {
// //   const [countries, setCountries] = useState([]);
// //   const [services, setServices] = useState([]);
// //   const [selectedCountry, setSelectedCountry] = useState(null);
// //   const [activeOrder, setActiveOrder] = useState(null);
// //   const [orderStatus, setOrderStatus] = useState("idle");
// //   const [otp, setOtp] = useState(null);
// //   const [timeLeft, setTimeLeft] = useState(300);
// //   const [search, setSearch] = useState("");
// //   const [loadingCountries, setLoadingCountries] = useState(true);
// //   const [loadingServices, setLoadingServices] = useState(false);
// //   const [copied, setCopied] = useState(false);

// //   const { balance, debitWallet } = useBalance();
// //   const token = localStorage.getItem("token");

// //   // Backend URL from env
// //   const API_URL =
// //     process.env.REACT_APP_API_URL || "https://realsms-backend.vercel.app";

// //   useEffect(() => {
// //     document.title = "Buy Numbers - RealSMS";
// //   }, []);

// //   // ---------------- FETCH COUNTRIES ----------------
// //   useEffect(() => {
// //     const fetchCountries = async () => {
// //       if (!token) {
// //         console.warn("No JWT token found. Please login first.");
// //         setLoadingCountries(false);
// //         return;
// //       }

// //       setLoadingCountries(true);
// //       try {
// //         console.log("Fetching countries...");
// //         const res = await axios.get(`${API_URL}/api/smspool/servers`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         console.log("Countries response:", res.data);

// //         setCountries(Array.isArray(res.data) ? res.data : []);
// //       } catch (err) {
// //         console.error("Failed to load countries:", err.response?.data || err);
// //         setCountries([]);
// //       } finally {
// //         setLoadingCountries(false);
// //       }
// //     };
// //     fetchCountries();
// //   }, [token, API_URL]);

// //   // ---------------- FETCH SERVICES ----------------
// //   useEffect(() => {
// //     const fetchServices = async () => {
// //       if (!selectedCountry || !token) return;

// //       setLoadingServices(true);
// //       try {
// //         const res = await axios.get(`${API_URL}/api/smspool/services`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         console.log("Services response:", res.data);

// //         let allServices = Array.isArray(res.data) ? res.data : [];
// //         // Optional: filter by country if your API supports it
// //         // allServices = allServices.filter(s => s.countryID === selectedCountry.ID);
// //         setServices(allServices);
// //       } catch (err) {
// //         console.error("Failed to fetch services:", err.response?.data || err);
// //         setServices([]);
// //       } finally {
// //         setLoadingServices(false);
// //       }
// //     };
// //     fetchServices();
// //   }, [selectedCountry, token, API_URL]);

// //   // ---------------- HANDLE COUNTRY CHANGE ----------------
// //   const handleCountryChange = (e) => {
// //     const countryId = e.target.value;
// //     const country = countries.find((c) => c.ID.toString() === countryId) || null;
// //     setSelectedCountry(country);
// //     setActiveOrder(null);
// //     setOrderStatus("idle");
// //     setOtp(null);
// //     setTimeLeft(300);
// //     setSearch("");
// //     setCopied(false);
// //     setServices([]);
// //   };

// //   // ---------------- HANDLE BUY ----------------
// //   const handleBuy = async (service) => {
// //     if (!selectedCountry) return alert("Please select a country first!");
// //     if (balance < service.price) return alert("Insufficient balance");

// //     await debitWallet(service.price);

// //     setActiveOrder(null);
// //     setOtp(null);
// //     setTimeLeft(300);
// //     setOrderStatus("waiting");
// //     setCopied(false);

// //     try {
// //       const res = await axios.post(
// //         `${API_URL}/api/smspool/buy`,
// //         {
// //           country: selectedCountry.short_name || selectedCountry.ID,
// //           service: service.name,
// //           pool: "default",
// //           max_price: service.price,
// //           quantity: 1,
// //         },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       const orderid = res.data?.orderid || res.data?.number;
// //       setActiveOrder({ ...service, generatedNumber: orderid });

// //       // Poll OTP every 2s
// //       const pollOtp = setInterval(async () => {
// //         try {
// //           const otpRes = await axios.post(
// //             `${API_URL}/api/smspool/otp`,
// //             { orderid },
// //             { headers: { Authorization: `Bearer ${token}` } }
// //           );
// //           if (otpRes.data?.otp) {
// //             setOtp(otpRes.data.otp);
// //             setOrderStatus("received");
// //             clearInterval(pollOtp);
// //           }
// //         } catch {
// //           // ignore errors while polling
// //         }
// //       }, 2000);
// //     } catch (err) {
// //       console.error("Failed to buy number:", err.response?.data || err);
// //       alert("Failed to complete purchase");
// //       setOrderStatus("idle");
// //     }
// //   };

// //   // ---------------- OTP COUNTDOWN ----------------
// //   useEffect(() => {
// //     if (orderStatus !== "waiting") return;
// //     const timer = setInterval(() => {
// //       setTimeLeft((t) => {
// //         if (t <= 1) {
// //           clearInterval(timer);
// //           setOrderStatus("expired");
// //           return 0;
// //         }
// //         return t - 1;
// //       });
// //     }, 1000);
// //     return () => clearInterval(timer);
// //   }, [orderStatus]);

// //   // ---------------- RESET COPIED ----------------
// //   useEffect(() => {
// //     if (!copied) return;
// //     const timer = setTimeout(() => setCopied(false), 2000);
// //     return () => clearTimeout(timer);
// //   }, [copied]);

// //   const filteredServices = (Array.isArray(services) ? services : []).filter((s) =>
// //     s.name.toLowerCase().includes(search.toLowerCase())
// //   );

// //   // ---------------- RENDER ----------------
// //   return (
// //     <div className={`marketplace ${darkMode ? "dark" : ""}`}>
// //       <div className="buy-number-card">
// //         <h2>Buy Numbers</h2>

// //         {/* COUNTRY SELECT */}
// //         {loadingCountries ? (
// //           <p>Loading countries...</p>
// //         ) : (
// //           <select
// //             className="server-select"
// //             value={selectedCountry?.ID || ""}
// //             onChange={handleCountryChange}
// //           >
// //             <option value="">Select Country</option>
// //             {countries.map((c) => (
// //               <option key={c.ID} value={c.ID}>
// //                 {c.name}
// //               </option>
// //             ))}
// //           </select>
// //         )}

// //         {/* SEARCH */}
// //         <div className="search-container">
// //           <input
// //             type="text"
// //             placeholder="Search service"
// //             className="search-input"
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             disabled={!selectedCountry || loadingServices}
// //           />
// //           <FiSearch className="search-icon" />
// //         </div>

// //         {/* SERVICES */}
// //         {(selectedCountry || loadingServices) && (
// //           <div className="services-container">
// //             {loadingServices ? (
// //               <div className="loading-spinner">
// //                 <div className={`spinner ${darkMode ? "dark" : ""}`}></div>
// //                 <p>Loading services...</p>
// //               </div>
// //             ) : filteredServices.length === 0 ? (
// //               <p className="empty">No services available</p>
// //             ) : (
// //               <div className="services-grid">
// //                 {filteredServices.map((service) => (
// //                   <ServiceCard
// //                     key={service.ID || service.id}
// //                     service={service}
// //                     onBuy={handleBuy}
// //                     darkMode={darkMode}
// //                     disabled={balance < service.price}
// //                   />
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* OTP BOX */}
// //         {activeOrder && (
// //           <div className="otp-box">
// //             <div className="otp-header">
// //               <p>
// //                 <strong>Number / OrderID:</strong> {activeOrder.generatedNumber}
// //               </p>
// //               <button
// //                 className="close-btn"
// //                 onClick={() => {
// //                   setActiveOrder(null);
// //                   setCopied(false);
// //                 }}
// //               >
// //                 ×
// //               </button>
// //             </div>

// //             {orderStatus === "waiting" && (
// //               <>
// //                 <p>Waiting for OTP...</p>
// //                 <p className="timer">
// //                   {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
// //                 </p>
// //               </>
// //             )}

// //             {orderStatus === "received" && (
// //               <>
// //                 <h2>{otp}</h2>
// //                 <button
// //                   className={`copy-btn ${copied ? "copied" : ""}`}
// //                   onClick={() => {
// //                     navigator.clipboard.writeText(otp);
// //                     setCopied(true);
// //                   }}
// //                 >
// //                   {copied ? "Copied ✓" : "Copy OTP"}
// //                 </button>
// //               </>
// //             )}

// //             {orderStatus === "expired" && <p className="error">OTP expired</p>}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default BuyNumbers;

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

//   const API_URL =
//     process.env.REACT_APP_API_URL || "https://realsms-backend.vercel.app";

//   useEffect(() => {
//     document.title = "Buy Numbers - RealSMS";
//   }, []);

//   // ---------------- FETCH COUNTRIES ----------------
//   useEffect(() => {
//     const fetchCountries = async () => {
//       if (!token) {
//         setLoadingCountries(false);
//         return;
//       }

//       setLoadingCountries(true);
//       try {
//         const res = await axios.get(`${API_URL}/api/smspool/servers`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCountries(Array.isArray(res.data) ? res.data : []);
//       } catch {
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
//         const allServices = Array.isArray(res.data) ? res.data : [];
//         setServices(allServices);
//       } catch {
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
//   const handleBuy = async (service, callback) => {
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
//           // ignore polling errors
//         }
//       }, 2000);
//     } catch {
//       alert("Failed to complete purchase");
//       setOrderStatus("idle");
//     } finally {
//       callback?.();
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

//   // Filter services by search
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
//                     service={service} // price formatting handled inside ServiceCard
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";
import { useBalance } from "../context/BalanceContext";

const API_URL = process.env.REACT_APP_API_URL;
const USD_TO_NGN = 1000; // must match backend rate

const BuyNumbers = () => {
  const { balance, debitWallet } = useBalance();

  const [countries, setCountries] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [loading, setLoading] = useState(false);
  const [buying, setBuying] = useState(false);

  const [activeOrder, setActiveOrder] = useState(null);
  const [otp, setOtp] = useState(null);

  const token = localStorage.getItem("token");

  // ---------------- FETCH COUNTRIES ----------------
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/smspool/servers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCountries(res.data);
      } catch (err) {
        console.error("Failed to fetch countries", err);
      }
    };

    fetchCountries();
  }, []);

  // ---------------- FETCH SERVICES ----------------
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/smspool/services`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setServices(res.data);
      } catch (err) {
        console.error("Failed to fetch services", err);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  // ---------------- BUY NUMBER ----------------
  const handleBuy = async (service) => {
    if (!selectedCountry)
      return alert("Please select a country first.");

    if (!service.price)
      return alert("This service has no price available.");

    if (balance < service.price)
      return alert("Insufficient balance.");

    try {
      setBuying(true);

      // Debit wallet in NGN
      await debitWallet(service.price);

      // Convert NGN → USD for SMSPool
      const maxPriceUSD = service.price / USD_TO_NGN;

      const res = await axios.post(
        `${API_URL}/api/smspool/buy`,
        {
          country: selectedCountry.short_name,
          service: service.ID, // IMPORTANT: use ID
          pool: service.pool || "default",
          max_price: Number(maxPriceUSD.toFixed(2)), // USD
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const orderid = res.data.orderid;

      if (!orderid) {
        alert("Failed to receive order ID.");
        setBuying(false);
        return;
      }

      setActiveOrder({
        ...service,
        orderid,
      });

      // ---------------- POLL OTP ----------------
      const interval = setInterval(async () => {
        try {
          const otpRes = await axios.post(
            `${API_URL}/api/smspool/otp`,
            { orderid },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (otpRes.data?.otp) {
            setOtp(otpRes.data.otp);
            clearInterval(interval);
          }
        } catch (err) {
          console.log("Waiting for OTP...");
        }
      }, 3000);

    } catch (err) {
      console.error("Purchase failed:", err.response?.data || err);
      alert("Purchase failed.");
    }

    setBuying(false);
  };

  // ---------------- FILTER SERVICES BY COUNTRY ----------------
  const filteredServices = selectedCountry
    ? services.filter(
        (s) => s.countryShort === selectedCountry.short_name
      )
    : services;

  return (
    <div className="buy-numbers-page">
      <h2>Buy Virtual Numbers</h2>

      {/* Country Selector */}
      <select
        onChange={(e) =>
          setSelectedCountry(
            countries.find((c) => c.ID === Number(e.target.value))
          )
        }
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.ID} value={country.ID}>
            {country.name}
          </option>
        ))}
      </select>

      {/* Services */}
      {loading ? (
        <p>Loading services...</p>
      ) : (
        <div className="services-grid">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.ID}
              service={service}
              onBuy={handleBuy}
              disabled={balance < service.price}
            />
          ))}
        </div>
      )}

      {/* Active Order */}
      {activeOrder && (
        <div className="order-box">
          <h3>Order Created</h3>
          <p>Service: {activeOrder.name}</p>
          <p>Order ID: {activeOrder.orderid}</p>

          {otp ? (
            <h2>OTP: {otp}</h2>
          ) : (
            <p>Waiting for OTP...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BuyNumbers;
