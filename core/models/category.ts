import { ID } from '@/core/ids/id';

export interface Category {
  id: ID;

  /** Display */
  name: string;
  slug: string;

  /** Hierarchy */
  parentId?: ID; // null = top-level

  /** Metadata */
  description?: string;
  icon?: string;

  /** System */
    isSynced:boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
}
