import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

import "../styles/appearance.css";

export default function Appearance() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();

  const [compactMode, setCompactMode] =
    useState(false);

  const [animations, setAnimations] =
    useState(true);

  return (
    <div className="appearance-page">
      <div className="appearance-header">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft />
        </button>

        <div>
          <h1>Appearance</h1>
          <p>Customize your experience</p>
        </div>
      </div>

      {/* Theme Selector */}
      <div className="appearance-card theme-card">
        <div className="setting-content">
          <h4>Theme Mode</h4>
          <p>Choose your preferred theme</p>
        </div>

        <div className="theme-selector">
          <button
            className={!darkMode ? "active" : ""}
            onClick={() => setDarkMode(false)}
          >
            <FiSun /> Light
          </button>

          <button
            className={darkMode ? "active" : ""}
            onClick={() => setDarkMode(true)}
          >
            <FiMoon /> Dark
          </button>
        </div>
      </div>

      {/* Compact */}
      <div className="appearance-card">
        <div className="setting-content">
          <h4>Compact Mode</h4>
          <p>Reduce spacing and padding</p>
        </div>

        <label className="switch">
          <input
            type="checkbox"
            checked={compactMode}
            onChange={() =>
              setCompactMode(!compactMode)
            }
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* Animation */}
      <div className="appearance-card">
        <div className="setting-content">
          <h4>Animations</h4>
          <p>Enable smooth transitions</p>
        </div>

        <label className="switch">
          <input
            type="checkbox"
            checked={animations}
            onChange={() =>
              setAnimations(!animations)
            }
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
}
