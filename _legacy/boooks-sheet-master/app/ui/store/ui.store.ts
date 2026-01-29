import { create } from "zustand";

/* -----------------------------
   Types
----------------------------- */

export type UIMode = "idle" | "moving" | "placing";

interface UIState {
  canvasActive: boolean;
  activeBookId: string | null;
  mode: UIMode;

  setCanvasActive: (v: boolean) => void;
  setMode: (mode: UIMode) => void;
  setActiveBookId: (id: string | null) => void;
}

/* -----------------------------
   Store
----------------------------- */

export const useUI = create<UIState>((set) => ({
  canvasActive: false,
  activeBookId: null,
  mode: "idle",

  setCanvasActive: (v) => set({ canvasActive: v }),
  setMode: (mode) => set({ mode }),
  setActiveBookId: (id) => set({ activeBookId: id }),
}));
