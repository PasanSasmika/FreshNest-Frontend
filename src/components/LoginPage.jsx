import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {  FiMail, FiLock } from 'react-icons/fi';
import home from '/image.jpg';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  function userLogin() {
    axios.post(import.meta.env.VITE_BACKEND_URL + '/api/users/login', {
      email,
      password,
    }).then((res) => {
      if (res.data.user == null) {
        toast.error(res.data.message);
        return;
      }
      toast.success("Login success");
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user._id);
      window.location.href = res.data.user.type === 'admin' ? '/admin' : '/';
    })
    .catch((error) => {
      console.log(error)
      toast.error(error.response?.data?.message || "Login failed")
    });
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <img 
        src={home}
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover z-0" 
      />
      
      <div className="backdrop-blur-lg bg-white/30 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600 font-medium">Sign in to continue your journey</p>
        </div>

        <div className="space-y-5">
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-4 py-3 bg-white/90 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-4 py-3 bg-white/90 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>

          <button
            onClick={userLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3.5 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.01] transition-transform duration-200 flex items-center justify-center"
          >
            Login
          </button>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-2"
            >
              Sign Up
            </Link>
          </p>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;