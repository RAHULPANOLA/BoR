'use client';

import React from 'react';
import { Search, MapPin, SlidersHorizontal, Layers, X } from 'lucide-react';
import { BikeFilterState } from '@/types';

interface SearchBarProps {
  filters: BikeFilterState;
  onFilterChange: (updated: Partial<BikeFilterState>) => void;
  onReset: () => void;
  locations?: string[];
  categories?: string[];
}

export function SearchBar({
  filters,
  onFilterChange,
  onReset,
  locations = ['All Locations', 'Indiranagar, Bangalore', 'Koramangala, Bangalore', 'HSR Layout, Bangalore', 'Whitefield, Bangalore', 'MG Road, Bangalore', 'Jayanagar, Bangalore', 'BTM Layout, Bangalore', 'Electronic City, Bangalore'],
  categories = ['All Categories', 'Cruiser', 'Sports', 'Adventure', 'Electric', 'Scooter'],
}: SearchBarProps) {
  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search Keyword */}
        <div className="md:col-span-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search brand or model (e.g. Royal Enfield)..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-11 pr-4 py-3 text-sm bg-slate-950/80 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Location Select */}
        <div className="md:col-span-3 relative">
          <MapPin className="w-4 h-4 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={filters.location}
            onChange={(e) => onFilterChange({ location: e.target.value })}
            className="w-full pl-11 pr-8 py-3 text-sm bg-slate-950/80 border border-slate-800 rounded-2xl text-slate-100 appearance-none focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc === 'All Locations' ? '' : loc} className="bg-slate-900 text-slate-100">
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Category Select */}
        <div className="md:col-span-3 relative">
          <Layers className="w-4 h-4 text-emerald-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ category: e.target.value })}
            className="w-full pl-11 pr-8 py-3 text-sm bg-slate-950/80 border border-slate-800 rounded-2xl text-slate-100 appearance-none focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat === 'All Categories' ? '' : cat} className="bg-slate-900 text-slate-100">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Available Only Toggle */}
        <div className="md:col-span-2 flex items-center justify-end gap-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer bg-slate-950/60 p-3 rounded-2xl border border-slate-800 w-full justify-center hover:border-slate-700 transition-colors">
            <input
              type="checkbox"
              checked={filters.availableOnly}
              onChange={(e) => onFilterChange({ availableOnly: e.target.checked })}
              className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500 bg-slate-900 border-slate-700 cursor-pointer"
            />
            <span>Available</span>
          </label>
        </div>
      </div>
    </div>
  );
}
