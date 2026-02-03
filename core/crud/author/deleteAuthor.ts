import { authorRepo } from '@/core/repo';
import { AuthorID } from '@/core/models/ids/id';

export async function deleteAuthor(id: AuthorID): Promise<void> {
  await authorRepo.delete(id);
}
