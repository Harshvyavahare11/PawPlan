import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, RefreshCw, Users, ShieldAlert, ArrowRight } from 'lucide-react';
import { aiService } from '../../services/aiService';

export default function AutoBalanceModal({
  isOpen,
  onClose,
  familyMembers,
  pets,
  schedule,
  onApplyBalancedSchedule
}) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await aiService.balanceSchedule(familyMembers, pets, schedule);
      setPreview(result);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (preview?.schedule) {
      onApplyBalancedSchedule(preview.schedule);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6 text-teal-700" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-xl text-stone-900">
              Smart 7-Day Auto-Balancer
            </h3>
            <p className="text-xs text-stone-500">
              Harmonize dog walking duties across household schedules & Pune trail preferences
            </p>
          </div>
        </div>

        {/* Member availability snapshot */}
        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 mb-5">
          <div className="text-xs font-bold text-stone-700 mb-2.5 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-emerald-700" />
            <span>Household Availability Matrix</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            {familyMembers.map((m) => (
              <div key={m.id} className="bg-white p-2.5 rounded-xl border border-stone-200/80">
                <div className="font-bold text-stone-800 truncate">{m.name}</div>
                <div className="text-[11px] text-stone-500">{m.role}</div>
                <div className="mt-1 flex flex-wrap gap-1 text-[10px] font-semibold">
                  {m.availability?.morning && <span className="bg-amber-100 text-amber-800 px-1.5 rounded">Mornings</span>}
                  {m.availability?.evening && <span className="bg-indigo-100 text-indigo-800 px-1.5 rounded">Evenings</span>}
                  {m.availability?.weekend && <span className="bg-emerald-100 text-emerald-800 px-1.5 rounded">Weekends</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action button to generate if not yet generated */}
        {!preview ? (
          <div className="text-center py-6">
            <p className="text-xs text-stone-600 mb-4 max-w-sm mx-auto">
              Our scheduling engine assigns morning runners to early slots, distributes evenings evenly, and routes high energy dogs to scenic Pune parks.
            </p>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-2 mx-auto"
            >
              <Sparkles className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Analyzing Availability...' : 'Generate Balanced Schedule'}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-950">
              <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>AI Optimization Generated ({preview.schedule.length} walk slots)</span>
              </div>
              <ul className="text-xs space-y-1 text-emerald-800 list-disc list-inside">
                {preview.insights.map((ins, i) => (
                  <li key={i}>{ins}</li>
                ))}
              </ul>
            </div>

            <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1">
              {preview.schedule.slice(0, 6).map((slot, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-800 w-16">{slot.day}</span>
                    <span className="text-stone-500">{slot.slot} ({slot.time})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-emerald-800">{slot.walkerName}</span>
                    <span className="text-stone-400 text-[11px] truncate max-w-[120px]">📍 {slot.parkName}</span>
                  </div>
                </div>
              ))}
              <div className="text-center text-[11px] text-stone-400 pt-1">+ 8 more balanced slots for the full week</div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-100">
              <button
                onClick={handleGenerate}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Regenerate</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="px-3 py-2 text-xs font-bold text-stone-500 hover:text-stone-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5"
                >
                  <span>Apply Schedule</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
