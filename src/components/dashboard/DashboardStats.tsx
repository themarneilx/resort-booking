import React from 'react';
import { Users, DollarSign, CalendarCheck } from 'lucide-react';

const DashboardStats = () => {
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-100">
      <div className="stat">
        <div className="stat-figure text-primary">
          <CalendarCheck size={32} />
        </div>
        <div className="stat-title">Total Bookings</div>
        <div className="stat-value text-primary">25.6K</div>
        <div className="stat-desc">21% more than last month</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <Users size={32} />
        </div>
        <div className="stat-title">Active Users</div>
        <div className="stat-value text-secondary">2.6M</div>
        <div className="stat-desc">14% more than last month</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-accent">
          <DollarSign size={32} />
        </div>
        <div className="stat-title">Total Revenue</div>
        <div className="stat-value text-accent">$89.4k</div>
        <div className="stat-desc">31% more than last month</div>
      </div>
    </div>
  );
};

export default DashboardStats;
