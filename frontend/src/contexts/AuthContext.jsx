import { useState, useEffect } from "react";
import apiClient from "../utils/apiClient";
import { AuthContext } from "../hooks/useAuth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  // Interceptor to add token to requests
  useEffect(() => {
    const interceptor = apiClient.interceptors.request.use(config => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => apiClient.interceptors.request.eject(interceptor);
  }, [token]);

  // Login method
  const login = async (email, password) => {
    try {
      const response = await apiClient.post("/login", { email, password });
      const { user, token } = response.data;

      // Store token and user
      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);

      return user;
    } catch (error) {
      localStorage.removeItem("token");
      throw error;
    }
  };

  // Register method
  const register = async userData => {
    try {
      const response = await apiClient.post("/register", {
        ...userData,
        role: "client", // Ensure client role
      });
      const { user, token } = response.data;

      // Store token and user
      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);

      return user;
    } catch (error) {
      localStorage.removeItem("token");
      throw error;
    }
  };

  // Logout method
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // Verify token on app load
  useEffect(() => {
    const verifyToken = async () => {
      setIsLoading(true);
      if (token) {
        try {
          const response = await apiClient.get("/validate-token");
          setUser(response.data.user);
        } catch {
          logout();
        }
      }
      setIsLoading(false);
    };

    verifyToken();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
