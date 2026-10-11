import React, { useState } from 'react';
import { X, PawPrint, Heart, Zap, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PetFormModal({
  isOpen,
  onClose,
  onSavePet,
  initialPet = null
}) {
  const [name, setName] = useState(initialPet?.name || '');
  const [breed, setBreed] = useState(initialPet?.breed || 'Indie (Indian Pariah)');
  const [age, setAge] = useState(initialPet?.age || '2 yrs');
  const [weight, setWeight] = useState(initialPet?.weight || '18 kg');
  const [energyLevel, setEnergyLevel] = useState(initialPet?.energyLevel || 'High');
  const [gender, setGender] = useState(initialPet?.gender || 'Male');
  const [bio, setBio] = useState(initialPet?.bio || 'Enthusiastic Pune pup who loves park walks!');
  const [dailyGoal, setDailyGoal] = useState(initialPet?.dailyWalkGoalMins || 60);
  const [selectedImage, setSelectedImage] = useState(
    initialPet?.image || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80'
  );

  if (!isOpen) return null;

  const dogAvatars = [
    { label: 'Indie Dog', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80' },
    { label: 'Golden Retriever', url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80' },
    { label: 'Labrador', url: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=600&q=80' },
    { label: 'Beagle', url: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=600&q=80' },
    { label: 'Shih Tzu', url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const petData = {
      id: initialPet?.id || `pet-${Date.now()}`,
      name,
      breed,
      age,
      weight,
      energyLevel,
      gender,
      bio,
      image: selectedImage,
      vaccinated: true,
      microchipped: true,
      dailyWalkGoalMins: Number(dailyGoal),
      tags: [energyLevel + ' Energy', 'Vaccinated']
    };

    onSavePet(petData);
    onClose();
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
            <PawPrint className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-xl text-stone-900">
              {initialPet ? 'Edit Pet Profile' : 'Register New Pet'}
            </h3>
            <p className="text-xs text-stone-500">Track habits and balance daily outdoor green time</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Avatar Picker */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">Choose Photo Avatar</label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {dogAvatars.map((ava, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(ava.url)}
                  className={`relative rounded-xl overflow-hidden cursor-pointer shrink-0 border-2 transition-all ${
                    selectedImage === ava.url ? 'border-emerald-600 scale-105 shadow-md' : 'border-stone-200 hover:scale-100'
                  }`}
                >
                  <img src={ava.url} alt={ava.label} className="w-14 h-14 object-cover" />
                  {selectedImage === ava.url && (
                    <div className="absolute inset-0 bg-emerald-700/20 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Name & Breed */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Dog Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sheru, Bruno..."
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Breed</label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="e.g. Indie, Golden Retriever..."
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                required
              />
            </div>
          </div>

          {/* Age & Weight */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Age</label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 2.5 yrs"
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Weight</label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 19 kg"
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                required
              />
            </div>
          </div>

          {/* Energy & Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Energy Level</label>
              <select
                value={energyLevel}
                onChange={(e) => setEnergyLevel(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              >
                <option value="Low">Low (Short gentle strolls)</option>
                <option value="Moderate">Moderate (Daily 45m walks)</option>
                <option value="High">High (Needs active running/park)</option>
                <option value="Athletic">Athletic (Tekdi trek ready)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Daily Goal (Mins)</label>
              <input
                type="number"
                min="15"
                max="180"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                required
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Bio & Temperament</label>
            <textarea
              rows="2"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Friendly with other dogs, likes ball games..."
              className="w-full text-xs font-medium p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
            >
              Save Pet Profile
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
