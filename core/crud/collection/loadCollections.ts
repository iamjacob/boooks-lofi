import { ShelfID } from '@/core/ids/id';
import { collectionRepo } from '@/core/repo';

export async function loadCollections(shelfId: ShelfID) {
  return collectionRepo.getByShelf(shelfId);
}
