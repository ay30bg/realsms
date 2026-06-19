import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FiSearch, FiCopy , FiInfo} from "react-icons/fi";
import ServiceCard from "../components/ServiceCard";
import { useBalance } from "../context/BalanceContext";
import "../styles/buy-number.css";
import whatsappLogo from "../assets/whatsapp.png";
import telegramLogo from "../assets/telegram.png";
import tiktokLogo from "../assets/tiktok.png";
import instagramLogo from "../assets/instagram.png";
import facebookLogo from "../assets/facebook.png";
import discordLogo from "../assets/discord.png";
import signalLogo from "../assets/signal.png";
import pofLogo from "../assets/pof.png";

const POPULAR_SERVICES = [
  "WhatsApp",
  "Telegram",
  "Plenty Of Fish",
  "TikTok",
  "Instagram",
  "Facebook",
  "Discord",
  "Signal",
];

const SERVICE_LOGOS = {
  whatsapp: whatsappLogo,
  telegram: telegramLogo,
  tiktok: tiktokLogo,
  instagram: instagramLogo,
  facebook: facebookLogo,
  discord: discordLogo,
  signal: signalLogo,
  "plenty of fish": pofLogo,
};

const BuyNumbers = ({ darkMode }) => {
  const { balance, setBalance, fetchBalance } = useBalance();

  const [countries, setCountries] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState("idle");
  const [otp, setOtp] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600);
  const [search, setSearch] = useState("");
  const [loadingServices, setLoadingServices] = useState(false);
  const [copied, setCopied] = useState(false);

  const token = localStorage.getItem("token");

  const API_URL =
    process.env.REACT_APP_API_URL ||
    "https://realsms-backend.vercel.app";

  const pollOtp = useRef(null);

  useEffect(() => {
    document.title = "Buy Numbers - RealSMS";
  }, []);

  // ---------------- RESTORE ACTIVE ORDER ----------------
  useEffect(() => {
    if (!token) return;

    const saved = localStorage.getItem("activeOrder");
    if (!saved) return;

    const parsed = JSON.parse(saved);
    const remaining = Math.floor(
      (parsed.expiryTime - Date.now()) / 1000
    );

    if (remaining <= 0) {
      localStorage.removeItem("activeOrder");
      return;
    }

    setActiveOrder({
      ...parsed.service,
      number: parsed.number,
      orderid: parsed.orderid,
    });

    setTimeLeft(remaining);
    setOrderStatus("waiting");

    if (pollOtp.current) clearInterval(pollOtp.current);

    pollOtp.current = setInterval(async () => {
      try {
        const res = await axios.post(
          `${API_URL}/api/smspool/otp`,
          { orderid: parsed.orderid },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data?.otp) {
          setOtp(res.data.otp);
          setOrderStatus("received");
          clearInterval(pollOtp.current);
          localStorage.removeItem("activeOrder");
        }
      } catch {}
    }, 2000);

    return () => {
      if (pollOtp.current) clearInterval(pollOtp.current);
    };
  }, [token, API_URL]);

  // ---------------- FETCH COUNTRIES ----------------
  useEffect(() => {
    if (!token) return;

    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/smspool/servers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCountries(
          Array.isArray(res.data) ? res.data : []
        );
      } catch {
        setCountries([]);
      }
    };

    fetchCountries();
  }, [token, API_URL]);

  // ---------------- FETCH SERVICES ----------------
  useEffect(() => {
    if (!selectedCountry || !token) return;

    const fetchServices = async () => {
      setLoadingServices(true);

      try {
        const res = await axios.get(
          `${API_URL}/api/smspool/services`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = Array.isArray(res.data)
          ? res.data
          : [];

        // const withPrice = data.map((s) => {
        //   const priceObj = s.pricing?.find(
        //     (p) =>
        //       String(p.countryID) ===
        //       String(selectedCountry.ID)
        //   );

        //   return {
        //     ...s,
        //     price: priceObj?.priceNGN || null,
        //     popular: POPULAR_SERVICES.some(
        //       (name) =>
        //         name.toLowerCase() ===
        //         s.name?.toLowerCase()
        //     ),
        //   };
        // });

       const withPrice = data.map((s) => {
  const priceObj = s.pricing?.find(
    (p) =>
      String(p.countryID) ===
      String(selectedCountry.ID)
  );

  const serviceName =
    s.name?.toLowerCase();

  return {
    ...s,
    price: priceObj?.priceNGN || null,

    logo:
      SERVICE_LOGOS[
        serviceName
      ] ||
      `https://img.logo.dev/search?query=${encodeURIComponent(
        s.name || ""
      )}&token=${
        process.env.REACT_APP_LOGO_DEV_KEY
      }`,

    popular:
      POPULAR_SERVICES.some(
        (name) =>
          name.toLowerCase() ===
          serviceName
      ),
  };
});
        setServices(withPrice);
      } catch {
        setServices([]);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, [selectedCountry, token, API_URL]);

  // ---------------- COUNTRY CHANGE ----------------
  const handleCountryChange = (e) => {
    const countryId = e.target.value;

    const country =
      countries.find(
        (c) => c.ID.toString() === countryId
      ) || null;

    setSelectedCountry(country);
    setActiveOrder(null);
    setOrderStatus("idle");
    setOtp(null);
    setTimeLeft(600);
    setSearch("");
    setCopied(false);
    setServices([]);

    localStorage.removeItem("activeOrder");

    if (pollOtp.current)
      clearInterval(pollOtp.current);
  };

  // ---------------- HANDLE BUY ----------------
  const handleBuy = async (service) => {
    if (!selectedCountry)
      return alert("Please select a country first!");

    if (!service.price)
      return alert(
        "Service not available for this country!"
      );

    if (balance < service.price)
      return alert("Insufficient balance");

    if (orderStatus === "waiting")
      return alert(
        "You already have an active order!"
      );

    const previousBalance = balance;

    // Instant UI deduction
    setBalance((prev) => prev - service.price);

    setOrderStatus("waiting");
    setOtp(null);
    setTimeLeft(600);
    setCopied(false);

    try {
      const res = await axios.post(
        `${API_URL}/api/smspool/buy`,
        {
          country: selectedCountry.ID,
          service: service.ID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success === 0) {
        throw new Error(res.data.message);
      }

      const { number, orderid } = res.data.data;
      const expiryTime = Date.now() + 600000;

      localStorage.setItem(
        "activeOrder",
        JSON.stringify({
          service,
          number,
          orderid,
          expiryTime,
        })
      );

      setActiveOrder({
        ...service,
        number,
        orderid,
      });

      if (pollOtp.current)
        clearInterval(pollOtp.current);

      pollOtp.current = setInterval(async () => {
        try {
          const otpRes = await axios.post(
            `${API_URL}/api/smspool/otp`,
            { orderid },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (otpRes.data?.otp) {
            setOtp(otpRes.data.otp);
            setOrderStatus("received");
            clearInterval(pollOtp.current);
            localStorage.removeItem("activeOrder");
          }
        } catch {}
      }, 2000);
    } catch (err) {
      setBalance(previousBalance);
      setOrderStatus("idle");
      fetchBalance();

      alert(
        err.response?.data?.message || err.message
      );
    }
  };

  // ---------------- COUNTDOWN ----------------
  useEffect(() => {
    if (orderStatus !== "waiting") return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setOrderStatus("expired");
          localStorage.removeItem("activeOrder");

          if (pollOtp.current)
            clearInterval(pollOtp.current);

          return 0;
        }

        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [orderStatus]);

  // ---------------- COPY RESET ----------------
  useEffect(() => {
    if (!copied) return;

    const t = setTimeout(
      () => setCopied(false),
      2000
    );

    return () => clearTimeout(t);
  }, [copied]);

  // ---------------- FILTER LOGIC ----------------
  const normalizedSearch =
    search.trim().toLowerCase();

  const filteredServices =
    normalizedSearch === ""
      ? services.filter((service) => service.popular)
      : services.filter((service) =>
          service.name
            ?.toLowerCase()
            .includes(normalizedSearch)
        );

  return (
    <div
      className={`buy-page ${
        darkMode ? "dark" : ""
      }`}
    >
      {/* HEADER */}
      <div className="buy-header">
        <div>
          <h1>Buy Number</h1>
          <p>
            Purchase temporary virtual numbers
            for SMS verification
          </p>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="buy-toolbar">
        <select
          className="server-select"
          value={selectedCountry?.ID || ""}
          onChange={handleCountryChange}
        >
          <option value="">
            Select Country
          </option>

          {countries.map((c) => (
            <option
              key={c.ID}
              value={c.ID}
            >
              {c.name}
            </option>
          ))}
        </select>

        <div className="search-container">
          <FiSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search service..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            disabled={
              !selectedCountry || loadingServices
            }
          />
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="buy-layout">
        {/* SERVICES */}
        <div className="services-panel">
          {search === "" && selectedCountry && (
            <div className="popular-label">
              <span>Popular services</span>

              <div className="stat-pill">
      <span>Available Services</span>
      <strong>{services.filter((s) => s.price).length}</strong>
    </div>
            </div>
          )}

{loadingServices ? (
  <div className="loading-state">
    <div className="spinner"></div>
  </div>
) : filteredServices.length > 0 ? (
  <>
    <div className="services-grid">
      {filteredServices.map((service) => (
        <ServiceCard
          key={service.ID || service.id}
          service={service}
          onBuy={handleBuy}
        />
      ))}
    </div>

    {search === "" && (
      <div className="notice">
        <FiInfo />
        <span>
          Search for other available services
        </span>
      </div>
    )}
  </>
) : (
  <div className="empty-state">
    <h3>No services found</h3>
    <p>
      {search
        ? "Try another service name"
        : "Select a country to continue"}
    </p>
  </div>
)}
        </div>

        {/* OTP PANEL */}
        <div className="otp-panel">
          <h3>Inbox</h3>

          {!activeOrder ? (
            <div className="otp-empty">
              <p>No active order</p>
              <span>
                Buy a number to receive OTP
                here
              </span>
            </div>
          ) : (
            <>
              <div className="number-box">
                <span>Phone Number</span>

                <div className="number-row">
                  <h2>
                    {activeOrder.number}
                  </h2>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        activeOrder.number
                      );
                      setCopied(true);
                    }}
                  >
                    <FiCopy />
                  </button>
                </div>
              </div>

              {orderStatus === "waiting" && (
                <div className="otp-status waiting">
                  <h4>
                    Waiting for OTP...
                  </h4>

                  <div className="timer-pill">
                    {Math.floor(
                      timeLeft / 60
                    )}
                    :
                    {String(
                      timeLeft % 60
                    ).padStart(2, "0")}
                  </div>
                </div>
              )}

              {orderStatus === "received" && (
                <div className="otp-status success">
                  <span>
                    Received OTP
                  </span>

                  <h1>{otp}</h1>

                  <button
                    className="copy-otp-btn"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        otp
                      );
                      setCopied(true);
                    }}
                  >
                    Copy OTP
                  </button>
                </div>
              )}

              {orderStatus === "expired" && (
                <div className="otp-status expired">
                  OTP expired
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyNumbers;

