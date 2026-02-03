import { ShelfID } from '@/core/models/ids/id';
import { shelfRepo } from '@/core/repo';

export async function deleteShelf(shelfId: ShelfID) {
  await shelfRepo.delete(shelfId);
}
