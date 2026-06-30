import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage safely
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [balance, setBalance] = useState(user ? user.balance : 0);

  // Sync user changes to localStorage whenever 'user' state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        // Update both user state (which triggers the useEffect above) and balance
        setUser(data.user);
        setBalance(data.user.balance);
        return { success: true };
      }
      return { success: false, error: "Login failed" };
    } catch (err) {
      return { success: false, error: "Network error" };
    }
  };

  const logout = () => {
    setUser(null);
    setBalance(0);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ balance, setBalance, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};