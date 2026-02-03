// core/drafts/submitDraft.ts
import { StorageAdapter } from '@/core/storage/adapter';
import { storageKeys } from '@/core/storage/keys';
import { Book } from '@/core/models/book';
import { createId } from '@/core/models/ids/id';

export async function submitBookDraft(
  adapter: StorageAdapter,
  userId: string,
  deviceId: string,
  bookId: string
) {
  const key = storageKeys.book(bookId);

  const book = await adapter.get<Book>(key, {
    type: 'user',
    userId,
  });

  if (!book || book.state !== 'draft') {
    throw new Error('Only drafts can be submitted');
  }

  const submitted: Book = {
    ...book,
    state: 'submitted',
    updatedAt: Date.now(),
  };

  await adapter.set(key, submitted, {
    type: 'user',
    userId,
  });

  await adapter.append(
    storageKeys.history,
    {
      id: `event_${createId()}`,
      type: 'BOOK_SUBMITTED',
      actorId: userId,
      deviceId,
      timestamp: Date.now(),
      payload: { bookId },
    },
    { type: 'user', userId }
  );

  return submitted;
}
