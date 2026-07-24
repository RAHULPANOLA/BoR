'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useFavorites } from '@/context/FavoritesContext';
import { Bike as BikeIcon, Heart, Sun, Moon, Menu, X, Shield, UserCheck, Clock } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore Bikes', href: '/bikes' },
    { name: 'My Bookings', href: '/bookings' },
    { name: 'Owner Panel', href: '/owner', icon: UserCheck },
    { name: 'Admin', href: '/admin', icon: Shield },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-amber-400 text-slate-950 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <BikeIcon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              Bike<span className="text-emerald-400">Rent</span>
            </span>
            <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
              Urban Mobility
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Favorites Button */}
          <Link
            href="/bikes?favorites=true"
            className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-rose-400 hover:border-rose-500/30 transition-all"
            title="View Saved Favorites"
          >
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-slate-950">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/30 transition-all cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 py-5 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 font-black'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
