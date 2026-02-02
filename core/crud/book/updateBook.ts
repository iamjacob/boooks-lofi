import { Book } from '@/core/models/book';
import { bookRepo } from '@/core/repo';

export async function updateBook(
  book: Book,
  patch: Partial<Omit<Book, 'id' | 'createdAt'>>
): Promise<Book> {
  const updated: Book = {
    ...book,
    ...patch,
    updatedAt: Date.now(),
    isSynced: false,
  };

  await bookRepo.update(updated);
  return updated;
}
