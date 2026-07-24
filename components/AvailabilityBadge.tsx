'use client';

import React from 'react';

interface AvailabilityBadgeProps {
  isAvailable: boolean;
  size?: 'sm' | 'md';
}

export function AvailabilityBadge({ isAvailable, size = 'sm' }: AvailabilityBadgeProps) {
  if (isAvailable) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-medium rounded-full border backdrop-blur-md ${
          size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'
        } bg-emerald-500/10 text-emerald-400 border-emerald-500/30`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Available Now
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border backdrop-blur-md ${
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      } bg-rose-500/10 text-rose-400 border-rose-500/30`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
      Currently Rented
    </span>
  );
}
