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
      path: "/appearance",
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

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>Settings</h2>
        <p>Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="avatar">L</div>

        <div className="profile-info">
          <h3>Lysa</h3>
          <p>lysa@email.com</p>
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
              <div className="setting-icon">{item.icon}</div>

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
      <button className="logout-btn">
        <FiLogOut />
        Log Out
      </button>
    </div>
  );
}
