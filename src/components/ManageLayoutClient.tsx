"use client";

import Link from "next/link";
import { useState } from "react";
import { PiSun, PiList, PiX } from "react-icons/pi";

export default function ManageLayoutClient({
    children,
    userName,
}: {
    children: React.ReactNode;
    userName: string;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="bg-sand-50 text-slate-800 antialiased selection:bg-brand-500 selection:text-white flex flex-col min-h-screen">
            {/* Navigation (Solid Background for Dashboard) */}
            <nav className="sticky top-0 w-full z-50 bg-slate-900 py-4 shadow-md">
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
                        <Link href="/" className="!text-white hover:!text-white text-sm font-medium tracking-wide transition-colors">Home</Link>
                        <Link href="/rooms" className="!text-white hover:!text-white text-sm font-medium tracking-wide transition-colors">Rooms</Link>
                        <Link href="/dining" className="!text-white hover:!text-white text-sm font-medium tracking-wide transition-colors">Dining</Link>
                    </div>

                    {/* Profile Action */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                            <div className="text-right hidden lg:block">
                                <p className="text-white text-xs font-bold uppercase tracking-wider">{userName}</p>
                                <p className="text-brand-400 text-[10px]">Gold Member</p>
                            </div>
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-9 h-9 rounded-full border-2 border-brand-500" alt="Profile" />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-white text-2xl flex-shrink-0 focus:outline-none">
                        <PiList />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-[60] bg-slate-900 flex flex-col transition-all duration-300 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'}`}>
                <div className="flex justify-between items-center p-6 border-b border-white/10">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-amber-400 flex items-center justify-center text-white font-bold text-lg">
                            <PiSun />
                        </div>
                        <span className="text-2xl font-serif font-bold text-white tracking-wide">Brisa Solei</span>
                    </Link>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="text-white text-2xl focus:outline-none hover:text-brand-400 transition-colors">
                        <PiX />
                    </button>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-6">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-white">Home</Link>
                    <Link href="/manage" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-brand-400">My Bookings</Link>
                    <Link href="/rooms" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-white">Rooms</Link>
                    <Link href="/dining" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-white">Dining</Link>
                    <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-white">Profile</Link>
                    <Link href="/api/auth/logout" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-white/50">Logout</Link>
                </div>
            </div>

            {children}

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-300 py-10 px-6 border-t border-slate-800 mt-auto">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <p className="text-white font-serif font-bold text-lg mb-1">Brisa Solei</p>
                        <p className="text-xs text-slate-500">&copy; 2025. All rights reserved.</p>
                    </div>
                    <div className="flex gap-6 text-sm">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
