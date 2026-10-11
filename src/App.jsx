import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import DashboardView from './components/dashboard/DashboardView';
import WeeklyPlannerView from './components/planner/WeeklyPlannerView';
import ExploreMapView from './components/explore/ExploreMapView';
import WalkTrackerView from './components/tracker/WalkTrackerView';
import CommunityView from './components/community/CommunityView';
import PetFamilySetupView from './components/setup/PetFamilySetupView';
import SafetyModal from './components/safety/SafetyModal';
import AiAssistantModal from './components/ai/AiAssistantModal';
import { storageService } from './services/storageService';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Persistent data state
  const [pets, setPets] = useState(() => storageService.getPets());
  const [activePetId, setActivePetId] = useState(pets[0]?.id || 'pet-1');
  const [familyMembers, setFamilyMembers] = useState(() => storageService.getFamily());
  const [schedule, setSchedule] = useState(() => storageService.getSchedule());
  const [communityUsers, setCommunityUsers] = useState(() => storageService.getCommunityUsers());
  const [messages, setMessages] = useState(() => storageService.getMessages());
  const [walkHistory, setWalkHistory] = useState(() => storageService.getWalkHistory());
  const [settings, setSettings] = useState(() => storageService.getSettings());

  // Modal states
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeWalkConfig, setActiveWalkConfig] = useState(null);

  // Sync to local storage on changes
  useEffect(() => { storageService.savePets(pets); }, [pets]);
  useEffect(() => { storageService.saveFamily(familyMembers); }, [familyMembers]);
  useEffect(() => { storageService.saveSchedule(schedule); }, [schedule]);
  useEffect(() => { storageService.saveCommunityUsers(communityUsers); }, [communityUsers]);
  useEffect(() => { storageService.saveMessages(messages); }, [messages]);
  useEffect(() => { storageService.saveWalkHistory(walkHistory); }, [walkHistory]);
  useEffect(() => { storageService.saveSettings(settings); }, [settings]);

  // Toast feedback helper
  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Active Pet & Walker references
  const activePet = pets.find(p => p.id === activePetId) || pets[0];
  const activeWalker = familyMembers[0];

  // Walk Actions
  const handleStartWalkClick = (config = null) => {
    setActiveWalkConfig(config);
    setActiveTab('tracker');
    if (config?.parkName) {
      showToast(`Ready to walk at ${config.parkName}! Click Start.`);
    } else {
      showToast('Live tracker ready. Press Start Walking Session!');
    }
  };

  const handleSaveWalk = (walkLog) => {
    const updatedHistory = [walkLog, ...walkHistory];
    setWalkHistory(updatedHistory);

    // If there was a scheduled walk for today, mark it completed
    const todayWalk = schedule.find(s => s.status === 'Scheduled' && s.day === 'Monday');
    if (todayWalk) {
      setSchedule(prev => prev.map(s => s.id === todayWalk.id ? {
        ...s,
        status: 'Completed',
        actualMins: walkLog.durationMins,
        distanceKm: walkLog.distanceKm,
        pointsEarned: walkLog.greenPoints
      } : s));
    }

    showToast(`Walk logged! Earned +${walkLog.greenPoints} green paws for ${walkLog.petName}! 🐾`);
  };

  // Schedule Actions
  const handleMarkScheduleComplete = (walkId) => {
    setSchedule(prev => prev.map(w => w.id === walkId ? {
      ...w,
      status: 'Completed',
      actualMins: w.targetMins,
      distanceKm: 2.2,
      pointsEarned: 45
    } : w));
    showToast('Walk marked as completed! Points updated.');
  };

  const handleAddScheduleWalk = (newWalk) => {
    setSchedule(prev => [newWalk, ...prev]);
    showToast('New walk added to weekly planner!');
  };

  const handleDeleteScheduleWalk = (walkId) => {
    setSchedule(prev => prev.filter(w => w.id !== walkId));
    showToast('Walk removed from schedule.');
  };

  const handleApplyBalancedSchedule = (newSchedule) => {
    setSchedule(newSchedule);
    showToast('7-Day schedule re-balanced across household members! 🌿');
  };

  // Pet Management
  const handleSavePet = (petData) => {
    setPets(prev => {
      const exists = prev.some(p => p.id === petData.id);
      if (exists) {
        return prev.map(p => p.id === petData.id ? petData : p);
      }
      return [...prev, petData];
    });
    setActivePetId(petData.id);
    showToast(`Pet profile for ${petData.name} saved!`);
  };

  const handleDeletePet = (petId) => {
    if (pets.length <= 1) {
      showToast('At least one pet profile is required.', 'error');
      return;
    }
    setPets(prev => prev.filter(p => p.id !== petId));
    setActivePetId(pets[0].id);
    showToast('Pet profile removed.');
  };

  // Family Member Management
  const handleSaveFamilyMember = (memberData) => {
    setFamilyMembers(prev => {
      const exists = prev.some(m => m.id === memberData.id);
      if (exists) {
        return prev.map(m => m.id === memberData.id ? memberData : m);
      }
      return [...prev, memberData];
    });
    showToast(`Household member ${memberData.name} updated!`);
  };

  const handleDeleteFamilyMember = (memberId) => {
    if (familyMembers.length <= 1) {
      showToast('At least one family caretaker is required.', 'error');
      return;
    }
    setFamilyMembers(prev => prev.filter(m => m.id !== memberId));
    showToast('Household member removed.');
  };

  // Community & Social Actions
  const handleSendFriendRequest = (targetUserId) => {
    setCommunityUsers(prev => prev.map(u => u.id === targetUserId ? {
      ...u,
      relationshipStatus: 'pending_outgoing'
    } : u));
    showToast('Friend request sent! Mutual acceptance ensures privacy.');
  };

  const handleAcceptFriendRequest = (targetUserId) => {
    setCommunityUsers(prev => prev.map(u => u.id === targetUserId ? {
      ...u,
      relationshipStatus: 'friends'
    } : u));
    showToast('Request accepted! You can now chat and coordinate walks.');
  };

  const handleDeclineFriendRequest = (targetUserId) => {
    setCommunityUsers(prev => prev.map(u => u.id === targetUserId ? {
      ...u,
      relationshipStatus: 'none'
    } : u));
    showToast('Request declined.');
  };

  const handleSendMessage = (targetUserId, messageObj) => {
    setMessages(prev => {
      const existing = prev[targetUserId] || [];
      return {
        ...prev,
        [targetUserId]: [...existing, messageObj]
      };
    });
  };

  const handleBlockUser = (targetUserId) => {
    setCommunityUsers(prev => prev.filter(u => u.id !== targetUserId));
    showToast('User has been blocked and removed from your network.');
  };

  const handleReportUser = (targetUserId, reason, details) => {
    showToast(`Safety report submitted for review: ${reason}`);
  };

  const handleUpdateSettings = (newSettings) => {
    setSettings(newSettings);
    showToast('Privacy preferences updated!');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo data back to default Pune state?')) {
      storageService.resetAll();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800">
      
      {/* Toast Notification Notification Pill */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-stone-900 text-white text-xs font-bold shadow-2xl animate-in slide-in-from-top-4 duration-200">
          {toastMessage.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onStartWalkClick={() => handleStartWalkClick(null)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
        activeWalkState={{ isActive: false }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            pets={pets}
            activePetId={activePetId}
            setActivePetId={setActivePetId}
            schedule={schedule}
            familyMembers={familyMembers}
            walkHistory={walkHistory}
            onStartWalk={handleStartWalkClick}
            onMarkComplete={handleMarkScheduleComplete}
            onNavigateTab={setActiveTab}
            onOpenAiModal={() => setIsAiModalOpen(true)}
            onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
          />
        )}

        {activeTab === 'planner' && (
          <WeeklyPlannerView
            schedule={schedule}
            pets={pets}
            familyMembers={familyMembers}
            onAddWalk={handleAddScheduleWalk}
            onDeleteWalk={handleDeleteScheduleWalk}
            onMarkComplete={handleMarkScheduleComplete}
            onStartWalk={handleStartWalkClick}
            onApplyBalancedSchedule={handleApplyBalancedSchedule}
          />
        )}

        {activeTab === 'tracker' && (
          <WalkTrackerView
            activePet={activePet}
            activeWalker={activeWalker}
            walkHistory={walkHistory}
            onSaveWalk={handleSaveWalk}
            initialWalkConfig={activeWalkConfig}
          />
        )}

        {activeTab === 'explore' && (
          <ExploreMapView
            onStartWalkWithPark={(park) => handleStartWalkClick({ parkName: park.name })}
            onScheduleWalkWithPark={(park) => {
              setActiveTab('planner');
              showToast(`Selected ${park.name}. Open 'Schedule Walk' to lock in slot!`);
            }}
          />
        )}

        {activeTab === 'community' && (
          <CommunityView
            communityUsers={communityUsers}
            messages={messages}
            onSendFriendRequest={handleSendFriendRequest}
            onAcceptRequest={handleAcceptFriendRequest}
            onDeclineRequest={handleDeclineFriendRequest}
            onSendMessage={handleSendMessage}
            onBlockUser={handleBlockUser}
            onReportUser={handleReportUser}
          />
        )}

        {activeTab === 'setup' && (
          <PetFamilySetupView
            pets={pets}
            familyMembers={familyMembers}
            onSavePet={handleSavePet}
            onDeletePet={handleDeletePet}
            onSaveMember={handleSaveFamilyMember}
            onDeleteMember={handleDeleteFamilyMember}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onResetData={handleResetData}
        onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* Global Modals */}
      <SafetyModal
        isOpen={isSafetyModalOpen}
        onClose={() => setIsSafetyModalOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />

      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        activePet={activePet}
      />

    </div>
  );
}
