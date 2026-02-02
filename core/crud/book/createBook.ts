import { Book } from '@/core/models/book';
import { bookRepo } from '@/core/repo';
import { createId } from './../../ids/id'

export async function createBook(
  partial: Omit<Book, 'id' | 'createdAt' | 'updatedAt' | 'isSynced'>
): Promise<Book> {
  const now = Date.now();

  const book: Book = {
    ...partial,
    id: createId<'BookID'>(),
    createdAt: now,
    updatedAt: now,
    isSynced: false,
  };

  await bookRepo.insert(book);
  return book;
}
