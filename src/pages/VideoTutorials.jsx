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
