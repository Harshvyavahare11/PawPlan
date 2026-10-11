import React, { useState } from 'react';
import { X, Calendar, Clock, User, MapPin, PawPrint } from 'lucide-react';
import { PUNE_PARKS } from '../../data/mockData';

export default function AddWalkModal({
  isOpen,
  onClose,
  pets,
  familyMembers,
  onAddWalk
}) {
  const [day, setDay] = useState('Monday');
  const [slot, setSlot] = useState('Morning');
  const [time, setTime] = useState('06:45 AM');
  const [petId, setPetId] = useState(pets[0]?.id || '');
  const [walkerId, setWalkerId] = useState(familyMembers[0]?.id || '');
  const [parkName, setParkName] = useState(PUNE_PARKS[0]?.name || 'Empress Botanical Garden');
  const [targetMins, setTargetMins] = useState(30);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedPet = pets.find(p => p.id === petId) || pets[0];
    const selectedWalker = familyMembers.find(f => f.id === walkerId) || familyMembers[0];

    const newWalk = {
      id: `walk-${Date.now()}`,
      day,
      date: '2026-10-15',
      slot,
      time,
      petId: selectedPet.id,
      petName: selectedPet.name,
      walkerId: selectedWalker.id,
      walkerName: selectedWalker.name,
      parkName,
      targetMins: Number(targetMins),
      status: 'Scheduled',
      actualMins: null,
      distanceKm: null,
      pointsEarned: 0
    };

    onAddWalk(newWalk);
    onClose();
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-xl text-stone-900">
              Schedule New Walk
            </h3>
            <p className="text-xs text-stone-500">Plan a balanced walking session for Pune</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Day & Slot */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Day of Week</label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              >
                {daysOfWeek.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Time Slot</label>
              <select
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              >
                <option value="Morning">Morning (06:00 - 08:30 AM)</option>
                <option value="Afternoon">Afternoon (Shaded Only)</option>
                <option value="Evening">Evening (05:30 - 07:30 PM)</option>
                <option value="Night">Night Stroll (Post 08:30 PM)</option>
              </select>
            </div>
          </div>

          {/* Time & Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Scheduled Time</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 06:45 AM"
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Target Duration (Mins)</label>
              <input
                type="number"
                min="10"
                max="120"
                value={targetMins}
                onChange={(e) => setTargetMins(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                required
              />
            </div>
          </div>

          {/* Pet & Walker selection */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Pet</label>
              <select
                value={petId}
                onChange={(e) => setPetId(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              >
                {pets.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} ({p.breed})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Assigned Walker</label>
              <select
                value={walkerId}
                onChange={(e) => setWalkerId(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              >
                {familyMembers.map((m) => (
                  <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Destination Park */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Destination Park / Trail</label>
            <select
              value={parkName}
              onChange={(e) => setParkName(e.target.value)}
              className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
            >
              {PUNE_PARKS.map((park) => (
                <option key={park.id} value={park.name}>
                  {park.name} ({park.locality})
                </option>
              ))}
              <option value="Koregaon Park Riverfront">Koregaon Park Riverfront</option>
              <option value="Neighborhood Street Trail">Neighborhood Street Trail</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
            >
              Add to Schedule
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
