import { create } from 'zustand'

export const useLiveLocation = create((set, get) => ({
  follow: false,
  // 1. Reactive state (for text displays, speedometers, etc.)
  geo: { lat: null, lng: null, speed: 0 },
  
  // 2. Silent state (for the smooth map loop)
  // We update this directly to bypass React's render cycle
  mutableGeo: { lat: 0, lng: 0, speed: 0, heading: 0 },

  setGeo: (newGeo) => {
    // Update the silent reference first (Fast)
    const state = get();
    state.mutableGeo.lat = newGeo.lat;
    state.mutableGeo.lng = newGeo.lng;
    state.mutableGeo.speed = newGeo.speed;
    state.mutableGeo.heading = newGeo.heading;

    // Update the reactive state (Slow - only if you need to show numbers on screen)
    // If the map is jumping, comment the line below out!
    set({ geo: newGeo });
  },

  toggleFollow: () => set((state) => ({ follow: !state.follow })),
}));