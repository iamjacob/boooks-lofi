// core/ids/id.ts

export type ID = string;
// core/ids/id.ts
export type Brand<T, B> = T & { __brand: B };

export type BookID = Brand<string, 'BookID'>;
export type AuthorID = Brand<string, 'AuthorID'>;
export type UserID = Brand<string, 'UserID'>;
export type UserBookID = Brand<string, 'UserBookID'>;
export type ShelfID = Brand<string, 'ShelfID'>;
export type ShelfGroupID = Brand<string, 'ShelfGroupID'>;
export type CategoryID = Brand<string, 'CategoryID'>;
export type TagID = Brand<string, 'TagID'>;
export type AssetID = Brand<string, 'AssetID'>;
export type ShelfInstanceID = Brand<string, 'ShelfInstanceID'>;
export type LibraryGroupID = Brand<string, 'LibraryGroupID'>;
export type CollectionID = Brand<string, 'CollectionID'>;
export type CollectionItemID = Brand<string, 'CollectionItemID'>;
export type ClipID = Brand<string, 'ClipID'>;
export type LibraryCollectionID = Brand<string, 'LibraryCollectionID'>;
export type VerificationID = Brand<string, 'VerificationID'>;
export type IdentityID = Brand<string, 'IdentityID'>;
export type TGDID = Brand<string, 'TGDID'>;
export type ArtifactID = Brand<string, 'ArtifactID'>;
export type JobID = Brand<string, 'JobID'>;
export type CommentThreadID = Brand<string, 'CommentThreadID'>;
export type CommentID = Brand<string, 'CommentID'>;
export type SessionID = Brand<string, 'SessionID'>;
export type ReadingSessionID = Brand<string, 'ReadingSessionID'>;
export type BookAssetID = Brand<string, 'BookAssetID'>;
export type BookImageID = Brand<string, 'BookImageID'>;
export type MemPoolEntryID = Brand<string, 'MemPoolEntryID'>;
export type DeviceID = Brand<string, 'DeviceID'>;

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

