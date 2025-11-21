import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Settings, 
  LogOut,
  FileText,
  CreditCard
} from 'lucide-react';

const Sidebar = () => {
  return (
    <ul className="menu bg-base-200 min-h-full w-80 p-4 text-base-content">
      {/* Sidebar content here */}
      <li className="mb-2">
        <div className="flex items-center gap-2 text-xl font-bold px-2">
          <span className="text-primary">Resort</span>Booking
        </div>
      </li>
      
      <li className="menu-title">Main Menu</li>
      <li>
        <Link href="/dashboard" className="active">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
      </li>
      <li>
        <Link href="/dashboard/bookings">
          <Calendar size={20} />
          Bookings
        </Link>
      </li>
      <li>
        <Link href="/dashboard/invoices">
          <CreditCard size={20} />
          Invoices
        </Link>
      </li>

      <li className="menu-title mt-4">Account</li>
      <li>
        <Link href="/dashboard/profile">
          <Users size={20} />
          Profile
        </Link>
      </li>
      <li>
        <Link href="/dashboard/settings">
          <Settings size={20} />
          Settings
        </Link>
      </li>
      
      <div className="divider"></div>
      <li>
        <Link href="/login" className="text-error">
          <LogOut size={20} />
          Logout
        </Link>
      </li>
    </ul>
  );
};

export default Sidebar;
