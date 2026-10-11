import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { PUNE_PARKS } from '../../data/mockData';
import ParkDetailsDrawer from './ParkDetailsDrawer';
import { locationService } from '../../services/locationService';
import {
  Compass,
  MapPin,
  Trees,
  Coffee,
  Mountain,
  Navigation,
  Shield,
  Search,
  Layers,
  Sparkles
} from 'lucide-react';

export default function ExploreMapView({
  onStartWalkWithPark,
  onScheduleWalkWithPark
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersGroupRef = useRef(null);

  const [selectedPark, setSelectedPark] = useState(PUNE_PARKS[0]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationNotice, setLocationNotice] = useState(null);

  // Filter parks
  const filteredParks = PUNE_PARKS.filter((park) => {
    const matchesCategory =
      activeCategory === 'All' ||
      (activeCategory === 'Parks' && (park.category.includes('Garden') || park.category.includes('Community'))) ||
      (activeCategory === 'Trails' && (park.category.includes('Trail') || park.category.includes('Hill'))) ||
      (activeCategory === 'Cafes' && park.category.includes('Cafe'));

    const matchesSearch =
      park.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      park.locality.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Default centered on Pune Koregaon Park / Bund Garden
      const map = L.map(mapContainerRef.current, {
        center: [18.5362, 73.8940],
        zoom: 13,
        zoomControl: true,
        scrollWheelZoom: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersGroupRef.current = markersGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when filteredParks or selectedPark changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current) return;

    markersGroupRef.current.clearLayers();

    filteredParks.forEach((park) => {
      const isSelected = selectedPark?.id === park.id;

      // Custom Div Icon
      const markerHtml = `
        <div class="relative flex items-center justify-center cursor-pointer transition-transform duration-200 ${
          isSelected ? 'scale-125 z-50' : 'hover:scale-110 z-20'
        }">
          <div class="w-9 h-9 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white ${
            park.category.includes('Cafe')
              ? 'bg-amber-600 text-white'
              : park.category.includes('Hill')
              ? 'bg-stone-800 text-emerald-300'
              : 'bg-emerald-700 text-white'
          } ${isSelected ? 'ring-4 ring-emerald-400 ring-offset-2' : ''}">
            <span style="font-size: 16px;">🐾</span>
          </div>
          <div class="absolute -bottom-1 w-2 h-2 bg-stone-800 rotate-45"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-park-pin',
        html: markerHtml,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
      });

      const marker = L.marker([park.lat, park.lng], { icon: customIcon });

      marker.on('click', () => {
        setSelectedPark(park);
        mapInstanceRef.current.panTo([park.lat, park.lng], { animate: true });
      });

      marker.bindPopup(`
        <div style="font-family: inherit; padding: 4px; max-width: 200px;">
          <strong style="font-size: 13px; color: #1B4332;">${park.name}</strong>
          <div style="font-size: 11px; color: #64748B; margin-top: 2px;">📍 ${park.locality}</div>
          <div style="font-size: 11px; color: #047857; margin-top: 4px; font-weight: 600;">⭐ ${park.rating} • ${park.dogPolicy.slice(0, 30)}...</div>
        </div>
      `);

      markersGroupRef.current.addLayer(marker);
    });

    // If user location is active, add user pin
    if (userLocation) {
      const userMarkerHtml = `
        <div class="relative flex items-center justify-center">
          <div class="w-8 h-8 rounded-full bg-blue-600 border-3 border-white shadow-lg flex items-center justify-center text-white">
            <span style="font-size: 12px;">📍</span>
          </div>
          <div class="absolute w-12 h-12 rounded-full bg-blue-400/30 animate-ping pointer-events-none"></div>
        </div>
      `;
      const userIcon = L.divIcon({
        className: 'user-pin',
        html: userMarkerHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon });
      userMarker.bindPopup('<b>Your Approximate Location</b><br/>Pune, Maharashtra');
      markersGroupRef.current.addLayer(userMarker);
    }
  }, [filteredParks, selectedPark, userLocation]);

  // Handle locate me
  const handleLocateMe = async () => {
    setLocationLoading(true);
    setLocationNotice('Requesting approximate location in Pune...');
    try {
      const res = await locationService.getCurrentPosition();
      if (res.success && res.coords) {
        setUserLocation(res.coords);
        setLocationNotice('Location found! Showing Pune parks closest to you.');
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([res.coords.lat, res.coords.lng], 14, { animate: true });
        }
      } else {
        // Fallback to Pune center
        setUserLocation(res.coords);
        setLocationNotice(`Privacy mode: Set to Pune center (${res.coords.name || 'Koregaon Park'}).`);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([res.coords.lat, res.coords.lng], 13);
        }
      }
    } finally {
      setLocationLoading(false);
      setTimeout(() => setLocationNotice(null), 4000);
    }
  };

  const handleSelectPark = (park) => {
    setSelectedPark(park);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([park.lat, park.lng], 15, { animate: true });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full w-fit mb-2 border border-emerald-200/60">
            <Compass className="w-3.5 h-3.5" />
            <span>OpenStreetMap • Pune Dog-Friendly Directory</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-stone-900">
            Explore Green Trails & Dog Parks
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
            Verified shaded parks, hilltop treks, river walks, and pet-friendly cafes across Pune. Location permission is optional and only used to sort nearest spots.
          </p>
        </div>

        {/* Locate me button */}
        <button
          onClick={handleLocateMe}
          disabled={locationLoading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all shrink-0 cursor-pointer"
        >
          <Navigation className={`w-4 h-4 ${locationLoading ? 'animate-spin' : ''}`} />
          <span>{locationLoading ? 'Locating...' : 'Find Near Me'}</span>
        </button>
      </div>

      {/* Location notification banner if active */}
      {locationNotice && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Shield className="w-4 h-4 text-emerald-700" />
          <span>{locationNotice}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 text-xs font-semibold">
          {[
            { id: 'All', label: 'All Pune Spots', icon: Layers },
            { id: 'Parks', label: 'Botanical & Lawns', icon: Trees },
            { id: 'Trails', label: 'Tekdi Hill Trails', icon: Mountain },
            { id: 'Cafes', label: 'Pet Cafes', icon: Coffee }
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all shrink-0 ${
                  isActive
                    ? 'bg-emerald-800 text-white font-bold shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Pune locality or park..."
            className="w-full pl-9 pr-3 py-1.5 text-xs font-medium rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
          />
        </div>

      </div>

      {/* Main Map + Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Map Container */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-3xl p-3 border border-stone-200/90 shadow-sm relative overflow-hidden">
          <div
            ref={mapContainerRef}
            className="w-full h-[450px] sm:h-[540px] rounded-2xl z-10"
          ></div>

          {/* Privacy badge pill over map */}
          <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-200/80 shadow-md flex items-center gap-1.5 text-[11px] font-semibold text-stone-700">
            <Shield className="w-3.5 h-3.5 text-emerald-700" />
            <span>Fuzzy Radius Privacy Active</span>
          </div>
        </div>

        {/* Sidebar: Selected Park Details or List */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          {selectedPark ? (
            <ParkDetailsDrawer
              park={selectedPark}
              onClose={() => setSelectedPark(null)}
              onStartWalkHere={(p) => onStartWalkWithPark(p)}
              onScheduleWalkHere={(p) => onScheduleWalkWithPark(p)}
            />
          ) : (
            <div className="bg-white rounded-3xl p-6 border border-stone-200 text-center">
              <Compass className="w-10 h-10 text-stone-300 mx-auto mb-2" />
              <p className="text-xs text-stone-500">Click on any marker on the map to view detailed dog guidelines and amenities.</p>
            </div>
          )}

          {/* Park cards mini list */}
          <div className="bg-white rounded-3xl p-4 border border-stone-200/90 shadow-2xs space-y-2 max-h-72 overflow-y-auto">
            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider px-2 mb-1">
              Pune Locations ({filteredParks.length})
            </div>
            {filteredParks.map((park) => (
              <div
                key={park.id}
                onClick={() => handleSelectPark(park)}
                className={`p-2.5 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-all ${
                  selectedPark?.id === park.id
                    ? 'bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold'
                    : 'hover:bg-stone-50 text-stone-700 border border-transparent'
                }`}
              >
                <div>
                  <div className="font-bold">{park.name}</div>
                  <div className="text-[11px] text-stone-400 font-normal">📍 {park.locality}</div>
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold shrink-0">⭐ {park.rating}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
