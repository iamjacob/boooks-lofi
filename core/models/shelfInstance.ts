import { ID } from '@/core/ids/id';

/**
 * ShelfInstance = a contextual expression of a UserBook.
 *
 * THIS is what "feels like a copy".
 * THIS can be social.
 * THIS can go to mempool.
 */
export interface ShelfInstance {
  id: ID;
  userBookId: ID;
  shelfId: ID;

  index?: number;
  
  // Group membership (optional)
  shelfGroupId?: ID;

  // Individual transform (relative to group if grouped)
  position?: [number, number, number];
  rotation?: [number, number, number];


  /** Contextual meaning */
  notes?: string;
  rating?: number;
  tagIds?: ID[];

  /** Social layer */
  visibility?: 'private' | 'public';
  commentThreadId?: ID;

  /** Mempool state */
  state?: 'local' | 'pending' | 'published';

  isSynced:boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
}
