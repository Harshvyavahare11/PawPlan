import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Award,
  Trees,
  Route,
  Clock,
  Sparkles,
  Camera,
  CheckCircle2,
  X,
  Share2
} from 'lucide-react';

export default function WalkCompletionModal({
  isOpen,
  onClose,
  walkData,
  onSaveWalk
}) {
  const [notes, setNotes] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isPhotoSelected, setIsPhotoSelected] = useState(false);

  if (!isOpen || !walkData) return null;

  // Trigger confetti burst on open
  React.useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2D6A4F', '#52B788', '#F4A261', '#E76F51']
      });
    } catch {
      // Ignore if canvas confetti not supported
    }
  }, []);

  const handleSave = () => {
    const finalLog = {
      id: `walk-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      petName: walkData.petName || 'Sheru',
      walkerName: walkData.walkerName || 'Aarav Vyavahare',
      durationMins: Math.max(Math.round(walkData.seconds / 60), 1),
      distanceKm: Number(walkData.distanceKm.toFixed(2)),
      pace: walkData.pace || '14:30 /km',
      pawsEarned: Math.round(walkData.distanceKm * 25 + (walkData.seconds / 60)),
      greenPoints: Math.round(walkData.seconds / 30) * 10,
      parkName: walkData.parkName || 'Koregaon Park Green Boulevard',
      notes: notes || 'Great outdoor walk, healthy tail wagging!',
      photo: photoUrl || (isPhotoSelected ? 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80' : null)
    };

    onSaveWalk(finalLog);
    onClose();
  };

  const sampleWalkPhotos = [
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Header */}
        <div className="text-center pb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-900/20">
            <Trophy className="w-7 h-7 text-amber-300" />
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
            Green Time Achieved!
          </span>
          <h3 className="font-heading font-extrabold text-2xl text-stone-900 mt-2">
            Fantastic Walk with {walkData.petName || 'Sheru'}!
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            You successfully replaced screen time with active nature exploration in Pune.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2.5 my-4">
          <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100 text-center">
            <Clock className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
            <div className="text-base font-extrabold text-stone-900 font-heading">
              {Math.floor(walkData.seconds / 60)}m {walkData.seconds % 60}s
            </div>
            <div className="text-[10px] text-stone-400 uppercase font-semibold">Duration</div>
          </div>

          <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100 text-center">
            <Route className="w-4 h-4 text-teal-700 mx-auto mb-1" />
            <div className="text-base font-extrabold text-stone-900 font-heading">
              {walkData.distanceKm.toFixed(2)} km
            </div>
            <div className="text-[10px] text-stone-400 uppercase font-semibold">Distance</div>
          </div>

          <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100 text-center">
            <Trees className="w-4 h-4 text-amber-600 mx-auto mb-1" />
            <div className="text-base font-extrabold text-amber-700 font-heading">
              +{Math.round(walkData.seconds / 30) * 10} pts
            </div>
            <div className="text-[10px] text-stone-400 uppercase font-semibold">Green Paws</div>
          </div>
        </div>

        {/* Notes input */}
        <div className="space-y-3 pt-2">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Walk Highlights & Pet Observations:
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Friendly sniff session at Jogger’s Park, calm leash walking..."
              className="w-full text-xs font-medium p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
            />
          </div>

          {/* Add walk photo simulation */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-stone-500" />
                Add Walk Memory Photo (Simulated):
              </span>
              <span className="text-[10px] text-stone-400 font-normal">Choose memory</span>
            </label>

            <div className="flex items-center gap-2">
              {sampleWalkPhotos.map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt="walk memory"
                  onClick={() => {
                    setPhotoUrl(photo);
                    setIsPhotoSelected(true);
                  }}
                  className={`w-14 h-14 rounded-xl object-cover cursor-pointer border-2 transition-transform ${
                    photoUrl === photo ? 'border-emerald-600 scale-105 shadow-md' : 'border-stone-200 hover:scale-100'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-5 border-t border-stone-100 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-stone-500 hover:text-stone-800"
          >
            Discard
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Save to Activity History</span>
          </button>
        </div>

      </div>
    </div>
  );
}
