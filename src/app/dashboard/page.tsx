import React from 'react';
import { DashboardStats } from '@/components/dashboard';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button className="btn-brand">New Booking</button>
      </div>

      {/* Stats Section */}
      <DashboardStats />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* Recent Bookings (Takes up 2 columns on large screens) */}
        <div className="lg:col-span-2 card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex justify-between">
              Recent Bookings
              <button className="btn btn-sm btn-ghost">View All</button>
            </h2>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Room</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-10 h-10">
                            <div className="bg-neutral text-neutral-content w-full h-full flex items-center justify-center">
                                <span>JD</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">John Doe</div>
                          <div className="text-sm opacity-50">United States</div>
                        </div>
                      </div>
                    </td>
                    <td>Deluxe Suite</td>
                    <td>Dec 12, 2025</td>
                    <td>
                      <div className="badge badge-success gap-2">
                        Confirmed
                      </div>
                    </td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-10 h-10">
                             <div className="bg-neutral text-neutral-content w-full h-full flex items-center justify-center">
                                <span>AS</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">Alice Smith</div>
                          <div className="text-sm opacity-50">Canada</div>
                        </div>
                      </div>
                    </td>
                    <td>Ocean View</td>
                    <td>Dec 14, 2025</td>
                    <td>
                      <div className="badge badge-warning gap-2">
                        Pending
                      </div>
                    </td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <td>
                       <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-10 h-10">
                             <div className="bg-neutral text-neutral-content w-full h-full flex items-center justify-center">
                                <span>RJ</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">Robert Johnson</div>
                          <div className="text-sm opacity-50">UK</div>
                        </div>
                      </div>
                    </td>
                    <td>Standard Room</td>
                    <td>Dec 20, 2025</td>
                    <td>
                      <div className="badge badge-error gap-2">
                        Cancelled
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Notifications/Updates (Takes up 1 column) */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Notifications</h2>
            <ul className="steps steps-vertical">
              <li className="step step-primary">Register</li>
              <li className="step step-primary">Choose Plan</li>
              <li className="step">Purchase</li>
              <li className="step">Receive Product</li>
            </ul>
            <div className="divider"></div>
            <div className="flex flex-col gap-2">
                <div className="alert alert-info text-sm py-2">
                    <span>New feature available!</span>
                </div>
                <div className="alert alert-success text-sm py-2">
                    <span>Your subscription is active.</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
