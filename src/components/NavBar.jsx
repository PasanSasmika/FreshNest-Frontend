import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMenu,
  FiHome,
  FiInfo,
  FiSettings,
  FiMail,
  FiCalendar,
  FiLogOut,
} from "react-icons/fi";
import { FaBroom } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    toast.success("Log Out successfully")
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <motion.nav
      className="w-full h-20 bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <FaBroom className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-main font-bold text-gray-900">
              FreshNest
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <motion.a
                className={`flex items-center px-4 py-2 rounded-lg text-md font-primary font-semibold transition-all duration-300 ${
                  activeLink === "Home"
                    ? "text-blue-600 bg-secondary"
                    : "text-gray-600 hover:text-blue-600 hover:bg-yellow-50"
                }`}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveLink("Home")}
              >
                <FiHome className="mr-2" />
                Home
              </motion.a>
            </Link>

            <Link to="/about">
              <motion.a
                className={`flex items-center px-4 py-2 rounded-lg text-md font-primary font-semibold transition-all duration-300 ${
                  activeLink === "About Us"
                    ? "text-blue-600 bg-secondary"
                    : "text-gray-600 hover:text-blue-600 hover:bg-yellow-50"
                }`}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveLink("About Us")}
              >
                <FiInfo className="mr-2" />
                About Us
              </motion.a>
            </Link>

            <Link to="/service">
              <motion.a
                className={`flex items-center px-4 py-2 rounded-lg text-md font-primary font-semibold transition-all duration-300 ${
                  activeLink === "Services"
                    ? "text-blue-600 bg-secondary"
                    : "text-gray-600 hover:text-blue-600 hover:bg-yellow-50"
                }`}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveLink("Services")}
              >
                <FiSettings className="mr-2" />
                Services
              </motion.a>
            </Link>

            <Link to="/contact">
              <motion.a
                className={`flex items-center px-4 py-2 rounded-lg text-md font-primary font-semibold transition-all duration-300 ${
                  activeLink === "Contact"
                    ? "text-blue-600 bg-secondary"
                    : "text-gray-600 hover:text-blue-600 hover:bg-yellow-50"
                }`}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveLink("Contact")}
              >
                <FiMail className="mr-2" />
                Contact
              </motion.a>
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/bookservice">
              <motion.button
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-main font-medium transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 5px 15px rgba(37, 99, 235, 0.3)",
                }}
              >
                <FiCalendar className="mr-2" />
                Book a Service
              </motion.button>
            </Link>

            {isLoggedIn ? (
              <div className="relative">
                <motion.button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiUser className="h-5 w-5" />
                </motion.button>

                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50"
                  >
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FiUser className="mr-2" />
                      My Bookings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <motion.button
                  className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiUser className="h-5 w-5" />
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 focus:outline-none transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMenu className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg rounded-b-lg"
        >
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <Link to="/">
              <motion.a
                className={`flex items-center px-3 py-3 rounded-md text-base font-main font-medium ${
                  activeLink === "Home"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => {
                  setActiveLink("Home");
                  setIsMenuOpen(false);
                }}
                whileHover={{ x: 5 }}
              >
                <FiHome className="mr-2" />
                Home
              </motion.a>
            </Link>

            <Link to="/about">
              <motion.a
                className={`flex items-center px-3 py-3 rounded-md text-base font-main font-medium ${
                  activeLink === "About Us"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => {
                  setActiveLink("About Us");
                  setIsMenuOpen(false);
                }}
                whileHover={{ x: 5 }}
              >
                <FiInfo className="mr-2" />
                About Us
              </motion.a>
            </Link>

            <Link to="/service">
              <motion.a
                className={`flex items-center px-3 py-3 rounded-md text-base font-main font-medium ${
                  activeLink === "Services"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => {
                  setActiveLink("Services");
                  setIsMenuOpen(false);
                }}
                whileHover={{ x: 5 }}
              >
                <FiSettings className="mr-2" />
                Services
              </motion.a>
            </Link>

            <Link to="/contact">
              <motion.a
                className={`flex items-center px-3 py-3 rounded-md text-base font-main font-medium ${
                  activeLink === "Contact"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => {
                  setActiveLink("Contact");
                  setIsMenuOpen(false);
                }}
                whileHover={{ x: 5 }}
              >
                <FiMail className="mr-2" />
                Contact
              </motion.a>
            </Link>

            <div className="pt-2 border-t border-gray-200 mt-2 space-y-2">
              <Link to="/bookservice">
                <motion.button
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-main font-medium text-white bg-blue-600 hover:bg-blue-700"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiCalendar className="mr-2" />
                  Book a Service
                </motion.button>
              </Link>

              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="w-full flex items-center justify-center px-4 py-3 rounded-md text-base font-main font-medium text-blue-600 hover:bg-blue-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiUser className="mr-2" />
                    My Bookings
                  </Link>
                  <motion.button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-4 py-3 rounded-md text-base font-main font-medium text-blue-600 hover:bg-blue-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiLogOut className="mr-2" />
                    Logout
                  </motion.button>
                </>
              ) : (
                <Link to="/login">
                  <motion.button
                    className="w-full flex items-center justify-center px-4 py-3 rounded-md text-base font-main font-medium text-blue-600 hover:bg-blue-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiUser className="mr-2" />
                    Login
                  </motion.button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default NavBar;