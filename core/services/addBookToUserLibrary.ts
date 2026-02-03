import { BookID, UserID } from '@/core/models/ids/id';
import { bookRepo, userBookRepo } from '@/core/repo';
import { createUserBook } from '@/core/crud/userBook';

export async function addBookToUserLibrary(
  userId: UserID,
  bookId: BookID
) {
  // 1. Ensure book exists
  const book = await bookRepo.get(bookId);
  if (!book) {
    throw new Error('Book does not exist');
  }

  // 2. Prevent duplicates
  const existing = await userBookRepo.getByUser(userId);
  const alreadyAdded = existing.some(ub => ub.bookId === bookId);

  if (alreadyAdded) {
    throw new Error('User already has this book');
  }

  // 3. Create relationship
  return createUserBook({ userId, bookId });
}
