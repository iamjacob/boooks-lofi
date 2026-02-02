import { Author } from '@/core/models/author';
import { authorRepo } from '@/core/repo';

export async function loadAuthors(): Promise<Author[]> {
  return authorRepo.getAll();
}
