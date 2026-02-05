// import React, { createContext, useContext, useState } from "react";

// const BalanceContext = createContext(null);

// export const BalanceProvider = ({ children }) => {
//   const [balance, setBalance] = useState(5000); // initial demo balance

//   const addBalance = (amount) => {
//     setBalance((prev) => prev + Number(amount));
//   };

//   const deductBalance = (amount) => {
//     setBalance((prev) => Math.max(prev - Number(amount), 0));
//   };

//   return (
//     <BalanceContext.Provider
//       value={{
//         balance,
//         addBalance,
//         deductBalance,
//       }}
//     >
//       {children}
//     </BalanceContext.Provider>
//   );
// };

// // custom hook (clean usage)
// export const useBalance = () => {
//   const context = useContext(BalanceContext);
//   if (!context) {
//     throw new Error("useBalance must be used inside BalanceProvider");
//   }
//   return context;
// };

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const BalanceContext = createContext(null);

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  // Get token from localStorage (adjust if you use cookies)
  const token = localStorage.getItem("token");

  // Fetch wallet balance from backend
  const fetchBalance = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/wallet/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBalance(res.data.walletBalance);
    } catch (err) {
      console.error("Failed to fetch wallet balance", err);
    } finally {
      setLoading(false);
    }
  };

  // Credit wallet after payment (called from webhook handler or frontend notification)
  const creditWallet = async (amount) => {
    try {
      const res = await axios.post(
        "/api/wallet/credit",
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBalance(res.data.walletBalance);
      return res.data;
    } catch (err) {
      console.error("Failed to credit wallet", err);
      throw err;
    }
  };

  // Debit wallet for purchases
  const debitWallet = async (amount) => {
    try {
      const res = await axios.post(
        "/api/wallet/debit",
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBalance(res.data.walletBalance);
      return res.data;
    } catch (err) {
      console.error("Failed to debit wallet", err);
      throw err;
    }
  };

  // Fetch balance once on mount
  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <BalanceContext.Provider
      value={{
        balance,
        loading,
        fetchBalance,
        creditWallet,
        debitWallet,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

// Custom hook
export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance must be used inside BalanceProvider");
  }
  return context;
};

