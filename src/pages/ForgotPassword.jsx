// import React from "react";
// import "../styles/forgot.css";
// import heroImg from "../assets/hero-img.png";
// import logo from "../assets/logo.png";

// export default function ForgotPassword() {
//   return (
//     <div className="forgot-wrapper">
//       {/* LEFT ILLUSTRATION */}
//       <div className="forgot-illustration">
//         <img src={heroImg} alt="Illustration" />
//       </div>

//       {/* RIGHT CARD */}
//       <div className="forgot-card">
//         {/* MOBILE LOGO */}
//         <div className="forgot-mobile-logo">
//           <img src={logo} alt="Allsmsverify" />
//         </div>

//         {/* HEADER */}
//         <div className="forgot-header">
//           <h2>Forgot Password?</h2>
//           <p>
//             No worries! Enter your email and we’ll send you a reset link.
//           </p>
//         </div>

//         {/* FORM */}
//         <form className="forgot-form">
//           <label htmlFor="email">Email</label>
//           <input
//             id="email"
//             type="email"
//             placeholder="johndoe@gmail.com"
//           />

//           <button type="submit" className="forgot-btn">
//             Send Recovery Email
//           </button>
//         </form>

//         {/* FOOTER */}
//         <div className="forgot-footer">
//           <a href="/login">Back to Login</a>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import "../styles/forgot.css";
import heroImg from "../assets/hero-img.png";
import logo from "../assets/logo.png";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "Forgot Password - RealSMS";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/forgot-password`,
        { email }
      );

      setMessage(data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-wrapper">
      <div className="forgot-illustration">
        <img src={heroImg} alt="Illustration" />
      </div>

      <div className="forgot-card">
        <div className="forgot-mobile-logo">
          <img src={logo} alt="RealSMS" />
        </div>

        <div className="forgot-header">
          <h2>Forgot Password?</h2>
          <p>No worries! Enter your email and we’ll send you a reset link.</p>
        </div>

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

        <div className="forgot-footer">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
}
