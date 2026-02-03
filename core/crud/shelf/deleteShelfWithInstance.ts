import { ShelfID, UserID } from '@/core/ids/id';
import { shelfRepo, shelfInstanceRepo } from '@/core/repo';

/**
 * Deletes a shelf and all ShelfInstances that reference it.
 * NOTE: Business rules like "don't delete home" are better in services,
 * but you already created this file in /crud so we keep it clean and usable.
 */
export async function deleteShelfWithInstance(
  shelfId: ShelfID,
  userId: UserID
) {
  const shelf = await shelfRepo.get(shelfId);
  if (!shelf) throw new Error('Shelf not found');

  // IMPORTANT: your Shelf model uses ownerId (not userId)
  if (shelf.ownerId !== userId) {
    throw new Error('Cannot delete another user’s shelf');
  }

  const instances = await shelfInstanceRepo.getByShelf(shelfId);
  for (const inst of instances) {
    await shelfInstanceRepo.delete(inst.id);
  }

  await shelfRepo.delete(shelfId);
}
