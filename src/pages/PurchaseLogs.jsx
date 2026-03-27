// // import React, { useState, useEffect } from "react";
// // import { FiSearch, FiCopy } from "react-icons/fi";
// // import SocialServiceCard from "../components/SocialServiceCard";
// // import "../styles/buy-number.css";

// // // ✅ IMPORT ICONS
// // import instagramIcon from "../assets/instagram.png";
// // import facebookIcon from "../assets/facebook.png";
// // import twitterIcon from "../assets/twitter.png";
// // import tiktokIcon from "../assets/tiktok.png";

// // const BuySocialLogs = ({ darkMode }) => {
// //   const [categories, setCategories] = useState([]);
// //   const [products, setProducts] = useState([]);
// //   const [selectedCategory, setSelectedCategory] = useState(null);
// //   const [activeOrder, setActiveOrder] = useState(null);
// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [copied, setCopied] = useState(false);

// //   // ---------------- INIT ----------------
// //   useEffect(() => {
// //     document.title = "Purchase Logs - RealSMS";

// //     setCategories([
// //       { id: 1, name: "Instagram" },
// //       { id: 2, name: "Facebook" },
// //       { id: 3, name: "Twitter (X)" },
// //       { id: 4, name: "TikTok" },
// //     ]);
// //   }, []);

// //   // ---------------- LOAD PRODUCTS ----------------
// //   useEffect(() => {
// //     if (!selectedCategory) return;

// //     setLoading(true);

// //     setTimeout(() => {
// //       const mockProducts = [
// //         {
// //           id: 1,
// //           name: "Instagram Aged Account",
// //           price: 1500,
// //           stock: 20,
// //           type: "Aged",
// //           details: "user:insta01 | pass:123456",
// //           category: 1,
// //           icon: instagramIcon,
// //         },
// //         {
// //           id: 2,
// //           name: "Instagram PVA Account",
// //           price: 1200,
// //           stock: 15,
// //           type: "PVA",
// //           details: "user:pva_acc | pass:abc123",
// //           category: 1,
// //           icon: instagramIcon,
// //         },
// //         {
// //           id: 3,
// //           name: "Facebook Verified Account",
// //           price: 2500,
// //           stock: 10,
// //           type: "Verified",
// //           details: "email:test@mail.com | pass:abcd",
// //           category: 2,
// //           icon: facebookIcon,
// //         },
// //         {
// //           id: 4,
// //           name: "Twitter Aged Account",
// //           price: 1300,
// //           stock: 8,
// //           type: "Aged",
// //           details: "user:oldx | pass:pass123",
// //           category: 3,
// //           icon: twitterIcon,
// //         },
// //         {
// //           id: 5,
// //           name: "TikTok Creator Account",
// //           price: 1800,
// //           stock: 12,
// //           type: "Creator",
// //           details: "user:tiktokpro | pass:tt123",
// //           category: 4,
// //           icon: tiktokIcon,
// //         },
// //       ];

// //       const filtered = mockProducts.filter(
// //         (p) => p.category === selectedCategory.id
// //       );

// //       setProducts(filtered);
// //       setLoading(false);
// //     }, 800);
// //   }, [selectedCategory]);

// //   // ---------------- HANDLERS ----------------
// //   const handleCategoryChange = (e) => {
// //     const cat = categories.find((c) => c.id === Number(e.target.value));
// //     setSelectedCategory(cat || null);

// //     setProducts([]);
// //     setActiveOrder(null);
// //     setSearch("");
// //   };

// //   const handleBuy = (product, done) => {
// //     setTimeout(() => {
// //       setActiveOrder(product);
// //       done();
// //     }, 1000);
// //   };

// //   // ---------------- SEARCH ----------------
// //   const filteredProducts = products.filter((p) =>
// //     p.name.toLowerCase().includes(search.toLowerCase())
// //   );

