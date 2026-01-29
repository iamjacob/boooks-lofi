'use client'
import { useMap } from 'react-map-gl/maplibre'
import { Camera } from "lucide-react";

export default function Screenshot() {
  const { current: mapRef } = useMap()

  const capture = async () => {
    const map = mapRef?.getMap()
    if (!map) return

    // Wait until map is fully rendered
    await new Promise(resolve => map.once('idle', resolve))

    const canvas = map.getCanvas()
    const dataUrl = canvas.toDataURL('image/png')

    const a = document.createElement('a')
    a.href = dataUrl
    a.download = 'map.png'
    a.click()
  }

  return (
    <div className="ui-panel">
      <button 
    className="p-2 rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex-col gap-1"
      onClick={capture}><Camera strokeWidth={1.5}/></button>
    </div>
  )
}
