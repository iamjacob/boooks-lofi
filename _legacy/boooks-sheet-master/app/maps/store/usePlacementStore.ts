
import { create } from 'zustand'
/* ---------- Types ---------- */

export type LocationType =
  | 'read'
  | 'buy'
  | 'library'
  | 'event'
  | 'other'

  

export type DraftLocation = {
  id: string
  lat: number
  lng: number
  type?: LocationType
  title?: string
  note?: string
}

export type Location = {
  id: string
  lat: number
  lng: number
  type: LocationType
  title?: string
  note?: string
}

/* ---------- State ---------- */

type State = {
  placing: boolean
  drafts: DraftLocation[]
  activeDraftId: string | null
  locations: Location[]

  startPlacing: () => void
  addDraft: (lat: number, lng: number) => void
  updateDraft: (id: string, data: Partial<DraftLocation>) => void
  cancelDraft: (id: string) => void
  confirmDraft: (id: string) => void
}

/* ---------- ID helper (no deps) ---------- */

let draftCounter = 0
const createDraftId = () => `draft-${Date.now()}-${++draftCounter}`

/* ---------- Store ---------- */

export const usePlacementStore = create<State>((set, get) => ({
  placing: false,
  drafts: [],
  activeDraftId: null,
  locations: [],

  startPlacing: () =>
    set({ placing: true }),

  addDraft: (lat, lng) => {
    const id = createDraftId()

    set(state => ({
      drafts: [...state.drafts, { id, lat, lng }],
      activeDraftId: id,
      placing: false,
    }))
  },

  updateDraft: (id, data) =>
    set(state => ({
      drafts: state.drafts.map(d =>
        d.id === id ? { ...d, ...data } : d
      ),
    })),

  cancelDraft: (id) =>
    set(state => ({
      drafts: state.drafts.filter(d => d.id !== id),
      activeDraftId: null,
    })),

  confirmDraft: (id) => {
    const { drafts, locations } = get()
    const draft = drafts.find(d => d.id === id)
    if (!draft || !draft.type) return

    const confirmed: Location = {
      id: draft.id,
      lat: draft.lat,
      lng: draft.lng,
      type: draft.type,
      title: draft.title,
      note: draft.note,
    }

    set({
      locations: [...locations, confirmed],
      drafts: drafts.filter(d => d.id !== id),
      activeDraftId: null,
    })
  },
}))
