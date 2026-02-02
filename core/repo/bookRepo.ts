import { Book } from '@/core/models/book';
import { ID } from '@/core/ids/id';

const books = new Map<ID, Book>();

export const bookRepo = {
  insert(book: Book) {
    books.set(book.id, book);
  },

  update(book: Book) {
    books.set(book.id, book);
  },

  get(id: ID): Book | undefined {
    return books.get(id);
  },

  getAll(): Book[] {
    return Array.from(books.values());
  },

  delete(id: ID) {
    books.delete(id);
  },

  clear() {
    books.clear();
  },
};
