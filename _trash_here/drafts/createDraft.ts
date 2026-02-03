// core/drafts/createDraft.ts
import { createId } from '@/core/models/ids/id';
import { StorageAdapter } from '@/core/storage/adapter';
import { storageKeys } from '@/core/storage/keys';
import { Book } from '@/core/models/book';

export async function createBookDraft(
  adapter: StorageAdapter,
  userId: string,
  parentId?: string
) {
  const books =
    (await adapter.get<Book[]>(storageKeys.books(userId), {
      type: 'user',
      userId,
    })) ?? [];

  const book: Book = {
    id: `book_${createId()}`,
    parentId,
    authorIds: [],
    state: 'draft',
    createdBy: userId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  books.push(book);

  await adapter.set(storageKeys.books(userId), books, {
    type: 'user',
    userId,
  });

  return book;
}
