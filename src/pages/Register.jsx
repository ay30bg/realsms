// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import heroImg from "../assets/hero-img.png";
// import logo from "../assets/logo.png";
// import "../styles/register.css";

// const Register = () => {
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     agree: false,
//   });

//   const navigate = useNavigate();

//   // ✅ PAGE TITLE
//   useEffect(() => {
//     document.title = "Register - RealSMS";
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({
//       ...form,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleRegister = () => {
//     if (!form.firstName || !form.lastName || !form.email || !form.password) {
//       alert("All fields are required");
//       return;
//     }

//     if (!form.agree) {
//       alert("You must accept the terms");
//       return;
//     }

//     alert("Account created successfully");
//     navigate("/login");
//   };

//   return (
//     <div className="register-wrapper">
//       {/* LEFT IMAGE */}
//       <div className="register-illustration">
//         <img src={heroImg} alt="Signup visual" />
//       </div>

//       {/* RIGHT FORM */}
//       <div className="register-card">
//         {/* MOBILE LOGO */}
//         <div className="register-mobile-logo">
//           <img src={logo} alt="Logo" />
//         </div>

//         <h2>Sign up</h2>

//         <div className="register-form">
//           <div className="name-row">
//             <div>
//               <label>First name</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={form.firstName}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label>Last name</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={form.lastName}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <label>Email address</label>
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//           />

//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//           />

//           {/* reCAPTCHA placeholder */}
//           <div className="recaptcha-box">
//             <input type="checkbox" />
//             <span>I’m not a robot</span>
//             <div className="recaptcha-logo">reCAPTCHA</div>
//           </div>

//           <div className="terms">
//             <input
//               type="checkbox"
//               name="agree"
//               checked={form.agree}
//               onChange={handleChange}
//             />
//             <p>
//               By clicking Create Account, I agree that I have read and accepted
//               the <span>Privacy Policy</span> and <span>Terms of Service</span>.
//             </p>
//           </div>

//           <button className="register-btn" onClick={handleRegister}>
//             Create Account
//           </button>

//           <p className="signin-text">
//             I have an account? <Link to="/login">Sign In</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import heroImg from "../assets/hero-img.png";
import logo from "../assets/logo.png";
import "../styles/register.css";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register - RealSMS";
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRegister = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    if (!form.agree) {
      alert("You must accept the terms");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        }
      );

      alert(res.data.message || "Account created successfully");
      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.message || "Registration failed, try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      {/* LEFT IMAGE */}
      <div className="register-illustration">
        <img src={heroImg} alt="Signup visual" />
      </div>

      {/* RIGHT FORM */}
      <div className="register-card">
        <div className="register-mobile-logo">
          <img src={logo} alt="Logo" />
        </div>

        <h2>Sign up</h2>

        <div className="register-form">
          <div className="name-row">
            <div>
              <label>First name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Last name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <label>Email address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <div className="terms">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />
            <p>
              By clicking Create Account, I agree to the{" "}
              <span>Privacy Policy</span> and <span>Terms of Service</span>.
            </p>
          </div>

          <button
            className="register-btn"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          <p className="signin-text">
            I have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

