'use client'

import { useMap } from 'react-map-gl/maplibre'
import {
  Minus,
  Plus,
} from "lucide-react";

export default function Zoom() {
  const { current: mapRef } = useMap()

  const zoomBy = (delta) => {
    const map = mapRef?.getMap()
    if (!map) return
    map.easeTo({
      zoom: map.getZoom() + delta,
      duration: 300,
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <button 
    className="p-2 rounded-full bg-white/50 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex-col gap-1"
      onClick={() => zoomBy(1)}><Plus strokeWidth={1.5}/></button>
      <button 
    className="p-2 rounded-full bg-white/50 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex-col gap-1"
      
      onClick={() => zoomBy(-1)}><Minus strokeWidth={1.5}/></button>
    </div>
  )
}
