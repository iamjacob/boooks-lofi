import { createId } from '@/core/ids/id';
import { StorageAdapter } from '@/storage/adapter';
import { storageKeys } from '@/storage/keys';
import { Book } from '@/core/models/book';
import { UserBook } from '@/core/models/userBook';
import { generateLibraryPlacement } from './generateLibraryPlacement';
import { logEvent } from '@/core/history/logEvent';

/**
 * Add a book to the system and the user's Library.
 *
 * RULES:
 * - Book is global
 * - UserBook is per-user
 * - Library placement is ALWAYS created
 * - Shelves are OPTIONAL and handled later
 */
export async function addBook(
  adapter: StorageAdapter,
  userId: string,
  input: {
    title?: string;
    description?: string;
    language?: string;
  }
): Promise<{ book: Book; userBook: UserBook }> {
  const now = Date.now();

  // 1️⃣ Create global Book (draft by default)
  const books =
    (await adapter.get<Book[]>(storageKeys.books)) ?? [];

  const book: Book = {
    id: `book_${createId()}`,
    title: input.title,
    description: input.description,
    language: input.language,
    createdBy: userId,
    state: 'draft',
    createdAt: now,
  };

  books.push(book);

  await adapter.set(storageKeys.books, books);

  // 2️⃣ Create UserBook (ownership + library placement)
  const userBooks =
    (await adapter.get<UserBook[]>(
      storageKeys.userBooks(),
      { type: 'user', userId }
    )) ?? [];

  const placement = generateLibraryPlacement(userBooks.length);

  const userBook: UserBook = {
    id: `userBook_${createId()}`,
    userId,
    bookId: book.id,

    libraryPlacement: {
      position: placement.position,
      rotation: placement.rotation,
    },

    createdAt: now,
  };

  userBooks.push(userBook);

  await adapter.set(
    storageKeys.userBooks(),
    userBooks,
    { type: 'user', userId }
  );

  // 3️⃣ History
  await logEvent(adapter, userId, 'user_book.added', {
    bookId: book.id,
  });

  return { book, userBook };
}
