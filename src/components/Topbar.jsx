// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FiCreditCard,
//   FiChevronDown,
//   FiSettings,
//   FiLogOut,
//   FiMenu,
// } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import "../styles/topbar.css";

// const Topbar = ({ toggleSidebar }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [displayBalance, setDisplayBalance] = useState(0);
//   const [userName, setUserName] = useState("");
//   const [avatarUrl, setAvatarUrl] = useState("");

//   const navigate = useNavigate();
//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // clear token
//     setDropdownOpen(false);
//     navigate("/"); // redirect to login
//   };

//   // Fetch user info from backend
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         const { data } = await axios.get(
//           `${process.env.REACT_APP_API_URL}/api/auth/me`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         if (data.success && data.user) {
//           const user = data.user;
//           setUserName(`${user.firstName} ${user.lastName}`);

//           // Generate unique avatar using DiceBear
//           setAvatarUrl(
//             `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
//               user.email
//             )}`
//           );

//           // Animate balance
//           let start = 0;
//           const end = user.walletBalanceNGN || 0;
//           const duration = 1000;
//           const increment = end / (duration / 20);

//           const counter = setInterval(() => {
//             start += increment;
//             if (start >= end) {
//               start = end;
//               clearInterval(counter);
//             }
//             setDisplayBalance(Math.floor(start));
//           }, 20);

//           return () => clearInterval(counter);
//         }
//       } catch (err) {
//         console.error("Failed to fetch user:", err);
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <div className="topbar">
//       {/* Left: Hamburger */}
//       <div className="topbar-left">
//         <div className="hamburger" onClick={toggleSidebar}>
//           <FiMenu size={24} />
//         </div>
//       </div>

//       {/* Right: Balance + Profile */}
//       <div className="topbar-right">
//         {/* Wallet Balance */}
//         <div className="balance">
//           <FiCreditCard className="balance-icon" />
//           <div className="balance-text">
//             <span>Balance</span>
//             <strong>₦{displayBalance.toLocaleString()}</strong>
//           </div>
//         </div>

//         {/* Profile Dropdown */}
//         <div
//           className="profile"
//           onClick={toggleDropdown}
//           style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
//         >
//           <img
//             src={avatarUrl || "https://i.pravatar.cc/40"} // fallback
//             alt="User Avatar"
//             style={{
//               width: "32px",
//               height: "32px",
//               borderRadius: "50%",
//               marginRight: "5px",
//             }}
//           />

//           <div style={{ display: "inline-flex", alignItems: "center", margin: 0 }}>
//             <span className="username-text">{userName || "Loading..."}</span>
//             <FiChevronDown
//               className="username-arrow"
//               size={16}
//               style={{
//                 marginLeft: "5px",
//                 position: "relative",
//                 top: "2px",
//                 transition: "transform 0.3s",
//                 transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
//               }}
//             />
//           </div>

//           {dropdownOpen && (
//             <div className="dropdown-menu">
//               <p style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//                 <FiSettings /> ACCOUNT
//               </p>
//               <p
//                 className="logout"
//                 onClick={handleLogout}
//                 style={{ display: "flex", alignItems: "center", gap: "5px" }}
//               >
//                 <FiLogOut /> LOGOUT
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Topbar;

import React, { useState, useEffect, useRef } from "react";
import {
  FiCreditCard,
  FiChevronDown,
  FiSettings,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useBalance } from "../context/BalanceContext";
import "../styles/topbar.css";

const Topbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const { balance, loading, fetchBalance } = useBalance();

  const navigate = useNavigate();
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // For animated balance
  const [displayBalance, setDisplayBalance] = useState(0);
  const previousBalance = useRef(0);

  // Animate balance whenever it changes
  useEffect(() => {
    if (loading) return;

    let start = previousBalance.current;
    const end = balance;
    const duration = 800; // animation duration in ms
    const incrementTime = 20; // ms per step
    const steps = duration / incrementTime;
    const increment = (end - start) / steps;

    let current = start;
    const counter = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        current = end;
        clearInterval(counter);
      }
      setDisplayBalance(Math.floor(current));
    }, incrementTime);

    previousBalance.current = end;

    return () => clearInterval(counter);
  }, [balance, loading]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setDropdownOpen(false);
    navigate("/");
  };

  // Fetch user info once
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (data.success && data.user) {
          const user = data.user;
          setUserName(`${user.firstName} ${user.lastName}`);

          // Generate avatar with DiceBear
          setAvatarUrl(
            `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
              user.email
            )}`
          );
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
    fetchBalance(); // refresh balance on load
  }, [fetchBalance]);

  return (
    <div className="topbar">
      {/* Left: Hamburger */}
      <div className="topbar-left">
        <div className="hamburger" onClick={toggleSidebar}>
          <FiMenu size={24} />
        </div>
      </div>

      {/* Right: Balance + Profile */}
      <div className="topbar-right">
        {/* Wallet Balance */}
        <div className="balance">
          <FiCreditCard className="balance-icon" />
          <div className="balance-text">
            <span>Balance</span>
            <strong>
              {loading ? "₦..." : `₦${displayBalance.toLocaleString()}`}
            </strong>
          </div>
        </div>

        {/* Profile Dropdown */}
        <div
          className="profile"
          onClick={toggleDropdown}
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <img
            src={avatarUrl || "https://i.pravatar.cc/40"} // fallback
            alt="User Avatar"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              marginRight: "5px",
            }}
          />

          <div style={{ display: "inline-flex", alignItems: "center", margin: 0 }}>
            <span className="username-text">{userName || "Loading..."}</span>
            <FiChevronDown
              className="username-arrow"
              size={16}
              style={{
                marginLeft: "5px",
                position: "relative",
                top: "2px",
                transition: "transform 0.3s",
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <p style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <FiSettings /> ACCOUNT
              </p>
              <p
                className="logout"
                onClick={handleLogout}
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <FiLogOut /> LOGOUT
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
