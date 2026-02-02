// ForgotPassword.jsx
import React from "react";
import "./forgot.css";
import heroImg from "./hero.png"; // replace with your image path
import logo from "./logo.svg";    // replace with your logo path

export default function ForgotPassword() {
  return (
    <div className="forgot-page">
      <div className="forgot-left">
        <img src={heroImg} alt="Hero" className="hero-img" />
      </div>

      <div className="forgot-right">
        <div className="brand">
          <img src={logo} alt="Allsmsverify" />
          <span>Allsmsverify</span>
        </div>

        <div className="forgot-card">
          <h2>Forgot Password?</h2>
          <p>No worries! Just enter your email and we'll send you a reset password link.</p>

          <label>Email</label>
          <input type="email" placeholder="johndoe@gmail.com" />

          <button>Send Recovery Email</button>

          <small>
            Don't have an account? <a href="/register">Sign Up</a>
          </small>
        </div>
      </div>
    </div>
  );
}

