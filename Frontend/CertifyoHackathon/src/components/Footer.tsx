import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-2xl font-bold text-white">
              one<span className="text-red-600">C</span>ode
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6 text-sm">
            <Link to="/about" className="hover:text-red-400 transition">About</Link>
            <Link to="/contact" className="hover:text-red-400 transition">Contact</Link>
            <Link to="/login" className="hover:text-red-400 transition">Login</Link>
            <Link to="/register" className="hover:text-red-400 transition">Register</Link>
          </div>

          {/* Social Media Icons */}
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="hover:text-red-400 transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-red-400 transition">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="hover:text-red-400 transition">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} oneCode. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
