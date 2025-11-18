"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { User, Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";
import Image from "next/image";

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
      duration: 0.5,
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
            ref={(el) => (imageRefs.current[index] = el)}
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
            <button className="btn btn-outline w-1/2">Google</button>
            <button className="btn btn-outline w-1/2">Apple</button>
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