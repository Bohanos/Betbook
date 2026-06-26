import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [balance, setBalance] = useState(2450); // Initial balance
  const [user, setUser] = useState(null); // Tracks if user is logged in

  return (
    <AuthContext.Provider value={{ balance, setBalance, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};