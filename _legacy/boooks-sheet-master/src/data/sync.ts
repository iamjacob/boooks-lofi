// src/data/sync.ts
import { useBooksStore } from "@/src/stores/useBooksStore";
import { useAuthorsStore } from "@/src/stores/useAuthorsStore";
import { loadAllBooks, saveBook } from "./idb/booksRepo";
import { loadAllAuthors, saveAuthor } from "./idb/authorsRepo";

export async function bootstrapFromIDB() {
  const { upsertBook } = useBooksStore.getState();
  const { upsertAuthor } = useAuthorsStore.getState();

  for (const book of await loadAllBooks()) upsertBook(book);
  for (const author of await loadAllAuthors()) upsertAuthor(author);
}

export function attachPersistence() {
  const unsubBooks = useBooksStore.subscribe((state) => {
    Object.values(state.books).forEach(saveBook);
  });

  const unsubAuthors = useAuthorsStore.subscribe((state) => {
    Object.values(state.authors).forEach(saveAuthor);
  });

  return () => {
    unsubBooks();
    unsubAuthors();
  };
}
