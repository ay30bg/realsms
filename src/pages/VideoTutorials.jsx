// import React from "react";
// import "../styles/videoTutorials.css";
// import { useNavigate } from "react-router-dom";
// import {
//   FiArrowLeft,
//   FiSearch,
//   FiPlay,
//   FiArrowRight,
//   FiHeadphones,
// } from "react-icons/fi";

// const tutorials = [
//   {
//     title: "1. Getting Started",
//     description:
//       "Learn the basics of the SMS platform and account overview.",
//     duration: "3:45",
//   },
//   {
//     title: "2. Send SMS",
//     description:
//       "Step-by-step guide to send SMS to single or multiple contacts.",
//     duration: "4:12",
//   },
//   {
//     title: "3. Create Templates",
//     description:
//       "Create, manage and use templates to save time.",
//     duration: "3:30",
//   },
//   {
//     title: "4. Send OTP",
//     description:
//       "Learn how to send OTPs for verification and authentication.",
//     duration: "4:01",
//   },
//   {
//     title: "5. SMS Campaigns",
//     description:
//       "Create and manage SMS campaigns effectively.",
//     duration: "4:25",
//   },
//   {
//     title: "6. Manage Contacts",
//     description:
//       "Import, organize and manage contact lists.",
//     duration: "3:15",
//   },
//   {
//     title: "7. API Integration",
//     description:
//       "Integrate SMS services into your application.",
//     duration: "5:10",
//   },
//   {
//     title: "8. Reports & Analytics",
//     description:
//       "Track delivery and view detailed analytics.",
//     duration: "3:50",
//   },
// ];

// const VideoTutorials = () => {

//   const navigate = useNavigate();
  
//   return (
//     <div className="video-page">

//      <div className="video-tutorial-header">
//         <button
//           className="back-button"
//           onClick={() => navigate(-1)}
//         >
//           <FiArrowLeft />
//         </button>

//         <div>
//           <h1>Video Tutorials</h1>
//           <p>Learn how to use our SMS/OTP platform with step-by-step video guides.</p>
//         </div>
//       </div>

//       {/* SEARCH BAR */}

//       <div className="tutorial-actions">
//         <div className="search-box">
//           <FiSearch />
//           <input
//             type="text"
//             placeholder="Search tutorials..."
//           />
//         </div>

//         <select>
//           <option>All Categories</option>
//           <option>SMS</option>
//           <option>Logs</option>
//           <option>Deposit</option>
//         </select>
//       </div>

//       {/* VIDEO GRID */}

//       <div className="tutorial-grid">
//         {tutorials.map((item, index) => (
//           <div className="tutorial-card" key={index}>
//             <div className="thumbnail">
//               <div className="play-btn">
//                 <FiPlay />
//               </div>

//               <span>{item.duration}</span>
//             </div>

//             <div className="card-content">
//               <h3>{item.title}</h3>
//               <p>{item.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* FOOTER CTA */}

//       <div className="tutorial-footer">
//         <div className="footer-left">
//           <div className="icon-box">
//             <FiHeadphones />
//           </div>

//           <div>
//             <h3>Need More Help?</h3>
//             <p>
//               Contact support if you need assistance.
//             </p>
//           </div>
//         </div>

//         <button>
//          Contact Support
//           <FiArrowRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VideoTutorials;

import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import "../styles/videoTutorials.css";

import {
  FiArrowLeft,
  FiSearch,
  FiPlay,
  FiArrowRight,
  FiHeadphones,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

const API_URL =
  process.env.REACT_APP_API_URL;

const VideoTutorials = () => {
  const navigate =
    useNavigate();

  const [tutorials,
    setTutorials] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [search,
    setSearch] =
    useState("");

  const [category,
    setCategory] =
    useState(
      "All Categories"
    );

  // ==================
  // FETCH TUTORIALS
  // ==================

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials =
    async () => {

      try {

        const res =
          await axios.get(
            `${API_URL}/api/tutorials`
          );

        setTutorials(
          res.data.tutorials
        );

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(
          false
        );

      }
    };

  // ==================
  // FILTERS
  // ==================

  const filteredTutorials =
    tutorials.filter(
      (item) => {

        const searchMatch =
          item.title
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          item.description
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const categoryMatch =
          category ===
          "All Categories"
            ? true
            : item.category ===
              category;

        return (
          searchMatch &&
          categoryMatch
        );
      }
    );

  return (
    <div className="video-page">

      <div className="video-tutorial-header">

        <button
          className="back-button"
          onClick={() =>
            navigate(-1)
          }
        >
          <FiArrowLeft />
        </button>

        <div>

          <h1>
            Video Tutorials
          </h1>

          <p>
            Learn how to use
            our SMS/OTP platform
            with step-by-step
            video guides.
          </p>

        </div>

      </div>

      {/* SEARCH */}

      <div className="tutorial-actions">

        <div className="search-box">

          <FiSearch />

          <input
            type="text"
            placeholder="Search tutorials..."
            value={
              search
            }
            onChange={(e) =>
              setSearch(
                e.target
                  .value
              )
            }
          />

        </div>

        <select
          value={
            category
          }
          onChange={(e) =>
            setCategory(
              e.target
                .value
            )
          }
        >

          <option>
            All Categories
          </option>

          <option>
            SMS
          </option>

          <option>
            OTP
          </option>

          <option>
            Deposit
          </option>

          <option>
            Logs
          </option>

        </select>

      </div>

      {/* TUTORIAL GRID */}

      <div className="tutorial-grid">

        {loading ? (

          <h3>
            Loading...
          </h3>

        ) : filteredTutorials
          .length ===
          0 ? (

          <h3>
            No tutorials found
          </h3>

        ) : (

          filteredTutorials.map(
            (
              tutorial
            ) => (

              <div
                key={
                  tutorial._id
                }
                className="tutorial-card"
              >

                <div className="thumbnail">

                  <img
                    src={
                      tutorial.thumbnail
                    }
                    alt=""
                  />

                  <button
                    className="play-btn"
                    onClick={() =>
                      window.open(
                        tutorial.video,
                        "_blank"
                      )
                    }
                  >
                    <FiPlay />
                  </button>

                  <span>

                    {
                      tutorial.duration
                    }

                  </span>

                </div>

                <div className="card-content">

                  <h3>

                    {
                      tutorial.title
                    }

                  </h3>

                  <p>

                    {
                      tutorial.description
                    }

                  </p>

                </div>

              </div>

            )
          )

        )}

      </div>

      {/* FOOTER */}

      <div className="tutorial-footer">

        <div className="footer-left">

          <div className="icon-box">

            <FiHeadphones />

          </div>

          <div>

            <h3>
              Need More Help?
            </h3>

            <p>
              Contact support if
              you need assistance.
            </p>

          </div>

        </div>

        <button
          onClick={() =>
            navigate(
              "/support"
            )
          }
        >

          Contact Support

          <FiArrowRight />

        </button>

      </div>

    </div>
  );
};

export default VideoTutorials;
