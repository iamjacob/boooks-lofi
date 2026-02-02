import { BookRepository } from '../BookRepository';
import { Book } from '@/core/models/book';
import { ID } from '@/core/ids/id';

export class MemoryBookRepo implements BookRepository {
  private books = new Map<ID, Book>();

  async insert(book: Book) {
    this.books.set(book.id, book);
  }

  async update(book: Book) {
    this.books.set(book.id, book);
  }

  async delete(id: ID) {
    this.books.delete(id);
  }

  async get(id: ID) {
    return this.books.get(id);
  }

  async getAll() {
    return Array.from(this.books.values());
  }
}
