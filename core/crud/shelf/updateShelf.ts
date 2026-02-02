import { Shelf } from '@/core/models/shelf';
import { shelfRepo } from '@/core/repo';

export async function updateShelf(shelf: Shelf) {
  await shelfRepo.update(shelf);
  return shelf;
}
