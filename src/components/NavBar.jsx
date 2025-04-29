import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FiUser, 
  FiMenu, 
  FiHome, 
  FiInfo, 
  FiSettings, 
  FiMail,
  FiCalendar
} from "react-icons/fi";
import { FaBroom } from "react-icons/fa";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const navLinks = [
    { name: "Home", icon: <FiHome className="mr-2" />, href: "#" },
    { name: "About Us", icon: <FiInfo className="mr-2" />, href: "#about" },
    { name: "Services", icon: <FiSettings className="mr-2" />, href: "#services" },
    { name: "Contact", icon: <FiMail className="mr-2" />, href: "#contact" },
  ];

  return (
    <motion.nav
      className="w-full bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100"
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
          >
            <FaBroom className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-main font-bold text-gray-900">
              FreshNest
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-main font-medium transition-all duration-300 ${
                  activeLink === link.name
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                }`}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveLink(link.name)}
              >
                {link.icon}
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <motion.button
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-main font-medium transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(37, 99, 235, 0.3)" }}
            >
              <FiCalendar className="mr-2" />
              Book a Service
            </motion.button>
            
            <motion.button
              className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiUser className="h-5 w-5" />
            </motion.button>
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
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`flex items-center px-3 py-3 rounded-md text-base font-main font-medium ${
                  activeLink === link.name
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => {
                  setActiveLink(link.name);
                  setIsMenuOpen(false);
                }}
                whileHover={{ x: 5 }}
              >
                {link.icon}
                {link.name}
              </motion.a>
            ))}
            <div className="pt-2 border-t border-gray-200 mt-2 space-y-2">
              <motion.button
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-main font-medium text-white bg-blue-600 hover:bg-blue-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiCalendar className="mr-2" />
                Book a Service
              </motion.button>
              <motion.button
                className="w-full flex items-center justify-center px-4 py-3 rounded-md text-base font-main font-medium text-blue-600 hover:bg-blue-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiUser className="mr-2" />
                Login
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default NavBar;