import React from 'react';
import {
  PawPrint,
  Compass,
  CalendarDays,
  Activity,
  Users,
  Settings2,
  ShieldCheck,
  Sparkles,
  MapPin,
  Play,
  HeartHandshake
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  onStartWalkClick,
  onOpenAiModal,
  onOpenSafetyModal,
  activeWalkState
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'planner', label: 'Weekly Planner', icon: CalendarDays },
    { id: 'tracker', label: 'Walk Tracker', icon: PawPrint, badge: activeWalkState?.isActive ? 'LIVE' : null },
    { id: 'explore', label: 'Explore Pune', icon: Compass },
    { id: 'community', label: 'Community', icon: Users, badge: 'New' },
    { id: 'setup', label: 'Pet & Family', icon: Settings2 }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
              <PawPrint className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-emerald-950">
                  Paw<span className="text-emerald-600">Plan</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Pune Hub
                </span>
              </div>
              <p className="text-[11px] font-medium text-stone-500 tracking-wide -mt-0.5 hidden xs:block">
                Screen Time <span className="text-emerald-600 font-bold">→</span> Green Time
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-stone-100/80 p-1.5 rounded-2xl border border-stone-200/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-emerald-900 shadow-sm shadow-stone-200 font-bold'
                      : 'text-stone-600 hover:text-emerald-800 hover:bg-stone-200/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-stone-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full uppercase ${
                      item.badge === 'LIVE'
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions (AI, Safety, Live Walk Trigger) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Pet Copilot */}
            <button
              onClick={onOpenAiModal}
              title="AI Outdoor Advice & Schedule Optimizer"
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-2 rounded-xl border border-teal-200 bg-teal-50/70 text-teal-800 hover:bg-teal-100/80 transition-colors shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span className="hidden sm:inline">AI Copilot</span>
            </button>

            {/* Safety & Privacy Shield */}
            <button
              onClick={onOpenSafetyModal}
              title="Privacy & Safety Settings for Pune"
              className="flex items-center gap-1 text-xs font-medium px-2.5 py-2 rounded-xl border border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span className="hidden md:inline text-xs font-semibold">Privacy</span>
            </button>

            {/* Start Live Walk Button */}
            <button
              onClick={onStartWalkClick}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all duration-200 ${
                activeWalkState?.isActive
                  ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20 animate-pulse'
                  : 'bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white shadow-emerald-900/15'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{activeWalkState?.isActive ? 'Walk in Progress' : 'Start Walk'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-1 rounded-xl transition-colors relative min-w-[52px] ${
                isActive ? 'text-emerald-800 font-bold' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-emerald-100/70 text-emerald-800' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5">{item.label.split(' ')[0]}</span>
              {item.badge && (
                <span className="absolute top-0.5 right-1 w-2 h-2 rounded-full bg-emerald-600"></span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
}
