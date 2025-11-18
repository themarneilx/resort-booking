"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";

export default function Navbar({ animateAndNavigate }: { animateAndNavigate: (href: string) => void }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = `navbar fixed top-0 z-50 transition-all duration-300 ${
    isScrolled 
      ? 'bg-base-100/90 backdrop-blur-lg border-b border-base-200 shadow-sm' 
      : 'bg-transparent text-white'
  }`;

  return (
    <div className={navClass}>
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${isScrolled ? '' : 'text-base-content'}`}>
            <li><a href="#discover">Discover</a></li>
            <li><a href="#rooms">Rooms</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl normal-case">Brisa Solei</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a href="#discover" className="hover:text-primary transition-colors">Discover</a></li>
          <li><a href="#rooms" className="hover:text-primary transition-colors">Rooms</a></li>
          <li><a href="#gallery" className="hover:text-primary transition-colors">Gallery</a></li>
          <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <button onClick={() => animateAndNavigate('/login')} className="btn btn-ghost rounded-full px-6">Login</button>
        <a href="#booking" className="btn btn-primary rounded-full px-6">Book Now</a>
      </div>
    </div>
  );
}
