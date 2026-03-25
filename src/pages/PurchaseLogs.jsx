// import React, { useState, useEffect } from "react";
// import { FiSearch, FiCopy } from "react-icons/fi";
// import SocialServiceCard from "../components/SocialServiceCard"; 
// import "../styles/buy-number.css";

// const BuySocialLogs = ({ darkMode }) => {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [activeOrder, setActiveOrder] = useState(null);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [copied, setCopied] = useState(false);

//   // ---------------- INIT ----------------
//   useEffect(() => {
//     document.title = "Social Marketplace - RealSMS";

//     setCategories([
//       { id: 1, name: "Instagram" },
//       { id: 2, name: "Facebook" },
//       { id: 3, name: "Twitter (X)" },
//       { id: 4, name: "TikTok" },
//     ]);
//   }, []);

//   // ---------------- LOAD PRODUCTS ----------------
//   useEffect(() => {
//     if (!selectedCategory) return;

//     setLoading(true);

//     setTimeout(() => {
//       const mockProducts = [
//         {
//           id: 1,
//           name: "Instagram Aged Account",
//           price: 1500,
//           stock: 20,
//           type: "Aged",
//           details: "user:insta01 | pass:123456",
//           icon: "/icons/instagram.png",
//           category: 1,
//         },
//         {
//           id: 2,
//           name: "Instagram PVA Account",
//           price: 1200,
//           stock: 15,
//           type: "PVA",
//           details: "user:pva_acc | pass:abc123",
//           icon: "/icons/instagram.png",
//           category: 1,
//         },
//         {
//           id: 3,
//           name: "Facebook Verified Account",
//           price: 2500,
//           stock: 10,
//           type: "Verified",
//           details: "email:test@mail.com | pass:abcd",
//           icon: "/icons/facebook.png",
//           category: 2,
//         },
//         {
//           id: 4,
//           name: "Twitter Aged Account",
//           price: 1300,
//           stock: 8,
//           type: "Aged",
//           details: "user:oldx | pass:pass123",
//           icon: "/icons/twitter.png",
//           category: 3,
//         },
//       ];

//       const filtered = mockProducts.filter(
//         (p) => p.category === selectedCategory.id
//       );

//       setProducts(filtered);
//       setLoading(false);
//     }, 800);
//   }, [selectedCategory]);

//   // ---------------- HANDLERS ----------------
//   const handleCategoryChange = (e) => {
//     const cat = categories.find((c) => c.id === Number(e.target.value));
//     setSelectedCategory(cat || null);

//     // reset state
//     setProducts([]);
//     setActiveOrder(null);
//     setSearch("");
//   };

//   const handleBuy = (product, done) => {
//     // simulate purchase
//     setTimeout(() => {
//       setActiveOrder(product);
//       done(); // stop spinner in card
//     }, 1000);
//   };

//   // ---------------- SEARCH ----------------
//   const filteredProducts = products.filter((p) =>
//     p.name.toLowerCase().includes(search.toLowerCase())
//   );

//   useEffect(() => {
//     if (!copied) return;
//     const t = setTimeout(() => setCopied(false), 2000);
//     return () => clearTimeout(t);
//   }, [copied]);

//   return (
//     <div className={`marketplace ${darkMode ? "dark" : ""}`}>
//       <div className="buy-number-card">
//         <h2>Purchase Logs</h2>

//         {/* CATEGORY SELECT */}
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
//                     product={product}   // ✅ correct prop
//                     onBuy={handleBuy}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* DELIVERY SECTION */}
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

//             <p className="success">Delivered instantly ✅</p>

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

// export default BuySocialLogs;

import React, { useState, useEffect } from "react";
import { FiSearch, FiCopy } from "react-icons/fi";
import SocialServiceCard from "../components/SocialServiceCard";
import "../styles/buy-number.css";

// ✅ IMPORT ICONS
import instagramIcon from "../assets/instagram.png";
import facebookIcon from "../assets/facebook.png";
import twitterIcon from "../assets/twitter.png";
import tiktokIcon from "../assets/tiktok.png";

const BuySocialLogs = ({ darkMode }) => {
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

  // ---------------- LOAD PRODUCTS ----------------
  useEffect(() => {
    if (!selectedCategory) return;

    setLoading(true);

    setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          name: "Instagram Aged Account",
          price: 1500,
          stock: 20,
          type: "Aged",
          details: "user:insta01 | pass:123456",
          category: 1,
          icon: instagramIcon,
        },
        {
          id: 2,
          name: "Instagram PVA Account",
          price: 1200,
          stock: 15,
          type: "PVA",
          details: "user:pva_acc | pass:abc123",
          category: 1,
          icon: instagramIcon,
        },
        {
          id: 3,
          name: "Facebook Verified Account",
          price: 2500,
          stock: 10,
          type: "Verified",
          details: "email:test@mail.com | pass:abcd",
          category: 2,
          icon: facebookIcon,
        },
        {
          id: 4,
          name: "Twitter Aged Account",
          price: 1300,
          stock: 8,
          type: "Aged",
          details: "user:oldx | pass:pass123",
          category: 3,
          icon: twitterIcon,
        },
        {
          id: 5,
          name: "TikTok Creator Account",
          price: 1800,
          stock: 12,
          type: "Creator",
          details: "user:tiktokpro | pass:tt123",
          category: 4,
          icon: tiktokIcon,
        },
      ];

      const filtered = mockProducts.filter(
        (p) => p.category === selectedCategory.id
      );

      setProducts(filtered);
      setLoading(false);
    }, 800);
  }, [selectedCategory]);

  // ---------------- HANDLERS ----------------
  const handleCategoryChange = (e) => {
    const cat = categories.find((c) => c.id === Number(e.target.value));
    setSelectedCategory(cat || null);

    setProducts([]);
    setActiveOrder(null);
    setSearch("");
  };

  const handleBuy = (product, done) => {
    setTimeout(() => {
      setActiveOrder(product);
      done();
    }, 1000);
  };

  // ---------------- SEARCH ----------------
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

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
                    onBuy={handleBuy}
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
                <strong>Account:</strong> {activeOrder.details}
                <FiCopy
                  onClick={() => {
                    navigator.clipboard.writeText(activeOrder.details);
                    setCopied(true);
                  }}
                  style={{ cursor: "pointer", marginLeft: 8 }}
                />
              </p>
            </div>

            <p className="success">Delivered instantly ✅</p>

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

export default BuySocialLogs;
