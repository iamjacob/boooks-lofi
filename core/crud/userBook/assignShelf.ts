import { UserBookID, ShelfID } from '@/core/ids/id';
import { userBookRepo } from '@/core/repo';

/**
 * Assigns a UserBook to a specific shelf (for physical placement)
 * Note: This is different from libraryGroupId which is logical grouping
 */
export async function assignShelf(
  userBookId: UserBookID,
  shelfId: ShelfID
) {
  const userBook = await userBookRepo.get(userBookId);
  if (!userBook) {
    throw new Error('UserBook not found');
  }

  const updated = {
    ...userBook,
    shelfId,
    updatedAt: Date.now(),
    isSynced: false,
  };

  await userBookRepo.update(updated);
  return updated;
}
