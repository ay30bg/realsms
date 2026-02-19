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

//   // // ---------------- HANDLE BUY ----------------
//   // const handleBuy = async (service, callback) => {
//   //   if (!selectedCountry) return alert("Please select a country first!");
//   //   if (balance < service.price) return alert("Insufficient balance");

//   //   await debitWallet(service.price);

//   //   setActiveOrder(null);
//   //   setOtp(null);
//   //   setTimeLeft(300);
//   //   setOrderStatus("waiting");
//   //   setCopied(false);

//   //   try {
//   //     const res = await axios.post(
//   //       `${API_URL}/api/smspool/buy`,
//   //       {
//   //         country: selectedCountry.short_name || selectedCountry.ID,
//   //         service: service.name,
//   //         pool: "default",
//   //         max_price: service.price,
//   //         quantity: 1,
//   //       },
//   //       { headers: { Authorization: `Bearer ${token}` } }
//   //     );

//   //     const orderid = res.data?.orderid || res.data?.number;
//   //     setActiveOrder({ ...service, generatedNumber: orderid });

//   //     // Poll OTP every 2s
//   //     const pollOtp = setInterval(async () => {
//   //       try {
//   //         const otpRes = await axios.post(
//   //           `${API_URL}/api/smspool/otp`,
//   //           { orderid },
//   //           { headers: { Authorization: `Bearer ${token}` } }
//   //         );
//   //         if (otpRes.data?.otp) {
//   //           setOtp(otpRes.data.otp);
//   //           setOrderStatus("received");
//   //           clearInterval(pollOtp);
//   //         }
//   //       } catch {
//   //         // ignore polling errors
//   //       }
//   //     }, 2000);
//   //   } catch {
//   //     alert("Failed to complete purchase");
//   //     setOrderStatus("idle");
//   //   } finally {
//   //     callback?.();
//   //   }
//   // };

// // ---------------- HANDLE BUY ----------------
// const handleBuy = async (service, callback) => {
//   if (!selectedCountry) return alert("Please select a country first!");
//   if (balance < service.price) return alert("Insufficient balance");

//   // Debit wallet first
//   await debitWallet(service.price);

//   // Reset previous order info
//   setActiveOrder(null);
//   setOtp(null);
//   setTimeLeft(300);
//   setOrderStatus("waiting");
//   setCopied(false);

//   try {
//     const res = await axios.post(
//       `${API_URL}/api/smspool/buy`,
//       {
//         country: selectedCountry.short_name,   // ✅ short country code
//         service: service.ID,                    // ✅ service ID
//         pool: "default",
//         max_price: service.price / 1000,        // ✅ convert NGN -> USD
//         quantity: 1,
//       },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     // Store active order info
//     const orderid = res.data?.orderid || res.data?.number;
//     setActiveOrder({ ...service, generatedNumber: orderid });

//     // Poll OTP every 2 seconds
//     const pollOtp = setInterval(async () => {
//       try {
//         const otpRes = await axios.post(
//           `${API_URL}/api/smspool/otp`,
//           { orderid },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         if (otpRes.data?.otp) {
//           setOtp(otpRes.data.otp);
//           setOrderStatus("received");
//           clearInterval(pollOtp);
//         }
//       } catch {
//         // ignore errors during polling
//       }
//     }, 2000);

//   } catch (err) {
//     console.error("Failed to buy number:", err.response?.data || err.message);
//     alert("Failed to complete purchase");
//     setOrderStatus("idle");
//   } finally {
//     callback?.();
//   }
// };

  
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import ServiceCard from "../components/ServiceCard";
import { useBalance } from "../context/BalanceContext";
import "../styles/buy-number.css";

