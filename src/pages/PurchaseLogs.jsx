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
import SocialCard from "../components/SocialCard";
import "../styles/marketplace.css";

const MOCK_CATEGORIES = [
  { id: 1, name: "Instagram" },
  { id: 2, name: "Twitter" },
  { id: 3, name: "TikTok" },
];

const MOCK_LISTINGS = [
  {
    id: 1,
    title: "Insta Account 10k Followers",
    platform: "Instagram",
    price: 5000,
    details: "Username: insta_10k | Pass: 1234",
    categoryId: 1,
  },
  {
    id: 2,
    title: "Twitter Account 5k Followers",
    platform: "Twitter",
    price: 3000,
    details: "Username: twitter_5k | Pass: 5678",
    categoryId: 2,
  },
  {
    id: 3,
    title: "TikTok Account 20k Followers",
    platform: "TikTok",
    price: 7000,
    details: "Username: tiktok_20k | Pass: abcd",
    categoryId: 3,
  },
];

const SocialMarketplace = ({ darkMode }) => {
  const [categories] = useState(MOCK_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [activePurchase, setActivePurchase] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Social Marketplace";
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.value);
    const category = categories.find((c) => c.id === categoryId) || null;
    setSelectedCategory(category);
    setActivePurchase(null);
    setSearch("");
    setListings(
      MOCK_LISTINGS.filter((l) => l.categoryId === categoryId)
    );
  };

  const handlePurchase = (listing) => {
    setActivePurchase(listing);
  };

  const filteredListings = listings.filter((l) =>
    l.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <div className={`marketplace ${darkMode ? "dark" : ""}`}>
      <div className="marketplace-card">
        <h2>Social Media Marketplace</h2>

        <select
          className="category-select"
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

        <div className="search-container">
          <input
            type="text"
            placeholder="Search listings"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={!selectedCategory}
          />
          <FiSearch className="search-icon" />
        </div>

        {selectedCategory && (
          <div className="listings-container">
            {filteredListings.length === 0 ? (
              <p className="empty">No listings available</p>
            ) : (
              <div className="listings-grid">
                {filteredListings.map((listing) => (
                  <SocialCard
                    key={listing.id}
                    listing={listing}
                    onPurchase={handlePurchase}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activePurchase && (
          <div className="account-box">
            <h3>{activePurchase.title}</h3>
            <p>
              <strong>Account Details:</strong> {activePurchase.details}
              <FiCopy
                onClick={() => {
                  navigator.clipboard.writeText(activePurchase.details);
                  setCopied(true);
                }}
                style={{ cursor: "pointer", marginLeft: 8 }}
              />
            </p>
            {copied && <span className="copied">Copied!</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMarketplace;
