# PawPlan — From Screen Time to Green Time 🌿🐾

**PawPlan** is a modern, responsive web application built with **React, Vite, Tailwind CSS, and Leaflet (OpenStreetMap)** designed for pet parents in **Pune, Maharashtra, India**. It encourages dog owners to swap sedentary phone screen time for healthy outdoor trail time, coordinate pet care across household members, and build a trusted local pet community.

---

## ✨ Features

1. **Dashboard (Screen Time to Green Time):**
   - Outdoor Wellbeing Ratio: Compares daily phone screen hours against outdoor green trail minutes.
   - Pune Walking Advisory: Weather condition (27°C, AQI 68), pavement heat warning, and sunset times.
   - Active Pet Snapshot: Instant toggle between pets (*Sheru* - Indie, *Bella* - Golden Retriever).
   - Upcoming scheduled walks and quick actions.

2. **Weekly Walk Planner & Auto-Balancer:**
   - 7-Day interactive schedule across Morning, Afternoon, Evening, and Night slots.
   - Smart household auto-balance algorithm: Redistributes walks fairly based on family availability.
   - Filters by day or assigned walker with completion tracking.

3. **Explore Nearby (Pune, OpenStreetMap):**
   - Native Leaflet map with curated Pune spots: Empress Botanical Garden, Jogger's Park Kalyani Nagar, Vetal Tekdi / ARAI Hill Trek, Baner-Pashan Biodiversity Park, Bund Garden, and Where Else Diner.
   - Filter by Botanical Gardens, Tekdi Hill Trails, and Pet Cafes.
   - Details drawer with dog rules, amenities, and Google Maps directions.
   - Optional, permission-aware geolocation with fuzzy privacy radius.

4. **Live GPS Walk Tracker:**
   - Live duration timer, GPS distance (km), average pace, and green paws earned.
   - Interactive live Leaflet trail route with animated dog marker.
   - Walk completion modal with celebratory confetti (`canvas-confetti`), notes logger, and memory photo attachment.
   - Walk history log with timestamps and stats.

5. **Pet Community & Social Network:**
   - Connect with dog parents across Koregaon Park, Kalyani Nagar, Viman Nagar, Baner, and Aundh.
   - Mutual friend request system with accept/decline flows.
   - Direct messaging UI with simulated instant replies and quick meetup invitations.

6. **Privacy & Safety Shield:**
   - Exact home coordinates are kept private by default (only neighborhood radius displayed).
   - Mutual request required before messaging.
   - Block and report user tools.
   - 24/7 Pune Emergency Veterinary Hotlines (RESQ, Crown Vet, Government Polyclinic Aundh).

7. **AI Outdoor Copilot:**
   - Ready for local open-weight AI via **Ollama (`llama3:8b`)** or Python FastAPI backend.
   - Live guidance on Pune pavement heat, Tekdi trekking checklists, and street pack safety.

---

## 🛠️ Tech Stack

- **Frontend:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons:** Lucide React (`lucide-react`)
- **Maps:** Leaflet & OpenStreetMap (`leaflet`, `react-leaflet`)
- **Celebration Effects:** `canvas-confetti`
- **Data & State:** Modular `storageService` with `localStorage` persistence and fallback mock data.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build
```

The app is accessible at `http://localhost:5173/`.
