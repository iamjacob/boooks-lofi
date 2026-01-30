// core/cache/adapters/indexedDb.adapter.ts

import type { CacheAdapter } from "../CacheAdapter";
import type { BookImageVariant } from "@/core/models/bookImage";

const DB_NAME = "boooks-cache";
const DB_VERSION = 1;
const STORE = "blobs";

type StoredBlob = {
  key: string;
  blob: Blob;
  createdAt: number;
  checksum?: string;
  width?: number;
  height?: number;
};

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "key" });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function withStore<T>(
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest<T>
): Promise<T> {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, mode);
        const store = tx.objectStore(STORE);
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

async function sha256(file: Blob): Promise<string | undefined> {
  // Works in modern browsers; if not available, checksum stays undefined.
  try {
    const buf = await file.arrayBuffer();
    const hash = await crypto.subtle.digest("SHA-256", buf);
    const bytes = new Uint8Array(hash);
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return undefined;
  }
}

function makeIdbUri(key: string) {
  return `idb://${encodeURIComponent(key)}`;
}

function parseIdbUri(uri: string) {
  if (!uri.startsWith("idb://")) return null;
  return decodeURIComponent(uri.slice("idb://".length));
}

/**
 * IndexedDB adapter:
 * - store() persists the blob and returns a stable idb:// URI
 * - get() loads the blob and returns a *display-ready* blob: URL in BookImageVariant.uri
 *   (so <img src=...> works)
 */
export const indexedDbAdapter: CacheAdapter = {
  async store(file: File, key: string): Promise<BookImageVariant> {
    const checksum = await sha256(file);
    const record: StoredBlob = {
      key,
      blob: file,
      createdAt: Date.now(),
      checksum,
    };

    await withStore("readwrite", (store) => store.put(record));

    return {
      uri: makeIdbUri(key), // stable ref
      status: "local",
      checksum,
      source: "file",
      capturedAt: Date.now(),
    };
  },

  async get(uri: string): Promise<BookImageVariant | null> {
    const key = parseIdbUri(uri);
    if (!key) return null;

    const record = await withStore<StoredBlob | undefined>("readonly", (store) =>
      store.get(key)
    );

    if (!record?.blob) return null;

    const blobUrl = URL.createObjectURL(record.blob);

    return {
      uri: blobUrl, // display-ready
      status: "local",
      checksum: record.checksum,
    };
  },

  async delete(uri: string): Promise<void> {
    const key = parseIdbUri(uri);

    // If someone passes a blob: URL, revoke it.
    if (!key && uri.startsWith("blob:")) {
      URL.revokeObjectURL(uri);
      return;
    }

    if (!key) return;

    await withStore("readwrite", (store) => store.delete(key));
  },
};
