import { CollectionID } from '@/core/models/ids/id';
import { collectionItemRepo } from '@/core/repo';

export async function loadCollectionItems(collectionId: CollectionID) {
  return collectionItemRepo.getByCollection(collectionId);
}
