import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = e => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    // Mock login (replace with actual authentication)
    if (email === "admin@example.com" && password === "admin123") {
      login({ email, role: "admin" });
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-custom w-full max-w-md">
        <h2 className="text-3xl font-heading font-bold text-primary text-center mb-6">
          Event Management Dashboard
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              {error}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-text-light mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-text-light mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
