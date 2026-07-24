'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useData } from '@/context/DataContext';
import { Rating } from '@/components/Rating';
import { AvailabilityBadge } from '@/components/AvailabilityBadge';
import { OwnerCard } from '@/components/OwnerCard';
import { PriceCalculator } from '@/components/PriceCalculator';
import { BikeCard } from '@/components/BikeCard';
import { DetailActions } from '@/components/DetailActions';
import { formatCurrency } from '@/utils/pricing';
import {
  MapPin,
  Gauge,
  Fuel,
  Zap,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Loader2,
} from 'lucide-react';

interface BikeDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function BikeDetailsPage({ params }: BikeDetailsPageProps) {
  const { id } = use(params);
  const { bikes, getBikeById, loading } = useData();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center justify-center text-slate-400 gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
        <span>Loading Bike Specs...</span>
      </div>
    );
  }

  const bike = getBikeById(id);

  if (!bike) {
    notFound();
  }

  const relatedBikes = bikes
    .filter((b) => b.id !== bike.id && (b.category === bike.category || b.brand === bike.brand))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back Link */}
      <div>
        <Link
          href="/bikes"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Bikes</span>
        </Link>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Gallery & Description */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Image */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl h-[380px] sm:h-[450px]">
            <img
              src={bike.images[0] || 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200'}
              alt={`${bike.brand} ${bike.model}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 z-10">
              <AvailabilityBadge isAvailable={bike.isAvailable} size="md" />
            </div>
            <div className="absolute top-4 right-4 z-10">
              <DetailActions bike={bike} />
            </div>
          </div>

          {/* Thumbnails */}
          {bike.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {bike.images.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-24 h-20 rounded-2xl object-cover border-2 border-slate-800 hover:border-emerald-500 cursor-pointer transition-all"
                />
              ))}
            </div>
          )}

          {/* Title & Ratings */}
          <div className="space-y-3 pb-6 border-b border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">{bike.brand}</span>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-100">{bike.model}</h1>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-slate-900 text-slate-200 font-extrabold text-xs border border-slate-800">
                {bike.category}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <Rating rating={bike.rating} reviewCount={bike.reviewCount} size="md" />
              <span className="text-slate-600">•</span>
              <p className="text-slate-400 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-amber-400" />
                {bike.location}
              </p>
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-100">Bike Specifications</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-500 font-semibold uppercase">Engine</span>
                <p className="text-xs font-bold text-slate-200 truncate">{bike.specs.engine}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-500 font-semibold uppercase">Mileage / Range</span>
                <p className="text-xs font-bold text-emerald-400 truncate">{bike.specs.mileage}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-500 font-semibold uppercase">Top Speed</span>
                <p className="text-xs font-bold text-slate-200 truncate">{bike.specs.topSpeed}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-500 font-semibold uppercase">Fuel Type</span>
                <p className="text-xs font-bold text-amber-400 truncate">{bike.specs.fuelType}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-500 font-semibold uppercase">Weight</span>
                <p className="text-xs font-bold text-slate-200 truncate">{bike.specs.weight}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-500 font-semibold uppercase">Transmission</span>
                <p className="text-xs font-bold text-slate-200 truncate">{bike.specs.transmission}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-base font-bold text-slate-100">About This Bike</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{bike.description}</p>
          </div>

          {/* Owner Info */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-base font-bold text-slate-100">Hosted by</h3>
            <OwnerCard owner={bike.ownerInfo} />
          </div>
        </div>

        {/* Right Column: Price Calculator & Booking Action */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          {/* Price Header Card */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-5">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-xs text-slate-400">Hourly Rate</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-100">{formatCurrency(bike.hourlyPrice)}</span>
                  <span className="text-xs text-slate-400">/ hour</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Daily Flat Rate</p>
                <span className="text-lg font-bold text-emerald-400">{formatCurrency(bike.dailyPrice)}/day</span>
              </div>
            </div>

            {bike.customHourlyRates && (
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Tiered Pricing Rule Active
                </p>
                <p className="text-[11px] text-amber-200/80">
                  First {bike.customHourlyRates.firstNHours} hours @ ₹{bike.customHourlyRates.firstNHoursRate}/hr, remaining @ ₹{bike.customHourlyRates.remainingHoursRate}/hr.
                </p>
              </div>
            )}

            <Link
              href={`/bikes/${bike.id}/book`}
              className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-black text-sm transition-all shadow-xl ${
                bike.isAvailable
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 hover:scale-[1.01]'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed pointer-events-none'
              }`}
            >
              <span>{bike.isAvailable ? 'Book This Bike Now' : 'Currently Rented Out'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-around text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Zero Deposit Hold
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Insured Ride
              </span>
            </div>
          </div>

          {/* Interactive Calculator */}
          <PriceCalculator bike={bike} />
        </div>
      </div>

      {/* Related Bikes */}
      {relatedBikes.length > 0 && (
        <div className="space-y-6 pt-12 border-t border-slate-800">
          <h2 className="text-2xl font-bold text-slate-100">Similar Bikes You Might Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBikes.map((relBike) => (
              <BikeCard key={relBike.id} bike={relBike} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
