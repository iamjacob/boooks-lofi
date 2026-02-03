import { CollectionItem } from '@/core/models/collectionItem';
import { collectionItemRepo } from '@/core/repo';
import { createId, CollectionID, ShelfInstanceID } from '@/core/ids/id';

export async function createCollectionItem(input: {
  collectionId: CollectionID;
  shelfInstanceId: ShelfInstanceID;
  position?: [number, number, number];
  rotation?: [number, number, number];
  index?: number;
}): Promise<CollectionItem> {
  const now = Date.now();

  const collectionItem: CollectionItem = {
    id: createId<'CollectionItemID'>(),
    collectionId: input.collectionId,
    shelfInstanceId: input.shelfInstanceId,
    position: input.position,
    rotation: input.rotation,
    index: input.index,
    isSynced: false,
    createdAt: now,
    updatedAt: now,
  };

  await collectionItemRepo.insert(collectionItem);
  return collectionItem;
}
