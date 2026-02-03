import { BookRepository } from '../BookRepository';
import { Book } from '@/core/models/book';
import { BookID } from '@/core/models/ids/id';

export class MemoryBookRepo implements BookRepository {
  private books = new Map<BookID, Book>();

  async insert(book: Book) {
    this.books.set(book.id, book);
  }

  async update(book: Book) {
    this.books.set(book.id, book);
  }

  async delete(id: BookID) {
    this.books.delete(id);
  }

  async get(id: BookID) {
    return this.books.get(id);
  }

  async getAll() {
    return Array.from(this.books.values());
  }
}
