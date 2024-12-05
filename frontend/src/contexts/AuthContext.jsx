import { useState, useEffect } from "react";
import { AuthContext } from "../hooks/useAuth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing token on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // In a real app, you'd validate the token with your backend
      // For now, we'll just set a mock user
      setUser({
        id: "123",
        name: "John Doe",
        email: "john@example.com",
      });
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
