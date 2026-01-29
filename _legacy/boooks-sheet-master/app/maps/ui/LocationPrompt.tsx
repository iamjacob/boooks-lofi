"use client"

import { usePlacementStore } from "../store/usePlacementStore"
import {
  BookOpen,
  ShoppingCart,
  Library,
  Calendar,
  MoreHorizontal,
} from "lucide-react"

const TYPE_CONFIG = {
  read: {
    label: "Read",
    icon: BookOpen,
  },
  buy: {
    label: "Buy",
    icon: ShoppingCart,
  },
  library: {
    label: "Library",
    icon: Library,
  },
  event: {
    label: "Event",
    icon: Calendar,
  },
  other: {
    label: "Other",
    icon: MoreHorizontal,
  },
} as const

const TYPES = [
  "read",
  "buy",
  "library",
  "event",
  "other",
] as const

type DraftType = keyof typeof TYPE_CONFIG

type Draft = {
  id: string
  type?: DraftType
  title?: string
  note?: string
}

export default function LocationPrompt() {
  const {
    drafts,
    activeDraftId,
    updateDraft,
    confirmDraft,
    cancelDraft,
  } = usePlacementStore()

  const draft = drafts.find(d => d.id === activeDraftId)
  if (!draft) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10000 bg-white rounded-t-xl p-4 shadow-xl">
      <h3 className="font-semibold text-lg">Add place</h3>

      <input
        className="w-full mt-3 border p-2 rounded"
        placeholder="Title (optional)"
        value={draft.title ?? ''}
        onChange={(e) =>
          updateDraft(draft.id, { title: e.target.value })
        }
      />

      <textarea
        className="w-full mt-3 border p-2 rounded"
        placeholder="Note"
        value={draft.note ?? ''}
        onChange={(e) =>
          updateDraft(draft.id, { note: e.target.value })
        }
      />

      <div className="grid grid-cols-5 gap-2 mt-4">
  {TYPES.map((type) => {
    const { icon: Icon, label } = TYPE_CONFIG[type]
    const active = draft.type === type

    return (
      <button
        key={type}
        onClick={() => updateDraft(draft.id, { type })}
        className={`flex flex-col items-center justify-center gap-1 rounded-lg border p-2 text-xs transition
          ${
            active
              ? "bg-red-600 text-white border-red-600"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }
        `}
      >
        <Icon size={20} />
        <span>{label}</span>
      </button>
    )
  })}
</div>


      <div className="flex gap-2 mt-4">
        <button
          className="flex-1 bg-gray-200 rounded p-2"
          onClick={() => cancelDraft(draft.id)}
        >
          Cancel
        </button>

        <button
          className="flex-1 bg-red-600 text-white rounded p-2 disabled:opacity-50"
          disabled={!draft.type}
          onClick={() => confirmDraft(draft.id)}
        >
          Save
        </button>
      </div>
    </div>
  )
}
