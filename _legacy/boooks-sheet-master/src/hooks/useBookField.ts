// src/hooks/useBookField.ts
import { useBooksStore } from "@stores/useBooksStore";
import type { Book } from "@models/book";

export function useBookField<T>(
  bookId: string,
  selector: (book: Book | undefined) => T,
  equalityFn: (a: T, b: T) => boolean = Object.is
) {
  return useBooksStore(
    (state) => selector(state.books[bookId]),
    equalityFn
  );
}
