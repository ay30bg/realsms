import React, { useEffect, useState } from "react";
import "../styles/forgot.css";
import heroImg from "../assets/hero-img.png";
import logo from "../assets/logo.png";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = process.env.REACT_APP_API_URL; // ✅ Use env variable

  useEffect(() => {
    document.title = "Forgot Password - RealSMS";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!email) {
      setMessage("Please enter your email address");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${API_URL}/api/auth/forgot-password`,
        { email }
      );

      setMessage(data.message || "Recovery email sent successfully");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-wrapper">
      {/* Left Illustration */}
      <div className="forgot-illustration">
        <img src={heroImg} alt="Illustration" />
      </div>

      {/* Right Card */}
      <div className="forgot-card">
        {/* MOBILE LOGO */}
        <div className="forgot-mobile-logo">
          <img src={logo} alt="RealSMS" />
        </div>

        {/* Header */}
        <div className="forgot-header">
          <h2>Forgot Password?</h2>
          <p>No worries! Enter your email and we’ll send you a reset link.</p>
        </div>

        {/* Form */}
        <form className="forgot-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="forgot-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Recovery Email"}
          </button>

          {message && <p className="forgot-msg">{message}</p>}
        </form>

        {/* Footer */}
        <div className="forgot-footer">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
}
