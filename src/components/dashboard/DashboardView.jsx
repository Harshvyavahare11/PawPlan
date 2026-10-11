import React from 'react';
import GreenTimeMeter from './GreenTimeMeter';
import TodayActivityCard from './TodayActivityCard';
import UpcomingWalks from './UpcomingWalks';
import QuickActions from './QuickActions';
import { PUNE_WEATHER_SUMMARY } from '../../data/mockData';
import { SunMedium, ShieldAlert, Sparkles, AlertCircle, HeartHandshake } from 'lucide-react';

export default function DashboardView({
  pets,
  activePetId,
  setActivePetId,
  schedule,
  familyMembers,
  walkHistory,
  onStartWalk,
  onMarkComplete,
  onNavigateTab,
  onOpenAiModal,
  onOpenSafetyModal
}) {
  // Aggregate today's walk metrics
  const todayWalks = schedule.filter(s => s.day === 'Monday' || s.date === '2026-10-12');
  const completedToday = todayWalks.filter(w => w.status === 'Completed');
  const greenMinutesToday = completedToday.reduce((sum, w) => sum + (w.actualMins || 0), 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* 1. Hero: Screen Time to Green Time Meter */}
      <GreenTimeMeter
        greenMinutes={greenMinutesToday || 70}
        dailyGreenGoal={60}
        screenMinutes={265}
        streakDays={5}
        pawsEarned={210}
      />

      {/* 2. Pune Weather & Walking Conditions Alert */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-950 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
            <SunMedium className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm font-heading">Pune Walking Advisory</span>
              <span className="text-[11px] font-semibold bg-amber-200/70 text-amber-900 px-2 py-0.2 rounded-full">
                {PUNE_WEATHER_SUMMARY.temp} • {PUNE_WEATHER_SUMMARY.condition}
              </span>
            </div>
            <p className="text-xs text-amber-900/80 mt-0.5">
              {PUNE_WEATHER_SUMMARY.dogAdvice} Sunset at {PUNE_WEATHER_SUMMARY.sunsetTime}.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAiModal}
          className="text-xs font-bold text-amber-900 hover:text-amber-950 bg-amber-200/70 hover:bg-amber-200 px-3 py-1.5 rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Ask AI Assistant</span>
        </button>
      </div>

      {/* 3. Active Pet Overview & Upcoming Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 xl:col-span-5">
          <TodayActivityCard
            pets={pets}
            activePetId={activePetId}
            setActivePetId={setActivePetId}
            todayWalks={schedule}
            onStartWalk={() => onStartWalk(null)}
          />
        </div>

        <div className="lg:col-span-6 xl:col-span-7">
          <UpcomingWalks
            schedule={schedule}
            onStartWalk={onStartWalk}
            onMarkComplete={onMarkComplete}
            onViewAllPlanner={() => onNavigateTab('planner')}
          />
        </div>
      </div>

      {/* 4. Quick Actions */}
      <QuickActions
        onStartWalk={() => onStartWalk(null)}
        onOpenPlanner={() => onNavigateTab('planner')}
        onOpenExplore={() => onNavigateTab('explore')}
        onOpenCommunity={() => onNavigateTab('community')}
        onOpenAiModal={onOpenAiModal}
        onOpenSafetyModal={onOpenSafetyModal}
      />

    </div>
  );
}
