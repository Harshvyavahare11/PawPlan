import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import {
  PawPrint,
  Play,
  Pause,
  Square,
  Clock,
  Route,
  Zap,
  MapPin,
  Calendar,
  CheckCircle,
  Share2,
  Trees,
  Shield,
  Smartphone
} from 'lucide-react';
import WalkCompletionModal from './WalkCompletionModal';
import { PUNE_PARKS } from '../../data/mockData';
import { locationService } from '../../services/locationService';

export default function WalkTrackerView({
  activePet,
  activeWalker,
  walkHistory = [],
  onSaveWalk,
  initialWalkConfig = null
}) {
  const [isTracking, setIsTracking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [distanceKm, setDistanceKm] = useState(0.0);
  const [currentPark, setCurrentPark] = useState(initialWalkConfig?.parkName || PUNE_PARKS[0]?.name);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState([[18.5362, 73.8940]]);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const polylineRef = useRef(null);
  const liveMarkerRef = useRef(null);
  const timerRef = useRef(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [18.5362, 73.8940],
        zoom: 15,
        zoomControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      // Polyline for track
      const polyline = L.polyline([[18.5362, 73.8940]], {
        color: '#2D6A4F',
        weight: 5,
        opacity: 0.85,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);

      polylineRef.current = polyline;

      // Custom animated dog marker
      const dogMarkerHtml = `
        <div class="relative flex items-center justify-center">
          <div class="w-10 h-10 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shadow-lg border-2 border-white ring-4 ring-emerald-400/40 animate-pulse">
            <span style="font-size: 18px;">🐕</span>
          </div>
        </div>
      `;
      const dogIcon = L.divIcon({
        className: 'dog-tracker-pin',
        html: dogMarkerHtml,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      const marker = L.marker([18.5362, 73.8940], { icon: dogIcon }).addTo(map);
      liveMarkerRef.current = marker;

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Timer & Route simulation when tracking
  useEffect(() => {
    if (isTracking && !isPaused) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          const nextSec = prev + 1;

          // Every 3 seconds, simulate a realistic small GPS movement step
          if (nextSec % 3 === 0) {
            setDistanceKm((d) => Number((d + 0.02).toFixed(2)));

            setRouteCoordinates((coords) => {
              const last = coords[coords.length - 1] || [18.5362, 73.8940];
              const nextLat = last[0] + (Math.random() - 0.47) * 0.00025;
              const nextLng = last[1] + (Math.random() - 0.47) * 0.00025;
              const newCoords = [...coords, [nextLat, nextLng]];

              if (polylineRef.current) {
                polylineRef.current.setLatLngs(newCoords);
              }
              if (liveMarkerRef.current && mapInstanceRef.current) {
                liveMarkerRef.current.setLatLng([nextLat, nextLng]);
                mapInstanceRef.current.panTo([nextLat, nextLng], { animate: true });
              }

              return newCoords;
            });
          }

          return nextSec;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isTracking, isPaused]);

  // Actions
  const handleStart = () => {
    setIsTracking(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleFinish = () => {
    setIsTracking(false);
    setIsPaused(false);
    setIsCompletionModalOpen(true);
  };

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Pace calculation (min/km)
  const pace = distanceKm > 0.05
    ? `${Math.floor((seconds / 60) / distanceKm)}:${Math.floor(((seconds / 60 / distanceKm) % 1) * 60).toString().padStart(2, '0')} /km`
    : '14:20 /km';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* Tracker Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full w-fit mb-2 border border-emerald-200/60">
            <PawPrint className="w-3.5 h-3.5" />
            <span>Live GPS Session • Pune Outdoor Trails</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-stone-900">
            Active Walk Tracker
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
            Walking with <strong className="text-stone-800">{activePet?.name || 'Sheru'}</strong>. Real-time duration, GPS trail, and outdoor green points calculation.
          </p>
        </div>

        {/* Selected Park / Trail */}
        <div className="bg-stone-50 px-4 py-2.5 rounded-2xl border border-stone-200/80 flex items-center gap-2 text-xs font-semibold text-stone-700">
          <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
          <span>Trail: <strong>{currentPark}</strong></span>
        </div>
      </div>

      {/* Main Live HUD & Map View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Live Metrics & Controls */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Live Timer Card */}
          <div className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-emerald-950/20 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isTracking && !isPaused ? 'bg-emerald-400 animate-ping' : 'bg-stone-400'}`}></span>
                {isTracking ? (isPaused ? 'Walk Paused' : 'Walk In Progress') : 'Ready to Walk'}
              </span>

              <span className="text-xs font-bold text-amber-300 bg-white/10 px-2.5 py-1 rounded-full">
                {activePet?.name || 'Sheru'} ({activePet?.breed || 'Indie'})
              </span>
            </div>

            {/* Timer Display */}
            <div className="text-center py-3">
              <div className="text-5xl sm:text-6xl font-extrabold font-heading tracking-tight text-white">
                {formatTimer(seconds)}
              </div>
              <div className="text-xs text-emerald-200/80 uppercase font-semibold mt-1">
                Active Walk Duration
              </div>
            </div>

            {/* Sub-metrics */}
            <div className="grid grid-cols-3 gap-2 pt-4 mt-2 border-t border-white/10 text-center">
              <div>
                <div className="text-lg font-extrabold font-heading text-emerald-100">{distanceKm.toFixed(2)} km</div>
                <div className="text-[10px] text-emerald-300 uppercase">Distance</div>
              </div>
              <div>
                <div className="text-lg font-extrabold font-heading text-emerald-100">{pace}</div>
                <div className="text-[10px] text-emerald-300 uppercase">Avg Pace</div>
              </div>
              <div>
                <div className="text-lg font-extrabold font-heading text-amber-300">+{Math.round(seconds / 30) * 10}</div>
                <div className="text-[10px] text-emerald-300 uppercase">Green Paws</div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-3">
              {!isTracking ? (
                <button
                  onClick={handleStart}
                  className="w-full py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-extrabold text-sm shadow-lg transition-transform hover:scale-102 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Walking Session</span>
                </button>
              ) : (
                <>
                  {isPaused ? (
                    <button
                      onClick={handleResume}
                      className="flex-1 py-3 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Resume</span>
                    </button>
                  ) : (
                    <button
                      onClick={handlePause}
                      className="flex-1 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pause</span>
                    </button>
                  )}

                  <button
                    onClick={handleFinish}
                    className="flex-1 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Square className="w-4 h-4 fill-current" />
                    <span>Finish Walk</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Screen Time Conversion Benefit Card */}
          <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-2">
              <Trees className="w-4 h-4 text-emerald-700" />
              <span>Green Impact Calculator</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every 15 minutes of outdoor walking boosts your dog’s mental stimulation by 40% and reduces owner sedentary phone screen time.
            </p>
            <div className="mt-3 flex items-center justify-between text-xs text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
              <span>Outdoor Air Quality: <strong>Pune AQI 68</strong></span>
              <span className="font-semibold text-emerald-700">Healthy & Clear</span>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Live Route Map */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-3 border border-stone-200/90 shadow-sm relative overflow-hidden">
            <div
              ref={mapContainerRef}
              className="w-full h-[400px] sm:h-[480px] rounded-2xl z-10"
            ></div>

            {/* Live Status Overlay */}
            <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-stone-200/80 shadow-md flex items-center gap-2 text-xs font-bold text-stone-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Live Pune Trail Tracking</span>
            </div>
          </div>
        </div>

      </div>

      {/* Past Walk History Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-700" />
            <h3 className="font-heading font-extrabold text-lg text-stone-900">
              Recent Walk History
            </h3>
          </div>
          <span className="text-xs text-stone-400 font-medium">Logged in Pune</span>
        </div>

        <div className="space-y-3">
          {walkHistory.map((walk) => (
            <div
              key={walk.id}
              className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 hover:bg-stone-100/70 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold">
                  🐕
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-stone-900 text-sm">{walk.petName}</span>
                    <span className="text-stone-400">•</span>
                    <span className="text-stone-600 font-medium">{walk.date} at {walk.time}</span>
                    <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded-full">
                      {walk.durationMins} mins
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-stone-500 flex-wrap">
                    <span>Walker: <strong>{walk.walkerName}</strong></span>
                    <span>•</span>
                    <span>Trail: <strong>{walk.parkName}</strong></span>
                    <span>•</span>
                    <span>Distance: <strong>{walk.distanceKm} km</strong></span>
                  </div>

                  {walk.notes && (
                    <p className="text-[11px] text-stone-600 mt-1.5 italic bg-white/80 p-1.5 rounded-lg border border-stone-200/60 max-w-xl">
                      "{walk.notes}"
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200/70 px-2.5 py-1 rounded-xl">
                  +{walk.greenPoints || 80} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completion Modal */}
      <WalkCompletionModal
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        walkData={{
          seconds,
          distanceKm,
          pace,
          petName: activePet?.name || 'Sheru',
          walkerName: activeWalker?.name || 'Aarav Vyavahare',
          parkName: currentPark
        }}
        onSaveWalk={onSaveWalk}
      />

    </div>
  );
}
