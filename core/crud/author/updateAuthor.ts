import { Author } from '@/core/models/author';
import { authorRepo } from '@/core/repo';

export async function updateAuthor(
  author: Author,
  patch: Partial<Omit<Author, 'id' | 'createdAt'>>
): Promise<Author> {
  const updated: Author = {
    ...author,
    ...patch,
    updatedAt: Date.now(),
    isSynced: false,
  };

  await authorRepo.update(updated);
  return updated;
}
