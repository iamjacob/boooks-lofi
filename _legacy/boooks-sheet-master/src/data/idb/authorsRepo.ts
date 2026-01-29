// src/data/idb/authorsRepo.ts
import { openDB, STORES } from "./db";
import type { Author } from "@models/author";

export async function loadAllAuthors(): Promise<Author[]> {
  const db = await openDB();
  const tx = db.transaction(STORES.authors, "readonly");
  const store = tx.objectStore(STORES.authors);

  return new Promise((resolve) => {
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
  });
}

export async function saveAuthor(author: Author) {
  const db = await openDB();
  const tx = db.transaction(STORES.authors, "readwrite");
  tx.objectStore(STORES.authors).put(author);
}
