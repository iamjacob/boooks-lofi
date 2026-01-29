// src/data/idb/booksRepo.ts
import { openDB, STORES } from "./db";
import type { Book } from "@models/book";

export async function loadAllBooks(): Promise<Book[]> {
  const db = await openDB();
  const tx = db.transaction(STORES.books, "readonly");
  const store = tx.objectStore(STORES.books);

  return new Promise((resolve) => {
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
  });
}

export async function saveBook(book: Book) {
  const db = await openDB();
  const tx = db.transaction(STORES.books, "readwrite");
  tx.objectStore(STORES.books).put(book);
}
