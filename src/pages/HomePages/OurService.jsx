import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaHome, FaUserTie, FaClipboardList } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const OurServices = () => {
  const services = [
    {
      title: "Home care services",
      description: "We provide customized plans, flexible scheduling, and specialized cleaning solutions tailored to your needs.",
      icon: <FaHome className="text-blue-600 text-2xl" />,
    },
    {
      title: "Green cleaning solutions",
      description: "At FreshNest, we prioritize the health of your family and the planet. Our solutions use non-toxic products.",
      icon: <FaLeaf className="text-green-600 text-2xl" />,
    },
    {
      title: "Home cleaning",
      description: "Our home cleaning services provide a thorough and reliable clean for your living space, ensuring every room is fresh.",
      icon: <FaClipboardList className="text-purple-600 text-2xl" />,
    },
    {
      title: "Business cleaning",
      description: "We deliver professional cleaning services for commercial spaces, maintaining a clean and healthy environment.",
      icon: <FaUserTie className="text-indigo-600 text-2xl" />,
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-primary font-bold text-gray-900 mb-4">Our Cleaning Services</h2>
          <p className="text-lg text-gray-600 font-secondary max-w-3xl mx-auto">
            Professional cleaning solutions tailored to your specific needs and schedule.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-50 rounded-lg mr-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-primary font-semibold text-gray-900">{service.title}</h3>
              </div>
              <p className="text-gray-600 mb-6 font-secondary">{service.description}</p>
              <a 
                href="#" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300"
              >
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-main font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-200">
            Book a Service Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default OurServices;