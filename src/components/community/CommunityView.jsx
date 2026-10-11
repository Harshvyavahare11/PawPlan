import React, { useState } from 'react';
import {
  Users2,
  UserCheck,
  UserPlus,
  ShieldCheck,
  Search,
  Filter,
  MapPin,
  HeartHandshake,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import OwnerCard from './OwnerCard';
import ChatModal from './ChatModal';
import ReportModal from './ReportModal';

export default function CommunityView({
  communityUsers,
  messages,
  onSendFriendRequest,
  onAcceptRequest,
  onDeclineRequest,
  onSendMessage,
  onBlockUser,
  onReportUser
}) {
  const [activeTab, setActiveTab] = useState('discover'); // 'discover', 'friends', 'requests'
  const [neighborhoodFilter, setNeighborhoodFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [activeReportUser, setActiveReportUser] = useState(null);

  // Filter based on tab and selections
  const friends = communityUsers.filter(u => u.relationshipStatus === 'friends');
  const incomingRequests = communityUsers.filter(u => u.relationshipStatus === 'pending_incoming');
  const discoverList = communityUsers.filter(u => u.relationshipStatus !== 'friends' && u.relationshipStatus !== 'pending_incoming');

  let currentList = [];
  if (activeTab === 'discover') currentList = discoverList;
  else if (activeTab === 'friends') currentList = friends;
  else if (activeTab === 'requests') currentList = incomingRequests;

  const filteredUsers = currentList.filter(user => {
    const matchesNeighborhood = neighborhoodFilter === 'All' || user.neighborhood.includes(neighborhoodFilter);
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesNeighborhood && matchesSearch;
  });

  const neighborhoods = ['All', 'Koregaon Park', 'Kalyani Nagar', 'Viman Nagar', 'Baner', 'Aundh'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full w-fit mb-2 border border-emerald-200/60">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Pune Pet Social Network • Verified Owners</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-stone-900">
            Connect with Nearby Dog Parents
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
            Find compatible walking companions with similar pet energy, schedule group playdates in Pune parks, and chat privately once mutual requests are accepted.
          </p>
        </div>

        {/* Privacy Shield Pill */}
        <div className="bg-emerald-50 border border-emerald-200/70 p-3 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-950 max-w-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
          <p className="text-[11px] leading-tight">
            <strong>Privacy Guarantee:</strong> Exact home addresses are never shown. Only approximate radius and mutual friends can direct message.
          </p>
        </div>
      </div>

      {/* Navigation Tabs (Discover, Friends, Requests) */}
      <div className="bg-white rounded-2xl p-3 border border-stone-200/90 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'discover'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Users2 className="w-4 h-4" />
            <span>Discover Nearby</span>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full">{discoverList.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('friends')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'friends'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>My Pet Friends</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-900 px-1.5 py-0.2 rounded-full">{friends.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'requests'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Friend Requests</span>
            {incomingRequests.length > 0 && (
              <span className="text-[10px] bg-amber-500 text-white font-extrabold px-1.5 py-0.2 rounded-full animate-pulse">
                {incomingRequests.length}
              </span>
            )}
          </button>
        </div>

        {/* Search & Pune Neighborhood Filter */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search breed or name..."
              className="w-full pl-8 pr-3 py-1.5 text-xs font-medium rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-hidden"
            />
          </div>

          <select
            value={neighborhoodFilter}
            onChange={(e) => setNeighborhoodFilter(e.target.value)}
            className="text-xs font-semibold p-1.5 rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden"
          >
            {neighborhoods.map((n) => (
              <option key={n} value={n}>{n === 'All' ? 'All Pune' : n}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Users Grid */}
      {filteredUsers.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
          <Users2 className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h4 className="font-heading font-extrabold text-base text-stone-700">No pet owners found</h4>
          <p className="text-xs text-stone-400 mt-1">
            Try switching your Pune neighborhood filter or tab to discover more members.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredUsers.map((user) => (
            <OwnerCard
              key={user.id}
              user={user}
              onOpenChat={(u) => setActiveChatUser(u)}
              onSendFriendRequest={onSendFriendRequest}
              onAcceptRequest={onAcceptRequest}
              onDeclineRequest={onDeclineRequest}
              onOpenReportModal={(u) => setActiveReportUser(u)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {activeChatUser && (
        <ChatModal
          isOpen={!!activeChatUser}
          onClose={() => setActiveChatUser(null)}
          targetUser={activeChatUser}
          messages={messages}
          onSendMessage={onSendMessage}
          onOpenReportModal={(u) => {
            setActiveChatUser(null);
            setActiveReportUser(u);
          }}
        />
      )}

      {activeReportUser && (
        <ReportModal
          isOpen={!!activeReportUser}
          onClose={() => setActiveReportUser(null)}
          targetUser={activeReportUser}
          onConfirmBlock={onBlockUser}
          onConfirmReport={onReportUser}
        />
      )}

    </div>
  );
}
