'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bike } from '@/types';
import { formatCurrency } from '@/utils/pricing';
import { Rating } from '@/components/Rating';
import { AvailabilityBadge } from '@/components/AvailabilityBadge';
import { useFavorites } from '@/context/FavoritesContext';
import { useToast } from '@/context/ToastContext';
import { Heart, MapPin, Gauge, Fuel, ArrowRight } from 'lucide-react';

interface BikeCardProps {
  bike: Bike;
}

export function BikeCard({ bike }: BikeCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const fav = isFavorite(bike.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(bike.id);
    showToast(
      fav ? `Removed ${bike.brand} ${bike.model} from favorites` : `Added ${bike.brand} ${bike.model} to favorites`,
      fav ? 'info' : 'success'
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 backdrop-blur-md overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-950/20 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-950">
        <img
          src={bike.images[0] || 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800'}
          alt={`${bike.brand} ${bike.model}`}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-900/80 text-emerald-400 border border-slate-700/60 backdrop-blur-md shadow-md">
            {bike.category}
          </span>

          <button
            onClick={handleFavoriteClick}
            aria-label="Favorite button"
            className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
              fav
                ? 'bg-rose-500 text-white'
                : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Heart className={`w-4 h-4 ${fav ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Bottom Availability Badge over image */}
        <div className="absolute bottom-3 left-3 z-10">
          <AvailabilityBadge isAvailable={bike.isAvailable} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">{bike.brand}</p>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-300 transition-colors line-clamp-1">
                {bike.model}
              </h3>
            </div>
            <Rating rating={bike.rating} reviewCount={bike.reviewCount} showCount={false} />
          </div>

          <p className="text-xs text-slate-400 flex items-center gap-1 mt-2">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{bike.location}</span>
          </p>

          {/* Quick Specs Pill */}
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-slate-400 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60">
            <div className="flex items-center gap-1.5 truncate">
              <Gauge className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">{bike.specs.engine}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Fuel className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">{bike.specs.mileage}</span>
            </div>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            <p className="text-xs text-slate-400">Starting at</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-slate-100">{formatCurrency(bike.hourlyPrice)}</span>
              <span className="text-xs text-slate-400">/hr</span>
            </div>
            <p className="text-[11px] text-emerald-400 font-medium">
              or {formatCurrency(bike.dailyPrice)}/day
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/bikes/${bike.id}`}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors text-xs font-semibold"
              title="View Details"
            >
              Details
            </Link>

            <Link
              href={`/bikes/${bike.id}/book`}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg ${
                bike.isAvailable
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 hover:scale-[1.02]'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed pointer-events-none'
              }`}
            >
              <span>Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
