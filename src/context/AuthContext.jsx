import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Read saved role or default to 'inspector' for hackathon prototype testing
  const [role, setRole] = useState(() => {
    return localStorage.getItem('ld_role') || 'inspector';
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('ld_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed.name === 'Inspector Ramesh') {
          parsed.name = 'Inspector Harsh';
        }
        return parsed;
      } catch (e) {}
    }
    return {
      name: 'Inspector Harsh',
      id: 'INS-104',
      role: 'inspector'
    };
  });

  const login = (selectedRole) => {
    setRole(selectedRole);
    const userData = {
      name: selectedRole === 'admin' ? 'Dr. Sharma (Supervisor)' : 'Inspector Harsh',
      id: selectedRole === 'admin' ? 'ADM-992' : 'INS-104',
      role: selectedRole
    };
    setUser(userData);
    localStorage.setItem('ld_role', selectedRole);
    localStorage.setItem('ld_user', JSON.stringify(userData));
  };

  const logout = () => {
    setRole('inspector');
    setUser({
      name: 'Inspector Harsh',
      id: 'INS-104',
      role: 'inspector'
    });
    localStorage.removeItem('ld_role');
    localStorage.removeItem('ld_user');
  };

  return (
    <AuthContext.Provider value={{ role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
