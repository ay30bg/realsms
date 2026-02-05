// import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
// import axios from "axios";

// const BalanceContext = createContext(null);

// export const BalanceProvider = ({ children }) => {
//   const [balance, setBalance] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // Token from localStorage (adjust if using cookies)
//   const token = localStorage.getItem("token");

//   // ------------------ Fetch Wallet Balance ------------------
//   const fetchBalance = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("/api/wallet/balance", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setBalance(res.data.walletBalance);
//     } catch (err) {
//       console.error("Failed to fetch wallet balance", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [token]);

//   // ------------------ Credit Wallet ------------------
//   const creditWallet = useCallback(
//     async (amount) => {
//       try {
//         const res = await axios.post(
//           "/api/wallet/credit",
//           { amount },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setBalance(res.data.walletBalance);
//         return res.data;
//       } catch (err) {
//         console.error("Failed to credit wallet", err);
//         throw err;
//       }
//     },
//     [token]
//   );

//   // ------------------ Debit Wallet ------------------
//   const debitWallet = useCallback(
//     async (amount) => {
//       try {
//         const res = await axios.post(
//           "/api/wallet/debit",
//           { amount },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setBalance(res.data.walletBalance);
//         return res.data;
//       } catch (err) {
//         console.error("Failed to debit wallet", err);
//         throw err;
//       }
//     },
//     [token]
//   );

//   // ------------------ Fetch balance once on mount ------------------
//   useEffect(() => {
//     fetchBalance();
//   }, [fetchBalance]); // ✅ useCallback ensures this is safe

//   // ------------------ Context Provider ------------------
//   return (
//     <BalanceContext.Provider
//       value={{
//         balance,
//         loading,
//         fetchBalance,
//         creditWallet,
//         debitWallet,
//       }}
//     >
//       {children}
//     </BalanceContext.Provider>
//   );
// };

// // ------------------ Custom Hook ------------------
// export const useBalance = () => {
//   const context = useContext(BalanceContext);
//   if (!context) {
//     throw new Error("useBalance must be used inside BalanceProvider");
//   }
//   return context;
// };


import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

// -----------------------------
// Create Context
// -----------------------------
const BalanceContext = createContext(null);

// -----------------------------
// Provider
// -----------------------------
export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // API Base URL from environment
  // -----------------------------
  const API_URL = process.env.REACT_APP_API_URL;

  // -----------------------------
  // Fetch balance from backend
  // -----------------------------
  const fetchBalance = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/wallet/balance`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBalance(res.data.walletBalance);
    } catch (err) {
      console.error("Failed to fetch balance:", err);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // -----------------------------
  // Debit wallet
  // -----------------------------
  const debitWallet = async (amount) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/api/wallet/debit`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh balance after successful debit
      await fetchBalance();
    } catch (err) {
      console.error("Failed to debit wallet:", err);
      throw err;
    }
  };

  // -----------------------------
  // Credit wallet
  // -----------------------------
  const creditWallet = async (amount) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/api/wallet/credit`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh balance after credit
      await fetchBalance();
    } catch (err) {
      console.error("Failed to credit wallet:", err);
      throw err;
    }
  };

  // -----------------------------
  // Fetch balance on mount
  // -----------------------------
  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  // -----------------------------
  // Context value
  // -----------------------------
  return (
    <BalanceContext.Provider
      value={{
        balance,
        loading,
        debitWallet,
        creditWallet,
        fetchBalance,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

// -----------------------------
// Custom hook
// -----------------------------
export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context)
    throw new Error("useBalance must be used inside BalanceProvider");
  return context;
};
