import { BookListItem } from "@/ui/models/bookListItem";
import { UserBook } from "@/core/models/userBook";
import { Shelf } from "@/core/models/shelf";
import { IndexedDBAdapter } from "@/storage/idb";
import { storageKeys } from "@/storage/keys";
import { ID } from "@/core/ids/id";

const adapter = new IndexedDBAdapter();
/* ---------------- COLLECTIONS (FASE 1 STUB) ---------------- */

export type Collection = {
  id: string;
  shelfId: string;
  title: string;
};

export async function loadCollections(
  _userId: string,
  _shelfId: string
): Promise<Collection[]> {
  // Phase 1: no collections yet
  return [];
}

/* ---------------- BOOKS (GLOBAL) ---------------- */

export async function loadBooks(): Promise<BookListItem[]> {
  return (await adapter.get<BookListItem[]>(storageKeys.books)) ?? [];
}

export async function saveBook(book: BookListItem): Promise<void> {
  const books = (await loadBooks()) ?? [];
  const i = books.findIndex((b) => b.id === book.id);

  if (i >= 0) books[i] = book;
  else books.push(book);

  await adapter.set(storageKeys.books, books);
}

/* ---------------- USER BOOKS (PER USER) ---------------- */

export async function loadUserBooks(userId: ID): Promise<UserBook[]> {
  return (
    (await adapter.get<UserBook[]>(storageKeys.userBooks(userId))) ?? []
  );
}

export async function saveUserBook(userBook: UserBook): Promise<void> {
  if (!userBook.userId) {
    throw new Error("saveUserBook: userBook.userId is required");
  }

  const userId = userBook.userId;
  const list = (await loadUserBooks(userId)) ?? [];
  const i = list.findIndex((x) => x.id === userBook.id);

  if (i >= 0) list[i] = userBook;
  else list.push(userBook);

  await adapter.set(storageKeys.userBooks(userId), list);
}

/* ---------------- SHELVES (PER USER) ---------------- */

export async function loadShelves(userId: ID): Promise<Shelf[]> {
  return (
    (await adapter.get<Shelf[]>(storageKeys.shelves(userId))) ?? []
  );
}
