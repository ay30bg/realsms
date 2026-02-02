import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import heroImg from "../assets/hero-img.png";
import logo from "../assets/logo.png";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL; // ✅ Use env variable

  // Set page title
  useEffect(() => {
    document.title = "Login - RealSMS";
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      // Save token and user in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");
      navigate("/"); // Redirect to dashboard/home
    } catch (err) {
      alert(
        err.response?.data?.message || "Invalid login credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Left Illustration */}
      <div className="login-illustration">
        <img src={heroImg} alt="Login visual" />
      </div>

      {/* Right Card */}
      <div className="login-card">
        {/* MOBILE LOGO */}
        <div className="login-mobile-logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className="login-header">
          <h2>Sign in</h2>
        </div>

        <div className="login-form">
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="signup-text">
            Don&apos;t have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>

        <p className="login-footer">
          Protected by reCAPTCHA and subject to the
          <span> Privacy Policy </span>
          and
          <span> Terms of Service</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
