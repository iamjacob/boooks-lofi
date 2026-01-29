// src/stores/useAuthorsStore.ts
import { createWithEqualityFn } from "zustand/traditional";
import type { Author } from "@models/author";

// import {saveAuthor} from "../src/data/idb/authorsRepo"

type AuthorsState = {
  authors: Record<string, Author>;

  upsertAuthor: (author: Author) => void;
  updateAuthor: (id: string, patch: Partial<Author>) => void;
  removeAuthor: (id: string) => void;
};

export const useAuthorsStore = createWithEqualityFn<AuthorsState>()(
  (set) => ({
    authors: {},

    upsertAuthor: (author) =>
      set((s) => ({
        authors: {
          ...s.authors,
          [author.id]: {
            ...author,
            updatedAt: Date.now(),
          },
        },
      })),

    updateAuthor: (id, patch) =>
      set((s) => {
        const prev = s.authors[id];
        if (!prev) return s;
        return {
          authors: {
            ...s.authors,
            [id]: {
              ...prev,
              ...patch,
              updatedAt: Date.now(),
            },
          },
        };
      }),

    removeAuthor: (id) =>
      set((s) => {
        const next = { ...s.authors };
        delete next[id];
        return { authors: next };
      }),
  }),
  Object.is
);
