// Mock Data for PawPlan - Pune, Maharashtra, India

export const INITIAL_PETS = [
  {
    id: 'pet-1',
    name: 'Sheru',
    breed: 'Indie (Indian Pariah)',
    age: '2.5 yrs',
    weight: '19 kg',
    energyLevel: 'High', // Low, Moderate, High, Athletic
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    bio: 'Rescued from FC Road Pune! Super friendly, loves chasing tennis balls and meeting other Indies.',
    gender: 'Male',
    vaccinated: true,
    microchipped: true,
    favoriteParks: ['Vetal Tekdi Trail', 'Bund Garden'],
    dailyWalkGoalMins: 60,
    tags: ['Super Social', 'Fast Sprinter', 'Loves Car Rides']
  },
  {
    id: 'pet-2',
    name: 'Bella',
    breed: 'Golden Retriever',
    age: '3 yrs',
    weight: '28 kg',
    energyLevel: 'Moderate',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80',
    bio: 'Gentle soul from Koregaon Park. Loves gentle lake walks, sniffing flowers, and playing with puppies.',
    gender: 'Female',
    vaccinated: true,
    microchipped: true,
    favoriteParks: ['Jogger’s Park Kalyani Nagar', 'Empress Botanical Garden'],
    dailyWalkGoalMins: 45,
    tags: ['Kid Friendly', 'Gentle', 'Water Lover']
  }
];

export const INITIAL_FAMILY = [
  {
    id: 'fam-1',
    name: 'Aarav Vyavahare',
    role: 'Primary Caretaker',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    availability: {
      morning: true, // 6:30 AM - 8:00 AM
      afternoon: false,
      evening: true, // 6:00 PM - 7:30 PM
      weekend: true
    },
    weeklyWalksAssigned: 7,
    completedThisWeek: 4,
    phone: '+91 98220 12345',
    notes: 'Morning sprint walker, usually handles Vetal Tekdi hill treks on weekends.'
  },
  {
    id: 'fam-2',
    name: 'Pooja Vyavahare',
    role: 'Co-Caretaker',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    availability: {
      morning: false,
      afternoon: false,
      evening: true, // 5:30 PM - 7:00 PM
      weekend: true
    },
    weeklyWalksAssigned: 4,
    completedThisWeek: 3,
    phone: '+91 98220 54321',
    notes: 'Evening neighborhood walker, loves taking Sheru to dog-friendly cafes.'
  },
  {
    id: 'fam-3',
    name: 'Ramesh Kaka',
    role: 'Family Member',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    availability: {
      morning: true, // 7:00 AM - 8:00 AM
      afternoon: false,
      evening: false,
      weekend: false
    },
    weeklyWalksAssigned: 3,
    completedThisWeek: 2,
    phone: '+91 98220 99887',
    notes: 'Gentle pace morning walker around lane 5 Koregaon Park.'
  }
];

