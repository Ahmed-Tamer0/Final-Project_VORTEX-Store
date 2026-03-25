import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('vortex_user');
      const parsed = savedUser ? JSON.parse(savedUser) : null;
      if (parsed && typeof parsed === 'object' && parsed.name) {
        return parsed;
      }
      localStorage.removeItem('vortex_user');
      localStorage.setItem('vortex_isLoggedIn', 'false');
      return null;
    } catch (e) {
      localStorage.removeItem('vortex_user');
      return null;
    }
  });

  const login = (email, password) => {
    const accounts = JSON.parse(localStorage.getItem('vortex_accounts') || '[]');
    const foundUser = accounts.find(a => a.email === email && a.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('vortex_user', JSON.stringify(foundUser));
      localStorage.setItem('vortex_isLoggedIn', 'true');
      return true;
    }
    // For ease of testing, assume a default admin if none found
    if (email === 'admin@vortex.io' && password === 'admin') {
      const adminUser = { name: 'Admin', email: 'admin@vortex.io' };
      setUser(adminUser);
      localStorage.setItem('vortex_user', JSON.stringify(adminUser));
      localStorage.setItem('vortex_isLoggedIn', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vortex_user');
    localStorage.setItem('vortex_isLoggedIn', 'false');
  };

  const register = (userData) => {
    const accounts = JSON.parse(localStorage.getItem('vortex_accounts') || '[]');
    if (accounts.find(a => a.email === userData.email)) return false;
    
    accounts.push(userData);
    localStorage.setItem('vortex_accounts', JSON.stringify(accounts));
    
    setUser(userData);
    localStorage.setItem('vortex_user', JSON.stringify(userData));
    localStorage.setItem('vortex_isLoggedIn', 'true');
    return true;
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
