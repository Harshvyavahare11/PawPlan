import React from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle2, Play, ArrowRight } from 'lucide-react';

export default function UpcomingWalks({
  schedule = [],
  onStartWalk,
  onMarkComplete,
  onViewAllPlanner
}) {
  // Filter scheduled or in-progress walks
  const upcoming = schedule.filter(s => s.status !== 'Completed').slice(0, 3);

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-700" />
            <h3 className="font-heading font-extrabold text-lg text-stone-900">
              Upcoming Walks
            </h3>
          </div>

          <button
            onClick={onViewAllPlanner}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 group"
          >
            <span>Full 7-Day Plan</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {upcoming.length === 0 ? (
          <div className="text-center py-8 text-stone-500">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2 opacity-80" />
            <p className="text-sm font-semibold">All planned walks completed!</p>
            <p className="text-xs text-stone-400 mt-1">Check the 7-day planner to schedule upcoming days.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.map((walk) => (
              <div
                key={walk.id}
                className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center font-bold text-xs shrink-0 ${
                    walk.slot === 'Morning'
                      ? 'bg-amber-100 text-amber-900'
                      : walk.slot === 'Evening'
                      ? 'bg-indigo-100 text-indigo-900'
                      : 'bg-emerald-100 text-emerald-900'
                  }`}>
                    <span>{walk.day.slice(0, 3)}</span>
                    <span className="text-[10px] font-medium">{walk.slot.slice(0, 3)}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-stone-900 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-500" />
                        {walk.time}
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.2 rounded-full bg-stone-200/70 text-stone-700">
                        {walk.targetMins} mins
                      </span>
                      <span className="text-xs font-semibold text-emerald-800">
                        with {walk.petName}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-1.5 text-xs text-stone-600 flex-wrap">
                      <span className="flex items-center gap-1 text-stone-700 font-medium">
                        <User className="w-3 h-3 text-emerald-600" />
                        {walk.walkerName}
                      </span>
                      <span className="flex items-center gap-1 text-stone-500 truncate max-w-[180px]">
                        <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                        {walk.parkName}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200">
                  <button
                    onClick={() => onStartWalk(walk)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Track</span>
                  </button>
                  <button
                    onClick={() => onMarkComplete(walk.id)}
                    title="Mark Done"
                    className="p-1.5 rounded-xl bg-stone-200 hover:bg-emerald-100 hover:text-emerald-800 text-stone-600 text-xs transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
        <span>✨ Family coordination active</span>
        <span className="font-semibold text-emerald-700">Pune local time sync</span>
      </div>
    </div>
  );
}
