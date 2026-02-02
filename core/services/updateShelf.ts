import { Shelf } from '@/core/models/shelf';
import { shelfRepo } from '@/core/repo';

export async function updateShelf(shelf: Shelf): Promise<Shelf> {
  await shelfRepo.update({
    ...shelf,
    updatedAt: Date.now(),
  });

  return shelf;
}
