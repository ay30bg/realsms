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
import ServiceCard from "../components/ServiceCard"; // Reuse your card component
import "../styles/marketplace.css";

const MOCK_CATEGORIES = [
  { ID: 1, name: "Instagram" },
  { ID: 2, name: "Twitter" },
  { ID: 3, name: "TikTok" },
];

const MOCK_SERVICES = [
  { ID: 1, categoryID: 1, name: "100 Instagram Followers", price: 500, account: "@instaUser1" },
  { ID: 2, categoryID: 1, name: "500 Instagram Likes", price: 1200, account: "@instaUser2" },
  { ID: 3, categoryID: 2, name: "50 Twitter Followers", price: 300, account: "@twitterUser1" },
  { ID: 4, categoryID: 3, name: "10 TikTok Likes", price: 150, account: "@tiktokUser1" },
];

const SocialMediaMarketplace = ({ darkMode }) => {
  const [categories] = useState(MOCK_CATEGORIES);
  const [services] = useState(MOCK_SERVICES);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [purchasedService, setPurchasedService] = useState(null);
  const [balance, setBalance] = useState(2000); // mock balance

  useEffect(() => {
    document.title = "Social Media Marketplace - RealSMS";
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.value);
    const category = categories.find((c) => c.ID === categoryId) || null;
    setSelectedCategory(category);
    setPurchasedService(null);
    setSearch("");
  };

  const handleBuy = (service) => {
    if (!selectedCategory) return alert("Please select a category first!");
    if (balance < service.price) return alert("Insufficient balance");

    setPurchasedService(service);
    setBalance((prev) => prev - service.price);
    alert("Purchase successful!");
  };

  const filteredServices = services.filter(
    (s) =>
      (!selectedCategory || s.categoryID === selectedCategory.ID) &&
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`marketplace ${darkMode ? "dark" : ""}`}>
      <div className="marketplace-card">
        <h2>Social Media Marketplace</h2>

        <p>
          <strong>Balance:</strong> ₦{balance}
        </p>

        <select
          className="category-select"
          value={selectedCategory?.ID || ""}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.ID} value={c.ID}>
              {c.name}
            </option>
          ))}
        </select>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search service"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={!selectedCategory}
          />
          <FiSearch className="search-icon" />
        </div>

        <div className="services-container">
          {filteredServices.length === 0 ? (
            <p className="empty">No services available</p>
          ) : (
            <div className="services-grid">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.ID}
                  service={service}
                  onBuy={handleBuy}
                />
              ))}
            </div>
          )}
        </div>

        {purchasedService && (
          <div className="purchase-box">
            <p>
              <strong>Purchased Service:</strong> {purchasedService.name} -{" "}
              <span>{purchasedService.account}</span>
              <FiCopy
                onClick={() =>
                  navigator.clipboard.writeText(purchasedService.account)
                }
                style={{ cursor: "pointer", marginLeft: 8 }}
              />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaMarketplace;
