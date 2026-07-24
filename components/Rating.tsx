'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  reviewCount?: number;
  showCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Rating({ rating, reviewCount, showCount = true, size = 'sm' }: RatingProps) {
  const starSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5 text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star;
          const half = rating >= star - 0.5 && rating < star;
          return (
            <Star
              key={star}
              className={`${starSizes[size]} ${
                filled
                  ? 'fill-amber-400 text-amber-400'
                  : half
                  ? 'fill-amber-400/50 text-amber-400'
                  : 'text-slate-600'
              }`}
            />
          );
        })}
      </div>
      <span className="text-sm font-semibold text-amber-400">{rating.toFixed(1)}</span>
      {showCount && reviewCount !== undefined && (
        <span className="text-xs text-slate-400 font-normal">({reviewCount} reviews)</span>
      )}
    </div>
  );
}
