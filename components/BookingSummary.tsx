'use client';

import React from 'react';
import { PricingBreakdown } from '@/types';
import { formatCurrency } from '@/utils/pricing';
import { Clock, ShieldAlert, Sparkles, Receipt, CheckCircle } from 'lucide-react';

interface BookingSummaryProps {
  breakdown: PricingBreakdown;
  hourlyPrice: number;
  dailyPrice: number;
}

export function BookingSummary({ breakdown, hourlyPrice, dailyPrice }: BookingSummaryProps) {
  return (
    <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-5">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Receipt className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold text-slate-100">Booking Summary</h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
          {breakdown.totalHours} {breakdown.totalHours === 1 ? 'Hour' : 'Hours'} ({breakdown.totalDays} {breakdown.totalDays === 1 ? 'Day' : 'Days'})
        </span>
      </div>

      <div className="text-xs p-3 rounded-xl bg-slate-800/50 text-slate-300 border border-slate-700/50 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Applied Rate:
        </span>
        <span className="text-emerald-400 font-semibold">{breakdown.pricingRuleApplied}</span>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-slate-300">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500" />
            Bike Rental Base ({breakdown.totalHours} hrs)
          </span>
          <span className="font-semibold text-slate-100">{formatCurrency(breakdown.baseRent)}</span>
        </div>

        <div className="flex justify-between text-slate-300">
          <span>Platform Service Fee</span>
          <span className="font-semibold text-slate-100">{formatCurrency(breakdown.platformFee)}</span>
        </div>

        <div className="flex justify-between text-slate-300">
          <span>GST (18%)</span>
          <span className="font-semibold text-slate-100">{formatCurrency(breakdown.gst)}</span>
        </div>

        <div className="flex justify-between text-slate-300">
          <span className="flex items-center gap-1 text-slate-400 text-xs">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            Security Deposit (Refundable)
          </span>
          <span className="font-semibold text-slate-100">{formatCurrency(breakdown.securityDeposit)}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Grand Total</p>
          <p className="text-2xl font-black text-emerald-400 mt-0.5">{formatCurrency(breakdown.grandTotal)}</p>
        </div>
        <div className="text-right text-xs text-slate-400">
          <p className="flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircle className="w-3.5 h-3.5" /> Includes all taxes
          </p>
          <p className="mt-0.5">Deposit refunded on bike return</p>
        </div>
      </div>
    </div>
  );
}
