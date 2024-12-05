import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  TicketIcon,
  UserIcon,
  LoginIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
      >
        {isOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-md 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 z-40
        `}
      >
        <div className="p-6">
          <Link
            to="/"
            className="text-2xl font-poppins font-bold text-primary mb-8 block"
          >
            EventHub
          </Link>

          <nav className="space-y-4">
            <Link
              to="/"
              className="flex items-center text-textDark hover:text-primary transition-colors"
            >
              <HomeIcon className="h-5 w-5 mr-3" />
              Home
            </Link>
            <Link
              to="/events"
              className="flex items-center text-textDark hover:text-primary transition-colors"
            >
              <TicketIcon className="h-5 w-5 mr-3" />
              Events
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center text-textDark hover:text-primary transition-colors"
                >
                  <UserIcon className="h-5 w-5 mr-3" />
                  {user.name}
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left flex items-center text-textDark hover:text-primary transition-colors"
                >
                  <LoginIcon className="h-5 w-5 mr-3" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center bg-primary text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors"
              >
                <LoginIcon className="h-5 w-5 mr-3" />
                Login
              </Link>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
