'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bike } from '@/types';
import { calculateBookingPrice } from '@/utils/pricing';
import { useData } from '@/context/DataContext';
import { BookingSummary } from '@/components/BookingSummary';
import { useToast } from '@/context/ToastContext';
import { Calendar, Clock, User, Phone, Mail, FileText, ArrowRight, Loader2 } from 'lucide-react';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  drivingLicenseNo: z.string().min(5, 'License number is required for rental safety'),
  pickupDate: z.string().min(1, 'Pickup date is required'),
  pickupTime: z.string().min(1, 'Pickup time is required'),
  returnDate: z.string().min(1, 'Return date is required'),
  returnTime: z.string().min(1, 'Return time is required'),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  bike: Bike;
}

export function BookingForm({ bike }: BookingFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const { createBooking } = useData();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default dates: Today and Tomorrow
  const todayStr = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      drivingLicenseNo: '',
      pickupDate: todayStr,
      pickupTime: '10:00',
      returnDate: todayStr,
      returnTime: '16:00', // Default 6 hours sample
    },
  });

  const watchPickupDate = watch('pickupDate');
  const watchPickupTime = watch('pickupTime');
  const watchReturnDate = watch('returnDate');
  const watchReturnTime = watch('returnTime');

  const breakdown = calculateBookingPrice(
    bike.hourlyPrice,
    bike.dailyPrice,
    watchPickupDate,
    watchPickupTime,
    watchReturnDate,
    watchReturnTime,
    bike.customHourlyRates
  );

  const onSubmit = async (values: BookingFormValues) => {
    setIsSubmitting(true);
    try {
      const booking = createBooking({
        bikeId: bike.id,
        userDetails: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          drivingLicenseNo: values.drivingLicenseNo,
        },
        pickupDate: values.pickupDate,
        pickupTime: values.pickupTime,
        returnDate: values.returnDate,
        returnTime: values.returnTime,
        pricingBreakdown: breakdown,
      });

      showToast('Booking saved to Local Browser Storage!', 'success');
      router.push(`/booking-success/${booking.id}`);
    } catch (err: any) {
      console.error('Booking failure:', err);
      showToast(err.message || 'Failed to complete booking', 'error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Form Details */}
      <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-black text-slate-100">Renter Details & Dates</h2>
          <p className="text-xs text-slate-400 mt-1">Provide your contact info and schedule to lock in your ride.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Renter Info */}
          <div className="space-y-4">
            <div className="relative">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 block">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  {...register('name')}
                  type="text"
                  placeholder="e.g. Rahul Verma"
                  className="w-full pl-11 pr-4 py-3 text-sm bg-slate-950/80 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
              {errors.name && <p className="text-xs text-rose-400 mt-1 font-medium">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 block">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="rahul@example.com"
                    className="w-full pl-11 pr-4 py-3 text-sm bg-slate-950/80 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                {errors.email && <p className="text-xs text-rose-400 mt-1 font-medium">{errors.email.message}</p>}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 block">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full pl-11 pr-4 py-3 text-sm bg-slate-950/80 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                {errors.phone && <p className="text-xs text-rose-400 mt-1 font-medium">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 block">Driving License No.</label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  {...register('drivingLicenseNo')}
                  type="text"
                  placeholder="KA032021009876"
                  className="w-full pl-11 pr-4 py-3 text-sm bg-slate-950/80 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none focus:border-emerald-500 uppercase"
                />
              </div>
              {errors.drivingLicenseNo && (
                <p className="text-xs text-rose-400 mt-1 font-medium">{errors.drivingLicenseNo.message}</p>
              )}
            </div>
          </div>

          {/* Schedule */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Pickup & Return Timing</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Pickup Date</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    {...register('pickupDate')}
                    type="date"
                    min={todayStr}
                    className="w-full pl-11 pr-4 py-3 text-sm bg-slate-950/80 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  />
                </div>
                {errors.pickupDate && <p className="text-xs text-rose-400 mt-1">{errors.pickupDate.message}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Pickup Time</label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    {...register('pickupTime')}
                    type="time"
                    className="w-full pl-11 pr-4 py-3 text-sm bg-slate-950/80 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  />
                </div>
                {errors.pickupTime && <p className="text-xs text-rose-400 mt-1">{errors.pickupTime.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Return Date</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    {...register('returnDate')}
                    type="date"
                    min={watchPickupDate || todayStr}
                    className="w-full pl-11 pr-4 py-3 text-sm bg-slate-950/80 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  />
                </div>
                {errors.returnDate && <p className="text-xs text-rose-400 mt-1">{errors.returnDate.message}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Return Time</label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    {...register('returnTime')}
                    type="time"
                    className="w-full pl-11 pr-4 py-3 text-sm bg-slate-950/80 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  />
                </div>
                {errors.returnTime && <p className="text-xs text-rose-400 mt-1">{errors.returnTime.message}</p>}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base transition-all shadow-xl shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Saving Booking to Storage...</span>
              </>
            ) : (
              <>
                <span>Confirm & Reserve Bike</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Summary Card */}
      <div className="lg:col-span-5 sticky top-24">
        <BookingSummary breakdown={breakdown} hourlyPrice={bike.hourlyPrice} dailyPrice={bike.dailyPrice} />
      </div>
    </div>
  );
}
