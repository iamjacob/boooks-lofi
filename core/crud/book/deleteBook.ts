import { bookRepo } from '@/core/repo';
import { ID } from '@/core/ids/id';

export async function deleteBook(id: ID): Promise<void> {
  await bookRepo.delete(id);
}
