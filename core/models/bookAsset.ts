// core/models/bookAsset.ts
import { BookAssetID, BookID } from '@/core/models/ids/id';

export type BookAssetType =
  | 'cover'
  | 'pdf'
  | 'epub'
  | 'scan'
  | 'audio';

export interface BookAsset {
  id: BookAssetID;
  bookId: BookID;

  type: BookAssetType;

  /** Human-friendly */
  name?: string;        // "First edition PDF"
  description?: string;

  /** Location */
  uri: string;

  checksum?: string;
  sizeBytes?: number;
  
  isSynced:boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
}
