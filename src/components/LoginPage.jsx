import React from 'react';
import { FiLogIn, FiUserPlus, FiLock, FiMail } from 'react-icons/fi';
import home from '/image.jpg';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 overflow-hidden">
        <img
          src={home}
          alt="Background"
          className="w-full h-full object-cover transform scale-105"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden border border-white/10 z-10 transition-all duration-300 hover:shadow-2xl hover:border-white/20">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent mb-2 animate-fade-in">
              Welcome Back
            </h2>
            <p className="text-white/80 text-sm">Please sign in to continue</p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div className="group">
              <label className="block text-sm text-white/80 mb-2 ml-1 transition-all duration-300 group-focus-within:text-blue-400">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/50 transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm text-white/80 mb-2 ml-1 transition-all duration-300 group-focus-within:text-purple-400">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-purple-400 transition-colors" />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/20 flex items-center justify-center"
            >
              <FiLogIn className="mr-3 text-lg" />
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-transparent text-sm text-white/60">
                New to our platform?
              </span>
            </div>
          </div>

          {/* Sign Up Button */}
          <Link to="/signup"><a
            className="w-full py-3.5 px-6 border border-white/20 hover:border-white/30 bg-white/5 hover:bg-white/10 rounded-xl text-white/90 font-medium transition-all duration-300 flex items-center justify-center group"
          >
            <FiUserPlus className="mr-3 text-lg transition-transform group-hover:translate-x-1" />
            Create Free Account
          </a></Link>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl opacity-30 animate-glow"></div>
      </div>
    </div>
  );
}

export default LoginPage;