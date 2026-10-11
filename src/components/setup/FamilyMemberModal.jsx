import React, { useState } from 'react';
import { X, User, Check, Heart, Shield } from 'lucide-react';

export default function FamilyMemberModal({
  isOpen,
  onClose,
  onSaveMember,
  initialMember = null
}) {
  const [name, setName] = useState(initialMember?.name || '');
  const [role, setRole] = useState(initialMember?.role || 'Co-Caretaker');
  const [phone, setPhone] = useState(initialMember?.phone || '+91 98220 12345');
  const [notes, setNotes] = useState(initialMember?.notes || 'Enjoys morning walks around the neighborhood');
  const [morning, setMorning] = useState(initialMember?.availability?.morning ?? true);
  const [afternoon, setAfternoon] = useState(initialMember?.availability?.afternoon ?? false);
  const [evening, setEvening] = useState(initialMember?.availability?.evening ?? true);
  const [weekend, setWeekend] = useState(initialMember?.availability?.weekend ?? true);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const memberData = {
      id: initialMember?.id || `fam-${Date.now()}`,
      name,
      role,
      avatar: initialMember?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      availability: {
        morning,
        afternoon,
        evening,
        weekend
      },
      weeklyWalksAssigned: initialMember?.weeklyWalksAssigned || 4,
      completedThisWeek: initialMember?.completedThisWeek || 0,
      phone,
      notes
    };

    onSaveMember(memberData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            <User className="w-6 h-6 text-teal-700" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-xl text-stone-900">
              {initialMember ? 'Edit Household Member' : 'Add Household Walker'}
            </h3>
            <p className="text-xs text-stone-500">Configure weekly availability to auto-balance walks</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav, Ananya..."
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Walking Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              >
                <option value="Primary Caretaker">Primary Caretaker</option>
                <option value="Co-Caretaker">Co-Caretaker</option>
                <option value="Family Member">Family Member</option>
                <option value="Weekend Walker">Weekend Walker</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Phone Number (For walk reminders)</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98220..."
              className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
            />
          </div>

          {/* Availability Checkboxes */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-2">Weekly Availability Slots</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer hover:bg-emerald-50">
                <input
                  type="checkbox"
                  checked={morning}
                  onChange={(e) => setMorning(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="font-semibold text-stone-800">Mornings (6:30 - 8:00 AM)</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer hover:bg-emerald-50">
                <input
                  type="checkbox"
                  checked={afternoon}
                  onChange={(e) => setAfternoon(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="font-semibold text-stone-800">Afternoon (Shaded)</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer hover:bg-emerald-50">
                <input
                  type="checkbox"
                  checked={evening}
                  onChange={(e) => setEvening(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="font-semibold text-stone-800">Evenings (5:30 - 7:30 PM)</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer hover:bg-emerald-50">
                <input
                  type="checkbox"
                  checked={weekend}
                  onChange={(e) => setWeekend(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="font-semibold text-stone-800">Weekends (Tekdi Hikes)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Walking Preferences & Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Prefers paved park trails, energetic runner..."
              className="w-full text-xs font-medium p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
            />
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
              Save Member
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
