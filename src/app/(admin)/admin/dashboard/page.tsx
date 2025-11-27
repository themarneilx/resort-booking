"use client";

import { 
  PiSuitcaseRolling, 
  PiArrowUpRight, 
  PiCurrencyDollar, 
  PiDoorOpen, 
  PiClockCountdown, 
  PiCheckCircle, 
  PiClock, 
  PiDotsThreeVertical, 
  PiXCircle,
  PiCaretLeft,
  PiCaretRight
} from "react-icons/pi";

export default function AdminDashboardPage() {
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 fade-up">
          {/* Stat Card 1 */}
          <div className="glass-panel p-6 rounded-2xl shadow-sm flex items-start justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Bookings</p>
                  <h3 className="text-3xl font-bold text-slate-800">1,248</h3>
                  <p className="text-xs text-green-600 font-medium mt-2 flex items-center">
                      <PiArrowUpRight className="mr-1 font-bold" /> +12% this month
                  </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center text-2xl">
                  <PiSuitcaseRolling />
              </div>
          </div>

          {/* Stat Card 2 */}
          <div className="glass-panel p-6 rounded-2xl shadow-sm flex items-start justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Revenue</p>
                  <h3 className="text-3xl font-bold text-slate-800">₱2.4M</h3>
                  <p className="text-xs text-green-600 font-medium mt-2 flex items-center">
                      <PiArrowUpRight className="mr-1 font-bold" /> +8.5% this month
                  </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl">
                  <PiCurrencyDollar />
              </div>
          </div>

          {/* Stat Card 3 */}
          <div className="glass-panel p-6 rounded-2xl shadow-sm flex items-start justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Checking In Today</p>
                  <h3 className="text-3xl font-bold text-slate-800">14</h3>
                  <p className="text-xs text-slate-500 font-medium mt-2">
                      4 Arrived
                  </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center text-2xl">
                  <PiDoorOpen />
              </div>
          </div>

          {/* Stat Card 4 */}
          <div className="glass-panel p-6 rounded-2xl shadow-sm flex items-start justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Pending Requests</p>
                  <h3 className="text-3xl font-bold text-slate-800">8</h3>
                  <p className="text-xs text-orange-600 font-medium mt-2 flex items-center">
                      Requires attention
                  </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl">
                  <PiClockCountdown />
              </div>
          </div>
      </div>

      {/* Recent Bookings Table Section */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-sm fade-up" style={{ animationDelay: "0.1s" }}>
          {/* Table Header/Filters */}
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl font-serif font-bold text-slate-800">Recent Bookings</h2>
              
              <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 transition-colors">All</button>
                  <button className="px-4 py-2 rounded-lg bg-transparent text-slate-500 text-sm font-medium hover:bg-slate-50 hover:text-brand-600 transition-colors">Pending</button>
                  <button className="px-4 py-2 rounded-lg bg-transparent text-slate-500 text-sm font-medium hover:bg-slate-50 hover:text-brand-600 transition-colors">Confirmed</button>
              </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scroll">
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-100">
                          <th className="p-4 pl-6">Guest</th>
                          <th className="p-4">Room Type</th>
                          <th className="p-4">Dates</th>
                          <th className="p-4">Amount</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 pr-6 text-right">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                      
                      {/* Row 1: Confirmed */}
                      <tr className="hover:bg-brand-50/30 transition-colors group">
                          <td className="p-4 pl-6">
                              <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                                      <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-full h-full object-cover" alt="Guest" />
                                  </div>
                                  <div>
                                      <p className="font-bold text-slate-800 text-sm">Marneil Cabahug</p>
                                      <p className="text-xs text-slate-400">#BS-88291</p>
                                  </div>
                              </div>
                          </td>
                          <td className="p-4">
                              <p className="text-sm font-medium text-slate-700">Ocean Front Villa</p>
                              <p className="text-xs text-slate-400">2 Adults</p>
                          </td>
                          <td className="p-4">
                              <p className="text-sm text-slate-600">Nov 15 - Nov 18</p>
                              <p className="text-xs text-slate-400">3 Nights</p>
                          </td>
                          <td className="p-4">
                              <span className="text-sm font-bold text-slate-800">₱75,000</span>
                          </td>
                          <td className="p-4">
                              <span className="status-badge status-confirmed px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide inline-flex items-center gap-1.5 bg-green-100 text-green-800">
                                  <PiCheckCircle className="text-lg" /> Confirmed
                              </span>
                          </td>
                          <td className="p-4 pr-6 text-right">
                              <button className="text-slate-400 hover:text-brand-600 p-2 rounded-full hover:bg-brand-50 transition-colors">
                                  <PiDotsThreeVertical className="text-lg" />
                              </button>
                          </td>
                      </tr>

                      {/* Row 2: Pending */}
                      <tr className="hover:bg-brand-50/30 transition-colors group">
                          <td className="p-4 pl-6">
                              <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                                      <img src="https://randomuser.me/api/portraits/women/65.jpg" className="w-full h-full object-cover" alt="Guest" />
                                  </div>
                                  <div>
                                      <p className="font-bold text-slate-800 text-sm">Sarah Jenkins</p>
                                      <p className="text-xs text-slate-400">#BS-99102</p>
                                  </div>
                              </div>
                          </td>
                          <td className="p-4">
                              <p className="text-sm font-medium text-slate-700">Tropical Garden Suite</p>
                              <p className="text-xs text-slate-400">2 Adults, 1 Child</p>
                          </td>
                          <td className="p-4">
                              <p className="text-sm text-slate-600">Dec 20 - Dec 21</p>
                              <p className="text-xs text-slate-400">1 Night</p>
                          </td>
                          <td className="p-4">
                              <span className="text-sm font-bold text-slate-800">₱18,000</span>
                          </td>
                          <td className="p-4">
                              <span className="status-badge status-pending px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide inline-flex items-center gap-1.5 bg-amber-100 text-amber-800">
                                  <PiClock className="text-lg" /> Pending Payment
                              </span>
                          </td>
                          <td className="p-4 pr-6 text-right">
                              <button className="text-brand-600 hover:text-brand-700 text-xs font-bold mr-2 uppercase">Approve</button>
                              <button className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors">
                                  <PiDotsThreeVertical className="text-lg" />
                              </button>
                          </td>
                      </tr>

                      {/* Row 3: Checking In */}
                      <tr className="hover:bg-brand-50/30 transition-colors group">
                          <td className="p-4 pl-6">
                              <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                                      <img src="https://randomuser.me/api/portraits/men/85.jpg" className="w-full h-full object-cover" alt="Guest" />
                                  </div>
                                  <div>
                                      <p className="font-bold text-slate-800 text-sm">James Donovan</p>
                                      <p className="text-xs text-slate-400">#BS-77123</p>
                                  </div>
                              </div>
                          </td>
                          <td className="p-4">
                              <p className="text-sm font-medium text-slate-700">Seaview Deluxe</p>
                              <p className="text-xs text-slate-400">1 Adult</p>
                          </td>
                          <td className="p-4">
                              <p className="text-sm text-slate-600">Today</p>
                              <p className="text-xs text-slate-400">5 Nights</p>
                          </td>
                          <td className="p-4">
                              <span className="text-sm font-bold text-slate-800">₱77,500</span>
                          </td>
                          <td className="p-4">
                              <span className="status-badge status-checkin px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide inline-flex items-center gap-1.5 bg-sky-100 text-sky-800">
                                  <PiDoorOpen className="text-lg" /> Check-in
                              </span>
                          </td>
                          <td className="p-4 pr-6 text-right">
                              <button className="text-brand-600 hover:text-brand-700 text-xs font-bold mr-2 uppercase">Check In</button>
                              <button className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors">
                                  <PiDotsThreeVertical className="text-lg" />
                              </button>
                          </td>
                      </tr>

                       {/* Row 4: Cancelled */}
                       <tr className="hover:bg-brand-50/30 transition-colors group opacity-70 hover:opacity-100">
                          <td className="p-4 pl-6">
                              <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center text-slate-500 font-bold">
                                      MT
                                  </div>
                                  <div>
                                      <p className="font-bold text-slate-800 text-sm">Maria Torres</p>
                                      <p className="text-xs text-slate-400">#BS-66001</p>
                                  </div>
                              </div>
                          </td>
                          <td className="p-4">
                              <p className="text-sm font-medium text-slate-700">Deluxe Room</p>
                              <p className="text-xs text-slate-400">2 Adults</p>
                          </td>
                          <td className="p-4">
                              <p className="text-sm text-slate-600">Nov 20 - Nov 22</p>
                              <p className="text-xs text-slate-400">2 Nights</p>
                          </td>
                          <td className="p-4">
                              <span className="text-sm font-bold text-slate-800">₱31,000</span>
                          </td>
                          <td className="p-4">
                              <span className="status-badge status-cancelled px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide inline-flex items-center gap-1.5 bg-red-100 text-red-800">
                                  <PiXCircle className="text-lg" /> Cancelled
                              </span>
                          </td>
                          <td className="p-4 pr-6 text-right">
                              <button className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors">
                                  <PiDotsThreeVertical className="text-lg" />
                              </button>
                          </td>
                      </tr>

                  </tbody>
              </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs text-slate-500">Showing 1-4 of 120 results</p>
              <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
                      <PiCaretLeft />
                  </button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 text-slate-400 hover:bg-slate-50">
                      <PiCaretRight />
                  </button>
              </div>
          </div>
      </div>
    </>
  );
}
