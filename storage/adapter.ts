// storage/adapter.ts

export type StorageScope =
  | { type: 'global' }
  | { type: 'user'; userId: string };

export interface StorageAdapter {
  /** Read a single value */
  get<T>(key: string, scope?: StorageScope): Promise<T | null>;

  /** Write / overwrite a value */
  set<T>(key: string, value: T, scope?: StorageScope): Promise<void>;

  /** Remove a value */
  remove(key: string, scope?: StorageScope): Promise<void>;

  /** Append-only write (for history, logs, events) */
  append<T>(key: string, value: T, scope?: StorageScope): Promise<void>;

  /** List keys (used for sync, debugging, migrations) */
  keys(scope?: StorageScope): Promise<string[]>;
}

