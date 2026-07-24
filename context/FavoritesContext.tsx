'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (bikeId: string) => void;
  isFavorite: (bikeId: string) => boolean;
  recentlyViewed: string[];
  addRecentlyViewed: (bikeId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem('bikerent_favs');
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }
      const savedRecent = localStorage.getItem('bikerent_recent');
      if (savedRecent) {
        setRecentlyViewed(JSON.parse(savedRecent));
      }
    } catch (e) {
      console.error('Failed to load local storage state:', e);
    }
  }, []);

  const toggleFavorite = (bikeId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(bikeId);
      const updated = exists ? prev.filter((id) => id !== bikeId) : [...prev, bikeId];
      localStorage.setItem('bikerent_favs', JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (bikeId: string) => favorites.includes(bikeId);

  const addRecentlyViewed = (bikeId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== bikeId);
      const updated = [bikeId, ...filtered].slice(0, 5); // Keep top 5
      localStorage.setItem('bikerent_recent', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        recentlyViewed,
        addRecentlyViewed,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
