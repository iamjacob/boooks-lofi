import { BookListItem } from "@/ui/models/bookListItem";
import { UserBook } from "@/core/models/userBook";

const DB_NAME = "boooks-library";
const DB_VERSION = 1;

const BOOK_STORE = "books";
const USER_BOOK_STORE = "userBooks";

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
