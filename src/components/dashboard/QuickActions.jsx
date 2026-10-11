import React from 'react';
import {
  Play,
  CalendarCheck2,
  Compass,
  Users2,
  Sparkles,
  ShieldCheck,
  ThermometerSun
} from 'lucide-react';

export default function QuickActions({
  onStartWalk,
  onOpenPlanner,
  onOpenExplore,
  onOpenCommunity,
  onOpenAiModal,
  onOpenSafetyModal
}) {
  const actions = [
    {
      title: 'Start Live Walk',
      desc: 'GPS track route & earn green paws',
      icon: Play,
      color: 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-md shadow-emerald-800/20',
      iconBg: 'bg-white/20 text-white',
      onClick: onStartWalk
    },
    {
      title: '7-Day Planner',
      desc: 'Balance walks across family members',
      icon: CalendarCheck2,
      color: 'bg-stone-50 border border-stone-200/80 text-stone-800 hover:bg-stone-100/90',
      iconBg: 'bg-emerald-100 text-emerald-800',
      onClick: onOpenPlanner
    },
    {
      title: 'Explore Parks',
      desc: 'Dog trails & pet cafes in Pune',
      icon: Compass,
      color: 'bg-stone-50 border border-stone-200/80 text-stone-800 hover:bg-stone-100/90',
      iconBg: 'bg-teal-100 text-teal-800',
      onClick: onOpenExplore
    },
    {
      title: 'Pune Pet Network',
      desc: 'Discover nearby dog companions',
      icon: Users2,
      color: 'bg-stone-50 border border-stone-200/80 text-stone-800 hover:bg-stone-100/90',
      iconBg: 'bg-indigo-100 text-indigo-800',
      onClick: onOpenCommunity
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-extrabold text-lg text-stone-900">
          Quick Actions
        </h3>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
          Fast Access
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <button
              key={idx}
              onClick={act.onClick}
              className={`p-4 rounded-2xl text-left transition-all group flex items-start gap-3.5 cursor-pointer ${act.color}`}
            >
              <div className={`p-2.5 rounded-xl shrink-0 group-hover:scale-105 transition-transform ${act.iconBg}`}>
                <Icon className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="font-bold text-sm tracking-tight">{act.title}</div>
                <div className={`text-xs mt-0.5 line-clamp-1 ${act.title === 'Start Live Walk' ? 'text-emerald-100' : 'text-stone-500'}`}>
                  {act.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
