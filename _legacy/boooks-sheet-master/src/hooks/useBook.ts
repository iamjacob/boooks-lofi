// src/hooks/useBook.ts
import { shallow } from "zustand/shallow";
import { useBookField } from "./useBookField";

export const useBook = (id: string) =>
  useBookField(id, (b) => b, shallow);
