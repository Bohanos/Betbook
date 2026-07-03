import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user and token state from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [balance, setBalance] = useState(user ? user.balance : 0);

  // Sync token and user to localStorage whenever they change
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

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
        
        // Save the JWT token, user info, and balance
        setToken(data.access_token);
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
    setToken(null);
    setUser(null);
    setBalance(0);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ balance, setBalance, user, setUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};