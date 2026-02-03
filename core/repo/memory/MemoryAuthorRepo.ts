import { AuthorRepository } from '../AuthorRepository';
import { Author } from '@/core/models/author';
import { AuthorID } from '@/core/models/ids/id';

export class MemoryAuthorRepo implements AuthorRepository {
  private authors = new Map<AuthorID, Author>();

  async insert(author: Author) {
    this.authors.set(author.id, author);
  }

  async update(author: Author) {
    this.authors.set(author.id, author);
  }

  async delete(id: AuthorID) {
    this.authors.delete(id);
  }

  async get(id: AuthorID) {
    return this.authors.get(id);
  }

  async getAll() {
    return Array.from(this.authors.values());
  }
}
