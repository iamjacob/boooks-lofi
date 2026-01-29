'use client'

import { useMap } from 'react-map-gl/maplibre'
import { Circle, Target, Tornado } from "lucide-react";

//GET USERS HOME POSITION! :D

/**
 * Fly camera back to "home" position
 * (your personal anchor in the world)
 */
export default function Home() {
  const { current: mapRef } = useMap()

  const flyHome = () => {
    const map = mapRef?.getMap()
    if (!map) return

    map.flyTo({
      center: [9.55368,55.707813], // 👈 CHANGE to your home lng/lat
      zoom: 17,
      bearing: -70,
      pitch: 72, // Pokémon GO-ish
      speed: 1.2,
      curve: 1.4,
      easing: (t) => t,
    })
  }

  return (
    <div className="ui-panel">
      <button 
    className="p-2 rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex-col gap-1"
      
      onClick={flyHome}><Tornado className="text-black/60" strokeWidth={1.5}/></button>
    </div>
  )
}
