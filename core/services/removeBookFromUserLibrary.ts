import { UserID, BookID } from '@/core/ids/id';
import { userBookRepo } from '@/core/repo';

/**
 * User intent:
 * "Remove this book from my library"
 */
export async function removeBookFromUserLibrary(
  userId: UserID,
  bookId: BookID
) {
  const userBooks = await userBookRepo.getByUser(userId);

  const userBook = userBooks.find(
    ub => ub.bookId === bookId
  );

  if (!userBook) {
    throw new Error('UserBook not found');
  }

  await userBookRepo.delete(userBook.id);

  return userBook;
}
