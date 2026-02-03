import { UserBook } from '@/core/models/userBook';
import { userBookRepo } from '@/core/repo';
import { BookID, createId, UserID } from '@/core/models/ids/id'

export async function createUserBook(input: {
  userId: UserID;
  bookId: BookID;
}): Promise<UserBook> {
  const now = Date.now();

  const userBook: UserBook = {
    id: createId<'UserBookID'>(),
    userId: input.userId,
    bookId: input.bookId,
    readingStatus: 'unread',
    createdAt: now,
    updatedAt: now,
    isSynced: false,
    syncState:"pending" as const,//maybe
  };

  await userBookRepo.insert(userBook);
  return userBook;
}
