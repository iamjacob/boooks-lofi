import { CategoryID } from '@/core/ids/id';

export interface Category {
  id: CategoryID;

  /** Display */
  name: string;
  slug: string;

  /** Hierarchy */
  parentId?: CategoryID; // null = top-level

  /** Metadata */
  description?: string;
  icon?: string;

  /** System */
    isSynced:boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
}
