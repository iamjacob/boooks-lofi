'use client'

import { usePlacementStore } from '../store/usePlacementStore'

const TYPES = [
  { id: 'read', label: '📖 Read here' },
  { id: 'buy', label: '🛒 Buy books' },
  { id: 'library', label: '🏛️ Library' },
  { id: 'event', label: '🎪 Event' },
]

export default function ConfirmLocation() {
  const { placing, draft, confirm, cancel } =
    usePlacementStore()

  if (!placing || !draft) return null

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2
                    bg-black/70 text-white rounded-xl p-3
                    backdrop-blur shadow-lg space-y-2">

      <div className="text-sm opacity-80">
        Choose location type
      </div>

      <div className="flex gap-2">
        {TYPES.map(t => (
          <button
            key={t.id}
            onClick={() => confirm(t.id)}
            className="px-3 py-1 rounded bg-white/10
                       hover:bg-white/20"
          >
            {t.label}
          </button>
        ))}
      </div>

      <button
        onClick={cancel}
        className="text-xs opacity-70 underline"
      >
        Cancel
      </button>
    </div>
  )
}
