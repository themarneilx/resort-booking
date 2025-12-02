"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  PiSun, 
  PiSquaresFour, 
  PiCalendarCheck, 
  PiUsers, 
  PiBed, 
  PiChartLineUp, 
  PiGear, 
  PiSignOut, 
  PiList, 
  PiMagnifyingGlass, 
  PiBell 
} from "react-icons/pi";

interface AdminLayoutClientProps {
  children: React.ReactNode;
  user: {
    name: string | null;
    email: string;
    role: string;
  };
}

export default function AdminLayoutClient({
  children,
  user,
}: AdminLayoutClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-sand-50 text-slate-800 antialiased font-sans overflow-hidden">
        {/* Sidebar */}
        <aside className={`w-64 bg-slate-900 text-white flex-col transition-all z-20 shadow-xl ${isMobileMenuOpen ? 'flex absolute inset-y-0 left-0' : 'hidden md:flex'}`}>
            {/* Logo Area */}
            <div className="h-20 flex items-center px-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-amber-400 flex items-center justify-center text-white font-bold">
                        <PiSun />
                    </div>
                    <span className="text-lg font-serif font-bold tracking-wide truncate">{'Brisa'} | Admin</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Overview</p>
                
                <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-brand-600 text-white font-medium shadow-lg shadow-brand-900/20">
                    <PiSquaresFour className="text-lg" />
                    Dashboard
                </Link>
                
                <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                    <PiCalendarCheck className="text-lg" />
                    All Bookings
                    <span className="ml-auto bg-brand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
                </Link>

                <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                    <PiUsers className="text-lg" />
                    Guests
                </Link>

                <Link href="/rooms" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                    <PiBed className="text-lg" />
                    Rooms
                </Link>

                <div className="pt-6 mt-6 border-t border-white/10">
                    <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Management</p>
                    
                    <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                        <PiChartLineUp className="text-lg" />
                        Analytics
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                        <PiGear className="text-lg" />
                        Settings
                    </Link>
                </div>
            </nav>

            {/* Admin Profile */}
            <div className="p-4 border-t border-white/10 bg-slate-800/50">
                <div className="flex items-center gap-3">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Admin" className="w-10 h-10 rounded-full border-2 border-brand-500" />
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold text-white truncate">{user.name || 'Admin'}</p>
                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>
                    <button className="ml-auto text-slate-400 hover:text-white">
                        <PiSignOut className="text-xl" />
                    </button>
                </div>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col bg-sand-50 relative overflow-hidden">
            
            {/* Top Header */}
            <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-10 sticky top-0">
                <div className="flex items-center gap-4">
                    <button className="md:hidden text-2xl text-slate-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <PiList />
                    </button>
                    <h1 className="text-xl md:text-2xl font-serif font-bold text-slate-800 hidden md:block">Dashboard Overview</h1>
                </div>

                <div className="flex items-center gap-4 md:gap-6">
                    {/* Search */}
                    <div className="relative hidden md:block">
                        <PiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                        <input type="text" placeholder="Search booking ID or guest..." className="pl-10 pr-4 py-2 rounded-full bg-slate-100 border-none text-sm focus:ring-2 focus:ring-brand-500 w-64 transition-all outline-none" />
                    </div>

                    {/* Notifications */}
                    <button className="relative text-slate-500 hover:text-brand-600 transition-colors">
                        <PiBell className="text-2xl" />
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </div>
            </header>

            {/* Dashboard Content Scroll Area */}
            <div className="flex-1 overflow-y-auto custom-scroll p-4 md:p-8 pb-20">
                {children}
            </div>
        </main>

        {/* Overlay for mobile sidebar */}
        {isMobileMenuOpen && (
            <div 
                className="fixed inset-0 bg-black/50 z-10 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
            ></div>
        )}
    </div>
  );
}
