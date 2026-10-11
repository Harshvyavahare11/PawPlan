import React, { useState } from 'react';
import {
  CalendarDays,
  Plus,
  Sparkles,
  Clock,
  User,
  MapPin,
  CheckCircle2,
  Play,
  Trash2,
  Filter,
  Check,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import AddWalkModal from './AddWalkModal';
import AutoBalanceModal from './AutoBalanceModal';

export default function WeeklyPlannerView({
  schedule,
  pets,
  familyMembers,
  onAddWalk,
  onDeleteWalk,
  onMarkComplete,
  onStartWalk,
  onApplyBalancedSchedule
}) {
  const [selectedDayFilter, setSelectedDayFilter] = useState('All');
  const [selectedWalkerFilter, setSelectedWalkerFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAutoBalanceModalOpen, setIsAutoBalanceModalOpen] = useState(false);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Filter schedule
  const filteredSchedule = schedule.filter(item => {
    const dayMatch = selectedDayFilter === 'All' || item.day === selectedDayFilter;
    const walkerMatch = selectedWalkerFilter === 'All' || item.walkerId === selectedWalkerFilter;
    return dayMatch && walkerMatch;
  });

  // Calculate weekly metrics
  const totalPlannedMins = schedule.reduce((sum, s) => sum + (s.targetMins || 0), 0);
  const completedCount = schedule.filter(s => s.status === 'Completed').length;
  const completionRate = schedule.length > 0 ? Math.round((completedCount / schedule.length) * 100) : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* Top Banner & Action Buttons */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full w-fit mb-2 border border-emerald-200/60">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Household Care Coordination • Pune</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-stone-900">
            Weekly 7-Day Walk Planner
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
            Distribute outdoor walking responsibilities fairly across family members, match morning and evening slots with Pune parks, and keep your dog active.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={() => setIsAutoBalanceModalOpen(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 hover:bg-teal-100 text-xs sm:text-sm font-bold shadow-2xs transition-colors"
          >
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Auto-Balance Week</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Walk</span>
          </button>
        </div>
      </div>

      {/* Weekly Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="text-xs font-semibold text-stone-500">Total Planned Walks</div>
          <div className="text-xl sm:text-2xl font-extrabold text-stone-900 font-heading mt-0.5">
            {schedule.length} walks
          </div>
          <div className="text-[11px] text-stone-400 mt-0.5">{totalPlannedMins} mins outdoor</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="text-xs font-semibold text-stone-500">Completed So Far</div>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 font-heading mt-0.5">
            {completedCount} of {schedule.length}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">{completionRate}% execution rate</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="text-xs font-semibold text-stone-500">Active Walkers</div>
          <div className="text-xl sm:text-2xl font-extrabold text-stone-900 font-heading mt-0.5">
            {familyMembers.length} Family Members
          </div>
          <div className="text-[11px] text-stone-400 mt-0.5">Shared pet care load</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="text-xs font-semibold text-stone-500">Green Points</div>
          <div className="text-xl sm:text-2xl font-extrabold text-amber-600 font-heading mt-0.5">
            {schedule.filter(s => s.status === 'Completed').reduce((sum, s) => sum + (s.pointsEarned || 0), 0)} pts
          </div>
          <div className="text-[11px] text-amber-700 font-medium mt-0.5">Screen time offset</div>
        </div>
      </div>

      {/* Filters: By Day & By Walker */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Day Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
          <button
            onClick={() => setSelectedDayFilter('All')}
            className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all ${
              selectedDayFilter === 'All'
                ? 'bg-emerald-800 text-white shadow-2xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All Week
          </button>
          {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDayFilter(day)}
              className={`px-3 py-1.5 rounded-xl font-semibold shrink-0 transition-all ${
                selectedDayFilter === day
                  ? 'bg-emerald-800 text-white shadow-2xs font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>

        {/* Walker dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-xs font-bold text-stone-600">Walker:</span>
          <select
            value={selectedWalkerFilter}
            onChange={(e) => setSelectedWalkerFilter(e.target.value)}
            className="text-xs font-semibold p-1.5 rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden"
          >
            <option value="All">All Household Members</option>
            {familyMembers.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Walk Schedule Cards Grid */}
      {filteredSchedule.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
          <CalendarDays className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h4 className="font-heading font-extrabold text-base text-stone-700">No walks scheduled for this filter</h4>
          <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
            Click "Schedule Walk" or use "Auto-Balance Week" to instantly generate slots.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSchedule.map((walk) => {
            const isCompleted = walk.status === 'Completed';

            return (
              <div
                key={walk.id}
                className={`rounded-3xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-emerald-50/40 border-emerald-200/80'
                    : 'bg-white border-stone-200/90 hover:border-emerald-300 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Badge: Day, Slot, and Status */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="font-heading font-extrabold text-stone-900 text-sm">
                        {walk.day}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        walk.slot === 'Morning'
                          ? 'bg-amber-100 text-amber-900'
                          : walk.slot === 'Evening'
                          ? 'bg-indigo-100 text-indigo-900'
                          : 'bg-stone-100 text-stone-700'
                      }`}>
                        {walk.slot}
                      </span>
                    </div>

                    <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      isCompleted
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-stone-100 text-stone-600'
                    }`}>
                      {isCompleted ? <Check className="w-3 h-3 text-emerald-800" /> : null}
                      {walk.status}
                    </span>
                  </div>

                  {/* Time & Duration */}
                  <div className="flex items-center gap-3 text-xs text-stone-600 font-semibold mb-3">
                    <span className="flex items-center gap-1 text-stone-800 font-bold">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      {walk.time}
                    </span>
                    <span>•</span>
                    <span className="text-stone-500">
                      Target: {walk.targetMins} mins
                    </span>
                  </div>

                  {/* Pet & Walker details */}
                  <div className="space-y-1.5 py-3 border-t border-b border-stone-100 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Pet Companion:</span>
                      <span className="font-bold text-stone-800">{walk.petName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Walker:</span>
                      <span className="font-bold text-emerald-900 flex items-center gap-1">
                        <User className="w-3 h-3 text-emerald-700" />
                        {walk.walkerName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Destination:</span>
                      <span className="font-medium text-stone-700 flex items-center gap-1 truncate max-w-[170px]" title={walk.parkName}>
                        <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                        {walk.parkName}
                      </span>
                    </div>
                  </div>

                  {/* Completed walk details if any */}
                  {isCompleted && walk.actualMins && (
                    <div className="mt-2.5 p-2 rounded-xl bg-emerald-100/60 text-emerald-900 text-[11px] font-semibold flex items-center justify-between">
                      <span>Walked: {walk.actualMins} mins ({walk.distanceKm || '2.0'} km)</span>
                      <span className="text-amber-800 font-bold">+{walk.pointsEarned || 40} pts</span>
                    </div>
                  )}
                </div>

                {/* Footer Action buttons */}
                <div className="mt-4 pt-3 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onDeleteWalk(walk.id)}
                    title="Remove slot"
                    className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    {!isCompleted ? (
                      <>
                        <button
                          onClick={() => onMarkComplete(walk.id)}
                          className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-emerald-100 hover:text-emerald-900 text-stone-700 text-xs font-bold transition-colors"
                        >
                          Mark Done
                        </button>
                        <button
                          onClick={() => onStartWalk(walk)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Track</span>
                        </button>
                      </>
                    ) : (
                      <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Completed
                      </span>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      <AddWalkModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        pets={pets}
        familyMembers={familyMembers}
        onAddWalk={onAddWalk}
      />

      <AutoBalanceModal
        isOpen={isAutoBalanceModalOpen}
        onClose={() => setIsAutoBalanceModalOpen(false)}
        familyMembers={familyMembers}
        pets={pets}
        schedule={schedule}
        onApplyBalancedSchedule={onApplyBalancedSchedule}
      />

    </div>
  );
}
