// import {
//   FiUser,
//   FiLock,
//   FiMoon,
//   FiBell,
//   FiShield,
//   FiMonitor,
//   FiChevronRight,
//   FiLogOut,
// } from "react-icons/fi";

// import { useNavigate } from "react-router-dom";
// import "../styles/settings.css";

// export default function Settings() {
//   const navigate = useNavigate();

//   const settings = [
//     {
//       icon: <FiUser />,
//       title: "Profile",
//       desc: "Update your personal information",
//       path: "/profile",
//     },
//     {
//       icon: <FiLock />,
//       title: "Password",
//       desc: "Change account password",
//       path: "/password",
//     },
//     {
//       icon: <FiMoon />,
//       title: "Appearance",
//       desc: "Customize theme and colors",
//       path: "/settings/appearance",
//     },
//     {
//       icon: <FiBell />,
//       title: "Notifications",
//       desc: "SMS and email preferences",
//       path: "/notifications",
//     },
//     {
//       icon: <FiShield />,
//       title: "Security",
//       desc: "2FA and protection settings",
//       path: "/security",
//     },
//     {
//       icon: <FiMonitor />,
//       title: "Sessions",
//       desc: "Manage logged-in devices",
//       path: "/sessions",
//     },
//   ];

//   return (
//     <div className="settings-page">
//       <div className="settings-header">
//         <h2>Settings</h2>
//         <p>Manage your account and preferences</p>
//       </div>

//       {/* Profile Card */}
//       <div className="profile-card">
//         <div className="avatar">L</div>

//         <div className="profile-info">
//           <h3>Lysa</h3>
//           <p>lysa@email.com</p>
//         </div>
//       </div>

//       {/* Settings List */}
//       <div className="settings-list">
//         {settings.map((item, index) => (
//           <button
//             key={index}
//             className="setting-card"
//             onClick={() => navigate(item.path)}
//           >
//             <div className="setting-left">
//               <div className="setting-icon">{item.icon}</div>

//               <div className="setting-info">
//                 <h4>{item.title}</h4>
//                 <p>{item.desc}</p>
//               </div>
//             </div>

//             <FiChevronRight className="arrow" />
//           </button>
//         ))}
//       </div>

//       {/* Logout */}
//       <button className="logout-btn">
//         <FiLogOut />
//         Log Out
//       </button>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiLock,
  FiMoon,
  FiBell,
  FiShield,
  FiMonitor,
  FiChevronRight,
  FiLogOut,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import "../styles/settings.css";

export default function Settings() {
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("User");
  const [email, setEmail] = useState("");

  const getToken = () => localStorage.getItem("token");

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getToken();
        if (!token) return;

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (data.success && data.user) {
          const fullName = `${data.user.firstName || ""} ${
            data.user.lastName || ""
          }`.trim();

          setDisplayName(fullName || "User");
          setEmail(data.user.email || "");
        }
      } catch (err) {
        console.error("Settings user fetch error:", err);
      }
    };

    fetchUser();
  }, []);

  // Generate initials
  const initials =
    displayName
      ?.split(" ")
      .map((word) => word?.[0] || "")
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const settings = [
    {
      icon: <FiUser />,
      title: "Profile",
      desc: "Update your personal information",
      path: "/profile",
    },
    {
      icon: <FiLock />,
      title: "Password",
      desc: "Change account password",
      path: "/password",
    },
    {
      icon: <FiMoon />,
      title: "Appearance",
      desc: "Customize theme and colors",
      path: "/settings/appearance",
    },
    {
      icon: <FiBell />,
      title: "Notifications",
      desc: "SMS and email preferences",
      path: "/notifications",
    },
    {
      icon: <FiShield />,
      title: "Security",
      desc: "2FA and protection settings",
      path: "/security",
    },
    {
      icon: <FiMonitor />,
      title: "Sessions",
      desc: "Manage logged-in devices",
      path: "/sessions",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div className="settings-page">
      {/* Header */}
      <div className="settings-header">
        <h2>Settings</h2>
        <p>Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="avatar">
          {initials}
        </div>

        <div className="profile-info">
          <h3>{displayName}</h3>
          <p>{email || "user@realsms.com"}</p>
        </div>
      </div>

      {/* Settings List */}
      <div className="settings-list">
        {settings.map((item, index) => (
          <button
            key={index}
            className="setting-card"
            onClick={() => navigate(item.path)}
          >
            <div className="setting-left">
              <div className="setting-icon">
                {item.icon}
              </div>

              <div className="setting-info">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>

            <FiChevronRight className="arrow" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button className="logout-btn" onClick={handleLogout}>
        <FiLogOut />
        Log Out
      </button>
    </div>
  );
}
