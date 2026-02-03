import { Author } from '@/core/models/author';
import { AuthorID } from '@/core/models/ids/id';

const authors = new Map<AuthorID, Author>();

export const authorRepo = {
  insert(author: Author) {
    authors.set(author.id, author);
  },
  update(author: Author) {
    authors.set(author.id, author);
  },
  getAll(): Author[] {
    return Array.from(authors.values());
  },
  get(id: AuthorID) {
    return authors.get(id);
  },
};
