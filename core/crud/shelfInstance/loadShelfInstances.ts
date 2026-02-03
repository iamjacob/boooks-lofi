import { ShelfID } from '@/core/models/ids/id';
import { shelfInstanceRepo } from '@/core/repo';

export async function loadShelfInstances(shelfId: ShelfID) {
  return shelfInstanceRepo.getByShelf(shelfId);
}
