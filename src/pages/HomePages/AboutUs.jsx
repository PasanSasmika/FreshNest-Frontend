import React from "react";
import { motion } from "framer-motion";
import { FaCheck, FaLeaf, FaTshirt, FaClock, FaFlask } from "react-icons/fa";
import home from "/image.jpg";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const features = [
    { text: "Expert Laundry Care", icon: <FaTshirt className="mr-3 text-xl" /> },
    { text: "Custom Solutions for Fabrics", icon: <FaFlask className="mr-3 text-xl" /> },
    { text: "Fast, Reliable Service", icon: <FaClock className="mr-3 text-xl" /> },
    { text: "Eco-Friendly Cleaning Practices", icon: <FaLeaf className="mr-3 text-xl" /> },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h1 className="text-5xl font-primary font-extrabold text-gray-800 mb-5 tracking-tight">
              We Clean Everything
            </h1>
            
            <h2 className="text-2xl font-primary font-medium text-blue-600 mb-6">
              Tailored Cleaning Solutions for You
            </h2>
            
            <p className="text-lg text-gray-600 mb-10 font-secondary leading-relaxed max-w-lg">
              Discover custom laundry services crafted to meet your unique needs, delivering impeccable care with ease and reliability.
            </p>
            
            <ul className="space-y-5 mb-12">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="flex items-center text-lg"
                >
                  <span className="mr-4 text-blue-500">
                    <FaCheck className="text-xl" />
                  </span>
                  <span className="flex items-center font-primary text-gray-800 font-medium">
                    {feature.icon}
                    {feature.text}
                  </span>
                </motion.li>
              ))}
            </ul>
            
            <Link to="/bookservice"> <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-secondary font-semibold text-lg transition-all duration-300 shadow-lg"
            >
              Need Quality Service ?
            </motion.a></Link>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl h-full min-h-[450px] overflow-hidden shadow-xl">
              <img
                src={home}
                alt="Cleaning Service"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-2xl hidden lg:flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FaCheck className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="font-secondary font-bold text-gray-800 text-lg">10+ Years</p>
                <p className="font-secondary text-sm text-gray-500">Of Trusted Experience</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;