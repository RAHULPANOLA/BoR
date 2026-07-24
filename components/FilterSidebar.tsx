'use client';

import React from 'react';
import { BikeFilterState } from '@/types';
import { formatCurrency } from '@/utils/pricing';
import { Filter, RotateCcw, Star, DollarSign } from 'lucide-react';

interface FilterSidebarProps {
  filters: BikeFilterState;
  onFilterChange: (updated: Partial<BikeFilterState>) => void;
  onReset: () => void;
  brands: string[];
}

export function FilterSidebar({ filters, onFilterChange, onReset, brands }: FilterSidebarProps) {
  return (
    <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-slate-100 text-base">Filter Bikes</h3>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All
        </button>
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
          className="w-full px-3 py-2.5 text-xs bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500 cursor-pointer"
        >
          <option value="newest" className="bg-slate-900">Newest Arrivals</option>
          <option value="price-low" className="bg-slate-900">Price: Low to High</option>
          <option value="price-high" className="bg-slate-900">Price: High to Low</option>
          <option value="rating" className="bg-slate-900">Highest Rated</option>
        </select>
      </div>

      {/* Max Price Range Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs font-bold text-slate-300">
          <span className="uppercase tracking-wider">Max Hourly Rate</span>
          <span className="text-emerald-400 font-extrabold">{formatCurrency(filters.maxPrice)}/hr</span>
        </div>
        <input
          type="range"
          min="50"
          max="500"
          step="10"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ maxPrice: parseInt(e.target.value) })}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
        <div className="flex justify-between text-[11px] text-slate-500">
          <span>₹50/hr</span>
          <span>₹500/hr</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Minimum Rating</label>
        <div className="grid grid-cols-4 gap-2">
          {[0, 4.0, 4.5, 4.8].map((ratingVal) => (
            <button
              key={ratingVal}
              onClick={() => onFilterChange({ minRating: ratingVal })}
              className={`flex items-center justify-center gap-1 py-2 px-1 rounded-xl text-xs font-semibold border transition-all ${
                filters.minRating === ratingVal
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {ratingVal === 0 ? (
                'Any'
              ) : (
                <>
                  <span>{ratingVal}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Selection */}
      <div className="space-y-3 pt-2 border-t border-slate-800">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Brand</label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-white">
            <input
              type="radio"
              name="brand"
              checked={filters.brand === ''}
              onChange={() => onFilterChange({ brand: '' })}
              className="accent-emerald-500 cursor-pointer"
            />
            <span>All Brands</span>
          </label>
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-white">
              <input
                type="radio"
                name="brand"
                checked={filters.brand === b}
                onChange={() => onFilterChange({ brand: b })}
                className="accent-emerald-500 cursor-pointer"
              />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