export const INITIAL_SCHEDULE = [
  {
    id: 'sch-1',
    day: 'Monday',
    date: '2026-10-12',
    slot: 'Morning',
    time: '06:45 AM',
    petId: 'pet-1',
    petName: 'Sheru',
    walkerId: 'fam-1',
    walkerName: 'Aarav Vyavahare',
    parkName: 'Koregaon Park Lane 7 River Trail',
    targetMins: 35,
    status: 'Completed', // 'Completed', 'Scheduled', 'In Progress'
    actualMins: 38,
    distanceKm: 2.4,
    pointsEarned: 50
  },
  {
    id: 'sch-2',
    day: 'Monday',
    date: '2026-10-12',
    slot: 'Evening',
    time: '06:00 PM',
    petId: 'pet-1',
    petName: 'Sheru',
    walkerId: 'fam-2',
    walkerName: 'Pooja Vyavahare',
    parkName: 'Jogger’s Park Kalyani Nagar',
    targetMins: 30,
    status: 'Completed',
    actualMins: 32,
    distanceKm: 1.9,
    pointsEarned: 45
  },
  {
    id: 'sch-3',
    day: 'Tuesday',
    date: '2026-10-13',
    slot: 'Morning',
    time: '07:00 AM',
    petId: 'pet-1',
    petName: 'Sheru',
    walkerId: 'fam-3',
    walkerName: 'Ramesh Kaka',
    parkName: 'Koregaon Park Perimeter Trail',
    targetMins: 25,
    status: 'Completed',
    actualMins: 25,
    distanceKm: 1.5,
    pointsEarned: 35
  },
  {
    id: 'sch-4',
    day: 'Tuesday',
    date: '2026-10-13',
    slot: 'Evening',
    time: '06:15 PM',
    petId: 'pet-1',
    petName: 'Sheru',
    walkerId: 'fam-1',
    walkerName: 'Aarav Vyavahare',
    parkName: 'Empress Botanical Garden',
    targetMins: 40,
    status: 'Scheduled',
    actualMins: null,
    distanceKm: null,
    pointsEarned: 0
  },
  {
    id: 'sch-5',
    day: 'Wednesday',
    date: '2026-10-14',
    slot: 'Morning',
    time: '06:30 AM',
    petId: 'pet-1',
    petName: 'Sheru',
    walkerId: 'fam-1',
    walkerName: 'Aarav Vyavahare',
    parkName: 'Vetal Tekdi Hill Trail',
    targetMins: 45,
    status: 'Scheduled',
    actualMins: null,
    distanceKm: null,
    pointsEarned: 0
  },
  {
    id: 'sch-6',
    day: 'Wednesday',
    date: '2026-10-14',
    slot: 'Evening',
    time: '05:45 PM',
    petId: 'pet-1',
    petName: 'Sheru',
    walkerId: 'fam-2',
    walkerName: 'Pooja Vyavahare',
    parkName: 'Jogger’s Park Kalyani Nagar',
    targetMins: 30,
    status: 'Scheduled',
    actualMins: null,
    distanceKm: null,
    pointsEarned: 0
  },
  {
    id: 'sch-7',
    day: 'Thursday',
    date: '2026-10-15',
    slot: 'Morning',
    time: '07:00 AM',
    petId: 'pet-1',
    petName: 'Sheru',
    walkerId: 'fam-3',
    walkerName: 'Ramesh Kaka',
    parkName: 'Koregaon Park Green Boulevard',
    targetMins: 25,
    status: 'Scheduled',
    actualMins: null,
    distanceKm: null,
    pointsEarned: 0
  },
  {
    id: 'sch-8',
    day: 'Friday',
    date: '2026-10-16',
    slot: 'Evening',
    time: '06:00 PM',
    petId: 'pet-1',
    petName: 'Sheru',
    walkerId: 'fam-1',
    walkerName: 'Aarav Vyavahare',
    parkName: 'Bund Garden Promenade',
    targetMins: 35,
    status: 'Scheduled',
    actualMins: null,
    distanceKm: null,
    pointsEarned: 0
  },
  {
    id: 'sch-9',
    day: 'Saturday',
    date: '2026-10-17',
    slot: 'Morning',
    time: '06:15 AM',
    petId: 'pet-1',
    petName: 'Sheru',
    walkerId: 'fam-1',
    walkerName: 'Aarav Vyavahare',
    parkName: 'Baner-Pashan Biodiversity Park',
    targetMins: 60,
    status: 'Scheduled',
    actualMins: null,
    distanceKm: null,
    pointsEarned: 0
  },
  {
    id: 'sch-10',
    day: 'Sunday',
    date: '2026-10-18',
    slot: 'Morning',
    time: '07:30 AM',
    petId: 'pet-1',
    petName: 'Sheru',
    walkerId: 'fam-2',
    walkerName: 'Pooja Vyavahare',
    parkName: 'The French Window Patisserie Pet Trail',
    targetMins: 45,
    status: 'Scheduled',
    actualMins: null,
    distanceKm: null,
    pointsEarned: 0
  }
];

