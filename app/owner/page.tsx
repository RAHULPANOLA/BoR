'use client';

import React, { useState } from 'react';
import { Bike } from '@/types';
import { useData } from '@/context/DataContext';
import { formatCurrency } from '@/utils/pricing';
import { AvailabilityBadge } from '@/components/AvailabilityBadge';
import { useToast } from '@/context/ToastContext';
import { Plus, Edit3, Trash2, Power, Layers, Bike as BikeIcon, X, Loader2 } from 'lucide-react';

export default function OwnerDashboardPage() {
  const { showToast } = useToast();
  const {
    bikes,
    bookings,
    loading,
    createBike,
    updateBike,
    deleteBike,
    toggleBikeAvailability,
  } = useData();

  const [activeTab, setActiveTab] = useState<'bikes' | 'bookings'>('bikes');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBike, setEditingBike] = useState<Bike | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    category: 'Cruiser' as Bike['category'],
    hourlyPrice: 150,
    dailyPrice: 1200,
    location: 'Indiranagar, Bangalore',
    description: '',
    image1: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200',
    image2: '',
    engine: '350cc Single Cylinder',
    mileage: '35 kmpl',
    topSpeed: '120 km/h',
    fuelType: 'Petrol' as Bike['specs']['fuelType'],
    weight: '180 kg',
    transmission: 'Manual' as Bike['specs']['transmission'],
    ownerName: 'Rajesh Kumar',
    ownerPhone: '+91 98765 43210',
    ownerEmail: 'rajesh.bikes@bikerent.in',
  });

  const openAddModal = () => {
    setEditingBike(null);
    setFormData({
      brand: '',
      model: '',
      category: 'Cruiser',
      hourlyPrice: 150,
      dailyPrice: 1200,
      location: 'Indiranagar, Bangalore',
      description: '',
      image1: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200',
      image2: '',
      engine: '350cc Single Cylinder',
      mileage: '35 kmpl',
      topSpeed: '120 km/h',
      fuelType: 'Petrol',
      weight: '180 kg',
      transmission: 'Manual',
      ownerName: 'Rajesh Kumar',
      ownerPhone: '+91 98765 43210',
      ownerEmail: 'rajesh.bikes@bikerent.in',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (bike: Bike) => {
    setEditingBike(bike);
    setFormData({
      brand: bike.brand,
      model: bike.model,
      category: bike.category,
      hourlyPrice: bike.hourlyPrice,
      dailyPrice: bike.dailyPrice,
      location: bike.location,
      description: bike.description,
      image1: bike.images[0] || '',
      image2: bike.images[1] || '',
      engine: bike.specs.engine,
      mileage: bike.specs.mileage,
      topSpeed: bike.specs.topSpeed,
      fuelType: bike.specs.fuelType,
      weight: bike.specs.weight,
      transmission: bike.specs.transmission,
      ownerName: bike.ownerInfo.name,
      ownerPhone: bike.ownerInfo.phone,
      ownerEmail: bike.ownerInfo.email,
    });
    setIsModalOpen(true);
  };

  const handleToggleAvailability = (id: string) => {
    const updated = toggleBikeAvailability(id);
    if (updated) {
      showToast(`Updated status to ${updated.isAvailable ? 'Available' : 'Unavailable'}`, 'success');
    }
  };

  const handleDeleteBike = (id: string) => {
    if (!confirm('Are you sure you want to delete this bike listing from Local Storage?')) return;
    const success = deleteBike(id);
    if (success) {
      showToast('Bike deleted from local storage', 'info');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const bikePayload = {
        brand: formData.brand,
        model: formData.model,
        category: formData.category,
        hourlyPrice: Number(formData.hourlyPrice),
        dailyPrice: Number(formData.dailyPrice),
        images: [formData.image1, formData.image2].filter(Boolean),
        specs: {
          engine: formData.engine,
          mileage: formData.mileage,
          topSpeed: formData.topSpeed,
          fuelType: formData.fuelType,
          weight: formData.weight,
          transmission: formData.transmission,
        },
        description: formData.description,
        location: formData.location,
        rating: editingBike ? editingBike.rating : 4.9,
        reviewCount: editingBike ? editingBike.reviewCount : 1,
        isAvailable: editingBike ? editingBike.isAvailable : true,
        ownerInfo: {
          name: formData.ownerName,
          phone: formData.ownerPhone,
          email: formData.ownerEmail,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
          rating: 4.9,
          location: formData.location.split(',')[0],
        },
      };

      if (editingBike) {
        updateBike(editingBike.id, bikePayload);
        showToast('Bike updated in Local Storage!', 'success');
      } else {
        createBike(bikePayload);
        showToast('New bike listed in Local Storage!', 'success');
      }

      setIsModalOpen(false);
    } catch (err: any) {
      showToast(err.message || 'Operation failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest block mb-1">
            Browser Local Storage Panel
          </span>
          <h1 className="text-3xl font-black text-slate-100">Owner Dashboard</h1>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Bike Listing</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 text-xs font-bold">
        <button
          onClick={() => setActiveTab('bikes')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 transition-all cursor-pointer ${
            activeTab === 'bikes'
              ? 'border-emerald-400 text-emerald-400 font-extrabold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BikeIcon className="w-4 h-4" />
          <span>My Bike Fleet ({bikes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 transition-all cursor-pointer ${
            activeTab === 'bookings'
              ? 'border-emerald-400 text-emerald-400 font-extrabold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Received Bookings ({bookings.length})</span>
        </button>
      </div>

      {/* Fleet Table / List */}
      {activeTab === 'bikes' && (
        <div className="space-y-4">
          {loading ? (
            <div className="h-64 rounded-3xl bg-slate-900/40 border border-slate-800 animate-pulse" />
          ) : (
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Bike Details</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Rates</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {bikes.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={b.images[0]}
                              alt={b.model}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                            />
                            <div>
                              <p className="font-bold text-slate-100">{b.brand} {b.model}</p>
                              <p className="text-[11px] text-slate-500">ID: {b.id}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-semibold border border-slate-700">
                            {b.category}
                          </span>
                        </td>

                        <td className="px-6 py-4 font-semibold text-slate-200">
                          <p>{formatCurrency(b.hourlyPrice)} / hr</p>
                          <p className="text-emerald-400 text-[11px]">{formatCurrency(b.dailyPrice)} / day</p>
                        </td>

                        <td className="px-6 py-4 text-slate-400">{b.location}</td>

                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleToggleAvailability(b.id)}
                            className="cursor-pointer"
                            title="Click to toggle availability"
                          >
                            <AvailabilityBadge isAvailable={b.isAvailable} />
                          </button>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleToggleAvailability(b.id)}
                              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                              title="Toggle Availability"
                            >
                              <Power className={`w-3.5 h-3.5 ${b.isAvailable ? 'text-emerald-400' : 'text-slate-500'}`} />
                            </button>

                            <button
                              onClick={() => openEditModal(b)}
                              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors cursor-pointer"
                              title="Edit Bike"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteBike(b.id)}
                              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                              title="Delete Bike"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Received Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Booking Ref</th>
                    <th className="px-6 py-4">Bike</th>
                    <th className="px-6 py-4">Renter Info</th>
                    <th className="px-6 py-4">Schedule</th>
                    <th className="px-6 py-4">Total Amount</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {bookings.map((bk) => (
                    <tr key={bk.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-emerald-400">{bk.id}</td>
                      <td className="px-6 py-4 font-bold text-slate-100">
                        {bk.bikeSummary.brand} {bk.bikeSummary.model}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-200">{bk.userDetails.name}</p>
                        <p className="text-[11px] text-slate-500">{bk.userDetails.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-300">{bk.pickupDate} ({bk.pickupTime})</p>
                        <p className="text-[11px] text-slate-500">to {bk.returnDate} ({bk.returnTime})</p>
                      </td>
                      <td className="px-6 py-4 font-extrabold text-emerald-400">
                        {formatCurrency(bk.pricingBreakdown.grandTotal)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold uppercase text-[10px]">
                          {bk.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Add / Edit Bike */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-black text-slate-100">
                {editingBike ? 'Edit Bike Details' : 'Add New Bike Listing'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-300 uppercase mb-1 block">Brand</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Enfield"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 uppercase mb-1 block">Model</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hunter 350"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-slate-300 uppercase mb-1 block">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Cruiser">Cruiser</option>
                    <option value="Sports">Sports</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Electric">Electric</option>
                    <option value="Scooter">Scooter</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 uppercase mb-1 block">Hourly Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.hourlyPrice}
                    onChange={(e) => setFormData({ ...formData, hourlyPrice: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 uppercase mb-1 block">Daily Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.dailyPrice}
                    onChange={(e) => setFormData({ ...formData, dailyPrice: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase mb-1 block">Pickup Hub Location</label>
                <input
                  type="text"
                  required
                  placeholder="Indiranagar, Bangalore"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase mb-1 block">Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.image1}
                  onChange={(e) => setFormData({ ...formData, image1: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase mb-1 block">Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black cursor-pointer"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{editingBike ? 'Save Changes' : 'Create Listing'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
