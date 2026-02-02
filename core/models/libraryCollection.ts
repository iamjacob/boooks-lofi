import { ID } from '@/core/ids/id';

export interface LibraryCollection {
  id: ID;
  ownerId: ID;

  title: string;
  slug?: string;

  // membership
  userBookIds: ID[];

  // ordering inside the collection
  order?: ID[];

  // sync
  isSynced: boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
}

