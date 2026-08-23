import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null); // 'inspector' or 'admin'
  const [user, setUser] = useState(null);

  const login = (selectedRole) => {
    setRole(selectedRole);
    setUser({
      name: selectedRole === 'admin' ? 'Dr. Sharma (Admin)' : 'Inspector Ramesh',
      id: selectedRole === 'admin' ? 'ADM-992' : 'INS-104',
    });
  };

  const logout = () => {
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
