// import React, { useEffect, useState } from "react";
// import "../styles/reset.css";
// import heroImg from "../assets/hero-img.png";
// import logo from "../assets/logo.png";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// export default function ResetPassword() {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const { token } = useParams(); // token from URL
//   const navigate = useNavigate();
//   const API_URL = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     document.title = "Reset Password - RealSMS";
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     if (!password || !confirmPassword) {
//       setMessage("Please fill in both fields");
//       setLoading(false);
//       return;
//     }
//     if (password !== confirmPassword) {
//       setMessage("Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     try {
//       const { data } = await axios.post(`${API_URL}/api/auth/reset-password/${token}`, { password });
//       setMessage(data.message || "Password reset successfully!");
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Something went wrong. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="reset-wrapper">
//       <div className="reset-illustration">
//         <img src={heroImg} alt="Illustration" />
//       </div>

//       <div className="reset-card">
//         <div className="reset-mobile-logo">
//           <img src={logo} alt="RealSMS" />
//         </div>

//         <div className="reset-header">
//           <h2>Reset Your Password</h2>
//           <p>Enter your new password below to regain access to your account.</p>
//         </div>

//         <form className="reset-form" onSubmit={handleSubmit}>
//           <label>New Password</label>
//           <input type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} required />

//           <label>Confirm Password</label>
//           <input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

//           <button className="reset-btn" disabled={loading}>
//             {loading ? "Resetting..." : "Reset Password"}
//           </button>

//           {message && <p className="reset-msg">{message}</p>}
//         </form>

//         <div className="reset-footer">
//           <a href="/login">Back to Login</a>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import "../styles/reset.css";
import heroImg from "../assets/hero-img.png";
import logo from "../assets/logo.png";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi"; // 👈 import eye icons

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle for password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 👈 toggle for confirm

  const { token } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    document.title = "Reset Password - RealSMS";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!password || !confirmPassword) {
      setMessage("Please fill in both fields");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}/api/auth/reset-password/${token}`, { password });
      setMessage(data.message || "Password reset successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-wrapper">
      <div className="reset-illustration">
        <img src={heroImg} alt="Illustration" />
      </div>

      <div className="reset-card">
        <div className="reset-mobile-logo">
          <img src={logo} alt="RealSMS" />
        </div>

        <div className="reset-header">
          <h2>Reset Your Password</h2>
          <p>Enter your new password below to regain access to your account.</p>
        </div>

        <form className="reset-form" onSubmit={handleSubmit}>
          <label>New Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"} // 👈 toggle type
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <label>Confirm Password</label>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"} // 👈 toggle type
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <button className="reset-btn" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          {message && <p className="reset-msg">{message}</p>}
        </form>

        <div className="reset-footer">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
}
