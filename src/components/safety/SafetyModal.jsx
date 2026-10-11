import React, { useState } from 'react';
import {
  ShieldCheck,
  X,
  PhoneCall,
  EyeOff,
  UserX,
  Lock,
  AlertTriangle,
  Hospital,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { EMERGENCY_PUNE_VETS } from '../../data/mockData';

export default function SafetyModal({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) {
  const [privacyMode, setPrivacyMode] = useState(settings?.privacyMode || 'fuzzy');
  const [incognitoWalk, setIncognitoWalk] = useState(settings?.incognitoWalk || false);
  const [mutualOnly, setMutualOnly] = useState(settings?.allowDirectMessages === 'mutual_only');
  const [savedNotification, setSavedNotification] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateSettings({
      ...settings,
      privacyMode,
      incognitoWalk,
      allowDirectMessages: mutualOnly ? 'mutual_only' : 'everyone'
    });
    setSavedNotification(true);
    setTimeout(() => {
      setSavedNotification(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-xl text-stone-900">
              Privacy Shield & Safety Center
            </h3>
            <p className="text-xs text-stone-500">Security safeguards & Pune 24/7 veterinary hotlines</p>
          </div>
        </div>

        {savedNotification && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Privacy preferences saved successfully!</span>
          </div>
        )}

        <div className="space-y-5">
          
          {/* Privacy Controls */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/90 space-y-3">
            <span className="text-xs font-bold text-stone-800 block uppercase tracking-wider">
              Location Privacy Controls
            </span>

            {/* Fuzzy Radius */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="privacyMode"
                value="fuzzy"
                checked={privacyMode === 'fuzzy'}
                onChange={() => setPrivacyMode('fuzzy')}
                className="mt-1 text-emerald-600 focus:ring-emerald-500"
              />
              <div>
                <span className="text-xs font-bold text-stone-800 block">
                  Fuzzy Neighborhood Radius (Default & Recommended)
                </span>
                <span className="text-[11px] text-stone-500 block leading-relaxed">
                  Only displays your general area (e.g., "Koregaon Park, ~1.2 km away"). Your home coordinates are NEVER rendered.
                </span>
              </div>
            </label>

            {/* Strict / Ghost */}
            <label className="flex items-start gap-3 cursor-pointer pt-2 border-t border-stone-200/60">
              <input
                type="radio"
                name="privacyMode"
                value="strict"
                checked={privacyMode === 'strict'}
                onChange={() => setPrivacyMode('strict')}
                className="mt-1 text-emerald-600 focus:ring-emerald-500"
              />
              <div>
                <span className="text-xs font-bold text-stone-800 block">
                  Ghost Mode (Invisible on Map)
                </span>
                <span className="text-[11px] text-stone-500 block leading-relaxed">
                  Completely hide your profile from the public Explore Map. You can still plan and track personal walks.
                </span>
              </div>
            </label>

            {/* Mutual Chat Requirement */}
            <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-stone-800 block">
                  Require Mutual Request for Direct Chat
                </span>
                <span className="text-[11px] text-stone-500 block">
                  Strangers cannot message you without accepted request
                </span>
              </div>
              <input
                type="checkbox"
                checked={mutualOnly}
                onChange={(e) => setMutualOnly(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
              />
            </div>
          </div>

          {/* Emergency Pune Vets & SOS */}
          <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-rose-950 font-bold text-xs uppercase tracking-wider">
              <Hospital className="w-4 h-4 text-rose-600" />
              <span>Pune 24/7 Veterinary SOS Hotlines</span>
            </div>

            <div className="space-y-2">
              {EMERGENCY_PUNE_VETS.map((vet, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3 rounded-xl border border-rose-100 flex items-center justify-between gap-2 text-xs"
                >
                  <div>
                    <div className="font-bold text-stone-900">{vet.name}</div>
                    <div className="text-[11px] text-stone-500">📍 {vet.location} • {vet.hours}</div>
                  </div>
                  <a
                    href={`tel:${vet.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shrink-0 shadow-xs"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>Call SOS</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Pune Outdoor Walking Safety Tips */}
          <div className="bg-amber-50/60 border border-amber-200/70 rounded-2xl p-4 text-xs text-amber-950 space-y-2">
            <span className="font-bold text-amber-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Field Safety Tips for Pune Walkers</span>
            </span>
            <ul className="space-y-1 text-[11px] text-amber-900 list-disc list-inside leading-relaxed">
              <li><strong>Street Dog Pack Encounters:</strong> Keep treats handy, speak in calm tones, and never run. Avoid fast bicycle chasing lanes.</li>
              <li><strong>Afternoon Heat:</strong> Pune pavement reaches 50°C+ during peak sun. Place your palm for 7 seconds — if hot for you, it burns dog paws.</li>
              <li><strong>Tekdi Hikes (Vetal / ARAI):</strong> Check paws for thorny burrs and ticks after hill walks.</li>
            </ul>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
          >
            Save Privacy Settings
          </button>
        </div>

      </div>
    </div>
  );
}
