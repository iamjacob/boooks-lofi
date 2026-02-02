import { UserBook } from '@/core/models/userBook';
import { userBookRepo } from '@/core/repo';
import { createId } from './../../ids/id'

export async function createUserBook(input: {
  userId: string;
  bookId: string;
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
    syncState:"pending",//maybe
  };

  await userBookRepo.insert(userBook);
  return userBook;
}
