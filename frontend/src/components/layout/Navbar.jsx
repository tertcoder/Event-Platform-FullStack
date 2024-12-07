import { Link } from "react-router-dom";
import {
  HomeIcon,
  TicketIcon,
  UserIcon,
  LoginIcon,
} from "@heroicons/react/outline";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-poppins font-bold text-primary flex items-center"
        >
          MasterEvent
        </Link>

        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="flex items-center text-textDark hover:text-primary transition-colors"
          >
            <HomeIcon className="h-5 w-5 mr-1" />
            Home
          </Link>
          <Link
            to="/events"
            className="flex items-center text-textDark hover:text-primary transition-colors"
          >
            <TicketIcon className="h-5 w-5 mr-1" />
            Events
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="flex items-center text-textDark hover:text-primary transition-colors"
              >
                <UserIcon className="h-5 w-5 mr-1" />
                {user.name}
              </Link>
              <button
                onClick={logout}
                className="bg-secondary text-white px-3 py-2 rounded-full hover:bg-opacity-90 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center bg-primary text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors"
            >
              <LoginIcon className="h-5 w-5 mr-1" />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
