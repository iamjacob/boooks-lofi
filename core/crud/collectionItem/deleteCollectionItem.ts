import { collectionItemRepo } from '@/core/repo';
import { CollectionItemID } from '@/core/ids/id';

export async function deleteCollectionItem(collectionItemId: CollectionItemID): Promise<void> {
  const collectionItem = await collectionItemRepo.get(collectionItemId);
  if (!collectionItem) {
    throw new Error('CollectionItem not found');
  }

  await collectionItemRepo.delete(collectionItemId);
}
