import React from 'react';
import {
  MapPin,
  MessageSquare,
  UserPlus,
  Check,
  Zap,
  ShieldCheck,
  MoreVertical,
  CalendarPlus,
  XCircle,
  ShieldAlert
} from 'lucide-react';

export default function OwnerCard({
  user,
  onOpenChat,
  onSendFriendRequest,
  onAcceptRequest,
  onDeclineRequest,
  onOpenReportModal
}) {
  const isFriend = user.relationshipStatus === 'friends';
  const isIncoming = user.relationshipStatus === 'pending_incoming';
  const isOutgoing = user.relationshipStatus === 'pending_outgoing';

  return (
    <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      
      <div>
        {/* Top Header: Owner Info */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-2xl object-cover border border-stone-200 shadow-xs"
              />
              {user.verified && (
                <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-0.5 rounded-full" title="Verified Pune Pet Owner">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            <div>
              <div className="font-heading font-extrabold text-stone-900 text-sm sm:text-base flex items-center gap-1.5">
                <span>{user.name}</span>
              </div>
              <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-stone-400" />
                <span>{user.neighborhood}</span>
                <span className="text-emerald-700 font-semibold">• {user.distance}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenReportModal(user)}
            title="Privacy & Safety"
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>
        </div>

        {/* Pet Card Banner */}
        <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/70 flex items-center gap-3 mb-3">
          <img
            src={user.pet.photo}
            alt={user.pet.name}
            className="w-12 h-12 rounded-xl object-cover border border-stone-200"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 justify-between">
              <span className="font-bold text-stone-900 text-xs truncate">
                🐕 {user.pet.name}
              </span>
              <span className="text-[10px] font-semibold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded-md flex items-center gap-0.5">
                <Zap className="w-2.5 h-2.5 text-amber-600" />
                {user.pet.energy}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 truncate mt-0.5">
              {user.pet.breed} • {user.pet.age}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-stone-600 line-clamp-2 mb-3 leading-relaxed">
          "{user.bio}"
        </p>

        {/* Interests */}
        <div className="flex flex-wrap gap-1 mb-4">
          {user.interests?.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] font-semibold bg-stone-100 text-stone-600 px-2 py-0.5 rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
        {isFriend ? (
          <>
            <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Connected
            </span>
            <button
              onClick={() => onOpenChat(user)}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Chat</span>
            </button>
          </>
        ) : isIncoming ? (
          <div className="w-full flex items-center gap-2">
            <button
              onClick={() => onAcceptRequest(user.id)}
              className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Accept Request</span>
            </button>
            <button
              onClick={() => onDeclineRequest(user.id)}
              className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-xl text-xs transition-colors"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        ) : isOutgoing ? (
          <div className="w-full flex items-center justify-between text-xs text-stone-500 font-semibold bg-stone-50 p-2 rounded-xl">
            <span>Friend request sent</span>
            <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">Pending</span>
          </div>
        ) : (
          <button
            onClick={() => onSendFriendRequest(user.id)}
            className="w-full py-2 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-900 border border-stone-200 hover:border-emerald-300 text-stone-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Connect & Walk</span>
          </button>
        )}
      </div>

    </div>
  );
}
