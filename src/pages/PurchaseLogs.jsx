// import React, { useEffect } from "react";
// import { FiShoppingBag, FiClock } from "react-icons/fi";
// import "../styles/purchase-logs.css";

// const PurchaseLogs = () => {
//   useEffect(() => {
//     document.title = "Social Media Logs - RealSMS";
//   }, []);

//   return (
//     <div className="coming-soon-page">
//       <div className="coming-soon-card">
//         <FiShoppingBag className="coming-icon" />

//         <h2>Social Media Logs Marketplace</h2>

//         <p className="coming-main">
//           Buy verified social media logs — coming soon 🚀
//         </p>

//         <div className="coming-features">
//           <div className="feature">
//             <FiClock /> <span>Fresh & Active Accounts</span>
//           </div>
//           <div className="feature">
//             <FiClock /> <span>Multiple Platforms (Gmail, Facebook, etc.)</span>
//           </div>
//           <div className="feature">
//             <FiClock /> <span>Instant Delivery</span>
//           </div>
//         </div>

//         <span className="coming-subtext">
//           This marketplace is currently under development. Stay tuned.
//         </span>

//         <button className="coming-btn">Coming Soon</button>
//       </div>
//     </div>
//   );
// };

// export default PurchaseLogs;

import React, { useState, useEffect } from "react";
import { FiSearch, FiCopy } from "react-icons/fi";
import SocialServiceCard from "../components/SocialServiceCard"; 
import "../styles/buy-number.css";

const BuySocialLogs = ({ darkMode }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // ---------------- MOCK DATA ----------------
  useEffect(() => {
    document.title = "Social Marketplace - RealSMS";

    setCategories([
      { id: 1, name: "Instagram" },
      { id: 2, name: "Facebook" },
      { id: 3, name: "Twitter (X)" },
      { id: 4, name: "TikTok" },
    ]);
  }, []);

  // ---------------- FETCH PRODUCTS ----------------
  useEffect(() => {
    if (!selectedCategory) return;

    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          name: "Instagram Aged Account",
          price: 1500,
          stock: 20,
          type: "Aged",
          details: "user:insta01 | pass:123456",
          icon: "/icons/instagram.png",
          category: 1,
        },
        {
          id: 2,
          name: "Instagram PVA Account",
          price: 1200,
          stock: 15,
          type: "PVA",
          details: "user:pva_acc | pass:abc123",
          icon: "/icons/instagram.png",
          category: 1,
        },
        {
          id: 3,
          name: "Facebook Verified",
          price: 2500,
          stock: 10,
          type: "Verified",
          details: "email:test@mail.com | pass:abcd",
          icon: "/icons/facebook.png",
          category: 2,
        },
        {
          id: 4,
          name: "Twitter Old Account",
          price: 1300,
          stock: 8,
          type: "Aged",
          details: "user:oldx | pass:pass123",
          icon: "/icons/twitter.png",
          category: 3,
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
    // Simulate purchase
    setTimeout(() => {
      setActiveOrder(product);
      done(); // stop spinner
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
        <h2>Social Media Marketplace</h2>

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
                    service={product} // reuse same structure
                    onBuy={handleBuy}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* PURCHASE RESULT */}
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
