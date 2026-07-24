import { CustomHourlyRates, PricingBreakdown } from '@/types';

export function calculateHoursAndDays(
  pickupDate: string,
  pickupTime: string,
  returnDate: string,
  returnTime: string
): { totalHours: number; totalDays: number } {
  if (!pickupDate || !pickupTime || !returnDate || !returnTime) {
    return { totalHours: 1, totalDays: 1 };
  }

  const start = new Date(`${pickupDate}T${pickupTime}`);
  const end = new Date(`${returnDate}T${returnTime}`);

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
    return { totalHours: 1, totalDays: 1 };
  }

  const diffMs = end.getTime() - start.getTime();
  const rawHours = diffMs / (1000 * 60 * 60);
  const totalHours = Math.max(1, Math.ceil(rawHours));
  const totalDays = Math.max(1, Math.ceil(totalHours / 24));

  return { totalHours, totalDays };
}

export function calculateBookingPrice(
  hourlyPrice: number,
  dailyPrice: number,
  pickupDate: string,
  pickupTime: string,
  returnDate: string,
  returnTime: string,
  customHourlyRates?: CustomHourlyRates
): PricingBreakdown {
  const { totalHours, totalDays } = calculateHoursAndDays(
    pickupDate,
    pickupTime,
    returnDate,
    returnTime
  );

  let baseRent = 0;
  let pricingRuleApplied = 'Standard Hourly Rate';

  // Check if custom tier pricing applies
  if (customHourlyRates) {
    const { firstNHours, firstNHoursRate, remainingHoursRate } = customHourlyRates;
    if (totalHours <= firstNHours) {
      baseRent = totalHours * firstNHoursRate;
      pricingRuleApplied = `Tiered (First ${firstNHours}h @ ₹${firstNHoursRate}/h)`;
    } else {
      baseRent = (firstNHours * firstNHoursRate) + ((totalHours - firstNHours) * remainingHoursRate);
      pricingRuleApplied = `Tiered (${firstNHours}h @ ₹${firstNHoursRate}/h + ${totalHours - firstNHours}h @ ₹${remainingHoursRate}/h)`;
    }
  } else if (totalHours >= 24 && dailyPrice > 0) {
    // If renting for 24+ hours, optimize between daily and hourly rates
    const fullDays = Math.floor(totalHours / 24);
    const remHours = totalHours % 24;
    const hourlyExcessCost = remHours * hourlyPrice;

    // If remaining hours cost exceeds a full daily price, cap with another daily rate
    const remCost = hourlyExcessCost > dailyPrice ? dailyPrice : hourlyExcessCost;
    const dailyTotal = (fullDays * dailyPrice) + remCost;
    const hourlyTotal = totalHours * hourlyPrice;

    if (dailyTotal < hourlyTotal) {
      baseRent = dailyTotal;
      pricingRuleApplied = `Daily Optimized Rate (₹${dailyPrice}/day)`;
    } else {
      baseRent = hourlyTotal;
      pricingRuleApplied = `Hourly Rate (₹${hourlyPrice}/h)`;
    }
  } else {
    // Standard hourly rate
    baseRent = totalHours * hourlyPrice;
    pricingRuleApplied = `Standard Rate (₹${hourlyPrice}/h)`;
  }

  const platformFee = 50; // Fixed ₹50 platform fee
  const taxableAmount = baseRent + platformFee;
  const gst = Math.round(taxableAmount * 0.18); // 18% GST
  const securityDeposit = 2000; // ₹2000 refundable security deposit
  const grandTotal = baseRent + platformFee + gst + securityDeposit;

  return {
    totalHours,
    totalDays,
    baseRent,
    platformFee,
    gst,
    securityDeposit,
    grandTotal,
    pricingRuleApplied,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
