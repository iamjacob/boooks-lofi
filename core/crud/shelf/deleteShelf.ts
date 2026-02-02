import { ShelfID } from '@/core/ids/id';
import { shelfRepo } from '@/core/repo';

export async function deleteShelf(shelfId: ShelfID) {
  await shelfRepo.delete(shelfId);
}
