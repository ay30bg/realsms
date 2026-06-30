// ProfileSettings.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "../styles/profile.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <div className="profile-settings">

      <div className="profile-header">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft />
        </button>

        <div>
          <h1>Profile</h1>
          <p>Update your personal information.</p>
        </div>
      </div>

      <div className="settings-card">

        <div className="input-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
          />
        </div>

        <div className="input-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
          />
        </div>

        <div className="button-group">
          <button className="cancel-btn">
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>

      </div>

    </div>
  );
};

export default Profile;
