"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";

export default function Navbar({ animateAndNavigate }: { animateAndNavigate: (href: string) => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sections = ['discover', 'rooms', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveSection(sectionId);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = `navbar fixed top-0 z-50 transition-all duration-300 ${
    isScrolled 
      ? 'bg-base-100/90 backdrop-blur-lg border-b border-base-200 shadow-sm' 
      : 'bg-transparent text-white'
  }`;

  const linkClass = (section: string) => 
    `hover:text-primary transition-colors ${activeSection === section ? 'text-primary' : ''}`;

  return (
    <div className={navClass}>
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden" aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${isScrolled ? '' : 'text-base-content'}`}>
            <li><a href="#discover" className={linkClass('discover')}>Discover</a></li>
            <li><a href="#rooms" className={linkClass('rooms')}>Rooms</a></li>
            <li><a href="#gallery" className={linkClass('gallery')}>Gallery</a></li>
            <li><a href="#contact" className={linkClass('contact')}>Contact</a></li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl normal-case">
          <Image src="/logo.svg" alt="Brisa Solei Logo" width={32} height={32} />
          <span className="ml-2">Brisa Solei</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a href="#discover" className={linkClass('discover')}>Discover</a></li>
          <li><a href="#rooms" className={linkClass('rooms')}>Rooms</a></li>
          <li><a href="#gallery" className={linkClass('gallery')}>Gallery</a></li>
          <li><a href="#contact" className={linkClass('contact')}>Contact</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <button onClick={() => animateAndNavigate('/login')} className="btn btn-ghost rounded-full px-6" aria-label="Login">Login</button>
        <a href="#booking" className="btn btn-primary rounded-full px-6" aria-label="Book Now">Book Now</a>
      </div>
    </div>
  );
}