// //   useEffect(() => {
// //     if (!copied) return;
// //     const t = setTimeout(() => setCopied(false), 2000);
// //     return () => clearTimeout(t);
// //   }, [copied]);

// //   return (
// //     <div className={`marketplace ${darkMode ? "dark" : ""}`}>
// //       <div className="buy-number-card">
// //         <h2>Purchase Logs</h2>

// //         {/* CATEGORY */}
// //         <select
// //           className="server-select"
// //           value={selectedCategory?.id || ""}
// //           onChange={handleCategoryChange}
// //         >
// //           <option value="">Select Platform</option>
// //           {categories.map((c) => (
// //             <option key={c.id} value={c.id}>
// //               {c.name}
// //             </option>
// //           ))}
// //         </select>

// //         {/* SEARCH */}
// //         <div className="search-container">
// //           <input
// //             type="text"
// //             placeholder="Search accounts"
// //             className="search-input"
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             disabled={!selectedCategory || loading}
// //           />
// //           <FiSearch className="search-icon" />
// //         </div>

// //         {/* PRODUCTS */}
// //         {(selectedCategory || loading) && (
// //           <div className="services-container">
// //             {loading ? (
// //               <div className="loading-spinner">
// //                 <div className={`spinner ${darkMode ? "dark" : ""}`} />
// //                 <p>Loading products...</p>
// //               </div>
// //             ) : filteredProducts.length === 0 ? (
// //               <p className="empty">No products available</p>
// //             ) : (
// //               <div className="services-grid">
// //                 {filteredProducts.map((product) => (
// //                   <SocialServiceCard
// //                     key={product.id}
// //                     product={product}
// //                     onBuy={handleBuy}
// //                   />
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* DELIVERY */}
// //         {activeOrder && (
// //           <div className="otp-box">
// //             <div className="otp-header">
// //               <p>
// //                 <strong>Account:</strong> {activeOrder.details}
// //                 <FiCopy
// //                   onClick={() => {
// //                     navigator.clipboard.writeText(activeOrder.details);
// //                     setCopied(true);
// //                   }}
// //                   style={{ cursor: "pointer", marginLeft: 8 }}
// //                 />
// //               </p>
// //             </div>

// //             <p className="success">Delivered instantly ✅</p>

// //             <button
// //               className="copy-btn"
// //               onClick={() => {
// //                 navigator.clipboard.writeText(activeOrder.details);
// //                 setCopied(true);
// //               }}
// //             >
// //               Copy Details
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default BuySocialLogs;

// import React, { useState, useEffect } from "react";
// import { FiSearch, FiCopy } from "react-icons/fi";
// import SocialServiceCard from "../components/SocialServiceCard";
// import "../styles/buy-number.css";

// // ✅ ICONS
// import instagramIcon from "../assets/instagram.png";
// import facebookIcon from "../assets/facebook.png";
// import twitterIcon from "../assets/twitter.png";
// import tiktokIcon from "../assets/tiktok.png";

// const API = process.env.REACT_APP_API_URL;

// // ✅ MOVE OUTSIDE (fixes useEffect warning)
// const platformIcons = {
//   Instagram: instagramIcon,
//   Facebook: facebookIcon,
//   Twitter: twitterIcon,
//   "Twitter (X)": twitterIcon,
//   TikTok: tiktokIcon,
// };

// const PurchaseLogs = ({ darkMode }) => {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [activeOrder, setActiveOrder] = useState(null);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [copied, setCopied] = useState(false);

//   // ---------------- INIT ----------------
//   useEffect(() => {
//     document.title = "Purchase Logs - RealSMS";

//     setCategories([
//       { id: 1, name: "Instagram" },
//       { id: 2, name: "Facebook" },
//       { id: 3, name: "Twitter (X)" },
//       { id: 4, name: "TikTok" },
//     ]);
//   }, []);

//   // ---------------- FETCH LOGS ----------------
//   useEffect(() => {
//     if (!selectedCategory) return;

//     const fetchLogs = async () => {
//       try {
//         setLoading(true);

