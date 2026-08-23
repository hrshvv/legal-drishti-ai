import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [scanHistory, setScanHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('legal_drishti_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeProduct, setActiveProductState] = useState(() => {
    try {
      const saved = localStorage.getItem('legal_drishti_active_product');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const setActiveProduct = (prod) => {
    setActiveProductState(prod);
    try {
      if (prod) {
        localStorage.setItem('legal_drishti_active_product', JSON.stringify(prod));
      } else {
        localStorage.removeItem('legal_drishti_active_product');
      }
    } catch (e) {
      console.warn("Could not save active product to localStorage", e);
    }
  };

  const addScanToHistory = (scanResult) => {
    setScanHistory(prev => {
      const updated = [scanResult, ...prev.filter(item => item.id !== scanResult.id)];
      try {
        localStorage.setItem('legal_drishti_history', JSON.stringify(updated.slice(0, 30)));
      } catch (e) {
        console.warn("Could not save history to localStorage", e);
      }
      return updated;
    });
  };

  return (
    <AppContext.Provider value={{ scanHistory, activeProduct, setActiveProduct, addScanToHistory }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    return {
      scanHistory: [],
      activeProduct: null,
      setActiveProduct: () => {},
      addScanToHistory: () => {}
    };
  }
  return context;
};
