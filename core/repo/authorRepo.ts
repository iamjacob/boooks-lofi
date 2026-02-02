import { Author } from '@/core/models/author';
import { ID } from '@/core/ids/id';

const authors = new Map<ID, Author>();

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
  get(id: ID) {
    return authors.get(id);
  },
};
