'use client';

import React, { useState } from 'react';
import { Bike } from '@/types';
import { calculateBookingPrice, formatCurrency } from '@/utils/pricing';
import { Calculator, Clock, Sparkles } from 'lucide-react';

interface PriceCalculatorProps {
  bike: Bike;
}

export function PriceCalculator({ bike }: PriceCalculatorProps) {
  const [hours, setHours] = useState<number>(4);

  // Derive mock dates for instant slider preview
  const now = new Date();
  const pickupDate = now.toISOString().split('T')[0];
  const pickupTime = '10:00';

  const returnDateObj = new Date(now.getTime() + hours * 60 * 60 * 1000);
  const returnDate = returnDateObj.toISOString().split('T')[0];
  const returnTime = returnDateObj.toTimeString().slice(0, 5);

  const breakdown = calculateBookingPrice(
    bike.hourlyPrice,
    bike.dailyPrice,
    pickupDate,
    pickupTime,
    returnDate,
    returnTime,
    bike.customHourlyRates
  );

  return (
    <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-base">Quick Price Calculator</h4>
            <p className="text-xs text-slate-400">Estimate your trip cost instantly</p>
          </div>
        </div>
        <span className="text-xs font-semibold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          {formatCurrency(bike.hourlyPrice)} / hr
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm font-medium">
          <span className="text-slate-300 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            Duration:
          </span>
          <span className="text-slate-100 font-bold">{hours} Hours</span>
        </div>

        <input
          type="range"
          min="1"
          max="48"
          value={hours}
          onChange={(e) => setHours(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />

        <div className="flex justify-between text-xs text-slate-500">
          <span>1 hr</span>
          <span>12 hrs</span>
          <span>24 hrs (1 day)</span>
          <span>48 hrs</span>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Base Rent</span>
          <span className="text-slate-200">{formatCurrency(breakdown.baseRent)}</span>
        </div>
        <div className="flex justify-between text-xs text-slate-400">
          <span>Platform Fee & GST</span>
          <span className="text-slate-200">{formatCurrency(breakdown.platformFee + breakdown.gst)}</span>
        </div>
        <div className="flex justify-between text-xs text-slate-400">
          <span>Refundable Deposit</span>
          <span className="text-slate-200">{formatCurrency(breakdown.securityDeposit)}</span>
        </div>
        <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
          <span className="text-sm font-bold text-slate-200">Total Payable:</span>
          <span className="text-xl font-extrabold text-emerald-400">{formatCurrency(breakdown.grandTotal)}</span>
        </div>
      </div>

      <p className="text-xs text-slate-400 flex items-center gap-1">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        Rule applied: <span className="text-slate-300 font-medium">{breakdown.pricingRuleApplied}</span>
      </p>
    </div>
  );
}
