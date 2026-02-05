import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

const BalanceContext = createContext(null);

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  // Token from localStorage (adjust if using cookies)
  const token = localStorage.getItem("token");

  // ------------------ Fetch Wallet Balance ------------------
  const fetchBalance = useCallback(async () => {
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
  }, [token]);

  // ------------------ Credit Wallet ------------------
  const creditWallet = useCallback(
    async (amount) => {
      try {
        const res = await axios.post(
          "/api/wallet/credit",
          { amount },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBalance(res.data.walletBalance);
        return res.data;
      } catch (err) {
        console.error("Failed to credit wallet", err);
        throw err;
      }
    },
    [token]
  );

  // ------------------ Debit Wallet ------------------
  const debitWallet = useCallback(
    async (amount) => {
      try {
        const res = await axios.post(
          "/api/wallet/debit",
          { amount },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBalance(res.data.walletBalance);
        return res.data;
      } catch (err) {
        console.error("Failed to debit wallet", err);
        throw err;
      }
    },
    [token]
  );

  // ------------------ Fetch balance once on mount ------------------
  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]); // ✅ useCallback ensures this is safe

  // ------------------ Context Provider ------------------
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

// ------------------ Custom Hook ------------------
export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance must be used inside BalanceProvider");
  }
  return context;
};
