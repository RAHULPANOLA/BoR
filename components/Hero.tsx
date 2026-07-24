'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bike, ShieldCheck, Sparkles, Star, Zap, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden pt-12 pb-20 md:py-24 bg-slate-950">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Top Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>India&apos;s #1 Hourly & Daily Bike Rental Platform</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-slate-100 tracking-tight leading-none"
          >
            Rent Your Dream Ride <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              By The Hour Or Day
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            From Royal Enfield cruisers to Ather electric scooters & super-fast Ducatis. Rent in under 2 minutes with instant verification and full insurance coverage.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <Link
              href="/bikes"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95"
            >
              <Bike className="w-5 h-5" />
              <span>Explore All Bikes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/owner"
              className="flex items-center gap-2 px-7 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white font-bold text-sm transition-all hover:scale-105"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>List Your Bike & Earn</span>
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-slate-800/60 max-w-4xl mx-auto text-left"
          >
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <p className="text-2xl font-black text-emerald-400">1,200+</p>
              <p className="text-xs text-slate-400 font-medium">Bikes Available</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <p className="text-2xl font-black text-amber-400">4.9 ★</p>
              <p className="text-xs text-slate-400 font-medium">Customer Rating</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <p className="text-2xl font-black text-teal-400">₹70/hr</p>
              <p className="text-xs text-slate-400 font-medium">Lowest Hourly Rate</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <p className="text-2xl font-black text-purple-400">100%</p>
              <p className="text-xs text-slate-400 font-medium">Insured Rides</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
