import { ShelfInstanceID, UserBookID, ShelfID, ShelfGroupID, TagID, CommentThreadID } from '@/core/models/ids/id';

/**
 * ShelfInstance = a contextual expression of a UserBook.
 *
 * THIS is what "feels like a copy".
 * THIS can be social.
 * THIS can go to mempool.
 */
export interface ShelfInstance {
  id: ShelfInstanceID;
  userBookId: UserBookID;
  shelfId: ShelfID;

  index?: number;
  
  // Group membership (optional)
  shelfGroupId?: ShelfGroupID;

  // Individual transform (relative to group if grouped)
  position?: [number, number, number];
  rotation?: [number, number, number];


  /** Contextual meaning */
  notes?: string;
  rating?: number;
  tagIds?: TagID[];

  /** Social layer */
  visibility?: 'private' | 'public';
  // commentThreadId?: CommentThreadID;

  /** Mempool state */
  state?: 'local' | 'pending' | 'published';

  isSynced:boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
}
