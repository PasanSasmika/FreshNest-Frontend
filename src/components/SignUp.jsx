import React from 'react';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import home from '/image.jpg';
import { Link } from 'react-router-dom';

function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
     
      <div className="fixed inset-0 overflow-hidden">
        <img
          src={home}
          alt="Background"
          className="w-full h-full object-cover transform scale-105"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>

    
      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden border border-white/10 z-10 transition-all duration-300 hover:shadow-2xl hover:border-white/20">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-cyan-300 bg-clip-text text-transparent mb-2 animate-fade-in">
              Get Started
            </h2>
            <p className="text-white/80 text-sm">Create your free account</p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div className="group">
              <label className="block text-sm text-white/80 mb-2 ml-1 transition-all duration-300 group-focus-within:text-cyan-400">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-400/50 transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm text-white/80 mb-2 ml-1 transition-all duration-300 group-focus-within:text-green-400">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-green-400 transition-colors" />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-400/30 focus:border-green-400/50 transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm text-white/80 mb-2 ml-1 transition-all duration-300 group-focus-within:text-cyan-400">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-400/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm text-white/80 mb-2 ml-1 transition-all duration-300 group-focus-within:text-green-400">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-green-400 transition-colors" />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-400/30 focus:border-green-400/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-br from-green-500 to-cyan-600 hover:from-green-400 hover:to-cyan-500 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center"
            >
              Create Account
              <FiArrowRight className="ml-3 text-lg transform transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-transparent text-sm text-white/60">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Button */}
         <Link to="/login"><a
            className="w-full py-3.5 px-6 border border-white/20 hover:border-white/30 bg-white/5 hover:bg-white/10 rounded-xl text-white/90 font-medium transition-all duration-300 flex items-center justify-center group"
          >
            <FiArrowRight className="mr-3 text-lg transform rotate-180 transition-transform group-hover:-translate-x-1" />
            Back to Login
          </a></Link> 
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-500/20 to-cyan-500/20 blur-2xl opacity-30 animate-glow"></div>
      </div>
    </div>
  );
}

export default SignupPage;