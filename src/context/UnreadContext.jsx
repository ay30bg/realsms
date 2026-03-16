// context/UnreadContext.jsx
import React, { createContext, useState, useContext } from "react";

const UnreadContext = createContext();

export const useUnread = () => useContext(UnreadContext);

export const UnreadProvider = ({ children }) => {
  const [unreadMessages, setUnreadMessages] = useState(0);
  return (
    <UnreadContext.Provider value={{ unreadMessages, setUnreadMessages }}>
      {children}
    </UnreadContext.Provider>
  );
};
