'use client';

import React, { useEffect } from 'react';
import { Bike } from '@/types';
import { useFavorites } from '@/context/FavoritesContext';
import { useToast } from '@/context/ToastContext';
import { Heart, Share2 } from 'lucide-react';

interface DetailActionsProps {
  bike: Bike;
}

export function DetailActions({ bike }: DetailActionsProps) {
  const { isFavorite, toggleFavorite, addRecentlyViewed } = useFavorites();
  const { showToast } = useToast();
  const fav = isFavorite(bike.id);

  useEffect(() => {
    addRecentlyViewed(bike.id);
  }, [bike.id]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Rent ${bike.brand} ${bike.model} on BikeRent`,
          text: `Check out ${bike.brand} ${bike.model} for rent at ₹${bike.hourlyPrice}/hr on BikeRent!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Link copied to clipboard!', 'success');
      }
    } catch (e) {
      console.log('Share error or cancelled:', e);
    }
  };

  const handleFav = () => {
    toggleFavorite(bike.id);
    showToast(
      fav ? `Removed ${bike.brand} ${bike.model} from favorites` : `Added ${bike.brand} ${bike.model} to favorites`,
      fav ? 'info' : 'success'
    );
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleShare}
        className="p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-slate-200 hover:text-white border border-slate-700/60 backdrop-blur-md transition-all shadow-md cursor-pointer"
        title="Share Bike"
      >
        <Share2 className="w-4 h-4" />
      </button>

      <button
        onClick={handleFav}
        className={`p-3 rounded-full border backdrop-blur-md transition-all shadow-md cursor-pointer ${
          fav
            ? 'bg-rose-500 text-white border-rose-400'
            : 'bg-slate-900/80 text-slate-200 hover:text-white border-slate-700/60'
        }`}
        title="Save to Favorites"
      >
        <Heart className={`w-4 h-4 ${fav ? 'fill-white' : ''}`} />
      </button>
    </div>
  );
}
