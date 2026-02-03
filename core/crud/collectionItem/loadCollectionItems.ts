import { CollectionID } from '@/core/ids/id';
import { collectionItemRepo } from '@/core/repo';

export async function loadCollectionItems(collectionId: CollectionID) {
  return collectionItemRepo.getByCollection(collectionId);
}
