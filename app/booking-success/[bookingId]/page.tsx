import React from 'react';
import { notFound } from 'next/navigation';
import { fetchBookingByIdAction } from '@/lib/actions';
import { SuccessModal } from '@/components/SuccessModal';

interface BookingSuccessPageProps {
  params: Promise<{ bookingId: string }>;
}

export default async function BookingSuccessPage({ params }: BookingSuccessPageProps) {
  const { bookingId } = await params;
  const booking = await fetchBookingByIdAction(bookingId);

  if (!booking) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SuccessModal booking={booking} />
    </div>
  );
}
