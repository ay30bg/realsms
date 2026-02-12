import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const BalanceContext = createContext(null);

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL;

  // =============================
  // FETCH BALANCE
  // =============================
  const fetchBalance = useCallback(async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${API_URL}/api/wallet/balance`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ OPTION B FIX
      setBalance(res.data.walletBalanceNGN || 0);
    } catch (err) {
      console.error("Failed to fetch balance:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // =============================
  // DEBIT
  // =============================
  const debitWallet = async (amount) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API_URL}/api/wallet/debit`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await fetchBalance();
    } catch (err) {
      console.error("Failed to debit wallet:", err.response?.data || err.message);
      throw err;
    }
  };

  // =============================
  // CREDIT (Manual Credit Only)
  // =============================
  const creditWallet = async (amount) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API_URL}/api/wallet/credit`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await fetchBalance();
    } catch (err) {
      console.error("Failed to credit wallet:", err.response?.data || err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return (
    <BalanceContext.Provider
      value={{
        balance,
        loading,
        fetchBalance,
        debitWallet,
        creditWallet,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance must be used inside BalanceProvider");
  }
  return context;
};
