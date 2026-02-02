import { authorRepo } from '@/core/repo';
import { ID } from '@/core/ids/id';

export async function deleteAuthor(id: ID): Promise<void> {
  await authorRepo.delete(id);
}
