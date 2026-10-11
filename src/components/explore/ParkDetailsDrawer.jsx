import React from 'react';
import {
  X,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Play,
  Navigation,
  ShieldCheck,
  CalendarPlus
} from 'lucide-react';

export default function ParkDetailsDrawer({
  park,
  onClose,
  onStartWalkHere,
  onScheduleWalkHere
}) {
  if (!park) return null;

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xl max-w-md w-full relative animate-in fade-in duration-200 flex flex-col justify-between">
      
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-xl bg-black/40 text-white hover:bg-black/60 transition-colors z-10"
      >
        <X className="w-4 h-4" />
      </button>

      <div>
        {/* Park Hero Image */}
        <div className="relative rounded-2xl overflow-hidden h-48 -mt-1 -mx-1 mb-4">
          <img
            src={park.image}
            alt={park.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600/90 uppercase tracking-wider">
              {park.category}
            </span>
            <h3 className="text-xl font-extrabold font-heading text-white mt-1">
              {park.name}
            </h3>
            <p className="text-xs text-white/80 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-rose-400" />
              {park.locality}, Pune
            </p>
          </div>
        </div>

        {/* Rating & Distance */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-stone-800">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>{park.rating}</span>
            <span className="text-stone-400 font-normal">({park.reviewsCount} reviews)</span>
          </div>

          <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200/60">
            ~{park.distanceKm} km from Koregaon Park
          </span>
        </div>

        {/* Dog Policy */}
        <div className="my-3.5 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 text-xs">
          <div className="font-bold text-emerald-900 flex items-center gap-1.5 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Pet Access Policy</span>
          </div>
          <p className="text-emerald-800">{park.dogPolicy}</p>
        </div>

        {/* Key Features & Amenities */}
        <div className="space-y-1.5 my-3">
          <span className="text-xs font-bold text-stone-700">Park Amenities:</span>
          <div className="flex flex-wrap gap-1.5">
            {park.features?.map((feat, i) => (
              <span
                key={i}
                className="text-[11px] font-medium bg-stone-100 text-stone-700 px-2.5 py-1 rounded-xl"
              >
                ✓ {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Recommended Times */}
        <div className="my-3 text-xs space-y-1">
          <span className="font-bold text-stone-700 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-stone-500" />
            Recommended Walk Hours:
          </span>
          <div className="text-stone-600 pl-4">
            {park.recommendedSlots?.join(' • ') || 'Morning and late evening'}
          </div>
        </div>

        {/* Safety Note */}
        {park.safetyNotes && (
          <div className="my-3 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">{park.safetyNotes}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-stone-100 flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onStartWalkHere(park)}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Walk Here Now</span>
          </button>

          <button
            onClick={() => onScheduleWalkHere(park)}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-stone-100 hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 text-xs font-bold border border-stone-200 transition-colors"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-emerald-700" />
            <span>Plan for Week</span>
          </button>
        </div>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${park.name} ${park.locality} Pune`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-xs font-semibold text-stone-500 hover:text-stone-800 py-1 flex items-center justify-center gap-1"
        >
          <span>Open Directions in Maps</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

    </div>
  );
}
