import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [scanHistory, setScanHistory] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);

  const addScanToHistory = (scanResult) => {
    setScanHistory(prev => [scanResult, ...prev]);
  };

  return (
    <AppContext.Provider value={{ scanHistory, activeProduct, setActiveProduct, addScanToHistory }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
