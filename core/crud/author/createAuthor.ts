import { Author } from '@/core/models/author';
import { authorRepo } from '@/core/repo';
import { createId, UserID } from '@/core/ids/id';
export async function createAuthor(input: {
  name: string;
  createdBy: UserID;
}): Promise<Author> {
  const now = Date.now();

  const author: Author = {
    id: createId<'AuthorID'>(),
    name: input.name,
    createdBy: input.createdBy,
    createdAt: now,
    updatedAt: now,
    isSynced: false,
  };

  await authorRepo.insert(author);
  return author;
}
