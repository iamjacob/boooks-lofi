import { StorageAdapter, StorageScope } from '../adapter';

const DB_NAME = 'boooks';
const DB_VERSION = 1;
const STORE_NAME = 'kv';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function scopedKey(key: string, scope?: StorageScope) {
  if (!scope || scope.type === 'global') return key;
  return `user:${scope.userId}:${key}`;
}

function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}


export class IndexedDBAdapter implements StorageAdapter {
  async get<T>(key: string, scope?: StorageScope): Promise<T | null> {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const req = store.get(scopedKey(key, scope));
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => reject(req.error);
    });
  }

 async set<T>(key: string, value: T, scope?: StorageScope): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  tx.objectStore(STORE_NAME).put(value, scopedKey(key, scope));
  return txDone(tx);
}


async remove(key: string, scope?: StorageScope): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  tx.objectStore(STORE_NAME).delete(scopedKey(key, scope));
  return txDone(tx);
}


  async append<T>(key: string, value: T, scope?: StorageScope): Promise<void> {
    const existing = (await this.get<T[]>(key, scope)) ?? [];
    existing.push(value);
    await this.set(key, existing, scope);
  }

  
  async keys(scope?: StorageScope): Promise<string[]> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);

  return new Promise((resolve) => {
    const keys: string[] = [];
    const req = store.openCursor();

    req.onsuccess = () => {
      const cursor = req.result;
      if (!cursor) return resolve(keys);

      const k = cursor.key as string;

      if (!scope) {
        keys.push(k);
      } else if (scope.type === 'user') {
        if (k.startsWith(`user:${scope.userId}:`)) {
          keys.push(k);
        }
      } else if (scope.type === 'global') {
        if (!k.startsWith('user:')) {
          keys.push(k);
        }
      }

      cursor.continue();
    };
  });
}
}
