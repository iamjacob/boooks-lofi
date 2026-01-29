'use client'

import { MapPinPlus } from 'lucide-react'
import { usePlacementStore } from '../store/usePlacementStore'

export default function AddLocation() {
  const startPlacing = usePlacementStore(s => s.startPlacing)

  return (
    <div className="ui-panel">
      <button
        onClick={startPlacing}
        className="p-2 rounded-full bg-black/10 backdrop-blur
                   flex items-center justify-center shadow-lg
                   active:scale-90 transition-transform"
      >
        <MapPinPlus size={18} />
      </button>
    </div>
  )
}
