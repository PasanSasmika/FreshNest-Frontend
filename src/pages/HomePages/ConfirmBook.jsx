import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiUser, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

function ConfirmBook() {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceData, service_id } = location.state || {};
  const userId = localStorage.getItem('userId');
  
  const [formData, setFormData] = useState({
    customer_name: '',
    address: '',
    date_time: ''
  });
  const [serviceDetails, setServiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!service_id || !userId) {
      toast.error('Invalid booking request');
      navigate('/services');
      return;
    }

    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/service/${service_id}`
        );
        setServiceDetails(response.data);
      } catch (error) {
        toast.error('Failed to load service details');
        navigate('/services');
      } finally {
        setLoading(false);
      }
    };

    if (serviceData) {
      setServiceDetails(serviceData);
      setLoading(false);
    } else {
      fetchServiceDetails();
    }
  }, [service_id, userId, navigate, serviceData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.customer_name || !formData.address || !formData.date_time) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/booking`,
        {
          ...formData,
          service_id,
          user_id: userId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data) {
        toast.success('Booking confirmed successfully!');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-pulse text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!serviceDetails || !userId) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Confirm Your Booking
          </h1>
          <p className="text-lg text-gray-600">
            Please verify your details and confirm the booking
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Service Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center">
              <FiCheckCircle className="w-6 h-6 text-blue-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-800">Service</h3>
                <p className="text-gray-600">{serviceDetails.name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FiCheckCircle className="w-6 h-6 text-blue-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-800">Price</h3>
                <p className="text-gray-600">Rs {serviceDetails.price}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div className="relative">
                <FiUser className="absolute top-4 left-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Your Full Name"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.customer_name}
                  onChange={(e) =>
                    setFormData({ ...formData, customer_name: e.target.value })
                  }
                />
              </div>

              <div className="relative">
                <FiMapPin className="absolute top-4 left-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Service Address"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              <div className="relative">
                <FiCalendar className="absolute top-4 left-4 text-gray-400" />
                <input
                  type="datetime-local"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.date_time}
                  onChange={(e) =>
                    setFormData({ ...formData, date_time: e.target.value })
                  }
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-br from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Confirm Booking
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default ConfirmBook;