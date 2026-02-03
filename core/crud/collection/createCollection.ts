import { Collection } from '@/core/models/collection';
import { collectionRepo } from '@/core/repo';
import { createId, ShelfID, TagID } from '@/core/ids/id';

export async function createCollection(input: {
  shelfId: ShelfID;
  title: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  filter?: {
    tagIds?: TagID[];
    authors?: string[];
    languages?: string[];
  };
}): Promise<Collection> {
  const now = Date.now();

  const collection: Collection = {
    id: createId<'CollectionID'>(),
    shelfId: input.shelfId,
    title: input.title,
    position: input.position,
    rotation: input.rotation,
    filter: input.filter,
    isSynced: false,
    createdAt: now,
    updatedAt: now,
  };

  await collectionRepo.insert(collection);
  return collection;
}
