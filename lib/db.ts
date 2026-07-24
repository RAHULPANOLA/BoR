import fs from 'fs/promises';
import path from 'path';
import { Bike, Booking, User, AdminStats } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const BIKES_FILE = path.join(DATA_DIR, 'bikes.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Helper to ensure data directory exists
async function ensureDataDirectory() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

// ----------------- BIKES CRUD ----------------- //

export async function readBikesFromFile(): Promise<Bike[]> {
  await ensureDataDirectory();
  try {
    const data = await fs.readFile(BIKES_FILE, 'utf-8');
    return JSON.parse(data) as Bike[];
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return [];
    }
    console.error('Error reading bikes file:', error);
    return [];
  }
}

export async function writeBikesToFile(bikes: Bike[]): Promise<void> {
  await ensureDataDirectory();
  await fs.writeFile(BIKES_FILE, JSON.stringify(bikes, null, 2), 'utf-8');
}

export async function getBikeById(id: string): Promise<Bike | null> {
  const bikes = await readBikesFromFile();
  return bikes.find((b) => b.id === id) || null;
}

// ----------------- BOOKINGS CRUD ----------------- //

export async function readBookingsFromFile(): Promise<Booking[]> {
  await ensureDataDirectory();
  try {
    const data = await fs.readFile(BOOKINGS_FILE, 'utf-8');
    return JSON.parse(data) as Booking[];
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return [];
    }
    console.error('Error reading bookings file:', error);
    return [];
  }
}

export async function writeBookingsToFile(bookings: Booking[]): Promise<void> {
  await ensureDataDirectory();
  await fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf-8');
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const bookings = await readBookingsFromFile();
  return bookings.find((b) => b.id === id) || null;
}

// ----------------- USERS CRUD ----------------- //

export async function readUsersFromFile(): Promise<User[]> {
  await ensureDataDirectory();
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(data) as User[];
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return [];
    }
    console.error('Error reading users file:', error);
    return [];
  }
}

// ----------------- ADMIN STATS ----------------- //

export async function getAdminStats(): Promise<AdminStats> {
  const bikes = await readBikesFromFile();
  const bookings = await readBookingsFromFile();

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
}
