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
import "../styles/buy-number.css"; // reuse styling

const BuySocialLogs = ({ darkMode }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  // ---------------- MOCK DATA ----------------
  useEffect(() => {
    setCategories([
      { id: 1, name: "Instagram" },
      { id: 2, name: "Facebook" },
      { id: 3, name: "Twitter (X)" },
      { id: 4, name: "TikTok" },
    ]);
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    // Fake products (replace with API later)
    const mockProducts = [
      {
        id: 1,
        name: "Instagram Aged Account",
        price: 1500,
        details: "username:demo | pass:123456",
        category: 1,
      },
      {
        id: 2,
        name: "Facebook Verified Account",
        price: 2500,
        details: "email:test@mail.com | pass:abcd",
        category: 2,
      },
      {
        id: 3,
        name: "Twitter Old Account",
        price: 1200,
        details: "user:oldacc | pass:pass123",
        category: 3,
      },
      {
        id: 4,
        name: "TikTok Creator Account",
        price: 1800,
        details: "user:tiktokpro | pass:tt123",
        category: 4,
      },
    ];

    const filtered = mockProducts.filter(
      (p) => p.category === selectedCategory.id
    );

    setProducts(filtered);
  }, [selectedCategory]);

  // ---------------- HANDLERS ----------------
  const handleCategoryChange = (e) => {
    const cat = categories.find((c) => c.id === Number(e.target.value));
    setSelectedCategory(cat || null);
    setActiveOrder(null);
    setSearch("");
  };

  const handleBuy = (product) => {
    if (!selectedCategory)
      return alert("Please select a category first!");

    setActiveOrder(product);
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

        {/* CATEGORY SELECT */}
        <select
          className="server-select"
          value={selectedCategory?.id || ""}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
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
            placeholder="Search product"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={!selectedCategory}
          />
          <FiSearch className="search-icon" />
        </div>

        {/* PRODUCTS */}
        {selectedCategory && (
          <div className="services-container">
            {filteredProducts.length === 0 ? (
              <p className="empty">No products available</p>
            ) : (
              <div className="services-grid">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="service-card">
                    <h3>{product.name}</h3>
                    <p>₦{product.price}</p>

                    <button
                      className="buy-btn"
                      onClick={() => handleBuy(product)}
                    >
                      Buy
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ORDER DETAILS */}
        {activeOrder && (
          <div className="otp-box">
            <div className="otp-header">
              <p>
                <strong>Details:</strong> {activeOrder.details}
                <FiCopy
                  onClick={() => {
                    navigator.clipboard.writeText(activeOrder.details);
                    setCopied(true);
                  }}
                  style={{ cursor: "pointer", marginLeft: 8 }}
                />
              </p>
            </div>

            <p className="success">Purchase successful ✅</p>

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
