import { createId } from '@/core/ids/id';
import { UserID, ShelfID } from '@/core/ids/id';
import { shelfRepo } from '@/core/repo';
import { Shelf } from '@/core/models/shelf';

/**
 * App boundary service.
 *
 * Called when a user is created.
 */
export async function createDefaultShelfForUser(userId: UserID): Promise<Shelf> {
  const now = Date.now();

  const shelf: Shelf = {
    id: createId<'ShelfID'>(),
    ownerId: userId,
    title: 'home',
    slug: 'home',
    visibility: 'public',
    isSynced: false,
    createdAt: now,
    updatedAt: now,
  };

  await shelfRepo.insert(shelf);

  return shelf;
}
