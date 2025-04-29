import React from "react";
import { motion } from "framer-motion";
import home from "/image.jpg";
import NavBar from "../../components/NavBar";

function Home() {
  return (
    <>
    <NavBar/>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col md:flex-row items-center justify-center px-8 py-12 md:p-12 lg:p-20">
      {/* Content */}
      <motion.div 
        className="md:w-1/2 space-y-8 md:pr-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-primary font-bold text-gray-900 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Tailored cleaning <span className="text-blue-600">for every home</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl font-secondary text-gray-600 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Experience the <span className="font-semibold text-blue-600">CleanNest difference</span>—where your comfort, health, and peace of mind come first in every cleaning service. From meticulous attention to detail to eco-friendly products, we ensure a spotless, safe, and welcoming home environment.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-200">
            Contact Us
          </button>
          <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-medium transition duration-300 transform hover:scale-105">
            Our Services
          </button>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-3 gap-6 pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[
            { value: "2000+", label: "Happy customers" },
            { value: "99%", label: "Satisfaction" },
            { value: "50+", label: "Team members" }
          ].map((item, index) => (
            <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <p className="text-3xl font-bold text-blue-600 font-primary">{item.value}</p>
              <p className="text-gray-500 font-secondary mt-2">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Image */}
      <motion.div 
        className="md:w-1/2 flex justify-center mt-12 md:mt-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="relative">
          <img 
            src={home} 
            alt="CleanNest cleaning service" 
            className="max-w-md w-full rounded-2xl shadow-2xl transform rotate-1 hover:rotate-0 transition duration-500"
          />
          <div className="absolute -bottom-6 -right-6 bg-blue-100 rounded-2xl p-6 shadow-lg hidden md:block">
            <div className="flex items-center">
              <div className="bg-blue-600 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-secondary font-bold text-gray-800">Eco-friendly</p>
                <p className="font-secondary text-sm text-gray-600">products used</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    </>
  );
}

export default Home;