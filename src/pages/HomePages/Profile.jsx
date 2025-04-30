import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Profile() {
    const [pageStatus, setPageStatus] = useState('loading');
    const [myBookings, setMyBookings] = useState([]);
    const [editingBooking, setEditingBooking] = useState(null);
    const [updatedDateTime, setUpdatedDateTime] = useState('');
    const [updatedAddress, setUpdatedAddress] = useState('');

    useEffect(() => {
        if (pageStatus === 'loading') {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            if (!token || !userId) {
                setPageStatus('error');
                return;
            }

            axios
                .get(`${import.meta.env.VITE_BACKEND_URL}/api/booking/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    const receivedData = res.data;
                    const bookings = Array.isArray(receivedData)
                        ? receivedData 
                        : receivedData?.bookings || [];

                    setMyBookings(bookings);
                    setPageStatus('loaded');
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setPageStatus('error');
                    setMyBookings([]);
                });
        }
    }, [pageStatus]);

    const handleDelete = async (bookingId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/booking/${bookingId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMyBookings(myBookings.filter(booking => booking._id !== bookingId));
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete booking');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!editingBooking) return;

        try {
            const updatedBooking = {
                ...editingBooking,
                date_time: updatedDateTime,
                address: updatedAddress
            };

            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/booking/${editingBooking._id}`,
                updatedBooking,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMyBookings(myBookings.map(booking => 
                booking._id === editingBooking._id ? response.data : booking
            ));
            setEditingBooking(null);
        } catch (error) {
            console.error('Update error:', error);
            alert('Failed to update booking');
        }
    };

    if (pageStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (pageStatus === 'error') {
        return <div>Error loading bookings. Please try again.</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-700 p-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-8 font-primary uppercase tracking-wide">
                    My Bookings
                </h2>
                
                {myBookings.length === 0 ? (
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                        <p className="text-white text-lg font-secondary">No bookings found.</p>
                    </div>
                ) : (
                    <ul className="space-y-6">
                        {myBookings.map((booking) => (
                            <li 
                                key={booking._id} 
                                className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="text-white space-y-3 font-secondary">
                                    <p className="text-xl font-semibold border-b pb-2 border-white/30">
                                        {booking.service_id?.name || 'Unknown Service'}
                                    </p>
                                    <p>
                                        <span className="font-bold">Date & Time:</span>{' '}
                                        {new Date(booking.date_time).toLocaleString()}
                                    </p>
                                    <p>
                                        <span className="font-bold">Address:</span>{' '}
                                        <span className="italic">{booking.address}</span>
                                    </p>
                                    <p>
                                        <span className="font-bold">Customer:</span>{' '}
                                        {booking.customer_name}
                                    </p>
                                </div>
                                <div className="mt-4 flex gap-3">
                                    <button
                                        onClick={() => {
                                            setEditingBooking(booking);
                                            setUpdatedDateTime(new Date(booking.date_time).toISOString().slice(0, 16));
                                            setUpdatedAddress(booking.address);
                                        }}
                                        className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-full transition-all font-semibold flex items-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(booking._id)}
                                        className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-full transition-all font-semibold flex items-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {editingBooking && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                            <h3 className="text-2xl font-bold mb-6 text-blue-600">Edit Booking</h3>
                            <form onSubmit={handleUpdate}>
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="block text-gray-700 mb-2 font-medium">Date & Time</label>
                                        <input
                                            type="datetime-local"
                                            value={updatedDateTime}
                                            onChange={(e) => setUpdatedDateTime(e.target.value)}
                                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2 font-medium">Address</label>
                                        <input
                                            type="text"
                                            value={updatedAddress}
                                            onChange={(e) => setUpdatedAddress(e.target.value)}
                                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setEditingBooking(null)}
                                        className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;