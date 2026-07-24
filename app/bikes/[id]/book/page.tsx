'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useData } from '@/context/DataContext';
import { BookingForm } from '@/components/BookingForm';
import { ArrowLeft, MapPin, ShieldCheck, Loader2 } from 'lucide-react';

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export default function BookPage({ params }: BookPageProps) {
  const { id } = use(params);
  const { getBikeById, loading } = useData();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center justify-center text-slate-400 gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
        <span>Loading Bike Details...</span>
      </div>
    );
  }

  const bike = getBikeById(id);

  if (!bike) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Back Link */}
      <div className="space-y-4">
        <Link
          href={`/bikes/${bike.id}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {bike.brand} {bike.model} Details</span>
        </Link>

        {/* Selected Bike Mini Banner */}
        <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <img
              src={bike.images[0]}
              alt={bike.model}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-700"
            />
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">{bike.brand}</span>
              <h1 className="text-xl font-black text-slate-100">{bike.model}</h1>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {bike.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-2xl border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Instant Local Storage Reservation</span>
          </div>
        </div>
      </div>

      {/* Booking Form Component */}
      <BookingForm bike={bike} />
    </div>
  );
}
