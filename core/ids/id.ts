// core/ids/id.ts

export type ID = string;
// core/ids/id.ts
export type Brand<T, B> = T & { __brand: B };

export type BookID = Brand<string, 'BookID'>;
export type AuthorID = Brand<string, 'AuthorID'>;
export type UserID = Brand<string, 'UserID'>;
export type UserBookID = Brand<string, 'UserBookID'>;
export type ShelfID = Brand<string, 'ShelfID'>;
export type CategoryID = Brand<string, 'CategoryID'>;
export type TagID = Brand<string, 'TagID'>;
export type AssetID = Brand<string, 'AssetID'>;


/**
 * Generate a lexicographically sortable, offline-safe ID (ULID-like).
 * No crypto, no dependencies, works everywhere.
 */
export function createId<T extends string>(): Brand<string, T> {
  const time = Date.now().toString(36).padStart(8, '0');
  let random = '';

  for (let i = 0; i < 16; i++) {
    random += Math.floor(Math.random() * 36).toString(36);
  }

  return `${time}${random}`.toUpperCase() as Brand<string, T>;
}

