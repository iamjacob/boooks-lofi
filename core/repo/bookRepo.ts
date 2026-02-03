import { Book } from '@/core/models/book';
import { BookID } from '@/core/models/ids/id';

const books = new Map<BookID, Book>();

export const bookRepo = {
  insert(book: Book) {
    books.set(book.id, book);
  },

  update(book: Book) {
    books.set(book.id, book);
  },

  get(id: BookID): Book | undefined {
    return books.get(id);
  },

  getAll(): Book[] {
    return Array.from(books.values());
  },

  delete(id: BookID) {
    books.delete(id);
  },

  clear() {
    books.clear();
  },
};
