import { Collection } from '@/core/models/collection';
import { collectionRepo } from '@/core/repo';
import { CollectionID, ID } from '@/core/models/ids/id';

export async function updateCollection(
  collectionId: CollectionID,
  updates: Partial<
    Pick<
      Collection,
      'title' | 'position' | 'rotation' | 'filter'
    >
  >
): Promise<Collection> {
  const collection = await collectionRepo.get(collectionId);
  if (!collection) {
    throw new Error('Collection not found');
  }

  const updated: Collection = {
    ...collection,
    ...updates,
    updatedAt: Date.now(),
    isSynced: false,
  };

  await collectionRepo.update(updated);
  return updated;
}