export const PUNE_PARKS = [
  {
    id: 'park-1',
    name: 'Empress Botanical Garden',
    locality: 'Near Race Course, Camp / Wanowrie',
    city: 'Pune',
    lat: 18.5147,
    lng: 73.8967,
    rating: 4.8,
    reviewsCount: 312,
    dogPolicy: 'Dogs Allowed on Leash (Morning hours recommended)',
    category: 'Botanical Garden & Heritage Park',
    features: ['Lush Shaded Canopies', 'Clean Walking Tracks', 'Fresh Water Stations', 'Ample Parking'],
    distanceKm: 2.8,
    recommendedSlots: ['06:00 AM - 08:30 AM', '04:30 PM - 06:30 PM'],
    safetyNotes: 'Large trees provide deep shade. Keep pets leashed near the flower nurseries.',
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80',
    surface: 'Natural Soil & Paved Pathways'
  },
  {
    id: 'park-2',
    name: 'Jogger’s Park & Dog Walkers Lane',
    locality: 'Kalyani Nagar',
    city: 'Pune',
    lat: 18.5471,
    lng: 73.9022,
    rating: 4.7,
    reviewsCount: 245,
    dogPolicy: 'Dedicated Pet Walkers Avenue & Perimeter Green Track',
    category: 'Community Park',
    features: ['Dog Play Groups', 'Disposal Bins', 'Benches for Seniors', 'Street Lighting'],
    distanceKm: 1.4,
    recommendedSlots: ['06:30 AM - 08:30 AM', '05:30 PM - 07:30 PM'],
    safetyNotes: 'Very popular with golden retrievers & beagles! Great for socialization.',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=600&q=80',
    surface: 'Clay Track & Grass Lawns'
  },
  {
    id: 'park-3',
    name: 'Vetal Tekdi (ARAI Hill Trek)',
    locality: 'Kothrud / Senapati Bapat Road',
    city: 'Pune',
    lat: 18.5284,
    lng: 73.8189,
    rating: 4.9,
    reviewsCount: 520,
    dogPolicy: 'Open Hillside Nature Trails (Leash recommended for steep slopes)',
    category: 'Hilltop Nature Trail',
    features: ['Scenic 360° Pune View', 'High Calorie Burn', 'Natural Rocky Trails', 'Bird Watching'],
    distanceKm: 6.2,
    recommendedSlots: ['06:00 AM - 08:00 AM (Sunrise view)'],
    safetyNotes: 'Carry portable water bowl. Watch out for rocky ledges and peacocks.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
    surface: 'Natural Hill Stone & Mud Trail'
  },
  {
    id: 'park-4',
    name: 'Baner-Pashan Biodiversity Park',
    locality: 'Pashan / Baner',
    city: 'Pune',
    lat: 18.5479,
    lng: 73.7845,
    rating: 4.6,
    reviewsCount: 189,
    dogPolicy: 'Permitted on Marked Walking Trails',
    category: 'Biodiversity Reserve',
    features: ['Pashan Lake View', 'Quiet Grasslands', 'Wild Flora', 'Zero Traffic Zones'],
    distanceKm: 7.5,
    recommendedSlots: ['06:30 AM - 09:00 AM'],
    safetyNotes: 'Keep pet away from muddy lake edge. Very serene environment.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    surface: 'Gravel & Dirt Path'
  },
  {
    id: 'park-5',
    name: 'Bund Garden Riverfront Promenade',
    locality: 'Yerawada / Sangamwadi',
    city: 'Pune',
    lat: 18.5367,
    lng: 73.8824,
    rating: 4.4,
    reviewsCount: 160,
    dogPolicy: 'Allowed on Promenade walkways',
    category: 'Riverfront Park',
    features: ['Cool Mula-Mutha River Breeze', 'Historic Benches', 'Shaded Gazebos'],
    distanceKm: 3.1,
    recommendedSlots: ['05:00 PM - 07:00 PM'],
    safetyNotes: 'Good evening spot. Stay on well-lit paved areas.',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=600&q=80',
    surface: 'Paved Tiles'
  },
  {
    id: 'park-6',
    name: 'Where Else Diner & Pet Friendly Courtyard',
    locality: 'Viman Nagar',
    city: 'Pune',
    lat: 18.5679,
    lng: 73.9143,
    rating: 4.8,
    reviewsCount: 410,
    dogPolicy: 'Pet-Friendly Outdoor Dining & Social Garden',
    category: 'Pet Cafe & Social Spot',
    features: ['Special Dog Menu (Boiled Chicken, Pup-cakes)', 'Water Bowls Provided', 'Fenced Patio'],
    distanceKm: 3.6,
    recommendedSlots: ['11:00 AM - 09:00 PM'],
    safetyNotes: 'Great post-walk brunch spot to socialize your pet.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    surface: 'Artificial Turf & Courtyard Pavers'
  }
];

