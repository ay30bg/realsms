import React, { createContext, useContext, useState } from "react";

const BalanceContext = createContext(null);

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(50); // initial demo balance

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
        addBalance,
        deductBalance,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

// custom hook (clean usage)
export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance must be used inside BalanceProvider");
  }
  return context;
};
