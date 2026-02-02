import React, { useEffect } from "react";
import "../styles/forgot.css";
import heroImg from "../assets/hero-img.png";
import logo from "../assets/logo.png";

export default function ForgotPassword() {
  // ✅ Set page title
  useEffect(() => {
    document.title = "Forgot Password - RealSMS";
  }, []);

  return (
    <div className="forgot-wrapper">
      {/* LEFT ILLUSTRATION */}
      <div className="forgot-illustration">
        <img src={heroImg} alt="Illustration" />
      </div>

      {/* RIGHT CARD */}
      <div className="forgot-card">
        {/* MOBILE LOGO */}
        <div className="forgot-mobile-logo">
          <img src={logo} alt="Allsmsverify" />
        </div>

        {/* HEADER */}
        <div className="forgot-header">
          <h2>Forgot Password?</h2>
          <p>
            No worries! Enter your email and we’ll send you a reset link.
          </p>
        </div>

        {/* FORM */}
        <form className="forgot-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="johndoe@gmail.com"
          />

          <button type="submit" className="forgot-btn">
            Send Recovery Email
          </button>
        </form>

        {/* FOOTER */}
        <div className="forgot-footer">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
}
