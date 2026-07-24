'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Booking } from '@/types';
import { fetchBookingsAction, cancelBookingAction } from '@/lib/actions';
import { formatCurrency } from '@/utils/pricing';
import { useToast } from '@/context/ToastContext';
import { Search, Calendar, Clock, MapPin, Receipt, XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function BookingsHistoryPage() {
  const { showToast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await fetchBookingsAction();
      setBookings(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancelBooking = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this booking reservation?')) return;

    try {
      await cancelBookingAction(id);
      showToast('Booking cancelled successfully', 'info');
      loadBookings();
    } catch (e) {
      showToast('Failed to cancel booking', 'error');
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      b.id.toLowerCase().includes(q) ||
      b.userDetails.name.toLowerCase().includes(q) ||
      b.userDetails.email.toLowerCase().includes(q) ||
      b.bikeSummary.model.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest block mb-1">
            Renter Account
          </span>
          <h1 className="text-3xl font-black text-slate-100">Booking History</h1>
        </div>

        {/* Search */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, email, or bike..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((n) => (
            <div key={n} className="h-40 rounded-3xl bg-slate-900/40 border border-slate-800 animate-pulse" />
          ))}
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <Receipt className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-xl font-bold text-slate-200">No Bookings Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            You haven&apos;t reserved any bikes yet or no records matched your search keyword.
          </p>
          <Link
            href="/bikes"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all"
          >
            <span>Explore Available Bikes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex flex-wrap items-center justify-between gap-6 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-[260px]">
                <img
                  src={b.bikeSummary.image}
                  alt={b.bikeSummary.model}
                  className="w-20 h-20 rounded-2xl object-cover border border-slate-700 shrink-0"
                />
                <div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-400">
                    {b.id}
                  </span>
                  <h3 className="text-lg font-bold text-slate-100 mt-1">
                    {b.bikeSummary.brand} {b.bikeSummary.model}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {b.bikeSummary.location}
                  </p>
                </div>
              </div>

              {/* Timing */}
              <div className="space-y-1 text-xs text-slate-300">
                <p className="flex items-center gap-1 text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  Pickup: <strong className="text-slate-100">{b.pickupDate} ({b.pickupTime})</strong>
                </p>
                <p className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Return: <strong className="text-slate-100">{b.returnDate} ({b.returnTime})</strong>
                </p>
                <p className="text-[11px] text-slate-500">
                  Renter: {b.userDetails.name} ({b.userDetails.phone})
                </p>
              </div>

              {/* Price & Actions */}
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-[11px] text-slate-400">Total Paid</p>
                  <p className="text-xl font-extrabold text-emerald-400">
                    {formatCurrency(b.pricingBreakdown.grandTotal)}
                  </p>

                  <span
                    className={`inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded-full mt-1 ${
                      b.status === 'confirmed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <Link
                    href={`/booking-success/${b.id}`}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
                  >
                    <Receipt className="w-3.5 h-3.5 text-emerald-400" />
                    <span>View Receipt</span>
                  </Link>

                  {b.status === 'confirmed' && (
                    <button
                      onClick={() => handleCancelBooking(b.id)}
                      className="flex items-center justify-center gap-1 px-4 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
