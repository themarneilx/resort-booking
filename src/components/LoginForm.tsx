"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";
import Image from "next/image";

import { FaApple } from "react-icons/fa";

const images = ["/beach1.jpg", "/frontpage.jpg"];

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleBack = () => {
    gsap.to(containerRef.current, {
      x: "100%",
      duration: 0.3,
      ease: "power3.inOut",
      onComplete: () => {
        router.push("/");
      },
    });
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    gsap.to(containerRef.current, {
      x: "-100%",
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        console.log("Login animation complete");
      },
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextImage = (currentImage + 1) % images.length;
      
      gsap.to(imageRefs.current[currentImage], {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
      });
      
      gsap.fromTo(
        imageRefs.current[nextImage],
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.inOut",
          onStart: () => {
            setCurrentImage(nextImage);
          },
        }
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div ref={containerRef} className="min-h-screen flex antialiased bg-base-100">
      
      {/* 1. Left Column (Image Slideshow) */}
      <div className="hidden lg:flex w-full lg:w-1/2 relative overflow-hidden">
        {images.map((src, index) => (
          <div
            key={src}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: index === 0 ? 1 : 0 }}
          >
            <Image
              src={src}
              alt="Resort image"
              layout="fill"
              objectFit="cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
        
        <div className="relative p-10 flex flex-col justify-between text-white z-10">
          <div>
            <button
              onClick={handleBack}
              className="btn btn-circle bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white shadow-lg"
            >
              <ArrowLeft size={24} />
            </button>
          </div>
          <div className="text-left">
            <h2 className="text-5xl font-extrabold tracking-tight drop-shadow-lg">Find Your Bliss</h2>
            <p className="mt-4 text-lg text-white/80 drop-shadow-md max-w-md">
              Step into a world of luxury and serenity. Your perfect getaway is just a click away.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Right Column (Login Form) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <button
          onClick={handleBack}
          className="btn btn-circle bg-base-200/50 backdrop-blur-sm border-base-300/50 hover:bg-base-300/50 lg:hidden absolute top-8 left-8"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="w-full max-w-md">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-base-content">
              Welcome Back
            </h1>
            <p className="text-base-content/60 mt-2">
              Sign in to manage your bookings.
            </p>
          </div>

          <form className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input input-bordered w-full pr-12"
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 h-full w-12 flex items-center justify-center text-base-content/50"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm mt-2">
              <div className="form-control">
                <label className="label cursor-pointer gap-2">
                  <input type="checkbox" className="checkbox checkbox-primary" />
                  <span className="label-text">Remember me</span>
                </label>
              </div>
              <a href="#" className="link link-primary">
                Forgot password?
              </a>
            </div>

            <div className="form-control pt-4">
              <button
                onClick={handleLogin}
                className="btn btn-primary w-full"
              >
                <LogIn size={20} />
                Sign In
              </button>
            </div>
          </form>

          <div className="divider text-base-content/40 my-8">Or</div>
          
<div className="flex gap-4">
            <button className="btn btn-outline w-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
            </button>
            <button className="btn btn-outline w-1/2">
              <FaApple size={24} />
            </button>
          </div>

          <div className="text-center mt-8 text-sm text-base-content/60">
            Don&apos;t have an account?{" "}
            <a href="#" className="link link-primary">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;