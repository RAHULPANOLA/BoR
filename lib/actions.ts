'use server';

import { revalidatePath } from 'next/cache';
import {
  readBikesFromFile,
  writeBikesToFile,
  getBikeById,
  readBookingsFromFile,
  writeBookingsToFile,
  getBookingById,
  getAdminStats,
} from '@/lib/db';
import { Bike, Booking, UserDetails, PricingBreakdown } from '@/types';

// Fetch all bikes
export async function fetchBikesAction(): Promise<Bike[]> {
  return await readBikesFromFile();
}

// Fetch single bike by ID
export async function fetchBikeByIdAction(id: string): Promise<Bike | null> {
  return await getBikeById(id);
}

// Add new bike (Owner Panel)
export async function createBikeAction(newBikeData: Omit<Bike, 'id' | 'createdAt' | 'updatedAt'>): Promise<Bike> {
  const bikes = await readBikesFromFile();
  const id = `bike-${Date.now().toString().slice(-4)}`;
  const now = new Date().toISOString();

  const newBike: Bike = {
    ...newBikeData,
    id,
    createdAt: now,
    updatedAt: now,
  };

  bikes.unshift(newBike);
  await writeBikesToFile(bikes);
  revalidatePath('/bikes');
  revalidatePath('/owner');
  revalidatePath('/admin');
  return newBike;
}

// Update bike (Owner Panel)
export async function updateBikeAction(id: string, updatedFields: Partial<Bike>): Promise<Bike | null> {
  const bikes = await readBikesFromFile();
  const index = bikes.findIndex((b) => b.id === id);

  if (index === -1) return null;

  const updatedBike: Bike = {
    ...bikes[index],
    ...updatedFields,
    updatedAt: new Date().toISOString(),
  };

  bikes[index] = updatedBike;
  await writeBikesToFile(bikes);
  revalidatePath('/bikes');
  revalidatePath(`/bikes/${id}`);
  revalidatePath('/owner');
  revalidatePath('/admin');
  return updatedBike;
}

// Delete bike (Owner Panel)
export async function deleteBikeAction(id: string): Promise<boolean> {
  const bikes = await readBikesFromFile();
  const filteredBikes = bikes.filter((b) => b.id !== id);

  if (filteredBikes.length === bikes.length) return false;

  await writeBikesToFile(filteredBikes);
  revalidatePath('/bikes');
  revalidatePath('/owner');
  revalidatePath('/admin');
  return true;
}

// Toggle bike availability (Owner Panel)
export async function toggleBikeAvailabilityAction(id: string, isAvailable: boolean): Promise<Bike | null> {
  return await updateBikeAction(id, { isAvailable });
}

// Create new booking (Booking Page)
export async function createBookingAction(payload: {
  bikeId: string;
  userDetails: UserDetails;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  pricingBreakdown: PricingBreakdown;
}): Promise<Booking> {
  const bike = await getBikeById(payload.bikeId);
  if (!bike) {
    throw new Error('Bike not found');
  }

  const bookings = await readBookingsFromFile();
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

  bookings.unshift(newBooking);
  await writeBookingsToFile(bookings);

  // Optionally mark bike as unavailable or keep available for multiple dates
  // await toggleBikeAvailabilityAction(payload.bikeId, false);

  revalidatePath('/bookings');
  revalidatePath('/owner');
  revalidatePath('/admin');

  return newBooking;
}

// Fetch all bookings
export async function fetchBookingsAction(): Promise<Booking[]> {
  return await readBookingsFromFile();
}

// Fetch single booking by ID
export async function fetchBookingByIdAction(id: string): Promise<Booking | null> {
  return await getBookingById(id);
}

// Cancel booking
export async function cancelBookingAction(id: string): Promise<boolean> {
  const bookings = await readBookingsFromFile();
  const index = bookings.findIndex((b) => b.id === id);

  if (index === -1) return false;

  bookings[index].status = 'cancelled';
  await writeBookingsToFile(bookings);

  revalidatePath('/bookings');
  revalidatePath('/owner');
  revalidatePath('/admin');
  return true;
}

// Fetch Admin Stats
export async function fetchAdminStatsAction() {
  return await getAdminStats();
}
