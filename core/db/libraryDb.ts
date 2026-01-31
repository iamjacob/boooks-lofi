import { BookListItem } from "@/ui/models/bookListItem";
import { UserBook } from "@/core/models/userBook";
import { Shelf } from "@/core/models/shelf";
import { StorageAdapter } from "@/storage/adapter";
import { storageKeys } from "@/storage/keys";
import { IndexedDBAdapter } from "@/storage/idb";
import { ID } from "@/core/ids/id";

const DB_NAME = "boooks-library";
const DB_VERSION = 1;

const BOOK_STORE = "books";
const USER_BOOK_STORE = "userBooks";

export type Collection = {
  id: string;
  shelfId: ID;
  title: string;
};

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;

      if (!db.objectStoreNames.contains(BOOK_STORE)) {
        db.createObjectStore(BOOK_STORE, { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains(USER_BOOK_STORE)) {
        db.createObjectStore(USER_BOOK_STORE, { keyPath: "id" });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function withStore<T>(
  storeName: string,
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest<T>
): Promise<T> {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, mode);
        const store = tx.objectStore(storeName);
        const req = fn(store);

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);

        tx.oncomplete = () => db.close();
        tx.onerror = () => {
          db.close();
          reject(tx.error);
        };
      })
  );
}

/* ---------------- BOOKS ---------------- */

export async function saveBook(book: BookListItem) {
  return withStore(BOOK_STORE, "readwrite", (s) => s.put(book));
}

export async function loadBooks(): Promise<BookListItem[]> {
  return withStore(BOOK_STORE, "readonly", (s) => s.getAll());
}

/* -------------- USER BOOKS -------------- */

export async function saveUserBook(userBook: UserBook) {
  return withStore(USER_BOOK_STORE, "readwrite", (s) => s.put(userBook));
}

export async function loadUserBooks(): Promise<UserBook[]> {
  return withStore(USER_BOOK_STORE, "readonly", (s) => s.getAll());
}


/**
 * Load shelves for a given user (offline-first).
 */
export async function loadShelves(userId: ID): Promise<Shelf[]> {
  const adapter: StorageAdapter = new IndexedDBAdapter();

  return (
    (await adapter.get<Shelf[]>(storageKeys.shelves(), {
      type: "user",
      userId,
    })) ?? []
  );
}

/**
 * Load collections for a shelf (LO-FI stub).
 */
export async function loadCollections(
  userId: ID,
  shelfId: ID
): Promise<Collection[]> {
  // 🔮 FUTURE:
  // load from storageKeys.collections(shelfId)

  return [];
}