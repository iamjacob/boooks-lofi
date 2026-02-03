import { bookRepo } from '@/core/repo';
import { BookID } from '@/core/models/ids/id';

export async function deleteBook(id: BookID): Promise<void> {
  await bookRepo.delete(id);
}