//         const res = await fetch(`${API}/api/log`);
//         const data = await res.json();

//         // ✅ Filter by platform
//         const filtered = data.filter((log) =>
//           log.platform
//             ?.toLowerCase()
//             .includes(selectedCategory.name.toLowerCase().split(" ")[0])
//         );

//         // ✅ Format for UI
//         const formatted = filtered.map((log) => ({
//           id: log._id,
//           name: log.name,
//           price: log.price,
//           stock: log.stock,
//           type: log.type,
//           details: log.details,
//           icon: platformIcons[log.platform] || instagramIcon,
//         }));

//         setProducts(formatted);
//       } catch (err) {
//         console.error("Fetch logs error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();
//   }, [selectedCategory]); // ✅ no warning anymore

//   // ---------------- HANDLERS ----------------
//   const handleCategoryChange = (e) => {
//     const cat = categories.find((c) => c.id === Number(e.target.value));
//     setSelectedCategory(cat || null);

//     setProducts([]);
//     setActiveOrder(null);
//     setSearch("");
//   };

//   const handleBuy = (product, done) => {
//     setTimeout(() => {
//       setActiveOrder(product);
//       done();
//     }, 1000);
//   };

//   // ---------------- SEARCH ----------------
//   const filteredProducts = products.filter((p) =>
//     p.name.toLowerCase().includes(search.toLowerCase())
//   );

//   // ---------------- COPY FEEDBACK ----------------
//   useEffect(() => {
//     if (!copied) return;
//     const t = setTimeout(() => setCopied(false), 2000);
//     return () => clearTimeout(t);
//   }, [copied]);

//   return (
//     <div className={`marketplace ${darkMode ? "dark" : ""}`}>
//       <div className="buy-number-card">
//         <h2>Purchase Logs</h2>

//         {/* CATEGORY */}
//         <select
//           className="server-select"
//           value={selectedCategory?.id || ""}
//           onChange={handleCategoryChange}
//         >
//           <option value="">Select Platform</option>
//           {categories.map((c) => (
//             <option key={c.id} value={c.id}>
//               {c.name}
//             </option>
//           ))}
//         </select>

//         {/* SEARCH */}
//         <div className="search-container">
//           <input
//             type="text"
//             placeholder="Search accounts"
//             className="search-input"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             disabled={!selectedCategory || loading}
//           />
//           <FiSearch className="search-icon" />
//         </div>

//         {/* PRODUCTS */}
//         {(selectedCategory || loading) && (
//           <div className="services-container">
//             {loading ? (
//               <div className="loading-spinner">
//                 <div className={`spinner ${darkMode ? "dark" : ""}`} />
//                 <p>Loading products...</p>
//               </div>
//             ) : filteredProducts.length === 0 ? (
//               <p className="empty">No products available</p>
//             ) : (
//               <div className="services-grid">
//                 {filteredProducts.map((product) => (
//                   <SocialServiceCard
//                     key={product.id}
//                     product={product}
//                     onBuy={handleBuy}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* DELIVERY */}
//         {activeOrder && (
//           <div className="otp-box">
//             <div className="otp-header">
//               <p>
//                 <strong>Account:</strong> {activeOrder.details}
//                 <FiCopy
//                   onClick={() => {
//                     navigator.clipboard.writeText(activeOrder.details);
//                     setCopied(true);
//                   }}
//                   style={{ cursor: "pointer", marginLeft: 8 }}
//                 />
//               </p>
//             </div>

//             <p className="success">
//               Delivered instantly ✅ {copied && "(Copied!)"}
//             </p>

//             <button
//               className="copy-btn"
//               onClick={() => {
//                 navigator.clipboard.writeText(activeOrder.details);
//                 setCopied(true);
//               }}
//             >
//               Copy Details
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PurchaseLogs;

import React, { useState, useEffect } from "react";
import { FiSearch, FiCopy } from "react-icons/fi";
import SocialServiceCard from "../components/SocialServiceCard";
import "../styles/buy-number.css";

