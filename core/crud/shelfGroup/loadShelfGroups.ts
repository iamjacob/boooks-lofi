import { ShelfID } from '@/core/models/ids/id';
import { shelfGroupRepo } from '@/core/repo';

export async function loadShelfGroups(shelfId: ShelfID) {
  return shelfGroupRepo.getByShelf(shelfId);
}
