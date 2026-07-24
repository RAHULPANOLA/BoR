import React from 'react';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { BikeCard } from '@/components/BikeCard';
import { fetchBikesAction } from '@/lib/actions';
import {
  Bike as BikeIcon,
  ShieldCheck,
  Zap,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
  Compass,
} from 'lucide-react';

export default async function HomePage() {
  const bikes = await fetchBikesAction();
  const featuredBikes = bikes.slice(0, 6);

  const categories = [
    { name: 'Cruiser', count: 'Royal Enfield & Harleys', icon: '🏍️', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=600' },
    { name: 'Sports', count: 'Ducati & Ninja Supersports', icon: '⚡', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=600' },
    { name: 'Adventure', count: 'BMW GS Tourers', icon: '⛰️', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600' },
    { name: 'Electric', count: 'Ather & EV Scooters', icon: '🔌', image: 'https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?q=80&w=600' },
    { name: 'Scooter', count: 'Honda Activa & Gearless', icon: '🛵', image: 'https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?q=80&w=600' },
  ];

  const popularLocations = [
    { name: 'Indiranagar', bikes: 24, address: '100 Feet Rd Hub, Bangalore' },
    { name: 'Koramangala', bikes: 19, address: '5th Block Metro Hub, Bangalore' },
    { name: 'HSR Layout', bikes: 31, address: '27th Main Rd Hub, Bangalore' },
    { name: 'Whitefield', bikes: 15, address: 'ITPL Main Rd Hub, Bangalore' },
  ];

  const reviews = [
    {
      name: 'Rohan Sharma',
      role: 'Tech Lead at Swiggy',
      review: 'Rented the Royal Enfield Hunter 350 for a weekend ride to Nandi Hills. Booking took 30 seconds, bike was spotless, and pricing was completely transparent.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150',
    },
    {
      name: 'Ananya Verma',
      role: 'Product Designer',
      review: 'Ather 450X EV rental was a lifesaver during Bangalore tech summit week. Fast charging included and zero hassle!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150',
    },
    {
      name: 'Karan Patel',
      role: 'Motorcycle Traveler',
      review: 'Took the BMW R 1250 GS for a 3-day Western Ghats tour. Immaculate condition and awesome owner support. 10/10 recommendation!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <Hero />

      {/* Featured Bikes Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest block mb-1">
              Popular Rides
            </span>
            <h2 className="text-3xl font-black text-slate-100">Featured Fleet</h2>
          </div>
          <Link
            href="/bikes"
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>View All Bikes ({bikes.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest block mb-1">
            Tailored For Every Rider
          </span>
          <h2 className="text-3xl font-black text-slate-100">Explore By Category</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/bikes?category=${cat.name}`}
              className="group relative rounded-3xl p-5 bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-800/80 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-900/40 border-y border-slate-800/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest block mb-1">
              Seamless 3-Step Process
            </span>
            <h2 className="text-3xl font-black text-slate-100">How BikeRent Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-xl font-black">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-100">Choose Your Bike</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Filter by hourly/daily budget, brand, location, or rider preference.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto text-xl font-black">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-100">Set Dates & Instant Book</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Select your pickup & return time. Transparent pricing breakdown with zero hidden fees.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mx-auto text-xl font-black">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-100">Pick Up & Enjoy Ride</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Show digital receipt at nearest hub. Complimentary helmets & roadside assistance included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Locations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold text-teal-400 uppercase tracking-widest block mb-1">
              Pickup Hubs
            </span>
            <h2 className="text-3xl font-black text-slate-100">Popular Locations</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularLocations.map((loc) => (
            <Link
              key={loc.name}
              href={`/bikes?location=${encodeURIComponent(loc.name + ', Bangalore')}`}
              className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all flex items-center justify-between group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-100 font-bold group-hover:text-emerald-400 transition-colors">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{loc.name}</span>
                </div>
                <p className="text-[11px] text-slate-400">{loc.address}</p>
              </div>
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-800 text-emerald-400">
                {loc.bikes} Rides
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest block mb-1">
            Community Love
          </span>
          <h2 className="text-3xl font-black text-slate-100">What Our Riders Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">&ldquo;{rev.review}&rdquo;</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <img src={rev.avatar} alt={rev.name} className="w-10 h-10 rounded-full object-cover border border-emerald-500/40" />
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{rev.name}</h4>
                  <p className="text-[11px] text-slate-400">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
