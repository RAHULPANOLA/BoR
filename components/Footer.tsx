'use client';

import React from 'react';
import Link from 'next/link';
import { Bike, ShieldCheck, MapPin, Mail, Phone, Heart, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Col */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500 text-slate-950 font-bold">
              <Bike className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-white">
              Bike<span className="text-emerald-400">Rent</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Premium hourly & daily bike rentals across India. Ride your dream cruiser, electric scooter, or sports bike with zero deposit hassle, transparent pricing, and 24/7 roadside assistance.
          </p>

          <div className="flex items-center gap-4 text-xs font-semibold text-emerald-400 pt-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Insured Rides
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-400" /> Instant Pickup
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">Quick Navigation</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/bikes" className="hover:text-emerald-400 transition-colors">Browse All Bikes</Link>
            </li>
            <li>
              <Link href="/bookings" className="hover:text-emerald-400 transition-colors">Track My Booking</Link>
            </li>
            <li>
              <Link href="/owner" className="hover:text-emerald-400 transition-colors">Host & Earn (Owner)</Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-emerald-400 transition-colors">Admin Portal</Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">Top Categories</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/bikes?category=Cruiser" className="hover:text-emerald-400">Cruisers & Royal Enfield</Link></li>
            <li><Link href="/bikes?category=Sports" className="hover:text-emerald-400">Sports & Superbikes</Link></li>
            <li><Link href="/bikes?category=Electric" className="hover:text-emerald-400">Electric Scooters (Ather)</Link></li>
            <li><Link href="/bikes?category=Scooter" className="hover:text-emerald-400">City Scooters (Honda)</Link></li>
            <li><Link href="/bikes?category=Adventure" className="hover:text-emerald-400">Touring & Adventure</Link></li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">Help & Support</h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+91 1800-245-3736</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>support@bikerent.in</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Indiranagar 100ft Rd, Bangalore</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p className="flex items-center justify-center gap-1">
          Made with <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" /> for motorcycle lovers. © 2026 BikeRent Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
