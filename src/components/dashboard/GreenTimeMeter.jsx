import React from 'react';
import { Smartphone, Trees, Flame, Award, ArrowUpRight, Sparkles, Sun } from 'lucide-react';

export default function GreenTimeMeter({
  greenMinutes = 70,
  dailyGreenGoal = 60,
  screenMinutes = 265, // ~4h 25m
  streakDays = 5,
  pawsEarned = 165
}) {
  const goalPercentage = Math.min(Math.round((greenMinutes / dailyGreenGoal) * 100), 100);
  const screenHours = (screenMinutes / 60).toFixed(1);
  const greenHours = (greenMinutes / 60).toFixed(1);

  return (
    <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-950/20 relative overflow-hidden">
      {/* Decorative backdrop shapes */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-teal-400/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10">
        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-emerald-100">
            <Trees className="w-3.5 h-3.5 text-emerald-300" />
            <span>Outdoor Wellbeing Ratio</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{streakDays} Day Streak 🔥</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 text-xs font-bold">
              <Award className="w-3.5 h-3.5 text-emerald-300" />
              <span>{pawsEarned} Paws Earned</span>
            </span>
          </div>
        </div>

        {/* Hero Section: Screen Time vs Green Time */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-7 space-y-4">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
              From Screen Time <br />
              <span className="text-emerald-300 underline decoration-emerald-400/40 decoration-wavy">
                To Green Time.
              </span>
            </h2>
            <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed max-w-xl">
              Trading phone scrolling for nature trails in Pune. You’ve converted <strong className="text-white font-semibold">{greenMinutes} outdoor minutes</strong> today for your furry companion!
            </p>

            {/* Screen vs Green Comparative Pills */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-300">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-emerald-200/70 uppercase tracking-wider">Screen Time</div>
                  <div className="text-lg font-bold text-white font-heading">{screenHours} hrs</div>
                  <div className="text-[10px] text-rose-300">Target reduction: -25%</div>
                </div>
              </div>

              <div className="bg-emerald-400/15 backdrop-blur-sm rounded-2xl p-3.5 border border-emerald-300/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/20 border border-emerald-300/40 flex items-center justify-center text-emerald-300">
                  <Trees className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-emerald-200 uppercase tracking-wider">Green Time</div>
                  <div className="text-lg font-bold text-emerald-200 font-heading">{greenMinutes} mins</div>
                  <div className="text-[10px] text-emerald-300 font-semibold">{goalPercentage}% of Daily Goal</div>
                </div>
              </div>
            </div>
          </div>

          {/* Goal Ring & Progress Bar */}
          <div className="md:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">Daily Target</span>
              <span className="text-xs font-extrabold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                {greenMinutes} / {dailyGreenGoal} Mins
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white/10 rounded-full h-4 p-0.5 overflow-hidden mb-3">
              <div
                className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 h-full rounded-full transition-all duration-700 ease-out shadow-sm"
                style={{ width: `${goalPercentage}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-xs text-emerald-100/90 mb-4">
              <span>Goal: 60m Outdoor</span>
              <span className="font-bold text-white">{goalPercentage}% Complete</span>
            </div>

            {/* Weather prompt */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-emerald-100/80">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-300 animate-spin-slow" />
                <span>Pune: <strong>27°C</strong> Pleasant Evening</span>
              </div>
              <span className="text-[11px] font-semibold text-amber-200">Ideal for grass walk</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
