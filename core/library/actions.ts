import { db } from "./db";
import { Book } from "@/core/models/book";
import { UserBook, readingStatus } from "@/core/models/userBook";

/**
 * Creates a GLOBAL book entry (metadata only)
 * Returns bookId
 */
export function createBook(book: Omit<Book, "createdAt">) {
  const now = Date.now();

  const fullBook: Book = {
    ...book,
    createdAt: now,
  };

  db.books.put(fullBook);
  return fullBook.id;
}

/**
 * Attaches a book to a user (local, mutable)
 * Returns userBookId
 */
export function createUserBook(input: {
  userId: string;
  bookId: string;
  status?: readingStatus;
}) {
  const now = Date.now();

  const userBook: UserBook = {
    id: crypto.randomUUID(), // ✅ native, no deps
    userId: input.userId,
    bookId: input.bookId,
    readingStatus: input.status ?? "unread",
    createdAt: now,
    updatedAt: now,
  };

  db.userBooks.put(userBook);
  return userBook.id;
}
