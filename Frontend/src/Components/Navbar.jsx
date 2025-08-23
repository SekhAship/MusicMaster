import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart(); // using cartCount like your first code
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    console.log("Navbar user updated:", user);
  }, [user]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 shadow-md py-4">
        <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" onClick={() => setIsOpen(false)}>
            <h1 className="text-2xl font-bold text-white tracking-wide cursor-pointer flex items-center">
              🎵 MusicMaster
            </h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className={`text-white hover:text-yellow-300 transition ${
                isActive("/") ? "text-yellow-400 font-bold" : ""
              }`}
            >
             🏠 Home
            </Link>
            <Link
              to="/aboutUs"
              className={`text-white hover:text-yellow-300 transition ${
                isActive("/about") ? "text-yellow-400 font-bold" : ""
              }`}
            >
             ℹ About
            </Link>

            <Link
              to="/orders"
              className={`text-white hover:text-yellow-300 transition ${
                isActive("/orders") ? "text-yellow-400 font-bold" : ""
              }`}
            >
             📦 Order
            </Link>

            {/* Cart */}
            <div className="relative flex items-center">
              <Link
                to="/cart"
                className={`text-white hover:text-yellow-300 transition ${
                  isActive("/cart") ? "text-yellow-400 font-bold" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                🛒 Cart
              </Link>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-3 w-5 h-5 bg-red-600 text-white text-xs flex items-center justify-center rounded-full">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </div>

            {/* Auth Section */}
            {user ? (
              <>
                <span className="text-white">
                  Hello, {user.name}
                </span>
                <button
                  onClick={() => setShowConfirm(true)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-black hover:text-white transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-black hover:text-white transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-black hover:text-white transition duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 flex flex-col space-y-4 py-4 px-6">
            <Link
              to="/"
              className="text-white font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-white font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/orders"
              className="text-white font-medium"
              onClick={() => setIsOpen(false)}
            >
              Order
            </Link>

            {/* Mobile Cart */}
            <div className="relative flex items-center justify-center">
              <Link
                to="/cart"
                className="text-white font-medium"
                onClick={() => setIsOpen(false)}
              >
                🛒 Cart
              </Link>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-4 w-5 h-5 bg-red-600 text-white text-xs flex items-center justify-center rounded-full">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </div>

            {user ? (
              <>
                <span className="text-white bg-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                  ✅ {user.name}
                </span>
                <button
                  onClick={() => setShowConfirm(true)}
                  className="bg-white text-red-500 px-4 py-1 rounded hover:bg-black hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white text-blue-500 px-4 py-1 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-500 px-4 py-1 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center space-y-4">
            <h2 className="text-lg font-semibold">Are you sure?</h2>
            <p className="text-gray-600">Do you really want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                  setShowConfirm(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spacer so content doesn’t hide under navbar */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;
