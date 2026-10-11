import React from 'react';
import { PawPrint, Heart, Zap, Route, Clock, ChevronRight } from 'lucide-react';

export default function TodayActivityCard({
  pets,
  activePetId,
  setActivePetId,
  todayWalks = [],
  onStartWalk
}) {
  const currentPet = pets.find(p => p.id === activePetId) || pets[0];
  if (!currentPet) return null;

  // Calculate today's stats for current pet
  const completedToday = todayWalks.filter(w => w.status === 'Completed' && w.petId === currentPet.id);
  const totalKm = completedToday.reduce((sum, w) => sum + (w.distanceKm || 0), 0).toFixed(1);
  const totalMins = completedToday.reduce((sum, w) => sum + (w.actualMins || 0), 0);

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow">
      
      {/* Pet Selector tabs if multiple pets */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Active Pet Companion</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        </div>

        {pets.length > 1 && (
          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl">
            {pets.map((pet) => (
              <button
                key={pet.id}
                onClick={() => setActivePetId(pet.id)}
                className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all ${
                  pet.id === currentPet.id
                    ? 'bg-white text-emerald-900 shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {pet.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Pet Info Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pb-6 border-b border-stone-100">
        <div className="relative">
          <img
            src={currentPet.image}
            alt={currentPet.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-emerald-100 shadow-md"
          />
          <span className="absolute -bottom-1.5 -right-1.5 bg-emerald-700 text-white p-1 rounded-full text-xs shadow-xs">
            <PawPrint className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-heading">
              {currentPet.name}
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              {currentPet.breed}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-500 mt-1 line-clamp-1">
            {currentPet.bio}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs font-medium text-stone-600">
            <span className="bg-stone-100 px-2.5 py-1 rounded-lg">🎂 {currentPet.age}</span>
            <span className="bg-stone-100 px-2.5 py-1 rounded-lg">⚖️ {currentPet.weight}</span>
            <span className="bg-amber-50 text-amber-800 border border-amber-200/60 px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold">
              <Zap className="w-3 h-3 text-amber-600" />
              {currentPet.energyLevel} Energy
            </span>
          </div>
        </div>
      </div>

      {/* Today's Metrics grid */}
      <div className="grid grid-cols-3 gap-3 pt-5">
        <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100 text-center">
          <div className="flex items-center justify-center text-emerald-700 mb-1">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-lg font-extrabold text-stone-900 font-heading">{totalMins} m</div>
          <div className="text-[11px] font-medium text-stone-500">Walked Today</div>
        </div>

        <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100 text-center">
          <div className="flex items-center justify-center text-teal-700 mb-1">
            <Route className="w-4 h-4" />
          </div>
          <div className="text-lg font-extrabold text-stone-900 font-heading">{totalKm} km</div>
          <div className="text-[11px] font-medium text-stone-500">Distance</div>
        </div>

        <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100 text-center">
          <div className="flex items-center justify-center text-amber-600 mb-1">
            <Heart className="w-4 h-4 fill-amber-500" />
          </div>
          <div className="text-lg font-extrabold text-stone-900 font-heading">{completedToday.length} / 2</div>
          <div className="text-[11px] font-medium text-stone-500">Walks Done</div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="mt-5 pt-4 flex items-center justify-between">
        <span className="text-xs text-stone-500">
          Daily goal: <strong className="text-stone-800">{currentPet.dailyWalkGoalMins || 60} mins</strong>
        </span>
        <button
          onClick={onStartWalk}
          className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 group"
        >
          <span>Record Walk Now</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

    </div>
  );
}
