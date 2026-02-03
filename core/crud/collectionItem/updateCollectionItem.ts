import { CollectionItem } from '@/core/models/collectionItem';
import { collectionItemRepo } from '@/core/repo';
import { CollectionItemID } from '@/core/ids/id';

export async function updateCollectionItem(
  collectionItemId: CollectionItemID,
  updates: Partial<
    Pick<
      CollectionItem,
      'position' | 'rotation' | 'index'
    >
  >
): Promise<CollectionItem> {
  const collectionItem = await collectionItemRepo.get(collectionItemId);
  if (!collectionItem) {
    throw new Error('CollectionItem not found');
  }

  const updated: CollectionItem = {
    ...collectionItem,
    ...updates,
    updatedAt: Date.now(),
    isSynced: false,
  };

  await collectionItemRepo.update(updated);
  return updated;
}
