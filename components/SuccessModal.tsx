'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import jsPDF from 'jspdf';
import { Booking } from '@/types';
import { formatCurrency } from '@/utils/pricing';
import { CheckCircle2, Printer, Download, ArrowRight, Calendar, Clock, MapPin, ShieldCheck, Bike } from 'lucide-react';

interface SuccessModalProps {
  booking: Booking;
}

export function SuccessModal({ booking }: SuccessModalProps) {
  useEffect(() => {
    // Trigger confetti on render
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.log('Confetti effect unavailable:', e);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();

      doc.setFontSize(20);
      doc.setTextColor(16, 185, 129); // Emerald color
      doc.text('BikeRent - Official Booking Receipt', 20, 20);

      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text(`Booking Reference ID: ${booking.id}`, 20, 28);
      doc.text(`Date of Issued: ${new Date(booking.createdAt).toLocaleDateString()}`, 20, 34);

      doc.setLineWidth(0.5);
      doc.setDrawColor(226, 232, 240);
      doc.line(20, 38, 190, 38);

      // Customer Info
      doc.setFontSize(12);
      doc.setTextColor(15, 23, 42);
      doc.text('Renter Information:', 20, 48);
      doc.setFontSize(10);
      doc.text(`Name: ${booking.userDetails.name}`, 20, 56);
      doc.text(`Email: ${booking.userDetails.email}`, 20, 62);
      doc.text(`Phone: ${booking.userDetails.phone}`, 20, 68);
      doc.text(`License No: ${booking.userDetails.drivingLicenseNo || 'N/A'}`, 20, 74);

      // Bike Info
      doc.setFontSize(12);
      doc.text('Vehicle & Schedule Details:', 20, 86);
      doc.setFontSize(10);
      doc.text(`Bike: ${booking.bikeSummary.brand} ${booking.bikeSummary.model}`, 20, 94);
      doc.text(`Pickup Hub: ${booking.bikeSummary.location}`, 20, 100);
      doc.text(`Pickup: ${booking.pickupDate} at ${booking.pickupTime}`, 20, 106);
      doc.text(`Return: ${booking.returnDate} at ${booking.returnTime}`, 20, 112);
      doc.text(`Duration: ${booking.pricingBreakdown.totalHours} Hours (${booking.pricingBreakdown.totalDays} Days)`, 20, 118);

      // Payment Summary
      doc.line(20, 124, 190, 124);
      doc.setFontSize(12);
      doc.text('Payment Summary:', 20, 134);
      doc.setFontSize(10);
      doc.text(`Base Rent: ${formatCurrency(booking.pricingBreakdown.baseRent)}`, 20, 142);
      doc.text(`Platform Fee: ${formatCurrency(booking.pricingBreakdown.platformFee)}`, 20, 148);
      doc.text(`GST (18%): ${formatCurrency(booking.pricingBreakdown.gst)}`, 20, 154);
      doc.text(`Refundable Security Deposit: ${formatCurrency(booking.pricingBreakdown.securityDeposit)}`, 20, 160);

      doc.setFontSize(14);
      doc.setTextColor(16, 185, 129);
      doc.text(`Grand Total Paid: ${formatCurrency(booking.pricingBreakdown.grandTotal)}`, 20, 172);

      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text('Thank you for riding with BikeRent! Present this receipt at pickup.', 20, 190);

      doc.save(`BikeRent-Receipt-${booking.id}.pdf`);
    } catch (e) {
      console.error('PDF Download Error:', e);
      alert('Generating PDF failed. You can use the Print button to print or save as PDF.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-2xl shadow-2xl space-y-8">
      {/* Top Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-black text-slate-100">Booking Confirmed!</h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Your bike reservation is locked. Show your Booking Reference ID at the pickup hub to collect your helmet & keys.
        </p>
        <span className="inline-block px-4 py-1.5 rounded-full bg-slate-800 text-emerald-400 font-mono text-sm font-bold border border-slate-700">
          ID: {booking.id}
        </span>
      </div>

      {/* Printable Receipt Area */}
      <div id="printable-receipt" className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src={booking.bikeSummary.image}
              alt={booking.bikeSummary.model}
              className="w-16 h-16 rounded-xl object-cover border border-slate-700"
            />
            <div>
              <h3 className="text-lg font-bold text-slate-100">
                {booking.bikeSummary.brand} {booking.bikeSummary.model}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {booking.bikeSummary.location}
              </p>
            </div>
          </div>
          <span className="text-xs font-extrabold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            {booking.status.toUpperCase()}
          </span>
        </div>

        {/* Schedule */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-slate-500 font-semibold uppercase tracking-wider block">Pickup</span>
            <p className="font-bold text-slate-200">{booking.pickupDate}</p>
            <p className="text-emerald-400 font-semibold">{booking.pickupTime}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-slate-500 font-semibold uppercase tracking-wider block">Return</span>
            <p className="font-bold text-slate-200">{booking.returnDate}</p>
            <p className="text-emerald-400 font-semibold">{booking.returnTime}</p>
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
          <div className="flex justify-between">
            <span>Renter Name:</span>
            <span className="font-semibold text-slate-100">{booking.userDetails.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Contact Email:</span>
            <span className="font-semibold text-slate-100">{booking.userDetails.email}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Duration:</span>
            <span className="font-semibold text-slate-100">{booking.pricingBreakdown.totalHours} Hours</span>
          </div>
          <div className="flex justify-between">
            <span>Base Bike Rent:</span>
            <span className="font-semibold text-slate-100">{formatCurrency(booking.pricingBreakdown.baseRent)}</span>
          </div>
          <div className="flex justify-between">
            <span>Platform Fee + GST:</span>
            <span className="font-semibold text-slate-100">
              {formatCurrency(booking.pricingBreakdown.platformFee + booking.pricingBreakdown.gst)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Refundable Deposit:</span>
            <span className="font-semibold text-slate-100">{formatCurrency(booking.pricingBreakdown.securityDeposit)}</span>
          </div>
          <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm">
            <span className="font-bold text-slate-200">Total Paid:</span>
            <span className="text-xl font-black text-emerald-400">{formatCurrency(booking.pricingBreakdown.grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Download Receipt (PDF)</span>
          </button>
        </div>

        <Link
          href="/bikes"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-lg"
        >
          <span>Explore More Bikes</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
