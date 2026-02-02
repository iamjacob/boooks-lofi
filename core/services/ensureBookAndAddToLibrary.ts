import { UserID, AuthorID } from '@/core/ids/id';
import { createAuthor } from '@/core/crud/author';
import { createBook } from '@/core/crud/book';
import { addBookToUserLibrary } from './addBookToUserLibrary';
import { authorRepo, bookRepo } from '@/core/repo';

export interface EnsureBookInput {
  title: string;
  language?: string;

  authorName?: string;   // optional on purpose
}

/**
 * Composite intent service.
 *
 * User intent:
 * "I want this book in my library"
 */
export async function ensureBookAndAddToLibrary(
  userId: UserID,
  input: EnsureBookInput
) {
  // --------------------------------------------------
  // 1. Ensure Author (optional, minimal)
  // --------------------------------------------------
  let authorId: AuthorID | undefined;

  if (input.authorName) {
    const existingAuthors = await authorRepo.getAll();
    const found = existingAuthors.find(
      a => a.name.toLowerCase() === input.authorName!.toLowerCase()
    );

    if (found) {
      authorId = found.id;
    } else {
      const author = await createAuthor({
        name: input.authorName,
        createdBy: userId,
      });
      authorId = author.id;
    }
  }
  // --------------------------------------------------
  // 2. Ensure Book (VERY conservative match for now)
  // --------------------------------------------------
  const existingBooks = await bookRepo.getAll();
  let book = existingBooks.find(
    b =>
      b.title?.toLowerCase() === input.title.toLowerCase() &&
      (!authorId || b.authorID === authorId)
  );

  if (!book) {
    book = await createBook({
      title: input.title,
      language: input.language,
      authorID: authorId,
      createdBy: userId,
      state: 'draft', // IMPORTANT
    });
  }
  // --------------------------------------------------
  // 3. Ensure UserBook (personal relationship)
  // --------------------------------------------------
  const userBook = await addBookToUserLibrary(
    userId,
    book.id
  );

  // --------------------------------------------------
  // 4. Return joined result (nice for UI)
  // --------------------------------------------------
  return {
    book,
    userBook,
    authorId,
  };
}
