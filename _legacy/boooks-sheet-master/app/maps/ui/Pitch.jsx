'use client'

import { CornerLeftDown, CornerRightUp,CornerRightDown } from 'lucide-react'
import { useMap } from 'react-map-gl/maplibre'

const MAX_PITCH = 75

export default function Pitch() {
  const { current: mapRef } = useMap()

  const setPitch = (value) => {
    const map = mapRef?.getMap()
    if (!map) return

    map.easeTo({
      pitch: value,
      duration: 300,
    })
  }

  const increase = () => {
    const map = mapRef?.getMap()
    if (!map) return
    setPitch(Math.min(MAX_PITCH, map.getPitch() + 10))
  }

  const decrease = () => {
    const map = mapRef?.getMap()
    if (!map) return
    setPitch(Math.max(0, map.getPitch() - 10))
  }

  const reset = () => {
    setPitch(0)
  }

  /**
   * RESET → REVERSE
   * Example:
   *  20° → 55°
   *  30° → 45°
   *  60° → 15°
   */
  const reverse = () => {
    const map = mapRef?.getMap()
    if (!map) return

    const current = map.getPitch()
    const inverted = MAX_PITCH - current

    setPitch(inverted)
  }

  return (
    <div className="flex flex-col gap-2">
      <button 
    className="p-2 rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex-col gap-1"

      onClick={increase}><CornerRightUp strokeWidth={1.5}/></button>
      <button 
    className="p-2 rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex-col gap-1"

      onClick={decrease}><CornerRightDown strokeWidth={1.5}/></button>
{/* ⤴⤵
      <button onClick={reset}>⬇️</button>
      <button onClick={reverse}>🔁</button> */}
    </div>
  )
}
