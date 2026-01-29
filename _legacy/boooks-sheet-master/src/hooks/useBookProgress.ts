// src/hooks/useBookProgress.ts
import { useBookField } from "./useBookField";

export const useBookProgress = (id: string) =>
  useBookField(id, (b) => b?.progress ?? 0);
