import { UserBookID } from '@/core/ids/id';
import { userBookRepo, shelfInstanceRepo } from '@/core/repo';

/**
 * User intent:
 * "Remove this book from my library"
 *
 * IMPORTANT:
 * - Does NOT delete Book
 * - Cleans up ShelfInstance if present
 */
export async function removeUserBook(userBookId: UserBookID) {
  // 1. Ensure UserBook exists
  const userBook = await userBookRepo.get(userBookId);
  if (!userBook) {
    throw new Error('UserBook not found');
  }

  // 2. Remove ShelfInstance if exists
  const instance = await shelfInstanceRepo.findByUserBook(userBookId);
  if (instance) {
    await shelfInstanceRepo.delete(instance.id);
  }

  // 3. Remove UserBook
  await userBookRepo.delete(userBookId);

  return {
    removedUserBookId: userBookId,
    removedShelfInstanceId: instance?.id,
  };
}
