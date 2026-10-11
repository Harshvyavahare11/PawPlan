import React from 'react';
import { PawPrint, Heart, Trees, ShieldCheck, RotateCcw } from 'lucide-react';

export default function Footer({ onResetData, onOpenSafetyModal, onOpenAiModal }) {
  return (
    <footer className="bg-white border-t border-stone-200/80 pt-10 pb-20 lg:pb-12 mt-12 text-stone-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-stone-100">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center">
                <PawPrint className="w-4 h-4 text-emerald-100" />
              </div>
              <span className="font-heading font-extrabold text-lg text-emerald-950">
                PawPlan
              </span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.2 rounded-full">
                Pune, India
              </span>
            </div>
            
            <p className="text-xs text-stone-500 max-w-sm leading-relaxed">
              <strong>From Screen Time to Green Time.</strong> Reconnecting pet parents with nature, balancing household dog walking schedules, and building a safe, bonded neighborhood community.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-stone-400">
              <Trees className="w-3.5 h-3.5 text-emerald-600" />
              <span>Dedicated to pet health & active green living</span>
            </div>
          </div>

          {/* Pune Neighborhood Trails */}
          <div className="md:col-span-4 space-y-2">
            <div className="font-bold text-stone-800 uppercase tracking-wider text-[11px]">
              Pune Green Hubs
            </div>
            <ul className="space-y-1 text-stone-500 text-xs">
              <li>• Empress Botanical Garden (Wanowrie / Camp)</li>
              <li>• Vetal Tekdi & ARAI Hill Nature Trails (SB Road)</li>
              <li>• Jogger’s Park & Dog Walkers Lane (Kalyani Nagar)</li>
              <li>• Baner-Pashan Biodiversity Park & Lake</li>
              <li>• Bund Garden Riverfront Promenade</li>
            </ul>
          </div>

          {/* Privacy & Reset */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-bold text-stone-800 uppercase tracking-wider text-[11px]">
              Privacy & Demo Tools
            </div>
            <div className="space-y-2">
              <button
                onClick={onOpenSafetyModal}
                className="w-full flex items-center gap-1.5 p-2 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 font-semibold transition-colors text-left"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Privacy & Safety Shield</span>
              </button>

              <button
                onClick={onResetData}
                title="Reset localStorage demo data back to default Pune state"
                className="w-full flex items-center gap-1.5 p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold transition-colors text-left"
              >
                <RotateCcw className="w-4 h-4 text-rose-600" />
                <span>Reset Demo Mock Data</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} PawPlan. Designed for pet parents in Pune, India.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with care for dogs</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
            <span>& nature trails</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
