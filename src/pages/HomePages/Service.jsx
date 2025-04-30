import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiClock, FiStar, FiCalendar, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ServiceCard = () => {
  const navigate = useNavigate();
  const [pageStatus, setPageStatus] = useState("loading");
  const [services, setServices] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    if (pageStatus === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/service/")
        .then((res) => {
          setServices(res.data);
          setPageStatus("loaded");
        })
        .catch((err) => toast.error("Error loading services"));
    }
  }, [pageStatus]);

  const handleBookNow = (service) => {
    navigate('/confirmbook', { state: { serviceData: service, service_id: service._id } });
  };

  // Skeleton loader
  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((item) => (
        <motion.div
          key={item}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <div className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-xl mb-4" />
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-4" />
            <div className="flex justify-between">
              <div className="h-6 bg-gray-200 rounded w-20" />
              <div className="h-6 bg-gray-200 rounded w-24" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const BookButton = ({ service }) => (
    <motion.button
      onClick={() => handleBookNow(service)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
    >
      <span>Book Now</span>
      <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Premium Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Discover our exceptional services tailored to meet your needs
          </p>
          <div className="inline-block w-20 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
        </motion.div>

        {pageStatus === "loading" ? (
          <SkeletonLoader />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onMouseEnter={() => setHoveredCard(service._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-out overflow-hidden border border-gray-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                  
                  <div className="relative h-56 bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center overflow-hidden">
                    {service.Images?.length ? (
                      <motion.img
                        src={service.Images[0]}
                        alt={service.name}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1 }}
                        animate={{ scale: hoveredCard === service._id ? 1.05 : 1 }}
                        transition={{ duration: 0.4 }}
                      />
                    ) : (
                      <FiStar className="w-16 h-16 text-white opacity-80" />
                    )}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>

                  <div className="p-6 relative z-10">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800">
                        {service.name}
                      </h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                        Popular
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {service.description}
                    </p>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center space-x-2 bg-purple-50 px-3 py-1.5 rounded-full">
                        <span className="font-semibold text-purple-600">
                          Rs {service.price}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <FiClock className="w-4 h-4" />
                        <span className="text-sm">{service.duration}</span>
                        <span className="text-sm hidden">{service._id}</span>
                      </div>
                    </div>

                    <BookButton service={service} />
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;