'use client';

import React from 'react';
import { useData } from '@/context/DataContext';
import { formatCurrency } from '@/utils/pricing';
import { Shield, Bike as BikeIcon, Layers, TrendingUp, CheckCircle, Clock, DollarSign, PieChart, ArrowUpRight, Loader2 } from 'lucide-react';

export default function AdminDashboardPage() {
  const { getAdminStats, bookings, loading } = useData();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center justify-center text-slate-400 gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
        <span>Loading Admin Analytics...</span>
      </div>
    );
  }

  const stats = getAdminStats();
  const recentBookings = bookings.slice(0, 5);
  const maxMonthlyRevenue = Math.max(...stats.monthlyRevenue.map((m) => m.revenue), 1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-extrabold text-xs uppercase tracking-widest mb-1">
            <Shield className="w-4 h-4" />
            <span>Browser Storage Analytics</span>
          </div>
          <h1 className="text-3xl font-black text-slate-100">Admin Control Center</h1>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Live Local Storage Sync</span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Revenue Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/80 to-slate-900 border border-emerald-800/50 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
            <DollarSign className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-slate-100">{formatCurrency(stats.totalRevenue)}</p>
          <p className="text-[11px] text-emerald-400/80 flex items-center gap-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" /> Client LocalStorage
          </p>
        </div>

        {/* Total Bikes */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Bikes</span>
            <BikeIcon className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-slate-100">{stats.totalBikes}</p>
          <p className="text-[11px] text-slate-400">Fleet capacity</p>
        </div>

        {/* Total Bookings */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Bookings</span>
            <Layers className="w-5 h-5 text-teal-400" />
          </div>
          <p className="text-2xl font-black text-slate-100">{stats.totalBookings}</p>
          <p className="text-[11px] text-slate-400">Completed reservations</p>
        </div>

        {/* Available Bikes */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Available Now</span>
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400">{stats.availableBikes}</p>
          <p className="text-[11px] text-slate-400">Ready for pickup</p>
        </div>

        {/* Booked Bikes */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Currently Rented</span>
            <Clock className="w-5 h-5 text-rose-400" />
          </div>
          <p className="text-2xl font-black text-rose-400">{stats.bookedBikes}</p>
          <p className="text-[11px] text-slate-400">On road active</p>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Revenue Trend Graph */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-slate-100">Monthly Revenue Growth</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">Local Storage Data</span>
          </div>

          <div className="h-56 flex items-end gap-3 sm:gap-6 pt-6 px-2">
            {stats.monthlyRevenue.map((item) => {
              const heightPct = Math.round((item.revenue / maxMonthlyRevenue) * 100);
              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{(item.revenue / 1000).toFixed(1)}k
                  </span>
                  <div
                    style={{ height: `${Math.max(10, heightPct)}%` }}
                    className="w-full rounded-t-xl bg-gradient-to-t from-emerald-600 via-teal-500 to-emerald-400 group-hover:brightness-125 transition-all"
                  />
                  <span className="text-xs font-bold text-slate-300">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <PieChart className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-slate-100">Category Distribution</h3>
          </div>

          <div className="space-y-4">
            {Object.entries(stats.categoryDistribution).map(([catName, count]) => {
              const pct = Math.round((count / stats.totalBikes) * 100);
              return (
                <div key={catName} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-300">
                    <span>{catName}</span>
                    <span className="text-emerald-400">{count} Bikes ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div
                      style={{ width: `${pct}%` }}
                      className="h-full rounded-full bg-amber-400"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-100">Recent Booking Activity</h3>
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Vehicle</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Pickup Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {recentBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-emerald-400">{b.id}</td>
                  <td className="px-6 py-4 font-bold text-slate-100">
                    {b.bikeSummary.brand} {b.bikeSummary.model}
                  </td>
                  <td className="px-6 py-4">{b.userDetails.name}</td>
                  <td className="px-6 py-4 text-slate-400">{b.pickupDate}</td>
                  <td className="px-6 py-4 font-bold text-emerald-400">
                    {formatCurrency(b.pricingBreakdown.grandTotal)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-[10px] uppercase">
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
