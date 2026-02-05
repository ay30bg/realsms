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

const BalanceContext = createContext(null);

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  // ===============================
  // FETCH BALANCE FROM BACKEND
  // ===============================
  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/balance`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        setBalance(Number(data.balance));
      }
    } catch (err) {
      console.error("Failed to fetch balance:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // INIT LOAD
  // ===============================
  useEffect(() => {
    fetchBalance();
  }, []);

  // ===============================
  // LOCAL UPDATES (OPTIMISTIC)
  // ===============================
  const addBalance = (amount) => {
    setBalance((prev) => prev + Number(amount));
  };

  const deductBalance = (amount) => {
    setBalance((prev) => Math.max(prev - Number(amount), 0));
  };

  return (
    <BalanceContext.Provider
      value={{
        balance,
        loading,
        fetchBalance, // 🔥 allows manual refresh
        addBalance,
        deductBalance,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

// ===============================
// CUSTOM HOOK
// ===============================
export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance must be used inside BalanceProvider");
  }
  return context;
};
