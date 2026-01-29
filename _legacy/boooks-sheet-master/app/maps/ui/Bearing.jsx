'use client'

import { RotateCcw, RotateCw } from 'lucide-react'
import { useMap } from 'react-map-gl/maplibre'

export default function Bearing() {
  const { current: mapRef } = useMap()

  const rotate = (deg) => {
    const map = mapRef?.getMap()
    if (!map) return
    map.easeTo({
      bearing: map.getBearing() + deg,
      duration: 300,
    })
  }

  return (
    <div className="absolute flex flex-col gap-2">
      <button 
    className="relative right-4 p-1 rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex-col gap-1"
      
      onClick={() => rotate(-15)}>
        {/* <RotateCcw strokeWidth={1.5}/> */}
        
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-cw-icon lucide-refresh-cw rotate-90"><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
        </button>
      <button 
    className="relative left-4 p-1 rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex-col gap-1"
      
      onClick={() => rotate(15)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-cw-icon lucide-refresh-cw rotate-90"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
        
        {/* <RotateCw strokeWidth={1.5}/>*/}
        </button> 
    </div>
  )
}
