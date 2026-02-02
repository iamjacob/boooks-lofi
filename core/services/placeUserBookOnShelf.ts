import { UserBookID, ShelfID } from '@/core/ids/id';
import { shelfInstanceRepo, shelfRepo, userBookRepo } from '@/core/repo';
import { createId } from '@/core/ids/id';


/**
 * User intent:
 * "Place this book on this shelf"
 */
export async function placeUserBookOnShelf(
  userBookId: UserBookID,
  shelfId: ShelfID
) {
  const userBook = await userBookRepo.get(userBookId);
  if (!userBook) {
    throw new Error('UserBook not found');
  }

  const shelf = await shelfRepo.get(shelfId);
  if (!shelf) {
    throw new Error('Shelf not found');
  }

  // Ownership guard
  if (shelf.ownerId !== userBook.userId) {
    throw new Error('Cannot place book on another user’s shelf');
  }

  // Check for existing ShelfInstance
  const existing = await shelfInstanceRepo.findByUserBook(
    userBookId
  );

  if (existing) {
    const updated = {
      ...existing,
      shelfId,
      updatedAt: Date.now(),
      state: 'pending' as const,
    };

    await shelfInstanceRepo.update(updated);
    return updated;
  }

  // Create new ShelfInstance
  const now = Date.now();

  const instance = {
    id: createId<'ShelfInstanceID'>(),
    userBookId,
    shelfId,
    createdAt: now,
    updatedAt: now,
    state: 'pending' as const,
    isSynced: false,
  };

  await shelfInstanceRepo.insert(instance);
  return instance;
}
