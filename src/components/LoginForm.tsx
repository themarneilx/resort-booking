"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  PiArrowLeft, 
  PiSun, 
  PiEye, 
  PiArrowRight, 
  PiAppleLogoFill 
} from "react-icons/pi";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login clicked");
    router.push("/dashboard");
  };

  return (
    <div className="h-screen w-full bg-sand-50 overflow-hidden flex text-slate-800 font-sans">
      {/* Left Side: Image & Branding */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900 transition-all duration-700 ease-in-out">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700" 
          alt="Resort"
        />
        
        {/* Back Button */}
        <Link href="/" className="absolute top-8 left-8 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <PiArrowLeft className="text-xl" />
        </Link>

        {/* Text Content */}
        <div className="relative z-20 mt-auto p-16 w-full max-w-2xl">
            <h1 className="text-5xl font-serif font-bold text-white mb-6 leading-tight fade-in">Find Your Bliss</h1>
            <p className="text-lg text-white/90 font-light fade-in">Step into a world of luxury and serenity. Your perfect getaway is just a click away.</p>
            
            {/* Logo Mark at bottom */}
            <div className="mt-12 flex items-center gap-3 opacity-80">
                <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold">
                    <PiSun />
                </div>
                <span className="text-xl font-serif font-bold text-white tracking-wide">Brisa Solei</span>
            </div>
        </div>
      </div>

      {/* Right Side: Forms */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center bg-white overflow-y-auto relative">
        {/* Mobile Back Button */}
        <Link href="/" className="lg:hidden absolute top-6 left-6 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
            <PiArrowLeft className="text-xl" />
        </Link>

        <div className="w-full max-w-md px-8 py-12">
            
            {/* LOGIN FORM */}
            <div className="fade-in">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
                    <p className="text-slate-500">Sign in to manage your bookings.</p>
                </div>

                <form className="space-y-5" onSubmit={handleLogin}>
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                        <input 
                          type="email" 
                          placeholder="you@example.com" 
                          className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                        <div className="relative">
                            <input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="••••••••" 
                              className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400"
                            />
                            <button 
                              type="button" 
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <PiEye className="text-xl" />
                            </button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500" />
                            <span className="text-slate-600 group-hover:text-slate-800 transition-colors">Remember me</span>
                        </label>
                        <a href="#" className="text-brand-600 font-medium hover:text-brand-700 hover:underline">Forgot password?</a>
                    </div>

                    {/* Submit */}
                    <button type="submit" className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-brand-500/30 transition-all flex items-center justify-center gap-2 group">
                        <span>Sign In</span>
                        <PiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                    <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-slate-400">Or continue with</span></div>
                </div>

                {/* Socials */}
                <div className="grid grid-cols-2 gap-4">
                    <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium text-slate-700">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                        <span>Google</span>
                    </button>
                    <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium text-slate-700">
                        <PiAppleLogoFill className="text-xl" />
                        <span>Apple</span>
                    </button>
                </div>

                <p className="text-center mt-8 text-slate-600 text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-brand-600 font-bold hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}