'use client';

import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Bike, BikeFilterState } from '@/types';
import { fetchBikesAction } from '@/lib/actions';
import { BikeCard } from '@/components/BikeCard';
import { SearchBar } from '@/components/SearchBar';
import { FilterSidebar } from '@/components/FilterSidebar';
import { useFavorites } from '@/context/FavoritesContext';
import { Bike as BikeIcon, Heart, Filter, Loader2 } from 'lucide-react';

function BikesContent() {
  const searchParams = useSearchParams();
  const { favorites } = useFavorites();

  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const initialFilters: BikeFilterState = {
    search: '',
    brand: '',
    category: searchParams.get('category') || '',
    minPrice: 0,
    maxPrice: 500,
    location: searchParams.get('location') || '',
    minRating: 0,
    availableOnly: false,
    sortBy: 'newest',
  };

  const [filters, setFilters] = useState<BikeFilterState>(initialFilters);
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(searchParams.get('favorites') === 'true');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await fetchBikesAction();
        setBikes(data);
      } catch (err) {
        console.error('Failed to load bikes:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const brands = useMemo(() => {
    return Array.from(new Set(bikes.map((b) => b.brand)));
  }, [bikes]);

  const handleFilterChange = (updated: Partial<BikeFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleReset = () => {
    setFilters(initialFilters);
    setOnlyFavorites(false);
  };

  const filteredBikes = useMemo(() => {
    return bikes
      .filter((bike) => {
        if (onlyFavorites && !favorites.includes(bike.id)) return false;

        if (filters.search) {
          const query = filters.search.toLowerCase();
          const matchesBrand = bike.brand.toLowerCase().includes(query);
          const matchesModel = bike.model.toLowerCase().includes(query);
          const matchesCat = bike.category.toLowerCase().includes(query);
          if (!matchesBrand && !matchesModel && !matchesCat) return false;
        }

        if (filters.brand && bike.brand !== filters.brand) return false;
        if (filters.category && bike.category !== filters.category) return false;
        if (filters.location && !bike.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
        if (bike.hourlyPrice > filters.maxPrice) return false;
        if (bike.rating < filters.minRating) return false;
        if (filters.availableOnly && !bike.isAvailable) return false;

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-low') return a.hourlyPrice - b.hourlyPrice;
        if (filters.sortBy === 'price-high') return b.hourlyPrice - a.hourlyPrice;
        if (filters.sortBy === 'rating') return b.rating - a.rating;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [bikes, filters, onlyFavorites, favorites]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs uppercase tracking-widest mb-1">
            <BikeIcon className="w-4 h-4" />
            <span>Full Rental Fleet</span>
          </div>
          <h1 className="text-3xl font-black text-slate-100">Browse Bikes</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
              onlyFavorites
                ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/20'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${onlyFavorites ? 'fill-white' : ''}`} />
            <span>Saved Favorites ({favorites.length})</span>
          </button>

          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-bold cursor-pointer"
          >
            <Filter className="w-4 h-4 text-emerald-400" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Search Bar */}
      <SearchBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Filters */}
        <div className={`lg:col-span-3 ${showMobileFilter ? 'block' : 'hidden lg:block'}`}>
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            brands={brands}
          />
        </div>

        {/* Bike Grid */}
        <div className="lg:col-span-9 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Showing <strong className="text-emerald-400">{filteredBikes.length}</strong> of {bikes.length} bikes
            </span>
            {onlyFavorites && (
              <span className="text-rose-400 font-semibold flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-rose-500" /> Filtering Saved Favorites
              </span>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-80 rounded-3xl bg-slate-900/40 border border-slate-800 animate-pulse" />
              ))}
            </div>
          ) : filteredBikes.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto text-2xl">
                🔍
              </div>
              <h3 className="text-xl font-bold text-slate-200">No Bikes Matched Your Filters</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try widening your price range, clearing specific filters, or resetting search keywords.
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBikes.map((bike) => (
                <BikeCard key={bike.id} bike={bike} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BikesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20 text-slate-400 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
            <span className="text-sm">Loading Bike Fleet...</span>
          </div>
        }
      >
        <BikesContent />
      </Suspense>
    </div>
  );
}
