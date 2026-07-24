export interface CustomHourlyRates {
  firstNHours: number;
  firstNHoursRate: number;
  remainingHoursRate: number;
}

export interface BikeSpecs {
  engine: string;
  mileage: string;
  topSpeed: string;
  fuelType: 'Petrol' | 'Electric' | 'Hybrid';
  weight: string;
  transmission: 'Manual' | 'Automatic' | 'Single-Speed';
}

export interface OwnerInfo {
  name: string;
  phone: string;
  email: string;
  avatar: string;
  rating: number;
  location: string;
}

export interface Bike {
  id: string;
  brand: string;
  model: string;
  category: 'Cruiser' | 'Sports' | 'Adventure' | 'Electric' | 'Scooter' | 'Off-Road' | 'Touring';
  hourlyPrice: number;
  dailyPrice: number;
  customHourlyRates?: CustomHourlyRates;
  images: string[];
  specs: BikeSpecs;
  description: string;
  location: string;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  ownerInfo: OwnerInfo;
  createdAt: string;
  updatedAt: string;
}

export interface UserDetails {
  name: string;
  email: string;
  phone: string;
  drivingLicenseNo?: string;
}

export interface PricingBreakdown {
  totalHours: number;
  totalDays: number;
  baseRent: number;
  platformFee: number;
  gst: number;
  securityDeposit: number;
  grandTotal: number;
  pricingRuleApplied: string;
}

export interface Booking {
  id: string;
  bikeId: string;
  bikeSummary: {
    brand: string;
    model: string;
    image: string;
    location: string;
    hourlyPrice: number;
    dailyPrice: number;
  };
  userDetails: UserDetails;
  pickupDate: string; // YYYY-MM-DD
  pickupTime: string; // HH:MM
  returnDate: string; // YYYY-MM-DD
  returnTime: string; // HH:MM
  pricingBreakdown: PricingBreakdown;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'owner' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface BikeFilterState {
  search: string;
  brand: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  location: string;
  minRating: number;
  availableOnly: boolean;
  sortBy: 'price-low' | 'price-high' | 'rating' | 'newest';
}

export interface AdminStats {
  totalBikes: number;
  totalBookings: number;
  availableBikes: number;
  bookedBikes: number;
  totalRevenue: number;
  categoryDistribution: Record<string, number>;
  monthlyRevenue: { month: string; revenue: number }[];
}
