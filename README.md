# 🏍️ BikeRent - Modern Bike Rental Web Application

BikeRent is a modern, high-performance, full-stack Bike Rental web application built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **React Hook Form**, **Zod**, and **Lucide React Icons**.

> **Note**: This application operates **100% database-free & offline-ready**, reading and writing all data dynamically to local JSON files (`/data/bikes.json`, `/data/bookings.json`, `/data/users.json`) using Node.js `fs/promises`.

---

## 🌟 Key Features

### 1. 🏠 Modern Landing Page
- **Hero Banner**: Highlighting metrics (1,200+ bikes, 4.9★ rating), animated glowing background, and quick action buttons.
- **Featured Fleet**: Interactive grid showcasing top bikes.
- **Category Explorer**: Cruisers, Sports, Adventure, Electric, and Scooters.
- **Popular Locations**: Hub location tags with live bike counts.
- **How It Works**: 3-step rental journey explanation.
- **Customer Reviews**: Testimonials card carousel.

### 2. 🔍 Instant Search & Multi-Filter Catalog (`/bikes`)
- **Instant Search**: Filter by bike model, brand, or category in real-time without page reload.
- **Multi-Attribute Filters**:
  - Brand selection (Royal Enfield, Ducati, BMW, Ather, KTM, Triumph, Yamaha, Honda, Kawasaki, Harley-Davidson)
  - Category selector
  - Max Hourly Rate slider (₹50 to ₹500/hr)
  - Minimum Star Rating filter
  - Available-only toggle
  - Sorting: Price Low to High, Price High to Low, Highest Rating, Newest Arrivals

### 3. 🏍️ Comprehensive Bike Details Page (`/bikes/[id]`)
- **Image Gallery**: Large image preview with thumbnail navigation.
- **Full Specifications**: Engine, Mileage/Range, Top Speed, Fuel Type, Weight, Transmission.
- **Interactive Price Calculator**: Test various durations on the fly with instant cost estimates.
- **Verified Host Info**: Owner profile card with contact buttons.
- **Bonus Actions**: Favorite heart toggle and Share link to clipboard with Toast feedback.

### 4. 💳 Smart Booking & Pricing Engine (`/bikes/[id]/book`)
- **React Hook Form + Zod**: Strict client & server-side validation.
- **Hourly & Daily Math Calculation**:
  - Automatically derives exact hours and days between pickup and return timestamps.
  - Supports **Custom Tiered Rates** (e.g. First 2 hours @ ₹200/hr, remaining @ ₹150/hr).
  - Automatically picks optimal daily rates for multi-day rentals.
- **Itemized Financial Summary**:
  - Base Rent
  - Platform Fee (₹50)
  - GST (18%)
  - Refundable Security Deposit (₹2000)
  - Grand Total Payable

### 5. 📄 Booking Confirmation & PDF Receipts (`/booking-success/[bookingId]`)
- **Confetti Celebration**: Visual reward animation upon booking confirmation.
- **Print Receipt**: Built-in CSS print styling for physical printouts.
- **Download PDF Receipt**: Powered by `jspdf` to export clean PDF invoices.

### 6. 👤 Owner Dashboard (`/owner`)
- **Fleet Management**: Add, Edit, or Delete bike listings.
- **Availability Toggle**: Mark bikes as Available or Unavailable instantly.
- **Received Bookings**: View incoming customer reservations.

### 7. 📊 Admin Portal (`/admin`)
- **Real-Time Analytics**: Total Revenue, Total Bikes, Total Bookings, Available Count, Booked Count.
- **Visual Graphs**: Monthly revenue growth chart & category distribution bar charts.
- **Transaction Logs**: Recent booking activity table.

### 8. 🎁 Bonus Features
- **Saved Favorites**: Persistent favorite bikes stored in `localStorage`.
- **Recently Viewed**: Tracks recently browsed bikes.
- **Dark Mode Toggle**: Sleek dark mode styling.
- **Toast Notifications**: Built-in Toast notification system.

---

## 📁 File & Folder Structure

```
BoR/
├── app/
│   ├── admin/
│   │   └── page.tsx           # Admin analytics dashboard
│   ├── bikes/
│   │   ├── [id]/
│   │   │   ├── book/
│   │   │   │   └── page.tsx   # Dedicated booking page
│   │   │   └── page.tsx       # Bike details page
│   │   └── page.tsx           # Catalog with search & filter sidebar
│   ├── booking-success/
│   │   └── [bookingId]/
│   │       └── page.tsx       # Booking confirmation & receipt page
│   ├── bookings/
│   │   └── page.tsx           # Renter booking history & cancellation
│   ├── owner/
│   │   └── page.tsx           # Owner CRUD & availability dashboard
│   ├── favicon.ico
│   ├── globals.css            # Custom CSS & print styles
│   ├── layout.tsx             # Root layout with providers
│   └── page.tsx               # Home landing page
├── components/
│   ├── AvailabilityBadge.tsx
│   ├── BikeCard.tsx
│   ├── BookingForm.tsx
│   ├── BookingSummary.tsx
│   ├── DetailActions.tsx
│   ├── FilterSidebar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── OwnerCard.tsx
│   ├── PriceCalculator.tsx
│   ├── Rating.tsx
│   ├── SearchBar.tsx
│   └── SuccessModal.tsx
├── context/
│   ├── FavoritesContext.tsx
│   ├── ThemeContext.tsx
│   └── ToastContext.tsx
├── data/
│   ├── bikes.json             # 10 sample bikes
│   ├── bookings.json          # Sample booking records
│   └── users.json            # Owner & Admin profiles
├── lib/
│   ├── actions.ts             # Next.js Server Actions
│   └── db.ts                  # fs/promises JSON reader & writer
├── types/
│   └── index.ts               # TypeScript interfaces
├── utils/
│   └── pricing.ts             # Pricing math & currency utilities
├── public/
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.17.0 or higher
- **npm**: v9.0.0 or higher

### 2. Installation
Dependencies are already installed. If running on a new machine:
```bash
npm install
```

### 3. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Data Management (JSON File System)

No database configuration or credentials are required. 
All data modifications triggered by the user or owner are executed on the server via Next.js Server Actions (`lib/actions.ts`), which update `/data/bikes.json` and `/data/bookings.json` using Node.js `fs/promises`.

---

## 🛡️ License

Built with ❤️ for motorcycle & urban mobility enthusiasts.
