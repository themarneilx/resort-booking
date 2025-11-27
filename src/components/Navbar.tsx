"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { PiSun, PiList, PiX, PiSunDim } from "react-icons/pi";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav 
        id="navbar" 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-900/90 backdrop-blur-md shadow-md py-2' 
            : 'bg-transparent py-4'
        }`}
      >
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-amber-400 flex items-center justify-center text-white font-bold text-lg">
                      <PiSun />
                  </div>
                  <span className="text-2xl font-serif font-bold text-white tracking-wide group-hover:text-brand-100 transition-colors">Brisa Solei</span>
              </Link>

              {/* Desktop Links */}
              <div className="hidden md:flex items-center space-x-8">
                  <a href="#about" className="text-white/90 hover:text-white text-sm font-medium tracking-wide transition-colors">Discover</a>
                  <a href="#rooms" className="text-white/90 hover:text-white text-sm font-medium tracking-wide transition-colors">Rooms</a>
                  <a href="#gallery" className="text-white/90 hover:text-white text-sm font-medium tracking-wide transition-colors">Gallery</a>
                  <a href="#contact" className="text-white/90 hover:text-white text-sm font-medium tracking-wide transition-colors">Contact</a>
              </div>

              {/* Actions */}
              <div className="hidden md:flex items-center gap-4">
                  <Link href="/login" className="text-white font-medium text-sm hover:underline">Login</Link>
                  <a href="#" className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg hover:shadow-brand-500/30 text-sm">
                      Book Now
                  </a>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-white text-2xl flex-shrink-0 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                  <PiList />
              </button>
          </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        id="mobile-menu" 
        className={`fixed inset-0 z-[60] bg-slate-900 flex flex-col transition-all duration-300 ease-in-out transform ${
          isMobileMenuOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/10">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-amber-400 flex items-center justify-center text-white font-bold text-lg">
                      <PiSun />
                  </div>
                  <span className="text-2xl font-serif font-bold text-white tracking-wide">Brisa Solei</span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-white text-2xl focus:outline-none hover:text-brand-400 transition-colors"
              >
                  <PiX />
              </button>
          </div>

          {/* Links */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-6">
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-brand-400 transition-colors">Discover</a>
              <a href="#rooms" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-brand-400 transition-colors">Rooms</a>
              <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-brand-400 transition-colors">Gallery</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-brand-400 transition-colors">Contact</a>
              
              <div className="w-12 h-px bg-white/20 my-4"></div>
              
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-white/80 hover:text-white transition-colors">Login</Link>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="bg-brand-500 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-brand-600 transition-all text-lg w-full max-w-xs text-center">
                  Book Now
              </a>
          </div>
          
          {/* Footer Icon */}
          <div className="p-8 text-center">
               <div className="w-10 h-10 rounded-full bg-white/5 mx-auto flex items-center justify-center text-white/50">
                   <PiSunDim className="text-xl" />
               </div>
          </div>
      </div>
    </>
  );
}
