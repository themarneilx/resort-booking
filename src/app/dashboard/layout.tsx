import React from 'react';
import { Sidebar } from '@/components/dashboard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen bg-base-100">
        
        {/* Main Page Content */}
        <div className="p-6 md:p-10 flex-1">
           {children}
        </div>
      </div> 
      
      {/* Sidebar */}
      <div className="drawer-side z-40">
        <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
}