export const INITIAL_COMMUNITY_USERS = [
  {
    id: 'user-1',
    name: 'Dr. Meera Kulkarni',
    neighborhood: 'Koregaon Park (Lane 5)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    distance: '0.8 km away',
    pet: {
      name: 'Bella',
      breed: 'Labrador Retriever',
      age: '3 yrs',
      gender: 'Female',
      energy: 'Moderate',
      photo: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=400&q=80'
    },
    interests: ['Evening Calm Walks', 'Obedience Practice', 'Weekend Pet Brunches'],
    bio: 'Veterinarian & dog lover. Bella loves gentle strolls and greeting gentle dogs.',
    relationshipStatus: 'friends', // 'friends', 'pending_outgoing', 'pending_incoming', 'none'
    verified: true,
    mutualWalksCount: 4,
    lastActive: '10 mins ago'
  },
  {
    id: 'user-2',
    name: 'Rohan Deshmukh',
    neighborhood: 'Kalyani Nagar',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    distance: '1.4 km away',
    pet: {
      name: 'Simba',
      breed: 'Indie Hound Mix',
      age: '1.8 yrs',
      gender: 'Male',
      energy: 'High',
      photo: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80'
    },
    interests: ['Tekdi Trekking', 'Frisbee Catch', 'Pack Walks'],
    bio: 'Software engineer in Magarpatta. Looking for high-energy buddies to burn Sheru and Simba’s energy!',
    relationshipStatus: 'friends',
    verified: true,
    mutualWalksCount: 2,
    lastActive: 'Just now'
  },
  {
    id: 'user-3',
    name: 'Tanvi Shinde',
    neighborhood: 'Viman Nagar',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    distance: '2.6 km away',
    pet: {
      name: 'Oreo',
      breed: 'Shih Tzu',
      age: '4 yrs',
      gender: 'Male',
      energy: 'Low',
      photo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80'
    },
    interests: ['Grass Sniffing', 'Pet Cafe Outings', 'Short 20m strolls'],
    bio: 'Oreo prefers quiet lawns without loud honking. Enjoys calm companion walks.',
    relationshipStatus: 'pending_incoming', // incoming request for current user
    verified: false,
    mutualWalksCount: 0,
    lastActive: '2 hours ago'
  },
  {
    id: 'user-4',
    name: 'Vikram Joshi',
    neighborhood: 'Baner (Near Balewadi High St)',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    distance: '4.1 km away',
    pet: {
      name: 'Rocky',
      breed: 'Beagle',
      age: '2 yrs',
      gender: 'Male',
      energy: 'High',
      photo: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=400&q=80'
    },
    interests: ['Scent Trails', 'Playdates', 'Pashan Lake Walks'],
    bio: 'Rocky will smell every leaf in Pune! Always eager to meet fellow curious sniffers.',
    relationshipStatus: 'none',
    verified: true,
    mutualWalksCount: 0,
    lastActive: '1 hour ago'
  },
  {
    id: 'user-5',
    name: 'Ananya & Neha Iyer',
    neighborhood: 'Aundh (ITI Road)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    distance: '5.2 km away',
    pet: {
      name: 'Milo & Kulfi',
      breed: 'Golden Retriever & Indie Pup',
      age: '1 yr & 3 yrs',
      gender: 'Male & Female',
      energy: 'Athletic',
      photo: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=400&q=80'
    },
    interests: ['Weekend Pack Hikes', 'Agility Training', 'Pooch Socials'],
    bio: 'Double trouble! We organize Sunday morning pack walks around University campus & Tekdi.',
    relationshipStatus: 'none',
    verified: true,
    mutualWalksCount: 0,
    lastActive: 'Yesterday'
  }
];

export const INITIAL_MESSAGES = {
  'user-1': [
    {
      id: 'msg-1',
      senderId: 'user-1',
      text: 'Hi Aarav! Saw you and Sheru at Empress Garden yesterday. He looked so happy running across the lawn!',
      timestamp: 'Yesterday, 07:15 PM',
      read: true
    },
    {
      id: 'msg-2',
      senderId: 'current-user',
      text: 'Hey Dr. Meera! Yes, Sheru loves that place. The weather was so breezy. Is Bella doing well?',
      timestamp: 'Yesterday, 07:22 PM',
      read: true
    },
    {
      id: 'msg-3',
      senderId: 'user-1',
      text: 'She is great! Are you free for a joint evening walk at Jogger’s Park Kalyani Nagar tomorrow around 6:15 PM? We can let them sniff and play on the grass track.',
      timestamp: 'Today, 10:30 AM',
      read: true
    }
  ],
  'user-2': [
    {
      id: 'msg-4',
      senderId: 'user-2',
      text: 'Bhai, we are planning a Sunday sunrise trek to Vetal Tekdi at 6:15 AM. Sheru will love the upper plateau trails! Want to join?',
      timestamp: 'Today, 09:12 AM',
      read: true
    },
    {
      id: 'msg-5',
      senderId: 'current-user',
      text: 'Sounds amazing Rohan! Count me in. I’ll bring a collapsible water bowl and extra treats.',
      timestamp: 'Today, 09:40 AM',
      read: true
    }
  ]
};

export const EMERGENCY_PUNE_VETS = [
  {
    name: 'RESQ Wildlife & Pet Emergency Center',
    location: 'Bavdhan / Chandani Chowk, Pune',
    phone: '+91 98909 99975',
    hours: '24/7 Trauma Care',
    type: 'Emergency Hospital & Ambulance'
  },
  {
    name: 'Crown Vet Pune',
    location: 'Kalyani Nagar (Near Jogger’s Park)',
    phone: '+91 20 4860 1111',
    hours: '24 Hours Emergency Service',
    type: 'Multi-speciality Animal Hospital'
  },
  {
    name: 'Government Veterinary Polyclinic',
    location: 'Aundh / Range Hills, Pune',
    phone: '+91 20 2565 6777',
    hours: '08:00 AM - 08:00 PM',
    type: 'Civil Veterinary Care & Antirabies'
  }
];

export const PUNE_WEATHER_SUMMARY = {
  temp: '27°C',
  condition: 'Partly Sunny & Breezy',
  uvIndex: 'Moderate (Safe on paws)',
  airQuality: 'AQI 68 (Satisfactory)',
  sunsetTime: '06:14 PM',
  dogAdvice: 'Evening walking conditions are prime! Pavement temperature is pleasant. Carry 500ml water.'
};
