// src/stores/useBooksStore.ts
import { createWithEqualityFn } from "zustand/traditional";
import type { Book } from "@models/book";

type BooksState = {
  books: Record<string, Book>;
  upsertBook: (book: Book) => void;
  updateBook: (id: string, patch: Partial<Book>) => void;
  removeBook: (id: string) => void;
};

export const useBooksStore = createWithEqualityFn<BooksState>()(
  (set) => ({
    books: {},

    upsertBook: (book) =>
      set((s) => ({
        books: {
          ...s.books,
          [book.id]: {
            ...book,
            updatedAt: Date.now(),
          },
        },
      })),

    updateBook: (id, patch) =>
      set((s) => {
        const prev = s.books[id];
        if (!prev) return s;
        return {
          books: {
            ...s.books,
            [id]: {
              ...prev,
              ...patch,
              updatedAt: Date.now(),
            },
          },
        };
      }),

    removeBook: (id) =>
      set((s) => {
        const next = { ...s.books };
        delete next[id];
        return { books: next };
      }),
  }),
  Object.is // default equality
);
