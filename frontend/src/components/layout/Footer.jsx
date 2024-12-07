import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-textDark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-poppins font-bold mb-4">
              MasterEvent
            </h3>
            <p className="text-gray-300">
              Discover and book amazing events from concerts to conferences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-secondary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-secondary">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-secondary">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-secondary">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
