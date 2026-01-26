// import React, { useState, useEffect } from "react";
// import { FiUser, FiSun, FiMoon, FiCreditCard, FiChevronDown, FiSettings, FiLogOut } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import "../styles/topbar.css";

// const Topbar = ({ balance = 25000 }) => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [displayBalance, setDisplayBalance] = useState(0);
//   const [greeting, setGreeting] = useState("");

//   const navigate = useNavigate();

//   const toggleDarkMode = () => setDarkMode(!darkMode);
//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

//   const handleLogout = () => {
//     setDropdownOpen(false);
//     navigate("/login");
//   };

//   // Animate balance count-up
//   useEffect(() => {
//     let start = 0;
//     const end = balance;
//     const duration = 1000;
//     const increment = end / (duration / 20);

//     const counter = setInterval(() => {
//       start += increment;
//       if (start >= end) {
//         start = end;
//         clearInterval(counter);
//       }
//       setDisplayBalance(Math.floor(start));
//     }, 20);

//     return () => clearInterval(counter);
//   }, [balance]);

//   // Function to determine greeting based on current hour
//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour >= 5 && hour < 12) return "Good Morning";
//     else if (hour >= 12 && hour < 17) return "Good Afternoon";
//     else if (hour >= 17 && hour < 22) return "Good Evening";
//     else return "Hello";
//   };

//   // Auto-update greeting exactly when the hour changes
//   useEffect(() => {
//     const updateGreeting = () => setGreeting(getGreeting());

//     // Set initial greeting
//     updateGreeting();

//     // Calculate ms until next hour
//     const now = new Date();
//     const msUntilNextHour =
//       (60 - now.getMinutes()) * 60 * 1000 - now.getSeconds() * 1000 - now.getMilliseconds();

//     // Timeout to trigger exactly at next hour
//     const timeout = setTimeout(() => {
//       updateGreeting();

//       // Then update every hour after that
//       const interval = setInterval(updateGreeting, 60 * 60 * 1000);
//       // Save interval id to cleanup later
//       window._greetingInterval = interval;
//     }, msUntilNextHour);

//     return () => {
//       clearTimeout(timeout);
//       if (window._greetingInterval) clearInterval(window._greetingInterval);
//     };
//   }, []);

//   return (
//     <div className={`topbar ${darkMode ? "dark" : ""}`}>
//       <div className="topbar-left">
//         <h3>{greeting}</h3>
//       </div>

//       <div className="topbar-right">
//         {/* Balance */}
//         <div className="balance">
//           <FiCreditCard className="balance-icon" />
//           <div className="balance-text">
//             <span>Balance</span>
//             <strong>₦{displayBalance.toLocaleString()}</strong>
//           </div>
//         </div>

//         {/* Dark mode */}
//         <div className="dark-mode-toggle" onClick={toggleDarkMode}>
//           {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
//         </div>

//         {/* Profile */}
//         <div className="profile" onClick={toggleDropdown} style={{ cursor: "pointer" }}>
//           <FiUser size={20} style={{ marginRight: "5px" }} />
//           <p
//             className="username"
//             style={{ display: "inline-flex", alignItems: "center", margin: 0 }}
//           >
//             Ayomide Yekeen
//             <FiChevronDown
//               size={16}
//               style={{
//                 marginLeft: "5px",
//                 position: "relative",
//                 top: "2px",
//                 transition: "transform 0.3s",
//                 transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)"
//               }}
//             />
//           </p>

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

import React, { useState, useEffect } from "react";
import { FiUser, FiSun, FiMoon, FiCreditCard, FiChevronDown, FiSettings, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/topbar.css";

const Topbar = ({ balance = 25000 }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [displayBalance, setDisplayBalance] = useState(0);

  const navigate = useNavigate();

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    setDropdownOpen(false);
    navigate("/login");
  };

  // Animate balance count-up
  useEffect(() => {
    let start = 0;
    const end = balance;
    const duration = 1000;
    const increment = end / (duration / 20);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setDisplayBalance(Math.floor(start));
    }, 20);

    return () => clearInterval(counter);
  }, [balance]);

  return (
    <div className={`topbar ${darkMode ? "dark" : ""}`} style={{ justifyContent: "flex-end" }}>
      <div className="topbar-right">
        {/* Balance */}
        <div className="balance">
          <FiCreditCard className="balance-icon" />
          <div className="balance-text">
            <span>Balance</span>
            <strong>₦{displayBalance.toLocaleString()}</strong>
          </div>
        </div>

        {/* Dark mode */}
        <div className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </div>

        {/* Profile */}
        <div className="profile" onClick={toggleDropdown} style={{ cursor: "pointer" }}>
          <FiUser size={20} style={{ marginRight: "5px" }} />
          <p
            className="username"
            style={{ display: "inline-flex", alignItems: "center", margin: 0 }}
          >
            Ayomide Yekeen
            <FiChevronDown
              size={16}
              style={{
                marginLeft: "5px",
                position: "relative",
                top: "2px",
                transition: "transform 0.3s",
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)"
              }}
            />
          </p>

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
