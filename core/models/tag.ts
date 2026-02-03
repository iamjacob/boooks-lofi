// core/models/tag.ts
import { TagID, UserID, CategoryID } from '@/core/models/ids/id';

export interface Tag {
  id: TagID;

  /** Canonical label */
  label: string;

  /** Normalized form for search */
  slug: string; // 'true-north', 'ai-ethics'

  /** Ownership */
  createdBy: UserID;

  /** Optional grouping */
  categoryId?: CategoryID;

  isSynced:boolean;
  lastSyncedAt?: number;
  updatedAt?: number;
  createdAt: number;
}
