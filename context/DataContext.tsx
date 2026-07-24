'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Bike, Booking, UserDetails, PricingBreakdown, AdminStats } from '@/types';
import { INITIAL_BIKES, INITIAL_BOOKINGS } from '@/data/initialData';

interface DataContextType {
  bikes: Bike[];
  bookings: Booking[];
  loading: boolean;
  getBikeById: (id: string) => Bike | undefined;
  getBookingById: (id: string) => Booking | undefined;
  createBike: (bikeData: Omit<Bike, 'id' | 'createdAt' | 'updatedAt'>) => Bike;
  updateBike: (id: string, fields: Partial<Bike>) => Bike | null;
  deleteBike: (id: string) => boolean;
  toggleBikeAvailability: (id: string) => Bike | null;
  createBooking: (payload: {
    bikeId: string;
    userDetails: UserDetails;
    pickupDate: string;
    pickupTime: string;
    returnDate: string;
    returnTime: string;
    pricingBreakdown: PricingBreakdown;
  }) => Booking;
  cancelBooking: (id: string) => boolean;
  getAdminStats: () => AdminStats;
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const BIKES_KEY = 'bikerent_bikes_v1';
const BOOKINGS_KEY = 'bikerent_bookings_v1';

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedBikes = localStorage.getItem(BIKES_KEY);
      if (savedBikes) {
        setBikes(JSON.parse(savedBikes));
      } else {
        localStorage.setItem(BIKES_KEY, JSON.stringify(INITIAL_BIKES));
        setBikes(INITIAL_BIKES);
      }

      const savedBookings = localStorage.getItem(BOOKINGS_KEY);
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      } else {
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(INITIAL_BOOKINGS));
        setBookings(INITIAL_BOOKINGS);
      }
    } catch (e) {
      console.error('Failed to parse local browser storage:', e);
      setBikes(INITIAL_BIKES);
      setBookings(INITIAL_BOOKINGS);
    } finally {
      setLoading(false);
    }
  }, []);

  // Helper to persist bikes
  const saveBikes = (newBikes: Bike[]) => {
    setBikes(newBikes);
    localStorage.setItem(BIKES_KEY, JSON.stringify(newBikes));
  };

  // Helper to persist bookings
  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(newBookings));
  };

  const getBikeById = (id: string) => {
    return bikes.find((b) => b.id === id);
  };

  const getBookingById = (id: string) => {
    return bookings.find((b) => b.id === id);
  };

  const createBike = (bikeData: Omit<Bike, 'id' | 'createdAt' | 'updatedAt'>) => {
    const id = `bike-${Date.now().toString().slice(-4)}`;
    const now = new Date().toISOString();
    const newBike: Bike = {
      ...bikeData,
      id,
      createdAt: now,
      updatedAt: now,
    };

    const updated = [newBike, ...bikes];
    saveBikes(updated);
    return newBike;
  };

  const updateBike = (id: string, fields: Partial<Bike>) => {
    const index = bikes.findIndex((b) => b.id === id);
    if (index === -1) return null;

    const updatedBike: Bike = {
      ...bikes[index],
      ...fields,
      updatedAt: new Date().toISOString(),
    };

    const updated = [...bikes];
    updated[index] = updatedBike;
    saveBikes(updated);
    return updatedBike;
  };

  const deleteBike = (id: string) => {
    const filtered = bikes.filter((b) => b.id !== id);
    if (filtered.length === bikes.length) return false;
    saveBikes(filtered);
    return true;
  };

  const toggleBikeAvailability = (id: string) => {
    const target = getBikeById(id);
    if (!target) return null;
    return updateBike(id, { isAvailable: !target.isAvailable });
  };

  const createBooking = (payload: {
    bikeId: string;
    userDetails: UserDetails;
    pickupDate: string;
    pickupTime: string;
    returnDate: string;
    returnTime: string;
    pricingBreakdown: PricingBreakdown;
  }) => {
    const bike = getBikeById(payload.bikeId);
    if (!bike) throw new Error('Bike not found in local storage');

    const bookingId = `BK-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toISOString();

    const newBooking: Booking = {
      id: bookingId,
      bikeId: payload.bikeId,
      bikeSummary: {
        brand: bike.brand,
        model: bike.model,
        image: bike.images[0] || '',
        location: bike.location,
        hourlyPrice: bike.hourlyPrice,
        dailyPrice: bike.dailyPrice,
      },
      userDetails: payload.userDetails,
      pickupDate: payload.pickupDate,
      pickupTime: payload.pickupTime,
      returnDate: payload.returnDate,
      returnTime: payload.returnTime,
      pricingBreakdown: payload.pricingBreakdown,
      status: 'confirmed',
      createdAt: now,
    };

    const updatedBookings = [newBooking, ...bookings];
    saveBookings(updatedBookings);
    return newBooking;
  };

  const cancelBooking = (id: string) => {
    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) return false;

    const updated = [...bookings];
    updated[index] = { ...updated[index], status: 'cancelled' };
    saveBookings(updated);
    return true;
  };

  const getAdminStats = (): AdminStats => {
    const totalBikes = bikes.length;
    const availableBikes = bikes.filter((b) => b.isAvailable).length;
    const bookedBikes = totalBikes - availableBikes;
    const totalBookings = bookings.length;

    const totalRevenue = bookings
      .filter((b) => b.status !== 'cancelled')
      .reduce((sum, b) => sum + (b.pricingBreakdown?.grandTotal || 0), 0);

    const categoryDistribution: Record<string, number> = {};
    bikes.forEach((bike) => {
      categoryDistribution[bike.category] = (categoryDistribution[bike.category] || 0) + 1;
    });

    const monthlyRevenue = [
      { month: 'Jan', revenue: 12400 },
      { month: 'Feb', revenue: 18900 },
      { month: 'Mar', revenue: 24500 },
      { month: 'Apr', revenue: 31200 },
      { month: 'May', revenue: 28400 },
      { month: 'Jun', revenue: 42100 },
      { month: 'Jul', revenue: totalRevenue },
    ];

    return {
      totalBikes,
      totalBookings,
      availableBikes,
      bookedBikes,
      totalRevenue,
      categoryDistribution,
      monthlyRevenue,
    };
  };

  const resetToDefaults = () => {
    localStorage.setItem(BIKES_KEY, JSON.stringify(INITIAL_BIKES));
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(INITIAL_BOOKINGS));
    setBikes(INITIAL_BIKES);
    setBookings(INITIAL_BOOKINGS);
  };

  return (
    <DataContext.Provider
      value={{
        bikes,
        bookings,
        loading,
        getBikeById,
        getBookingById,
        createBike,
        updateBike,
        deleteBike,
        toggleBikeAvailability,
        createBooking,
        cancelBooking,
        getAdminStats,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
