import React, { useState } from 'react';
import AdminService from './AdminService';
import AdminUsers from './AdminUsers';

function AdminHome() {
  const [selectedView, setSelectedView] = useState('dashboard');

  const renderContent = () => {
    switch (selectedView) {
      case 'dashboard':
        return <div className="p-6 font-secondary"><AdminService/></div>;
      case 'users':
        return <div className="p-6 font-secondary"><AdminUsers/></div>;
      case 'settings':
        return <div className="p-6 font-secondary">Settings Content</div>;
      default:
        return <div className="p-6 font-secondary">Select a view</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-gray-800 font-primary">
                Admin Panel
              </span>
            </div>

            {/* Center: Tabs */}
            <div className="hidden md:flex space-x-8 mx-8">
              <button
                onClick={() => setSelectedView('dashboard')}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  selectedView === 'dashboard'
                    ? 'text-indigo-700 border-b-2 border-indigo-700 font-secondary'
                    : 'text-gray-500 hover:text-gray-700 font-secondary'
                }`}
              >
                Service
              </button>
              <button
                onClick={() => setSelectedView('users')}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  selectedView === 'users'
                    ? 'text-indigo-700 border-b-2 border-indigo-700 font-secondary'
                    : 'text-gray-500 hover:text-gray-700 font-secondary'
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setSelectedView('settings')}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  selectedView === 'settings'
                    ? 'text-indigo-700 border-b-2 border-indigo-700 font-secondary'
                    : 'text-gray-500 hover:text-gray-700 font-secondary'
                }`}
              >
                Settings
              </button>
            </div>

            {/* Right: Profile & Logout */}
            <div className="flex items-center space-x-6">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
              <button className="font-secondary text-gray-600 hover:text-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;