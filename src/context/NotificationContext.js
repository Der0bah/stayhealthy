import React, { createContext, useContext } from "react";

export const NotificationContext = createContext({ show: () => {}, hide: () => {} });
export const useNotification = () => useContext(NotificationContext);

export default function NotificationProvider({ value, children }) {
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}
