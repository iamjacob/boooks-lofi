import { AuthorRepository } from '../AuthorRepository';
import { Author } from '@/core/models/author';
import { ID } from '@/core/ids/id';

export class MemoryAuthorRepo implements AuthorRepository {
  private authors = new Map<ID, Author>();

  async insert(author: Author) {
    this.authors.set(author.id, author);
  }

  async update(author: Author) {
    this.authors.set(author.id, author);
  }

  async delete(id: ID) {
    this.authors.delete(id);
  }

  async get(id: ID) {
    return this.authors.get(id);
  }

  async getAll() {
    return Array.from(this.authors.values());
  }
}
