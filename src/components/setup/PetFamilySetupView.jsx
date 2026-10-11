import React, { useState } from 'react';
import {
  PawPrint,
  Users,
  Plus,
  Trash2,
  Edit2,
  Zap,
  Clock,
  ShieldCheck,
  Heart,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import PetFormModal from './PetFormModal';
import FamilyMemberModal from './FamilyMemberModal';

export default function PetFamilySetupView({
  pets,
  familyMembers,
  onSavePet,
  onDeletePet,
  onSaveMember,
  onDeleteMember
}) {
  const [activeTab, setActiveTab] = useState('pets'); // 'pets', 'family'
  const [editingPet, setEditingPet] = useState(null);
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full w-fit mb-2 border border-emerald-200/60">
            <PawPrint className="w-3.5 h-3.5" />
            <span>Profile & Household Setup</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-stone-900">
            Manage Pets & Family Walkers
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
            Configure your dogs' outdoor energy needs and your family members' availability slots to empower PawPlan's balanced scheduling algorithm.
          </p>
        </div>

        {/* Action Button */}
        {activeTab === 'pets' ? (
          <button
            onClick={() => {
              setEditingPet(null);
              setIsPetModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-md transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Pet</span>
          </button>
        ) : (
          <button
            onClick={() => {
              setEditingMember(null);
              setIsMemberModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-md transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Household Walker</span>
          </button>
        )}
      </div>

      {/* Switcher Tabs */}
      <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('pets')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'pets'
              ? 'bg-white text-emerald-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <PawPrint className="w-4 h-4" />
          <span>Registered Pets ({pets.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('family')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'family'
              ? 'bg-white text-emerald-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Household Walkers ({familyMembers.length})</span>
        </button>
      </div>

      {/* Tab 1: Pets Grid */}
      {activeTab === 'pets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-100 shadow-xs shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-extrabold text-xl text-stone-900">
                        {pet.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingPet(pet);
                            setIsPetModalOpen(true);
                          }}
                          className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {pets.length > 1 && (
                          <button
                            onClick={() => onDeletePet(pet.id)}
                            className="p-1.5 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {pet.breed}
                    </span>

                    <p className="text-xs text-stone-500 mt-2 line-clamp-2">
                      {pet.bio}
                    </p>
                  </div>
                </div>

                {/* Pet Attributes */}
                <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-stone-100 text-center text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Age</span>
                    <span className="font-extrabold text-stone-800">{pet.age}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Weight</span>
                    <span className="font-extrabold text-stone-800">{pet.weight}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Energy</span>
                    <span className="font-extrabold text-amber-700 flex items-center justify-center gap-0.5">
                      <Zap className="w-3 h-3" />
                      {pet.energyLevel}
                    </span>
                  </div>
                </div>

                {/* Daily Goal & Tags */}
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-stone-500">Daily Outdoor Goal:</span>
                  <span className="font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                    {pet.dailyWalkGoalMins || 60} mins / day
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                <span>Microchipped & Vaccinated in Pune</span>
                <span className="text-emerald-700 font-bold">Active Companion</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Family Members Grid */}
      {activeTab === 'family' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {familyMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-stone-200 shadow-xs"
                    />
                    <div>
                      <h4 className="font-heading font-extrabold text-base text-stone-900">
                        {member.name}
                      </h4>
                      <p className="text-[11px] font-semibold text-emerald-800">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingMember(member);
                        setIsMemberModalOpen(true);
                      }}
                      className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    {familyMembers.length > 1 && (
                      <button
                        onClick={() => onDeleteMember(member.id)}
                        className="p-1 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-stone-500 mb-3 line-clamp-2">
                  {member.notes}
                </p>

                {/* Availability Slots */}
                <div className="space-y-1.5 py-3 border-t border-stone-100 text-xs">
                  <span className="font-bold text-stone-700 block text-[11px]">Availability Slots:</span>
                  <div className="flex flex-wrap gap-1">
                    {member.availability?.morning && (
                      <span className="text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-lg">
                        Mornings (6:30 - 8:00 AM)
                      </span>
                    )}
                    {member.availability?.evening && (
                      <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200 px-2 py-0.5 rounded-lg">
                        Evenings (5:30 - 7:30 PM)
                      </span>
                    )}
                    {member.availability?.weekend && (
                      <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-lg">
                        Weekends (Tekdi Hikes)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-400">Assigned walks:</span>
                <span className="font-extrabold text-stone-800">
                  {member.weeklyWalksAssigned || 4} / week
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <PetFormModal
        isOpen={isPetModalOpen}
        onClose={() => setIsPetModalOpen(false)}
        onSavePet={onSavePet}
        initialPet={editingPet}
      />

      <FamilyMemberModal
        isOpen={isMemberModalOpen}
        onClose={() => setIsMemberModalOpen(false)}
        onSaveMember={onSaveMember}
        initialMember={editingMember}
      />

    </div>
  );
}
