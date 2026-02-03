import { LibraryCollectionID, UserID, UserBookID } from '@/core/ids/id';

export interface LibraryCollection {
  id: LibraryCollectionID;
  ownerId: UserID;

  title: string;
  slug?: string;

  // membership
  userBookIds: UserBookID[];

  // ordering inside the collection
  order?: UserBookID[];

  // sync
  isSynced: boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
}

