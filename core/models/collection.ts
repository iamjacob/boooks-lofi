import { ID } from '@/core/ids/id';

export interface Collection {
  id: ID;

  /** Parent shelf */
  shelfId: ID;

  title: string;

  /** Spatial zone inside the shelf (for 3D / canvas later) */
  position?: [number, number, number];
  rotation?: [number, number, number];

  /** Declarative filter (books are NOT owned by collections) */
  filter?: {
    tagIds?: ID[];
    authors?: string[];
    languages?: string[];
  };

    isSynced:boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
}
