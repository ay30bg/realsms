// import React, { useState, useEffect } from "react";
// import { FiSearch, FiCopy } from "react-icons/fi";
// import SocialServiceCard from "../components/SocialServiceCard";
// import "../styles/buy-number.css";

// // ICONS
// import instagramIcon from "../assets/instagram.png";
// import facebookIcon from "../assets/facebook.png";
// import twitterIcon from "../assets/twitter.png";
// import tiktokIcon from "../assets/tiktok.png";

// const API = process.env.REACT_APP_API_URL;

// // Platform icons
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

//   // INIT
//   useEffect(() => {
//     document.title = "Purchase Logs - RealSMS";

//     setCategories([
//       { id: 1, name: "Instagram" },
//       { id: 2, name: "Facebook" },
//       { id: 3, name: "Twitter (X)" },
//       { id: 4, name: "TikTok" },
//     ]);
//   }, []);

//   // FETCH LOGS
//   useEffect(() => {
//     if (!selectedCategory) return;

//     const fetchLogs = async () => {
//       try {
//         setLoading(true);

//         const res = await fetch(`${API}/api/log`);
//         const data = await res.json();

//         const filtered = data.filter((log) =>
//           log.platform
//             ?.toLowerCase()
//             .includes(selectedCategory.name.toLowerCase().split(" ")[0])
//         );

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
//   }, [selectedCategory]);

//   // CATEGORY CHANGE
//   const handleCategoryChange = (e) => {
//     const cat = categories.find((c) => c.id === Number(e.target.value));
//     setSelectedCategory(cat || null);

//     setProducts([]);
//     setActiveOrder(null);
//     setSearch("");
//   };

//   // BUY HANDLER (WITH QUANTITY + SPLIT DETAILS)
//   const handleBuy = (product, done, quantity) => {
//     setTimeout(() => {
//       // Split details safely
//       const allDetails = product.details
//         ?.split("\n")
//         .map((line) => line.trim())
//         .filter((line) => line !== "");

//       // Take only requested quantity
//       const selectedDetails = allDetails.slice(0, quantity);

//       setActiveOrder({
//         ...product,
//         quantity,
//         details: selectedDetails.join("\n"),
//       });

//       done();
//     }, 500);
//   };

//   // SEARCH
//   const filteredProducts = products.filter((p) =>
//     p.name.toLowerCase().includes(search.toLowerCase())
//   );

//   // COPY FEEDBACK
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
//                 <strong>Accounts:</strong>
//                 <pre className="details-block">
//                   {activeOrder.details}
//                 </pre>

//                 <FiCopy
//                   onClick={() => {
//                     navigator.clipboard.writeText(activeOrder.details);
//                     setCopied(true);
//                   }}
//                   style={{ cursor: "pointer", marginTop: 8 }}
//                 />
//               </p>
//             </div>

//             <p className="success">
//               Delivered {activeOrder.quantity} account(s) ✅{" "}
//               {copied && "(Copied!)"}
//             </p>

//             <button
//               className="copy-btn"
//               onClick={() => {
//                 navigator.clipboard.writeText(activeOrder.details);
//                 setCopied(true);
//               }}
//             >
//               Copy All
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

// ICONS
import instagramIcon from "../assets/instagram.png";
import facebookIcon from "../assets/facebook.png";
import twitterIcon from "../assets/twitter.png";
import tiktokIcon from "../assets/tiktok.png";

const API = process.env.REACT_APP_API_URL;

// Platform icons
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

  // INIT
  useEffect(() => {
    document.title = "Purchase Logs - RealSMS";

    setCategories([
      { id: 1, name: "Instagram" },
      { id: 2, name: "Facebook" },
      { id: 3, name: "Twitter (X)" },
      { id: 4, name: "TikTok" },
    ]);
  }, []);

  // FETCH LOGS
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchLogs = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API}/api/log`);
        const data = await res.json();

        const filtered = data.filter((log) =>
          log.platform
            ?.toLowerCase()
            .includes(selectedCategory.name.toLowerCase().split(" ")[0])
        );

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

  // CATEGORY CHANGE
  const handleCategoryChange = (e) => {
    const cat = categories.find((c) => c.id === Number(e.target.value));
    setSelectedCategory(cat || null);

    setProducts([]);
    setActiveOrder(null);
    setSearch("");
  };

  // ✅ BUY HANDLER (REAL API)
  const handleBuy = async (product, done, quantity) => {
    try {
      const res = await fetch(`${API}/api/log/buy/${product.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Purchase failed");
        done();
        return;
      }

      // Show purchased accounts
      setActiveOrder({
        ...product,
        quantity,
        details: data.purchased,
      });

      // Update stock in UI instantly
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id
            ? { ...p, stock: data.remainingStock }
            : p
        )
      );

      done();
    } catch (err) {
      console.error("Buy error:", err);
      alert("Something went wrong");
      done();
    }
  };

  // SEARCH
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // COPY FEEDBACK
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
                <strong>Accounts:</strong>
                <pre className="details-block">
                  {activeOrder.details}
                </pre>

                <FiCopy
                  onClick={() => {
                    navigator.clipboard.writeText(activeOrder.details);
                    setCopied(true);
                  }}
                  style={{ cursor: "pointer", marginTop: 8 }}
                />
              </p>
            </div>

            <p className="success">
              Delivered {activeOrder.quantity} account(s) ✅{" "}
              {copied && "(Copied!)"}
            </p>

            <button
              className="copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(activeOrder.details);
                setCopied(true);
              }}
            >
              Copy All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseLogs;