// ✅ ICONS
import instagramIcon from "../assets/instagram.png";
import facebookIcon from "../assets/facebook.png";
import twitterIcon from "../assets/twitter.png";
import tiktokIcon from "../assets/tiktok.png";

const API = process.env.REACT_APP_API_URL;

// ✅ Platform icons mapping
const platformIcons = {
  Instagram: instagramIcon,
  Facebook: facebookIcon,
  Twitter: twitterIcon,
  "Twitter (X)": twitterIcon,
  TikTok: tiktokIcon,
};

const PurchaseLogs = ({ darkMode }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // ---------------- INIT ----------------
  useEffect(() => {
    document.title = "Purchase Logs - RealSMS";

    setCategories([
      { id: 1, name: "Instagram" },
      { id: 2, name: "Facebook" },
      { id: 3, name: "Twitter (X)" },
      { id: 4, name: "TikTok" },
    ]);
  }, []);

  // ---------------- FETCH LOGS ----------------
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchLogs = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API}/api/log`);
        const data = await res.json();

        // Filter logs by selected platform
        const filtered = data.filter((log) =>
          log.platform
            ?.toLowerCase()
            .includes(selectedCategory.name.toLowerCase().split(" ")[0])
        );

        // Format logs for UI
        const formatted = filtered.map((log) => ({
          id: log._id,
          name: log.name,
          price: log.price,
          stock: log.stock,
          type: log.type,
          details: log.details,
          icon: platformIcons[log.platform] || instagramIcon,
        }));

        setProducts(formatted);
      } catch (err) {
        console.error("Fetch logs error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [selectedCategory]);

  // ---------------- HANDLERS ----------------
  const handleCategoryChange = (e) => {
    const cat = categories.find((c) => c.id === Number(e.target.value));
    setSelectedCategory(cat || null);

    setProducts([]);
    setActiveOrder(null);
    setSearch("");
  };

  // Updated handleBuy to include quantity
  const handleBuy = (product, done, quantity) => {
    setTimeout(() => {
      setActiveOrder({ ...product, quantity }); // store selected quantity
      done();
    }, 500);
  };

  // ---------------- SEARCH ----------------
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // ---------------- COPY FEEDBACK ----------------
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <div className={`marketplace ${darkMode ? "dark" : ""}`}>
      <div className="buy-number-card">
        <h2>Purchase Logs</h2>

        {/* CATEGORY */}
        <select
          className="server-select"
          value={selectedCategory?.id || ""}
          onChange={handleCategoryChange}
        >
          <option value="">Select Platform</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* SEARCH */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search accounts"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={!selectedCategory || loading}
          />
          <FiSearch className="search-icon" />
        </div>

        {/* PRODUCTS */}
        {(selectedCategory || loading) && (
          <div className="services-container">
            {loading ? (
              <div className="loading-spinner">
                <div className={`spinner ${darkMode ? "dark" : ""}`} />
                <p>Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <p className="empty">No products available</p>
            ) : (
              <div className="services-grid">
                {filteredProducts.map((product) => (
                  <SocialServiceCard
                    key={product.id}
                    product={product}
                    onBuy={handleBuy} // now receives quantity
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* DELIVERY */}
        {activeOrder && (
          <div className="otp-box">
            <div className="otp-header">
              <p>
                <strong>Account:</strong> {activeOrder.details}{" "}
                <span>×{activeOrder.quantity}</span>
                <FiCopy
                  onClick={() => {
                    navigator.clipboard.writeText(activeOrder.details);
                    setCopied(true);
                  }}
                  style={{ cursor: "pointer", marginLeft: 8 }}
                />
              </p>
            </div>

            <p className="success">
              Delivered instantly ✅ {copied && "(Copied!)"}
            </p>

            <button
              className="copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(activeOrder.details);
                setCopied(true);
              }}
            >
              Copy Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseLogs;
