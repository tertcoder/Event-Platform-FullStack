import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LockClosedIcon, MailIcon } from "@heroicons/react/solid";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    try {
      // Mock login - in real app, this would be an API call
      const mockUserData = {
        id: "123",
        name: "John Doe",
        email: email,
      };

      // Simulate successful login
      login(mockUserData, "mock-token");

      // Redirect to previous page or home
      const from = location.state?.from || "/";
      navigate(from);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-poppins font-bold text-primary">
            Welcome Back
          </h2>
          <p className="text-gray-600 mt-2">Log in to your EventHub account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MailIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email address"
              className="pl-10 block w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockClosedIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="pl-10 block w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-secondary text-white py-3 rounded-md hover:bg-opacity-90 transition-colors font-semibold"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline font-semibold"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
