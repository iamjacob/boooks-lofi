// core/drafts/updateDraft.ts
import { StorageAdapter } from '@/storage/adapter';
import { storageKeys } from '@/storage/keys';
import { Book } from '@/core/models/book';
import { createId } from '@/core/ids/id';

export async function updateBookDraft(
  adapter: StorageAdapter,
  userId: string,
  deviceId: string,
  bookId: string,
  patch: Partial<Book>
) {
  const key = storageKeys.book(bookId);

  const book = await adapter.get<Book>(key, {
    type: 'user',
    userId,
  });

  if (!book || book.state !== 'draft') {
    throw new Error('Only drafts can be updated');
  }

  const updated: Book = {
    ...book,
    ...patch,
    updatedAt: Date.now(),
  };

  await adapter.set(key, updated, {
    type: 'user',
    userId,
  });

  await adapter.append(
    storageKeys.history,
    {
      id: `event_${createId()}`,
      type: 'BOOK_UPDATED',
      actorId: userId,
      deviceId,
      timestamp: Date.now(),
      payload: { bookId, fields: Object.keys(patch) },
    },
    { type: 'user', userId }
  );

  return updated;
}
