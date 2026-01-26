import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import heroImg from "../assets/hero-img.png";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "user@test.com" && password === "123456") {
      alert("Login Successful");
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-wrapper">
      {/* Left Illustration Section */}
      <div className="login-illustration">
        <img
          src={heroImg}
          alt="Login visual"
        />
      </div>

      {/* Right Form Section */}
      <div className="login-card">
        <div className="login-header">
          <h2>Sign in</h2>
        </div>

        <div className="login-form">
          <label>Email address</label>
          <input
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <div className="password-field">
            <input
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button className="login-btn" onClick={handleLogin}>
            Sign In
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
