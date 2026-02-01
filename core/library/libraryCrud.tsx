// core/library/libraryCrud.ts

import { ID } from "@/core/ids/id";
import { UserBook } from "@/core/models/userBook";
import { BookListItem } from "@/ui/models/bookListItem";
import { loadBooks, loadUserBooks, saveBook, saveUserBook } from "@/core/db/libraryDb";

export type LibraryRow = BookListItem & {
  userBookId: ID;
  userId: ID;
  bookId: ID;
  readingStatus: UserBook["readingStatus"];
  createdAt: number;
  updatedAt?: number;
};

/* -------------------------------------------------------
   LOAD
------------------------------------------------------- */

export async function loadLibraryRows(userId: ID): Promise<LibraryRow[]> {
  const [books, userBooks] = await Promise.all([
    loadBooks(),
    loadUserBooks(userId),
  ]);

  const rows: LibraryRow[] = [];

  for (const ub of userBooks) {
    // hard safety (even though scope already isolates)
    if (ub.userId !== userId) continue;

    const book = books.find((b) => b.id === ub.bookId);
    if (!book) continue;

    rows.push({
      ...book,
      userBookId: ub.id,
      userId,
      bookId: ub.bookId,
      readingStatus: ub.readingStatus,
      createdAt: ub.createdAt,
      updatedAt: ub.updatedAt,
    });
  }

  return rows;
}

/* -------------------------------------------------------
   CREATE (add book + attach to user's Library)
------------------------------------------------------- */

export async function addToLibrary(userId: ID, book: BookListItem): Promise<void> {
  // 1) Save global book
  await saveBook(book);

  // 2) Enforce invariant: ONE UserBook per user per book
  const userBooks = await loadUserBooks(userId);
  const exists = userBooks.some((ub) => ub.bookId === (book.id as ID));
  if (exists) return;

  // 3) Create UserBook (belongs to user + has readingStatus)
  const ub: UserBook = {
    id: crypto.randomUUID() as ID,
    userId,
    bookId: book.id as ID,
    readingStatus: "unread",
    createdAt: Date.now(),
  };

  await saveUserBook(ub);
}

/* -------------------------------------------------------
   UPDATE
------------------------------------------------------- */

export async function setReadingStatus(
  userId: ID,
  userBookId: ID,
  status: UserBook["readingStatus"]
): Promise<void> {
  const userBooks = await loadUserBooks(userId);

  const ub = userBooks.find((x) => x.id === userBookId);
  if (!ub) throw new Error(`UserBook not found: ${userBookId}`);

  if (ub.userId !== userId) {
    throw new Error("Forbidden: userBook does not belong to user");
  }

  const updated: UserBook = {
    ...ub,
    readingStatus: status,
    updatedAt: Date.now(),
  };

  await saveUserBook(updated);
}
