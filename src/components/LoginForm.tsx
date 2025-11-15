"use client";

import React, { useState } from "react";
import { User, Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";

// Helper component for styled social buttons
const SocialIcon = ({ icon, label }) => (
  <button className="btn btn-ghost w-full justify-center text-sm gap-2 h-12 min-h-12 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-150 shadow-sm font-semibold">
    <span className="text-lg font-bold">
      {/* Simple representation of Google (G) and Apple () logos */}
      {icon}
    </span>
    {label}
  </button>
);

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Using an Unsplash URL as a placeholder image for the visual style.
  const placeholderImageUrl = "https://images.unsplash.com/photo-1571501679680-de33f6a27698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80";

  return (
    <div className="min-h-screen flex antialiased">
      
      {/* 1. Left Column (Visual/Marketing) - Dark Blue/Teal background */}
      <div
        className="hidden lg:flex w-full lg:w-2/5 xl:w-1/2 bg-cover bg-center rounded-r-[40px] shadow-2xl relative overflow-hidden"
        // Blend a dark background color with the image using a gradient overlay
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(30, 41, 59, 0.7), rgba(13, 22, 38, 0.7)), url(${placeholderImageUrl})`,
          minHeight: '100vh',
          backgroundSize: 'cover'
        }}
      >
        {/* Content - Logo, Tagline, and Back Button */}
        <div className="relative p-10 flex flex-col justify-between text-white">
          
          {/* Top: Logo and Branding - HEADER REMOVED */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center border-2 border-white">
              <span className="text-xl font-serif font-extrabold">H</span>
            </div>
            <h2 className="text-2xl font-bold font-sans">Home Away</h2>
          </div>

          {/* Center/Bottom: Tagline and Back Button */}
          <div className="space-y-12 mb-10">
            {/* Back Arrow Button */}
            <button className="btn btn-circle bg-teal-600 border-teal-600 hover:bg-teal-700 hover:border-teal-700 shadow-lg text-white">
              <ArrowLeft size={24} />
            </button>

            {/* Tagline */}
            <h3 className="text-4xl font-light leading-snug tracking-wide">
              Away from Home, <br /> Yet Feels Like Home
            </h3>
          </div>
        </div>
      </div>

      {/* 2. Right Column (Login Form) - Light background with rounded card */}
      <div className="w-full lg:w-3/5 xl:w-1/2 flex items-center justify-center p-8 bg-gray-100 min-h-screen">
        <div className="w-full max-w-md p-8 lg:p-12 bg-white rounded-2xl shadow-xl">
          
          {/* Header */}
          <div className="text-center mb-10">
            <User className="mx-auto w-12 h-12 text-gray-400" />
            <h1 className="text-3xl font-light text-gray-800 mt-3">
              Sign In
            </h1>
            <p className="text-sm text-gray-500">
              as a User
            </p>
          </div>

          {/* Login Form Inputs */}
          <div className="space-y-6">
            
            {/* Email Input */}
            <div className="form-control">
              <input
                type="email"
                placeholder="Email address"
                className="input input-lg bg-gray-100 border-none h-14 text-gray-700 placeholder-gray-500 text-base rounded-lg"
              />
            </div>
            
            {/* Password Input */}
            <div className="form-control relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-lg bg-gray-100 border-none h-14 text-gray-700 placeholder-gray-500 text-base pr-12 rounded-lg"
              />
              <button
                type="button"
                className="absolute right-0 top-0 h-14 w-12 flex items-center justify-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end text-sm">
              <a
                href="#"
                className="text-teal-600 hover:text-teal-700 link-hover"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <div className="form-control pt-2">
              <button className="btn btn-lg h-14 bg-teal-600 border-teal-600 hover:bg-teal-700 hover:border-teal-700 text-white text-base shadow-lg transition duration-200 rounded-lg">
                <LogIn size={20} />
                LOGIN
              </button>
            </div>
          </div>

          {/* Social Sign In - Fixed to be side-by-side with borders */}
          <div className="divider text-gray-400 mt-8 mb-6">Or continue with</div>
          
          <div className="flex gap-4">
            {/* Using a fixed width of 1/2 for each button to keep them equal size */}
            <div className="w-1/2">
                <SocialIcon icon="G" label="Google" />
            </div>
            <div className="w-1/2">
                <SocialIcon icon="" label="Apple" />
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-10 text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="link text-teal-600 font-medium hover:text-teal-700">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;