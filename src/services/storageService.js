import {
  INITIAL_PETS,
  INITIAL_FAMILY,
  INITIAL_SCHEDULE,
  INITIAL_COMMUNITY_USERS,
  INITIAL_MESSAGES
} from '../data/mockData';

const STORAGE_KEYS = {
  PETS: 'pawplan_pets',
  FAMILY: 'pawplan_family',
  SCHEDULE: 'pawplan_schedule',
  COMMUNITY: 'pawplan_community',
  MESSAGES: 'pawplan_messages',
  WALK_HISTORY: 'pawplan_walk_history',
  SETTINGS: 'pawplan_settings'
};

const DEFAULT_SETTINGS = {
  privacyMode: 'fuzzy', // 'fuzzy' (neighborhood only) or 'strict' (hidden)
  allowDirectMessages: 'mutual_only', // 'mutual_only' or 'everyone'
  shareWalkStats: true,
  pushAlerts: true,
  city: 'Pune',
  currentUserId: 'current-user',
  currentUserName: 'Aarav Vyavahare',
  currentUserArea: 'Koregaon Park, Pune'
};

export const storageService = {
  // Pets
  getPets: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PETS);
      return data ? JSON.parse(data) : INITIAL_PETS;
    } catch {
      return INITIAL_PETS;
    }
  },
  savePets: (pets) => {
    localStorage.setItem(STORAGE_KEYS.PETS, JSON.stringify(pets));
  },

  // Family Members
  getFamily: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAMILY);
      return data ? JSON.parse(data) : INITIAL_FAMILY;
    } catch {
      return INITIAL_FAMILY;
    }
  },
  saveFamily: (family) => {
    localStorage.setItem(STORAGE_KEYS.FAMILY, JSON.stringify(family));
  },

  // Schedule
  getSchedule: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
      return data ? JSON.parse(data) : INITIAL_SCHEDULE;
    } catch {
      return INITIAL_SCHEDULE;
    }
  },
  saveSchedule: (schedule) => {
    localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(schedule));
  },

  // Community Users
  getCommunityUsers: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMMUNITY);
      return data ? JSON.parse(data) : INITIAL_COMMUNITY_USERS;
    } catch {
      return INITIAL_COMMUNITY_USERS;
    }
  },
  saveCommunityUsers: (users) => {
    localStorage.setItem(STORAGE_KEYS.COMMUNITY, JSON.stringify(users));
  },

  // Messages
  getMessages: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return data ? JSON.parse(data) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  },
  saveMessages: (messages) => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  },

  // Walk History Log
  getWalkHistory: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WALK_HISTORY);
      return data ? JSON.parse(data) : [
        {
          id: 'walk-past-1',
          date: '2026-10-11',
          time: '07:10 AM',
          petName: 'Sheru',
          walkerName: 'Aarav Vyavahare',
          durationMins: 38,
          distanceKm: 2.6,
          pace: '14:36 /km',
          pawsEarned: 60,
          greenPoints: 120,
          parkName: 'Koregaon Park Lane 7 Trail',
          notes: 'Sheru met an indie friend and chased dry leaves. Calm energy afterwards!'
        },
        {
          id: 'walk-past-2',
          date: '2026-10-10',
          time: '06:00 PM',
          petName: 'Sheru',
          walkerName: 'Pooja Vyavahare',
          durationMins: 32,
          distanceKm: 2.1,
          pace: '15:14 /km',
          pawsEarned: 45,
          greenPoints: 90,
          parkName: 'Jogger’s Park Kalyani Nagar',
          notes: 'Great evening breeze. Good sniffing session along the grass edge.'
        }
      ];
    } catch {
      return [];
    }
  },
  saveWalkHistory: (history) => {
    localStorage.setItem(STORAGE_KEYS.WALK_HISTORY, JSON.stringify(history));
  },

  // Settings
  getSettings: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },
  saveSettings: (settings) => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  // Reset to default
  resetAll: () => {
    localStorage.removeItem(STORAGE_KEYS.PETS);
    localStorage.removeItem(STORAGE_KEYS.FAMILY);
    localStorage.removeItem(STORAGE_KEYS.SCHEDULE);
    localStorage.removeItem(STORAGE_KEYS.COMMUNITY);
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
    localStorage.removeItem(STORAGE_KEYS.WALK_HISTORY);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  }
};
