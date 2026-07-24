'use client';

import React from 'react';
import { OwnerInfo } from '@/types';
import { ShieldCheck, Phone, Mail, MapPin, Star } from 'lucide-react';

interface OwnerCardProps {
  owner: OwnerInfo;
}

export function OwnerCard({ owner }: OwnerCardProps) {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <img
          src={owner.avatar}
          alt={owner.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500/40"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-slate-100 truncate">{owner.name}</h4>
            <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              Verified Owner
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              {owner.location}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {owner.rating} Rating
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-800/80 text-xs">
        <a
          href={`tel:${owner.phone}`}
          className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-400" />
          <span>Call Owner</span>
        </a>
        <a
          href={`mailto:${owner.email}`}
          className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors"
        >
          <Mail className="w-3.5 h-3.5 text-amber-400" />
          <span>Email Owner</span>
        </a>
      </div>
    </div>
  );
}
