import { ShelfID, UserID } from '@/core/models/ids/id';
import { shelfRepo, shelfInstanceRepo } from '@/core/repo';
import { deleteShelf } from '@/core/crud/shelf/deleteShelf';

/**
 * User intent:
 * "Delete this shelf"
 *
 * Rules:
 * - Must be owner
 * - Deletes all ShelfInstances on the shelf
 * - Does NOT delete UserBooks or Books
 */
export async function deleteShelfWithInstances(
  shelfId: ShelfID,
  userId: UserID
) {
  // 1. Load shelf
  const shelf = await shelfRepo.get(shelfId);
  if (!shelf) {
    throw new Error('Shelf not found');
  }

  // 2. Ownership guard
  if (shelf.ownerId !== userId) {
    throw new Error('Cannot delete another user’s shelf');
  }

  // 3. Load shelf instances
  const instances = await shelfInstanceRepo.getByShelf(shelfId);

  // 4. Delete instances
  for (const instance of instances) {
    await shelfInstanceRepo.delete(instance.id);
  }

  // 5. Delete shelf
  await deleteShelf(shelfId);

  return {
    deletedShelfId: shelfId,
    deletedInstances: instances.length,
  };
}
