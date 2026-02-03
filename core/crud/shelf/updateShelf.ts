import { ShelfID } from '@/core/ids/id';
import { shelfRepo } from '@/core/repo';

export async function updateShelf(
  id: ShelfID,
  patch: Record<string, any>
) {
  const shelf = await shelfRepo.get(id);
  if (!shelf) throw new Error('Shelf not found');

  const updated = {
    ...shelf,
    ...patch,
    updatedAt: Date.now(),
  };

  await shelfRepo.update(updated);
  return updated;
}
