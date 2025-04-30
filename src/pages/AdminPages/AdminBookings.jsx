import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function AdminBookings() {
  const [pageStatus, setPageStatus] = useState("loading");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (pageStatus === "loading") {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/booking/")
        .then((res) => {
          setBookings(res.data);
          setPageStatus("loaded");
        })
        .catch((err) => {
          toast.error("Error loading bookings");
          setPageStatus("error");
        });
    }
  }, [pageStatus]);

  // Loading and error states remain the same

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Bookings</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Service</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Time</th>
               
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {booking.user_id?.firstName} {booking.user_id?.lastName || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {booking.service_id?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {new Date(booking.date_time).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {new Date(booking.date_time).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {bookings.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No bookings found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminBookings;