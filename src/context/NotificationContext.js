import React, { createContext, useContext } from "react";

/**
 * Provides global notification controls:
 *  - show(appointmentObject)
 *  - hide()
 */
export const NotificationContext = createContext({
  show: (_appointment) => {},
  hide: () => {},
});

export const useNotification = () => useContext(NotificationContext);

export default function NotificationProvider({ value, children }) {
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
