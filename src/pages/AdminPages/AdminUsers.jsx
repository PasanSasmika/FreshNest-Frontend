import axios from 'axios';
import React, { useEffect, useState } from 'react';

function AdminUsers() {
    const [pageStatus, setPageStatus] = useState("loading");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (pageStatus === "loading") {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/")
                .then((res) => {
                    setUsers(res.data);
                    setPageStatus("loaded");
                })
                .catch(err => {
                    console.error("Error fetching users:", err);
                    setPageStatus("error");
                });
        }
    }, [pageStatus]);

    return (
        <div className='min-h-screen bg-gray-100 p-8'>
            <div className='max-w-7xl mx-auto'>
                <h1 className='text-3xl font-bold text-gray-800 mb-8'>User Management</h1>
                
                {pageStatus === "loading" && (
                    <div className='text-center py-8'>Loading users...</div>
                )}

                {pageStatus === "error" && (
                    <div className='text-center py-8 text-red-500'>Error loading users. Please try again.</div>
                )}

                {pageStatus === "loaded" && (
                    <div className='bg-white rounded-lg shadow overflow-hidden'>
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className='bg-gray-50'>
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>User Type</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
                                {users.map((user) => (
                                    <tr key={user._id} className='hover:bg-gray-50'>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='flex items-center'>
                                                <div className='ml-4'>
                                                    <div className='text-sm font-medium text-gray-900'>
                                                        {user.firstName} {user.lastName}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='text-sm text-gray-900'>{user.email}</div>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${user.type === 'admin' ? 'bg-purple-100 text-purple-800' : 
                                                  user.type === 'staff' ? 'bg-blue-100 text-blue-800' : 
                                                  'bg-green-100 text-green-800'}`}>
                                                {user.type}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminUsers;