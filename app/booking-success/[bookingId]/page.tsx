'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { useData } from '@/context/DataContext';
import { SuccessModal } from '@/components/SuccessModal';
import { Loader2 } from 'lucide-react';

interface BookingSuccessPageProps {
  params: Promise<{ bookingId: string }>;
}

export default function BookingSuccessPage({ params }: BookingSuccessPageProps) {
  const { bookingId } = use(params);
  const { getBookingById, loading } = useData();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center justify-center text-slate-400 gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
        <span>Loading Booking Receipt...</span>
      </div>
    );
  }

  const booking = getBookingById(bookingId);

  if (!booking) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SuccessModal booking={booking} />
    </div>
  );
}
