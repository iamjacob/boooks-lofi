// src/hooks/useBookTitle.ts
import { useBookField } from "./useBookField";

export const useBookTitle = (id: string) =>
  useBookField(id, (b) => {
  if (!b) return "";
  return b.title ?? "";
});

