// src/data/idb/db.ts
const DB_NAME = "boooks";
const DB_VERSION = 1;

export const STORES = {
  books: "books",
  authors: "authors",
};

export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;

      if (!db.objectStoreNames.contains(STORES.books)) {
        db.createObjectStore(STORES.books, { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains(STORES.authors)) {
        db.createObjectStore(STORES.authors, { keyPath: "id" });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
