import React, { createContext, useContext, useState, useEffect } from "react";

export interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  // Check for a logged-in status on initial load
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsAuthenticated(isLoggedIn);
    setLoading(false); // Set loading to false after checking
  }, []);

  const login = () => {
    localStorage.setItem("isLoggedIn", "true"); // Set logged-in status
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove logged-in status
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
