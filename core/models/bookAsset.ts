// core/models/bookAsset.ts
import { ID } from '@/core/ids/id';

export type BookAssetType =
  | 'cover'
  | 'pdf'
  | 'epub'
  | 'scan'
  | 'audio';

export interface BookAsset {
  id: ID;
  bookId: ID;

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
