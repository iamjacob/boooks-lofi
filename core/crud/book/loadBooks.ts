import { Book } from '@/core/models/book';
import { bookRepo } from '@/core/repo';

export async function loadBooks(): Promise<Book[]> {
  return bookRepo.getAll();
}
