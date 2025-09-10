import React, { createContext, useState } from 'react';

export const SubscriptionContext = createContext();

export function SubscriptionProvider({ children }) {
  const [subscriptions, setSubscriptions] = useState([]);

  return (
    <SubscriptionContext.Provider value={{ subscriptions, setSubscriptions }}>
      {children}
    </SubscriptionContext.Provider>
  );
}