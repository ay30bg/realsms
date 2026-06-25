import React from "react";
import "../styles/videoTutorials.css";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiSearch,
  FiPlay,
  FiArrowRight,
  FiBookOpen,
} from "react-icons/fi";

const navigate = useNavigate();

const tutorials = [
  {
    title: "1. Getting Started",
    description:
      "Learn the basics of the SMS platform and account overview.",
    duration: "3:45",
  },
  {
    title: "2. Send SMS",
    description:
      "Step-by-step guide to send SMS to single or multiple contacts.",
    duration: "4:12",
  },
  {
    title: "3. Create Templates",
    description:
      "Create, manage and use templates to save time.",
    duration: "3:30",
  },
  {
    title: "4. Send OTP",
    description:
      "Learn how to send OTPs for verification and authentication.",
    duration: "4:01",
  },
  {
    title: "5. SMS Campaigns",
    description:
      "Create and manage SMS campaigns effectively.",
    duration: "4:25",
  },
  {
    title: "6. Manage Contacts",
    description:
      "Import, organize and manage contact lists.",
    duration: "3:15",
  },
  {
    title: "7. API Integration",
    description:
      "Integrate SMS services into your application.",
    duration: "5:10",
  },
  {
    title: "8. Reports & Analytics",
    description:
      "Track delivery and view detailed analytics.",
    duration: "3:50",
  },
];

const VideoTutorials = () => {

  const navigate = useNavigate();
  
  return (
    <div className="video-page">

     <div className="video-tutorial-header">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft />
        </button>

        <div>
          <h1>Video Tutorials</h1>
          <p>Learn how to use our SMS/OTP platform with step-by-step video guides.</p>
        </div>
      </div>

      {/* SEARCH BAR */}

      <div className="tutorial-actions">
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search tutorials..."
          />
        </div>

        <select>
          <option>All Categories</option>
          <option>SMS</option>
          <option>API</option>
          <option>Campaigns</option>
        </select>
      </div>

      {/* VIDEO GRID */}

      <div className="tutorial-grid">
        {tutorials.map((item, index) => (
          <div className="tutorial-card" key={index}>
            <div className="thumbnail">
              <div className="play-btn">
                <FiPlay />
              </div>

              <span>{item.duration}</span>
            </div>

            <div className="card-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER CTA */}

      <div className="tutorial-footer">
        <div className="footer-left">
          <div className="icon-box">
            <FiBookOpen />
          </div>

          <div>
            <h3>New to SMS Marketing?</h3>
            <p>
              Watch our complete tutorial playlist to
              master the platform.
            </p>
          </div>
        </div>

        <button>
          Watch Full Playlist
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default VideoTutorials;
