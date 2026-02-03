import { collectionRepo } from '@/core/repo';
import { CollectionID } from '@/core/models/ids/id';

export async function deleteCollection(collectionId: CollectionID): Promise<void> {
  const collection = await collectionRepo.get(collectionId);
  if (!collection) {
    throw new Error('Collection not found');
  }

  await collectionRepo.delete(collectionId);
}