const BuyNumbers = ({ darkMode }) => {
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

  const { balance, debitWallet } = useBalance();
  const token = localStorage.getItem("token");
  const API_URL =
    process.env.REACT_APP_API_URL || "https://realsms-backend.vercel.app";

  let pollOtp = null; // Keep a reference for cleanup

  useEffect(() => {
    document.title = "Buy Numbers - RealSMS";
  }, []);

  // ---------------- FETCH COUNTRIES ----------------
  useEffect(() => {
    const fetchCountries = async () => {
      if (!token) {
        setLoadingCountries(false);
        return;
      }
      setLoadingCountries(true);
      try {
        const res = await axios.get(`${API_URL}/api/smspool/servers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCountries(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching countries:", err.message);
        setCountries([]);
      } finally {
        setLoadingCountries(false);
      }
    };
    fetchCountries();
  }, [token, API_URL]);

  // ---------------- FETCH SERVICES ----------------
  useEffect(() => {
    const fetchServices = async () => {
      if (!selectedCountry || !token) return;
      setLoadingServices(true);
      try {
        const res = await axios.get(`${API_URL}/api/smspool/services`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServices(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching services:", err.message);
        setServices([]);
      } finally {
        setLoadingServices(false);
      }
    };
    fetchServices();
  }, [selectedCountry, token, API_URL]);

  // ---------------- HANDLE COUNTRY CHANGE ----------------
  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    const country = countries.find((c) => c.ID.toString() === countryId) || null;
    setSelectedCountry(country);
    setActiveOrder(null);
    setOrderStatus("idle");
    setOtp(null);
    setTimeLeft(300);
    setSearch("");
    setCopied(false);
    setServices([]);
    if (pollOtp) clearInterval(pollOtp);
  };

  // ---------------- HANDLE BUY ----------------
  const handleBuy = async (service, callback) => {
    if (!selectedCountry) return alert("Please select a country first!");
    if (balance < service.price) return alert("Insufficient balance");
    if (orderStatus === "waiting") return alert("You already have an active order!");

    setOrderStatus("waiting");
    setActiveOrder(null);
    setOtp(null);
    setTimeLeft(300);
    setCopied(false);

    try {
      // Step 1: Attempt purchase API call first
      const res = await axios.post(
        `${API_URL}/api/smspool/buy`,
        {
          country: selectedCountry.short_name,
          service: service.ID,
          pool: "default",
          max_price: service.price / 1000,
          quantity: 1,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Step 2: Check for failure
      if (res.data?.success === 0 || !res.data?.orderid) {
        throw new Error(res.data?.errors?.[0]?.message || "Failed to purchase number");
      }

      const orderid = res.data.orderid || res.data.number;

      // Step 3: Debit wallet AFTER purchase success
      await debitWallet(service.price);

      // Step 4: Set active order
      setActiveOrder({ ...service, generatedNumber: orderid });

      // Step 5: Start OTP polling
      pollOtp = setInterval(async () => {
        try {
          const otpRes = await axios.post(
            `${API_URL}/api/smspool/otp`,
            { orderid },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (otpRes.data?.otp) {
            setOtp(otpRes.data.otp);
            setOrderStatus("received");
            clearInterval(pollOtp);
          }
        } catch {
          // ignore polling errors
        }
      }, 2000);
    } catch (err) {
      console.error("Purchase failed:", err.response?.data || err.message);
      alert(`Purchase failed: ${err.message}`);
      setOrderStatus("idle");
    } finally {
      callback?.();
    }
  };

  // ---------------- OTP COUNTDOWN ----------------
  useEffect(() => {
    if (orderStatus !== "waiting") return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setOrderStatus("expired");
          if (pollOtp) clearInterval(pollOtp);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [orderStatus]);

  // ---------------- RESET COPIED ----------------
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  // Filter services by search
  const filteredServices = (Array.isArray(services) ? services : []).filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  // ---------------- RENDER ----------------
  return (
    <div className={`marketplace ${darkMode ? "dark" : ""}`}>
      <div className="buy-number-card">
        <h2>Buy Numbers</h2>

        {/* COUNTRY SELECT */}
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

        {/* SEARCH */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search service"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={!selectedCountry || loadingServices}
          />
          <FiSearch className="search-icon" />
        </div>

        {/* SERVICES */}
        {(selectedCountry || loadingServices) && (
          <div className="services-container">
            {loadingServices ? (
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
                    key={service.ID || service.id}
                    service={service}
                    onBuy={handleBuy}
                    darkMode={darkMode}
                    disabled={balance < service.price || orderStatus === "waiting"}
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
                <strong>Number / OrderID:</strong> {activeOrder.generatedNumber}
              </p>
              <button
                className="close-btn"
                onClick={() => {
                  setActiveOrder(null);
                  setCopied(false);
                  setOrderStatus("idle");
                  if (pollOtp) clearInterval(pollOtp);
                }}
              >
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

            {orderStatus === "expired" && <p className="error">OTP expired</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyNumbers;
